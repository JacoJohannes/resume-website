/**
 * Baseline — Offline, best-effort lab-PDF text extraction.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT THIS IS (and is not)
 * • Runs ENTIRELY in the browser. The file is read locally with FileReader/
 *   arrayBuffer — nothing is uploaded anywhere.
 * • Extracts text from TEXT-BASED PDFs (uncompressed and FlateDecode content
 *   streams, via the built-in DecompressionStream). It then looks for the names
 *   of biomarkers Baseline understands and the number next to each.
 * • It CANNOT read scanned/photographed reports (image-only PDFs), PDFs whose
 *   fonts use custom encodings, or arbitrary layouts. When it can't read a file
 *   reliably it says so and offers manual entry — it never invents values.
 * • Every value it does find is shown for the user to CONFIRM or CORRECT before
 *   anything is interpreted. This is a prototype aid, not validated extraction.
 * ─────────────────────────────────────────────────────────────────────────────
 */
(function (B) {
  'use strict';

  // Aliases the parser will look for, per biomarker id. Longer/more specific
  // names are tried first so e.g. "hemoglobin a1c" wins over "hemoglobin".
  const ALIASES = {
    hba1c: ['hemoglobin a1c', 'haemoglobin a1c', 'glycated hemoglobin', 'glycohemoglobin', 'hba1c', 'a1c'],
    ldl: ['ldl cholesterol', 'ldl-c', 'ldl chol', 'ldl'],
    hdl: ['hdl cholesterol', 'hdl-c', 'hdl'],
    triglycerides: ['triglycerides', 'triglyceride', 'trig'],
    'total-cholesterol': ['total cholesterol', 'cholesterol, total', 'cholesterol total', 'total chol'],
    glucose: ['fasting glucose', 'glucose, fasting', 'glucose fasting', 'glucose'],
    alt: ['alanine aminotransferase', 'alt (sgpt)', 'sgpt', 'alt'],
    ast: ['aspartate aminotransferase', 'ast (sgot)', 'sgot', 'ast'],
    creatinine: ['creatinine'],
    egfr: ['estimated gfr', 'egfr', 'e-gfr', 'gfr'],
    tsh: ['thyroid-stimulating hormone', 'thyroid stimulating hormone', 'tsh'],
    hemoglobin: ['hemoglobin', 'haemoglobin', 'hgb', 'hb'],
    ferritin: ['ferritin'],
    vitd: ['25-hydroxyvitamin d', '25 hydroxyvitamin d', '25-oh vitamin d', 'vitamin d, 25', 'vitamin d3', 'vitamin d'],
    'non-hdl': ['non-hdl cholesterol', 'non hdl cholesterol', 'non-hdl-c', 'non hdl'],
    apob: ['apolipoprotein b', 'apo b', 'apob'],
    lpa: ['lipoprotein(a)', 'lipoprotein a', 'lp(a)'],
    hscrp: ['high sensitivity c-reactive protein', 'high-sensitivity crp', 'hs-crp', 'hscrp'],
    uacr: ['urine albumin-to-creatinine ratio', 'albumin creatinine ratio', 'urine acr', 'uacr'],
    bun: ['blood urea nitrogen', 'urea nitrogen', 'bun'],
    alp: ['alkaline phosphatase', 'alk phos', 'alp'],
    ggt: ['gamma-glutamyl transferase', 'gamma glutamyl transferase', 'ggt'],
    bilirubin: ['total bilirubin', 'bilirubin, total', 'bilirubin'],
    albumin: ['serum albumin', 'albumin'],
    sodium: ['sodium'],
    potassium: ['potassium'],
    wbc: ['white blood cell count', 'white blood cells', 'wbc count', 'wbc'],
    platelets: ['platelet count', 'platelets', 'plt'],
    hematocrit: ['hematocrit', 'haematocrit', 'hct'],
    mcv: ['mean corpuscular volume', 'mcv'],
    freet4: ['free thyroxine', 'free t4', 'ft4'],
    vitb12: ['vitamin b12', 'cobalamin', 'b12'],
  };

  // Ordered list of {id, alias} tried longest-first.
  const MATCHERS = [];
  Object.keys(ALIASES).forEach((id) => ALIASES[id].forEach((a) => MATCHERS.push({ id, alias: a })));
  MATCHERS.sort((a, b) => b.alias.length - a.alias.length);

  function bytesToLatin1(bytes) {
    let s = '';
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
      s += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
    }
    return s;
  }

  async function inflate(bytes, kind) {
    if (typeof DecompressionStream === 'undefined') return null;
    try {
      const ds = new DecompressionStream(kind);
      const stream = new Blob([bytes]).stream().pipeThrough(ds);
      const buf = await new Response(stream).arrayBuffer();
      return new Uint8Array(buf);
    } catch (e) {
      return null;
    }
  }

  // Reconstruct visible text from a PDF content stream.
  function textFromContent(s) {
    let out = '';
    let i = 0;
    const n = s.length;
    while (i < n) {
      const ch = s[i];
      if (ch === '(') {
        let depth = 1;
        let j = i + 1;
        let str = '';
        while (j < n && depth > 0) {
          const c = s[j];
          if (c === '\\') {
            const nx = s[j + 1];
            if (nx === 'n') { str += '\n'; j += 2; continue; }
            if (nx === 'r') { str += '\r'; j += 2; continue; }
            if (nx === 't') { str += '\t'; j += 2; continue; }
            if (nx === '(' || nx === ')' || nx === '\\') { str += nx; j += 2; continue; }
            if (nx >= '0' && nx <= '7') {
              let oct = nx;
              let k = j + 2;
              while (k < n && s[k] >= '0' && s[k] <= '7' && oct.length < 3) { oct += s[k]; k++; }
              str += String.fromCharCode(parseInt(oct, 8) & 0xff);
              j = k;
              continue;
            }
            str += nx; j += 2; continue;
          }
          if (c === '(') { depth++; str += c; j++; continue; }
          if (c === ')') { depth--; if (depth === 0) { j++; break; } str += c; j++; continue; }
          str += c; j++;
        }
        out += str;
        i = j;
        continue;
      }
      // Line-moving operators → emit a newline so rows stay separate.
      if (ch === 'T' && s[i + 1] === '*') { out += '\n'; i += 2; continue; }
      if (ch === 'T' && (s[i + 1] === 'd' || s[i + 1] === 'D')) { out += '\n'; i += 2; continue; }
      if (ch === "'" || ch === '"') { out += '\n'; i++; continue; }
      i++;
    }
    return out;
  }

  // Returns { text, imageOnly }. (Never attaches props to a string primitive —
  // that throws in strict mode.)
  async function extractText(bytes) {
    const latin1 = bytesToLatin1(bytes);
    if (latin1.indexOf('%PDF') < 0) return { text: '', imageOnly: false };
    let text = '';
    const re = /stream\r?\n/g;
    let m;
    let sawImageOnly = true;
    while ((m = re.exec(latin1))) {
      const start = m.index + m[0].length;
      const end = latin1.indexOf('endstream', start);
      if (end < 0) continue;
      const dictStart = latin1.lastIndexOf('<<', m.index);
      const dict = dictStart >= 0 ? latin1.slice(dictStart, m.index) : '';
      if (/(DCTDecode|JPXDecode|CCITTFaxDecode|JBIG2Decode)/.test(dict)) { re.lastIndex = end; continue; }
      let content;
      // The PDF spec puts an EOL right before `endstream` that is not part of the
      // stream data — trim it so compressed streams decode cleanly.
      let dataEnd = end;
      if (latin1[dataEnd - 1] === '\n') dataEnd--;
      if (latin1[dataEnd - 1] === '\r') dataEnd--;
      const raw = bytes.subarray(start, dataEnd);
      if (/FlateDecode/.test(dict)) {
        let inf = await inflate(raw, 'deflate');
        if (!inf) inf = await inflate(raw, 'deflate-raw');
        if (!inf) { re.lastIndex = end; continue; }
        content = bytesToLatin1(inf);
      } else {
        content = bytesToLatin1(raw);
      }
      if (/Tj|TJ|BT/.test(content)) {
        sawImageOnly = false;
        text += '\n' + textFromContent(content);
      }
      re.lastIndex = end;
    }
    return { text: text, imageOnly: sawImageOnly };
  }

  // Simplified unit tokens per marker, for a confidence bump when the unit is
  // found near the number.
  const UNIT_HINT = {
    mg: /mg\s*\/\s*d?l/i,
    pct: /%/,
    ul: /u\s*\/\s*l/i,
    miul: /m\s*iu\s*\/\s*l/i,
    ngml: /ng\s*\/\s*ml/i,
    gdl: /g\s*\/\s*dl/i,
    egfr: /ml\s*\/\s*min/i,
    mmol: /mmol\s*\/\s*l/i,
    mgL: /mg\s*\/\s*l/i,
    mgG: /mg\s*\/\s*g/i,
    nmol: /nmol\s*\/\s*l/i,
    ngl: /ng\s*\/\s*l/i,
    fl: /\bf\s*l\b/i,
    x109: /(?:x|×)\s*10\s*(?:\\^|\^)?\s*9\s*\/\s*l/i,
  };
  function unitHintFor(id) {
    const u = (B.data.biomarker(id) || {}).unit || '';
    if (/mg\/dL/i.test(u)) return UNIT_HINT.mg;
    if (u === '%') return UNIT_HINT.pct;
    if (/U\/L/i.test(u)) return UNIT_HINT.ul;
    if (/mIU/i.test(u)) return UNIT_HINT.miul;
    if (/ng\/mL/i.test(u)) return UNIT_HINT.ngml;
    if (/g\/dL/i.test(u)) return UNIT_HINT.gdl;
    if (/mL\/min/i.test(u)) return UNIT_HINT.egfr;
    if (/mmol\/L/i.test(u)) return UNIT_HINT.mmol;
    if (/mg\/L/i.test(u)) return UNIT_HINT.mgL;
    if (/mg\/g/i.test(u)) return UNIT_HINT.mgG;
    if (/nmol\/L/i.test(u)) return UNIT_HINT.nmol;
    if (/ng\/L/i.test(u)) return UNIT_HINT.ngl;
    if (u === 'fL') return UNIT_HINT.fl;
    if (/10⁹\/L/.test(u)) return UNIT_HINT.x109;
    return null;
  }

  // Preserve an explicitly printed unit instead of silently replacing it with
  // the catalog unit. Alternate units are intentionally NOT converted here;
  // the review screen asks the user to confirm them and the interpretation
  // layer refuses a numeric comparison until units match.
  function detectedUnit(text) {
    const patterns = [
      [/mmol\s*\/\s*mol/i, 'mmol/mol'],
      [/mg\s*\/\s*mmol/i, 'mg/mmol'],
      [/(?:µ|μ|u)mol\s*\/\s*l/i, 'µmol/L'],
      [/nmol\s*\/\s*l/i, 'nmol/L'],
      [/pmol\s*\/\s*l/i, 'pmol/L'],
      [/mmol\s*\/\s*l/i, 'mmol/L'],
      [/mg\s*\/\s*dl/i, 'mg/dL'],
      [/ng\s*\/\s*dl/i, 'ng/dL'],
      [/ng\s*\/\s*ml/i, 'ng/mL'],
      [/ng\s*\/\s*l/i, 'ng/L'],
      [/mg\s*\/\s*g/i, 'mg/g'],
      [/mg\s*\/\s*l/i, 'mg/L'],
      [/\bg\s*\/\s*dl/i, 'g/dL'],
      [/g\s*\/\s*l/i, 'g/L'],
      [/m\s*iu\s*\/\s*l/i, 'mIU/L'],
      [/\bu\s*\/\s*l\b/i, 'U/L'],
      [/ml\s*\/\s*min\s*\/\s*1\.73\s*m(?:2|²)/i, 'mL/min/1.73m²'],
      [/ml\s*\/\s*min/i, 'mL/min'],
      [/(?:x|×)\s*10\s*(?:\^|\^)?\s*9\s*\/\s*l/i, '×10⁹/L'],
      [/\bf\s*l\b/i, 'fL'],
      [/%/, '%'],
    ];
    for (const [re, unit] of patterns) if (re.test(text)) return unit;
    return '';
  }

  function findCandidates(text) {
    const lines = text.split(/\n+/).map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
    const found = {};
    for (const line of lines) {
      const lower = line.toLowerCase();
      for (const { id, alias } of MATCHERS) {
        if (found[id]) continue;
        const pos = lower.indexOf(alias);
        if (pos < 0) continue;
        // Look for the first plausible number AFTER the alias name.
        const after = line.slice(pos + alias.length);
        const numMatch = after.match(/(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?|-?\d+(?:\.\d+)?)/);
        if (!numMatch) continue;
        const rawNum = numMatch[1].replace(/,/g, '');
        const value = parseFloat(rawNum);
        if (!isFinite(value)) continue;
        // Reject obvious non-results (years, absurd magnitudes).
        if (/^(19|20)\d\d$/.test(rawNum) && value > 1900) continue;
        if (Math.abs(value) > 100000) continue;
        const def = B.data.biomarker(id);
        const near = after.slice(0, numMatch.index + numMatch[0].length + 24);
        const printedUnit = detectedUnit(near);
        const hint = unitHintFor(id);
        const confidence = printedUnit || (hint && hint.test(near)) ? 'high' : 'medium';
        found[id] = { id, name: def ? def.name : id, value: value, unit: printedUnit || (def ? def.unit : ''), confidence: confidence };
        break; // one marker per line
      }
    }
    return Object.keys(found).map((k) => found[k]);
  }

  /**
   * @param {File} file
   * @returns {Promise<{ok:boolean, candidates?:Array, reason?:string}>}
   */
  async function parseFile(file) {
    const name = (file.name || '').toLowerCase();
    const isPdf = file.type === 'application/pdf' || name.endsWith('.pdf');
    if ((file.type && file.type.indexOf('image/') === 0) || /\.(png|jpe?g|heic|heif|gif|webp|tiff?)$/.test(name)) {
      return { ok: false, reason: 'image' };
    }
    if (!isPdf) return { ok: false, reason: 'unsupported' };
    let bytes;
    try {
      bytes = new Uint8Array(await file.arrayBuffer());
    } catch (e) {
      return { ok: false, reason: 'read-error' };
    }
    let extracted;
    try {
      extracted = await extractText(bytes);
    } catch (e) {
      return { ok: false, reason: 'parse-error' };
    }
    const text = extracted.text;
    if (!text || !text.trim()) {
      return { ok: false, reason: extracted.imageOnly ? 'image-pdf' : 'no-text' };
    }
    const candidates = findCandidates(text);
    if (!candidates.length) return { ok: false, reason: 'no-markers' };
    return { ok: true, candidates: candidates };
  }

  B.parse = { parseFile, findCandidates, _extractText: extractText };
})(window.Baseline);
