/**
 * Baseline — Library layer: DOM helpers, formatting, deterministic safety
 * classification, app state/persistence, and a tiny hash router.
 *
 * No clinical thresholds are decided here except inside the SAFETY LAYER, which
 * is intentionally deterministic and rule-based (never generative).
 */
(function (B) {
  'use strict';

  // ── DOM helpers ────────────────────────────────────────────────────────────
  /**
   * Create an element. Props may include className, text, html, on{Event},
   * dataset, aria-*, and any attribute. Children may be nodes or strings.
   */
  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      for (const key of Object.keys(props)) {
        const val = props[key];
        if (val == null || val === false) continue;
        if (key === 'class' || key === 'className') node.className = val;
        else if (key === 'text') node.textContent = val;
        else if (key === 'html') node.innerHTML = val;
        else if (key === 'dataset') Object.assign(node.dataset, val);
        else if (key.startsWith('on') && typeof val === 'function') {
          node.addEventListener(key.slice(2).toLowerCase(), val);
        } else if (key === 'for') node.htmlFor = val;
        else node.setAttribute(key, val === true ? '' : val);
      }
    }
    appendChildren(node, children);
    return node;
  }

  function appendChildren(node, children) {
    if (children == null) return;
    const list = Array.isArray(children) ? children : [children];
    for (const c of list) {
      if (c == null || c === false) continue;
      node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
    }
  }

  const clear = (node) => {
    while (node.firstChild) node.removeChild(node.firstChild);
    return node;
  };

  // ── Formatting ─────────────────────────────────────────────────────────────
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(iso) {
    if (!iso) return 'Unknown date';
    const [y, m, d] = iso.split('-').map(Number);
    if (!y) return iso;
    return `${MONTHS[(m || 1) - 1]} ${d || ''}`.trim() + (y ? `, ${y}` : '');
  }
  function fmtShortDate(iso) {
    if (!iso) return '—';
    const [y, m] = iso.split('-').map(Number);
    return `${MONTHS[(m || 1) - 1]} ${y}`;
  }

  const EVIDENCE_META = {
    'guideline-backed': { label: 'Guideline-backed', tone: 'sage', rank: 5 },
    'strong-outcome-evidence': { label: 'Supported by strong outcome evidence', tone: 'sage', rank: 4 },
    'associated-with-favorable-outcomes': { label: 'Associated with favorable outcomes', tone: 'blue', rank: 3 },
    'expert-consensus': { label: 'Expert consensus', tone: 'blue', rank: 2 },
    'evidence-uncertain': { label: 'Evidence uncertain', tone: 'amber', rank: 1 },
  };

  const URGENCY_META = {
    routine: { label: 'Routine', tone: 'sage', rank: 0 },
    'worth-discussing': { label: 'Worth discussing', tone: 'amber', rank: 1 },
    'prompt-clinical-review': { label: 'Prompt clinical review', tone: 'amber-strong', rank: 2 },
    urgent: { label: 'Urgent', tone: 'red', rank: 3 },
  };

  /**
   * Compute a trend from a biomarker's measurements.
   * @param {import('./types').Biomarker} bm
   * @returns {{direction: import('./types').TrendDirection, deltaText: string, meaningful: boolean, series: number[]}}
   */
  function computeTrend(bm) {
    const ms = bm.measurements;
    const series = ms.map((m) => m.value);
    if (ms.length < 2) {
      return { direction: 'insufficient-data', deltaText: 'No previous result on file', meaningful: false, series };
    }
    const first = ms[0].value;
    const last = ms[ms.length - 1].value;
    const diff = last - first;
    const pct = first !== 0 ? (diff / first) * 100 : 0;
    const meaningful = Math.abs(pct) >= 5; // simple prototype heuristic
    let direction;
    if (Math.abs(pct) < 2) direction = 'stable';
    else if (bm.directionality === 'lower-better') direction = diff < 0 ? 'improving' : 'worsening';
    else if (bm.directionality === 'higher-better') direction = diff > 0 ? 'improving' : 'worsening';
    else {
      const distance = (v) => {
        if (!bm.reference) return 0;
        if (bm.reference.low != null && v < bm.reference.low) return bm.reference.low - v;
        if (bm.reference.high != null && v > bm.reference.high) return v - bm.reference.high;
        return 0;
      };
      const firstDistance = distance(first);
      const lastDistance = distance(last);
      direction = lastDistance < firstDistance ? 'improving' : lastDistance > firstDistance ? 'worsening' : 'stable';
    }
    const sign = diff > 0 ? '+' : '';
    const sinceLabel = ms[0].date ? fmtShortDate(ms[0].date) : 'your previous result';
    const deltaText = `${sign}${round(diff)} ${bm.unit} since ${sinceLabel}`;
    return { direction, deltaText, meaningful, series };
  }

  const round = (n) => (Math.round(n * 100) / 100).toString();

  function normalizedUnit(unit) {
    return String(unit || '')
      .toLowerCase()
      .replace(/µ|μ/g, 'u')
      .replace(/²/g, '2')
      .replace(/⁹/g, '9')
      .replace(/[×x]/g, 'x')
      .replace(/\s+/g, '')
      .replace(/\^/g, '');
  }

  function unitsComparable(a, b) {
    return normalizedUnit(a) === normalizedUnit(b);
  }

  /** Whether the current value falls outside the applicable reference interval. */
  function labFlag(bm) {
    const cur = effectiveCurrent(bm);
    const r = bm.reference;
    if (!cur) return 'unknown';
    if (!r || !unitsComparable(cur.unit, r.unit)) return 'unit-mismatch';
    if (r.high != null && cur.value > r.high) return 'high';
    if (r.low != null && cur.value < r.low) return 'low';
    return 'within';
  }

  const current = (bm) => bm.measurements.find((m) => m.current) || bm.measurements[bm.measurements.length - 1];

  // ── DETERMINISTIC SAFETY LAYER ─────────────────────────────────────────────
  //
  // DEVELOPER NOTE (must read before production use):
  // This is a DEMONSTRATION rules table, not a validated clinical engine.
  // A production red-flag layer MUST:
  //   • be authored and signed off by qualified clinicians,
  //   • normalize and validate units before comparison,
  //   • account for age, sex, pregnancy, assay and clinical context,
  //   • fail safe (escalate) when data is missing or ambiguous,
  //   • be versioned, tested and auditable.
  // Urgency is decided HERE by explicit thresholds — never inferred by a
  // language model. The generative explanation layer may only *describe* the
  // level this layer assigns.
  //
  // Numeric escalation rules are intentionally sparse. A value alone rarely
  // establishes urgency, so only well-established decision points are included.
  // Symptoms and clinical context can always make a result more urgent than this
  // prototype can determine. `demo` rules only fire when demo mode is enabled.
  const SAFETY_RULES = [
    // UK Kidney Association: K+ 6.0–6.4 mmol/L needs prompt assessment;
    // K+ ≥ 6.5 mmol/L needs urgent hospital assessment.
    { ruleId: 'potassium-severe-high', biomarkerId: 'potassium', test: (v) => v >= 6.5, level: 'urgent', reason: 'Potassium ≥ 6.5 mmol/L — urgent confirmation and hospital assessment are recommended.', demo: false },
    { ruleId: 'potassium-high', biomarkerId: 'potassium', test: (v) => v >= 6.0, level: 'prompt-clinical-review', reason: 'Potassium 6.0–6.4 mmol/L — prompt confirmation and clinical assessment are recommended.', demo: false },
    // Demo-only rule: deliberately lowered so the urgent UI can be exercised on
    // the standard sample data. Clearly not a real clinical threshold.
    { ruleId: 'alt-demo-urgent', biomarkerId: 'alt', test: (v) => v >= 50, level: 'urgent', reason: 'Demo mode: threshold lowered to 50 U/L purely to illustrate the urgent alert — this is NOT a real clinical threshold for ALT.', demo: true },
    { ruleId: 'glucose-high', biomarkerId: 'glucose', test: (v) => v >= 126, level: 'prompt-clinical-review', reason: 'Fasting glucose ≥ 126 mg/dL on one sample — repeat or otherwise confirm unless symptoms and unequivocal hyperglycaemia are present.', demo: false },
    { ruleId: 'egfr-low', biomarkerId: 'egfr', test: (v) => v < 60, level: 'prompt-clinical-review', reason: 'eGFR < 60 mL/min/1.73m² — review promptly; one result does not establish chronic kidney disease.', demo: false },
    { ruleId: 'hgb-low', biomarkerId: 'hemoglobin', test: (v) => {
      const sex = B.data && B.data.profile && B.data.profile.sexForInterpretation;
      return v < (sex === 'male' ? 13 : 12);
    }, level: 'worth-discussing', reason: 'Hemoglobin below the WHO anaemia threshold for the recorded sex (or below 12 g/dL when sex is unspecified).', demo: false },
  ];

  /**
   * Classify a biomarker's urgency deterministically.
   * @returns {import('./types').SafetyClassification}
   */
  function classify(bm, demoMode) {
    const cur = effectiveCurrent(bm);
    if (!cur || !unitsComparable(cur.unit, bm.unit)) {
      return { biomarkerId: bm.id, level: 'worth-discussing', reason: 'Unit could not be safely compared with the catalog unit.', ruleId: 'unit-mismatch' };
    }
    const v = cur.value;
    let best = {
      biomarkerId: bm.id,
      level: 'routine',
      reason: 'No demonstration urgency rule was triggered; this is not a clinical clearance.',
      ruleId: 'default',
    };
    for (const rule of SAFETY_RULES) {
      if (rule.biomarkerId !== bm.id) continue;
      if (rule.demo && !demoMode) continue;
      if (rule.test(v) && URGENCY_META[rule.level].rank > URGENCY_META[best.level].rank) {
        best = { biomarkerId: bm.id, level: rule.level, reason: rule.reason, ruleId: rule.ruleId };
      }
    }
    return best;
  }

  /** The single highest urgency across all markers. */
  function overallUrgency(demoMode) {
    let top = { level: 'routine', reason: '', biomarkerId: null };
    for (const bm of B.data.biomarkers) {
      const c = classify(bm, demoMode);
      if (URGENCY_META[c.level].rank > URGENCY_META[top.level].rank) top = c;
    }
    return top;
  }

  // ── State + persistence ────────────────────────────────────────────────────
  const STORAGE_KEY = 'baseline.session.v1';
  const defaultState = () => ({
    stage: 'landing', // landing | uploading | processing | extraction | app
    demoMode: false,
    // The active report. null / {mode:'demo'} => curated Generic Patient sample.
    // {mode:'user', measurements:{id:[...]}, order:[...], name, sex, age, fasting,
    //  collectionDate, context, therapies} => the user's own typed/parsed values.
    report: null,
    corrections: {}, // biomarkerId -> { value, unit }
    actionStatus: {}, // actionId -> status
    dismissedActions: [], // actionIds removed from plan
    consented: false,
  });

  // Begin a fresh report, clearing any prior corrections/plan so nothing leaks
  // between a demo and a user's real data.
  function startReport(report) {
    setState({ report: report, corrections: {}, actionStatus: {}, dismissedActions: [] });
  }

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) {
      /* ignore — prototype only */
    }
    return defaultState();
  }

  function save() {
    // NOTE: only non-identifying UI state + user corrections are stored locally.
    // No blood values are logged to the console and nothing leaves the browser.
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage may be unavailable; prototype continues in-memory */
    }
  }

  function setState(patch) {
    Object.assign(state, patch);
    save();
    B.emit('statechange', state);
  }

  function resetAll() {
    state = defaultState();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
    B.emit('statechange', state);
  }

  // Apply any user correction on top of the dataset's current measurement.
  function effectiveCurrent(bm) {
    const cur = current(bm);
    const corr = state.corrections[bm.id];
    if (!corr) return cur;
    return Object.assign({}, cur, { value: corr.value, unit: corr.unit || cur.unit, corrected: true });
  }

  // ── Tiny event bus ─────────────────────────────────────────────────────────
  const listeners = {};
  B.on = (name, fn) => {
    (listeners[name] = listeners[name] || []).push(fn);
  };
  B.emit = (name, payload) => {
    (listeners[name] || []).forEach((fn) => fn(payload));
  };

  // ── Hash router ────────────────────────────────────────────────────────────
  const routes = {};
  function route(path, render) {
    routes[path] = render;
  }
  function currentRoute() {
    const hash = location.hash.replace(/^#\/?/, '');
    const [path, ...rest] = hash.split('/');
    return { path: path || 'overview', param: rest.join('/') };
  }
  function navigate(to) {
    if (('#/' + to) === location.hash) B.emit('routechange', currentRoute());
    else location.hash = '/' + to;
  }
  function startRouter(onChange) {
    window.addEventListener('hashchange', () => onChange(currentRoute()));
    onChange(currentRoute());
  }

  // Motion preference
  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  B.lib = {
    el,
    clear,
    appendChildren,
    fmtDate,
    fmtShortDate,
    round,
    computeTrend,
    unitsComparable,
    labFlag,
    current,
    effectiveCurrent,
    classify,
    overallUrgency,
    EVIDENCE_META,
    URGENCY_META,
    prefersReducedMotion,
    // state
    get state() {
      return state;
    },
    setState,
    startReport,
    resetAll,
    // router
    route,
    routes,
    currentRoute,
    navigate,
    startRouter,
  };
})(window.Baseline);
