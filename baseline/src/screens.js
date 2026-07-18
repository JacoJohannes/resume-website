/**
 * Baseline — Screens (compositions of components) and the upload/extraction flow.
 */
(function (B) {
  'use strict';
  const { el, clear, fmtDate, fmtShortDate } = B.lib;
  const C = B.components;
  const icon = C.icon;
  const localISODate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Shared helper: section heading with a numbered pip
  const sectionLabel = (n, text) =>
    el('div', { class: 'section-label' }, [n ? el('span', { class: 'n', text: n }) : null, text]);

  const toast = (msg) => {
    let t = document.querySelector('.toast');
    if (!t) {
      t = el('div', { class: 'toast', role: 'status', 'aria-live': 'polite' });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2600);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // UPLOAD FLOW (landing → uploading → processing)
  // ═══════════════════════════════════════════════════════════════════════════
  function UploadFlow() {
    const wrap = el('div', { class: 'stack-lg fade-in' });

    const hero = el('div', { class: 'hero' }, [
      el('div', { class: 'brand hero-brand', style: 'justify-content:center;margin-bottom:.5rem' }, [
        el('img', { class: 'brand-lockup', src: './labreview-wordmark-v2.png', alt: 'LabReview' }),
      ]),
      el('h1', { text: 'Know what matters—and what to ask next.' }),
      el('p', { class: 'lead', text: 'Upload a routine lab report and LabReview turns it into clear context, thoughtful follow-up questions, and a concise summary for your next healthcare appointment.' }),
    ]);

    // Drag-and-drop zone
    const fileInput = el('input', { type: 'file', accept: '.pdf,image/*', class: 'visually-hidden', id: 'file-input',
      onChange: (e) => { if (e.target.files && e.target.files[0]) handleRealFile(e.target.files[0]); },
    });
    const dz = el('div', {
      class: 'dropzone', role: 'button', tabindex: '0', 'aria-label': 'Upload a bloodwork report by choosing a file or dragging it here',
      onClick: () => fileInput.click(),
      onKeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); } },
      onDragover: (e) => { e.preventDefault(); dz.classList.add('drag'); },
      onDragleave: () => dz.classList.remove('drag'),
      onDrop: (e) => { e.preventDefault(); dz.classList.remove('drag'); const f = e.dataTransfer.files[0]; if (f) handleRealFile(f); },
    }, [
      icon('upload', 30),
      el('p', { style: 'margin:.6rem 0 .1rem;font-weight:600', text: 'Drop your lab PDF here to read your own results' }),
      el('p', { class: 'muted small', text: 'or click to choose a file · read locally, never uploaded' }),
      fileInput,
    ]);

    const manualBtn = el('button', { class: 'btn secondary', onClick: () => { location.hash = '/manual'; } }, [icon('list', 18), 'Enter results manually']);
    const demoBtn = el('button', { class: 'btn ghost', onClick: () => beginDemo() }, [icon('file', 18), 'See a demo report first']);

    const actionsRow = el('div', { style: 'display:flex;flex-direction:column;gap:.6rem;align-items:center' }, [
      manualBtn,
      demoBtn,
      el('p', { class: 'muted small', style: 'margin-top:.4rem;text-align:center' }, ['No account needed. Everything stays in your browser — ', el('a', { href: '#/privacy', text: 'see how privacy works' }), '.']),
    ]);

    wrap.append(hero, dz, el('div', { style: 'text-align:center' }, [el('span', { class: 'muted small', text: 'or' })]), actionsRow);
    wrap.appendChild(
      C.SafetyNotice('info',
        el('span', {}, [el('b', { text: 'Educational decision support, not a diagnosis. ' }), 'LabReview never tells you to start, stop, or change a medication. Always confirm with a qualified clinician.']),
        { ico: 'shield' })
    );
    return wrap;
  }

  // DEMO path. PROTOTYPE LOGIC — the demo does not read a document; it loads the
  // curated Generic Patient sample so the whole experience can be explored.
  function beginDemo() {
    B.lib.startReport({ mode: 'demo' });
    B.lib.setState({ stage: 'uploading', uploadFile: 'generic-patient-panel-2026-06-18.pdf' });
    B.mount(UploadingState('generic-patient-panel-2026-06-18.pdf'));
    runProgress(() => runProcessing());
  }

  // REAL path. The chosen file is read LOCALLY (never uploaded) and parsed offline
  // by src/parse.js. Whatever is found must still be confirmed by the user.
  function handleRealFile(file) {
    B.lib.setState({ stage: 'uploading', uploadFile: file.name });
    B.mount(UploadingState(file.name, 'Reading locally…'));
    runProgress(async () => {
      let result;
      try {
        result = await B.parse.parseFile(file);
      } catch (e) {
        result = { ok: false, reason: 'parse-error' };
      }
      if (result.ok) {
        const measurements = {};
        const order = [];
        result.candidates.forEach((c) => {
          measurements[c.id] = [{ date: '', value: c.value, unit: c.unit, current: true, confidence: c.confidence }];
          order.push(c.id);
        });
        B.lib.startReport({ mode: 'user', source: 'parsed', name: '', measurements: measurements, order: order, collectionDate: '' });
        B.lib.setState({ stage: 'extraction' });
        B.render();
        toast(`Read ${order.length} result${order.length === 1 ? '' : 's'} — please confirm`);
      } else {
        B.lib.setState({ stage: 'parse-failed', parseReason: result.reason });
        B.render();
      }
    });
  }

  function runProgress(done) {
    let pct = 0;
    const bar = document.getElementById('up-bar');
    const tick = setInterval(() => {
      pct = Math.min(100, pct + 16 + Math.random() * 14);
      if (bar) bar.style.width = pct + '%';
      if (pct >= 100) {
        clearInterval(tick);
        setTimeout(done, 300);
      }
    }, 160);
  }

  // Shown when local parsing can't reliably read the file.
  function ParseFailed() {
    const reason = B.lib.state.parseReason;
    const msgs = {
      image: 'That looks like a photo or image. LabReview’s offline reader can only read text-based PDFs, not scanned images.',
      'image-pdf': 'This PDF appears to be a scan (image only), so there’s no selectable text to read offline.',
      'no-text': 'No readable text was found in this PDF. It may be a scan or use an unusual format.',
      'no-markers': 'The PDF was read, but none of the biomarkers LabReview understands were recognised. Layouts vary a lot.',
      unsupported: 'That file type isn’t supported. Please choose a PDF.',
      'read-error': 'The file couldn’t be read. It may be corrupted or password-protected.',
      'parse-error': 'Something went wrong reading that file.',
    };
    return el('div', { class: 'stack-lg fade-in', style: 'padding-top:1.5rem' }, [
      el('div', {}, [el('div', { class: 'eyebrow', text: 'Couldn’t read that file' }), el('h1', { style: 'margin-top:.3rem', text: 'Let’s try another way' })]),
      C.SafetyNotice('amber', msgs[reason] || msgs['parse-error']),
      el('p', { class: 'muted small', text: 'Your file was read on your device and has now been discarded — nothing was uploaded. The most reliable option is to type your values in directly.' }),
      el('div', { style: 'display:flex;flex-direction:column;gap:.6rem;align-items:stretch;max-width:22rem' }, [
        el('button', { class: 'btn', onClick: () => { location.hash = '/manual'; } }, [icon('list', 18), 'Enter results manually']),
        el('button', { class: 'btn secondary', onClick: () => { B.lib.setState({ stage: 'landing' }); B.render(); } }, 'Try a different file'),
        el('button', { class: 'btn ghost', onClick: () => beginDemo() }, 'See the demo instead'),
      ]),
    ]);
  }

  function UploadingState(filename, statusLabel) {
    return el('div', { class: 'stack fade-in', style: 'padding-top:2rem' }, [
      el('div', { class: 'card stack' }, [
        el('div', { style: 'display:flex;gap:.6rem;align-items:center' }, [icon('file', 22), el('div', {}, [el('b', { text: filename }), el('div', { class: 'muted small', text: statusLabel || 'Loading…' })])]),
        el('div', { class: 'progress' }, [el('div', { class: 'bar', id: 'up-bar' })]),
      ]),
    ]);
  }

  function runProcessing() {
    B.lib.setState({ stage: 'processing' });
    const steps = ['Reading the document', 'Finding result tables', 'Normalizing units', 'Matching to known biomarkers', 'Preparing a review'];
    const list = el('ol', { class: 'processing-steps' }, steps.map((s) =>
      el('li', {}, [
        el('span', { class: 'processing-step-icon', 'aria-hidden': 'true' }),
        el('span', { text: s }),
      ])
    ));
    B.mount(el('div', { class: 'stack fade-in', style: 'padding-top:2rem' }, [
      el('div', { class: 'card' }, [
        el('div', { class: 'eyebrow', text: 'Processing' }),
        el('h2', { style: 'margin:.3rem 0 .2rem', text: 'Organizing your results' }),
        el('p', { class: 'muted small', text: 'This demo loads carefully prepared sample data — no medical document is actually read (see the README).' }),
        list,
      ]),
    ]));
    const items = list.querySelectorAll('li');
    let i = 0;
    const adv = setInterval(() => {
      items.forEach((li, idx) => {
        const isDone = idx < i;
        li.classList.toggle('active', idx === i);
        li.classList.toggle('done', isDone);
        const statusIcon = li.querySelector('.processing-step-icon');
        if (isDone && statusIcon && !statusIcon.firstChild) statusIcon.appendChild(icon('check', 16));
      });
      i++;
      if (i > items.length) {
        clearInterval(adv);
        B.lib.setState({ stage: 'extraction' });
        B.render();
      }
    }, 480);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EXTRACTION REVIEW (confirm + correct extracted values, uncertainty state)
  // ═══════════════════════════════════════════════════════════════════════════
  function ExtractionReview() {
    const p = B.data.profile;
    const rep = B.lib.state.report || {};
    const isParsed = rep.mode === 'user' && rep.source === 'parsed';
    const wrap = el('div', { class: 'stack-lg fade-in' });
    wrap.appendChild(el('div', {}, [
      el('div', { class: 'eyebrow', text: isParsed ? 'Confirm what we read from your PDF' : 'Step 1 of 2 · Review' }),
      el('h1', { style: 'margin-top:.3rem', text: isParsed ? 'Check these against your report' : 'Check what we extracted' }),
      el('p', { class: 'muted', text: 'Extraction can make mistakes. Confirm each value and unit against your original report — edit or remove anything that looks wrong. LabReview does not reliably extract the printed reference range, so add its low/high limits while editing a result when available.' }),
    ]));

    // report details
    if (isParsed) {
      const dateInput = el('input', { type: 'date', value: rep.collectionDate || '', 'aria-label': 'Collection date', onChange: (e) => setParsedContext('collectionDate', e.target.value) });
      const ageInput = el('input', { type: 'number', min: '18', max: '120', value: rep.age || '', placeholder: 'optional', 'aria-label': 'Age', onChange: (e) => setParsedContext('age', parseInt(e.target.value, 10) || null) });
      const sexInput = el('select', { 'aria-label': 'Sex used for reference ranges', onChange: (e) => setParsedContext('sex', e.target.value) }, [
        el('option', { value: '', text: 'Not specified' }),
        el('option', { value: 'female', text: 'Female' }),
        el('option', { value: 'male', text: 'Male' }),
      ]);
      sexInput.value = rep.sex || '';
      const fastingInput = el('input', { type: 'checkbox', checked: rep.fasting ? true : null, style: 'width:auto', 'aria-label': 'Fasting sample', onChange: (e) => setParsedContext('fasting', e.target.checked) });
      wrap.appendChild(el('div', { class: 'card' }, [
        sectionLabel(null, 'Report details'),
        el('p', { class: 'muted small', style: 'margin:.4rem 0 .7rem', text: 'Read locally from your PDF. These details were not inferred. Add them when known so dates, fasting-sensitive markers and sex-specific fallback ranges are labelled correctly.' }),
        el('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:.75rem' }, [
          el('div', { class: 'field' }, [el('label', { text: 'Collection date' }), dateInput]),
          el('div', { class: 'field' }, [el('label', { text: 'Age' }), ageInput]),
          el('div', { class: 'field' }, [el('label', { text: 'Sex for ranges' }), sexInput]),
          el('div', { class: 'field' }, [el('label', { text: 'Fasting' }), el('div', { style: 'display:flex;align-items:center;gap:.4rem;height:40px' }, [fastingInput, el('span', { class: 'muted small', text: 'Yes' })])]),
        ]),
        el('p', { class: 'muted small', style: 'margin:.7rem 0 0', text: 'This file and these details remain in this browser.' }),
      ]));
    } else {
      wrap.appendChild(el('div', { class: 'card' }, [
        sectionLabel(null, 'Report details'),
        el('div', { class: 'report-detail-grid' }, [
          el('div', { class: 'report-detail-item' }, [
            el('span', { class: 'report-detail-label', text: 'Patient' }),
            el('strong', { text: p.name }),
          ]),
          el('div', { class: 'report-detail-item' }, [
            el('span', { class: 'report-detail-label', text: 'Interpretation context' }),
            el('strong', { text: `Age ${p.age} · ${p.sexForInterpretation}` }),
          ]),
          el('div', { class: 'report-detail-item' }, [
            el('span', { class: 'report-detail-label', text: 'Sample' }),
            el('strong', { text: fmtDate(p.collectionDate) }),
          ]),
        ]),
      ]));
    }

    const bms = B.data.biomarkers;
    const rowsCard = el('div', { class: 'card' }, [sectionLabel(null, `Results to confirm (${bms.length})`)]);
    bms.forEach((bm) => {
      const cur = B.lib.effectiveCurrent(bm);
      // Demo: illustrate an EXTRACTION-UNCERTAINTY state on ALT. Parsed: use the
      // parser's own per-value confidence.
      const lowConf = isParsed ? cur.confidence === 'medium' : bm.id === 'alt';
      const row = el('div', { class: 'extract-row' + (lowConf ? ' uncertain' : '') });
      const label = el('div', {}, [
        el('div', { style: 'font-weight:600' }, [bm.name, lowConf ? el('span', { class: 'chip amber', style: 'margin-left:.5rem', text: isParsed ? 'check this' : 'low confidence' }) : null]),
        el('div', { class: 'muted small', text: bm.category.replace(/-/g, ' ') }),
      ]);
      const valView = el('div', { class: 'val' }, [el('b', { text: String(cur.value) }), el('span', { class: 'muted', text: cur.unit })]);
      const editBtn = el('button', { class: 'btn ghost small', 'aria-expanded': 'false', onClick: () => toggleEdit(row, bm) }, ['Edit']);
      const controls = [valView, editBtn];
      if (isParsed) controls.push(el('button', { class: 'iconbtn', 'aria-label': `Remove ${bm.name}`, title: 'Remove this result', onClick: () => removeMarker(bm.id) }, [icon('x', 16)]));
      const right = el('div', { style: 'display:flex;align-items:center;gap:.35rem' }, controls);
      row.append(label, right);
      row._valView = valView;
      rowsCard.appendChild(row);
    });
    wrap.appendChild(rowsCard);

    if (isParsed) {
      wrap.appendChild(C.SafetyNotice('amber', 'These values were read automatically and may be misread. Check each value and unit. Unless you enter the printed low/high limits under “Edit,” interpretation uses a clearly labelled illustrative catalog range. Missing a marker? You can add it by hand.', { ico: 'info' }));
      wrap.appendChild(el('button', { class: 'btn ghost small', onClick: () => { location.hash = '/manual'; }, style: 'align-self:flex-start' }, [icon('plus', 16), 'Add a marker by hand']));
    } else {
      wrap.appendChild(C.SafetyNotice('amber', 'The demo flags ALT to illustrate how an uncertain extraction would be surfaced for confirmation.', { ico: 'info' }));
    }

    const actions = el('div', { style: 'display:flex;gap:.6rem;flex-wrap:wrap' }, [
      el('button', { class: 'btn', onClick: () => { B.lib.setState({ stage: 'app' }); location.hash = '/overview'; B.render(); toast('Results confirmed'); } }, [icon('check', 18), 'Looks right — interpret my results']),
      el('button', { class: 'btn secondary', onClick: () => { if (confirm('Discard this report and start over?')) { B.lib.resetAll(); location.hash = ''; B.render(); } } }, 'Start over'),
    ]);
    wrap.appendChild(actions);
    return wrap;
  }

  // Remove a parsed marker the user says was mis-detected.
  function setParsedContext(field, value) {
    const rep = Object.assign({}, B.lib.state.report || {});
    rep[field] = value;
    B.lib.setState({ report: rep });
  }

  function removeMarker(id) {
    const rep = Object.assign({}, B.lib.state.report);
    rep.measurements = Object.assign({}, rep.measurements);
    delete rep.measurements[id];
    rep.order = (rep.order || []).filter((x) => x !== id);
    if (!rep.order.length) { B.lib.resetAll(); location.hash = ''; B.render(); toast('All results removed'); return; }
    B.lib.setState({ report: rep });
    B.render();
    toast('Removed');
  }

  function toggleEdit(row, bm) {
    const existing = row.nextSibling && row.nextSibling.classList && row.nextSibling.classList.contains('extract-edit-wrap') ? row.nextSibling : null;
    const btn = row.querySelector('button');
    if (existing) { existing.remove(); btn.setAttribute('aria-expanded', 'false'); return; }
    btn.setAttribute('aria-expanded', 'true');
    const cur = B.lib.effectiveCurrent(bm);
    const valId = 'edit-val-' + bm.id;
    const unitId = 'edit-unit-' + bm.id;
    const lowId = 'edit-low-' + bm.id;
    const highId = 'edit-high-' + bm.id;
    const valInput = el('input', { type: 'number', step: 'any', id: valId, value: String(cur.value), 'aria-label': `${bm.name} value` });
    const unitInput = el('input', { type: 'text', id: unitId, value: cur.unit, 'aria-label': `${bm.name} unit` });
    const lowInput = el('input', { type: 'number', step: 'any', id: lowId, value: bm.reference.source === 'report' && bm.reference.low != null ? String(bm.reference.low) : '', placeholder: 'optional', 'aria-label': `${bm.name} report reference low limit` });
    const highInput = el('input', { type: 'number', step: 'any', id: highId, value: bm.reference.source === 'report' && bm.reference.high != null ? String(bm.reference.high) : '', placeholder: 'optional', 'aria-label': `${bm.name} report reference high limit` });
    const editWrap = el('div', { class: 'extract-edit-wrap', style: 'padding:.2rem 0 .8rem' }, [
      el('div', { class: 'extract-edit' }, [
        el('div', { class: 'field' }, [el('label', { for: valId, text: 'Value' }), valInput]),
        el('div', { class: 'field' }, [el('label', { for: unitId, text: 'Unit' }), unitInput]),
        el('div', { class: 'field' }, [el('label', { for: lowId, text: 'Report low' }), lowInput]),
        el('div', { class: 'field' }, [el('label', { for: highId, text: 'Report high' }), highInput]),
        el('button', { class: 'btn small', onClick: () => {
          const v = parseFloat(valInput.value);
          if (isNaN(v)) { valInput.focus(); return; }
          const unit = unitInput.value.trim() || cur.unit;
          const low = parseFloat(lowInput.value);
          const high = parseFloat(highInput.value);
          if (isFinite(low) && isFinite(high) && low >= high) { lowInput.focus(); toast('Reference low must be below reference high'); return; }
          const rep = B.lib.state.report;
          if (rep && rep.mode === 'user') {
            // Correct directly in the user's report so the change is authoritative.
            const r = Object.assign({}, rep); r.measurements = Object.assign({}, rep.measurements);
            const arr = (r.measurements[bm.id] || []).slice();
            const last = Object.assign({}, arr[arr.length - 1], { value: v, unit: unit, confidence: 'high' });
            arr[arr.length - 1] = last; r.measurements[bm.id] = arr;
            r.references = Object.assign({}, rep.references || {});
            if (isFinite(low) || isFinite(high)) {
              r.references[bm.id] = {
                low: isFinite(low) ? low : undefined,
                high: isFinite(high) ? high : undefined,
                unit,
                labName: 'Your uploaded report',
                source: 'report',
                note: 'Confirmed by you from the interval printed on your report.',
              };
            } else {
              delete r.references[bm.id];
            }
            B.lib.setState({ report: r });
          } else {
            const corrections = Object.assign({}, B.lib.state.corrections);
            corrections[bm.id] = { value: v, unit: unit };
            B.lib.setState({ corrections });
          }
          const nv = B.lib.effectiveCurrent(bm);
          clear(row._valView); row._valView.append(el('b', { text: String(nv.value) }), el('span', { class: 'muted', text: nv.unit }));
          editWrap.remove(); btn.setAttribute('aria-expanded', 'false');
          if (row.classList.contains('uncertain')) { row.classList.remove('uncertain'); const chip = row.querySelector('.chip.amber'); if (chip) chip.remove(); }
          toast(`${bm.shortName} updated`);
        } }, 'Save'),
      ]),
    ]);
    row.after(editWrap);
    valInput.focus();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // OVERVIEW (opening summary + exactly three priorities)
  // ═══════════════════════════════════════════════════════════════════════════
  function Overview() {
    const wrap = el('div', { class: 'stack-lg fade-in' });
    const urgency = B.lib.overallUrgency(B.lib.state.demoMode);

    if (urgency.level === 'urgent' || urgency.level === 'prompt-clinical-review') {
      // Deterministic safety layer speaks FIRST and is never hidden.
      const bm = B.data.biomarker(urgency.biomarkerId);
      wrap.appendChild(UrgentBanner(urgency, bm));
    }

    const rep = B.lib.state.report || {};
    const isUser = rep.mode === 'user';
    const priorities = B.data.priorities;
    const total = B.data.biomarkers.length;

    // Opening summary — calm, and honest about the actual count.
    let leadChildren;
    if (isUser) {
      if (priorities.length === 0) {
        leadChildren = ['Everything you entered looks within range and unremarkable. ', el('b', { text: 'Nothing stands out for attention right now.' })];
      } else {
        const n = priorities.length;
        const word = n === 1 ? 'one area is' : `${n === 2 ? 'Two' : n === 3 ? 'Three' : n} areas are`;
        const settled = total - n;
        leadChildren = [settled > 0 ? `Most of your results look unremarkable. ` : '', el('b', { text: `${n === 1 ? 'One area is' : word} worth a closer look.` })];
      }
    } else {
      leadChildren = ['Most of your results are stable. ', el('b', { text: 'Three areas are worth paying attention to.' })];
    }

    wrap.appendChild(el('div', {}, [
      el('div', { class: 'eyebrow', text: isUser ? (rep.source === 'parsed' ? 'Your results · read from your PDF' : 'Your results · entered by you') : `Overview · ${fmtDate(B.data.profile.collectionDate)}` }),
      el('p', { class: 'lead', style: 'margin-top:.5rem' }, leadChildren),
      el('p', { class: 'muted small', text: 'Take them one at a time. Nothing here is a diagnosis.' }),
    ]));

    const list = el('div', { class: 'stack' });
    priorities.forEach((p, i) => list.appendChild(C.PrioritySummary(p, i)));
    wrap.appendChild(list);

    wrap.appendChild(el('div', { style: 'text-align:center;padding-top:.5rem' }, [
      el('a', { href: '#/results', class: 'btn ghost small' }, [icon('list', 16), `See all ${total} result${total === 1 ? '' : 's'}`]),
    ]));

    if (isUser) {
      wrap.appendChild(C.SafetyNotice('info', el('span', {}, [el('b', { text: 'These are your own values. ' }), 'LabReview organizes and explains them but does not diagnose. Please review anything flagged with a clinician.']), { ico: 'shield' }));
    }
    return wrap;
  }

  function UrgentBanner(urgency, bm) {
    const isUrgent = urgency.level === 'urgent';
    return el('div', { class: `notice ${isUrgent ? 'red' : 'amber'} strong`, role: 'alert', style: 'flex-direction:column;align-items:stretch' }, [
      el('div', { style: 'display:flex;gap:.6rem;align-items:center' }, [
        icon('alert', 22),
        el('b', { text: isUrgent ? 'Please seek professional care promptly' : 'This result may warrant prompt clinical review' }),
      ]),
      el('p', { style: 'margin:.5rem 0 0' }, [
        isUrgent
          ? 'A result in this report reached a threshold our safety checks treat as urgent. This is more important than any explanation on this screen — please contact a clinician or urgent care now. If you feel unwell, seek emergency care.'
          : 'A result reached a threshold worth reviewing with a clinician soon.',
      ]),
      bm ? el('p', { class: 'small', style: 'margin:.4rem 0 0;opacity:.85', text: `Triggered by a deterministic rule: ${urgency.reason}` }) : null,
    ]);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIORITY VIEW (single priority at a time) → BiomarkerDetail
  // ═══════════════════════════════════════════════════════════════════════════
  function PriorityView(index) {
    index = Math.max(0, Math.min(B.data.priorities.length - 1, index | 0));
    const p = B.data.priorities[index];
    const bm = B.data.biomarker(p.biomarkerIds[0]);
    const wrap = el('div', { class: 'fade-in' });
    wrap.appendChild(el('div', { class: 'detail-nav' }, [
      el('a', { href: '#/overview', class: 'back-link' }, [icon('arrowLeft', 16), 'Overview']),
      el('span', { class: 'muted small', text: `Priority ${index + 1} of ${B.data.priorities.length}` }),
    ]));
    wrap.appendChild(C.PriorityNavigator(index, B.data.priorities.length));
    wrap.appendChild(BiomarkerDetail(bm, { cluster: p.biomarkerIds }));
    return wrap;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // BIOMARKER DETAIL (sections A–G)
  // ═══════════════════════════════════════════════════════════════════════════
  function guidanceList(items) {
    return el('ul', { class: 'guidance-list' }, (items || []).map((item) => el('li', { text: item })));
  }

  function guidancePanel(title, items, tone, open) {
    return el('details', { class: `guidance-panel ${tone || ''}`, open: open ? true : null }, [
      el('summary', {}, [el('span', { text: title }), icon('arrow', 16, { class: 'caret' })]),
      el('div', { class: 'guidance-body' }, [guidanceList(items)]),
    ]);
  }

  function AbnormalReadingGuide(bm, flag) {
    const g = bm.guidance;
    if (!g) return null;
    const sourceDetails = el('details', { class: 'guidance-sources' }, [
      el('summary', { text: `Research sources (${g.evidenceIds.length})` }),
      el('div', { class: 'stack-sm', style: 'margin-top:.7rem' }, g.evidenceIds.map((id) => C.EvidenceSource(id))),
    ]);
    return el('section', { class: 'card stack-sm' }, [
      sectionLabel('D', 'What may cause an abnormal reading'),
      el('p', { class: 'muted small', style: 'margin:0', text: 'These are possibilities, not a diagnosis. The pattern across related tests, symptoms, medicines and repeat results narrows the cause.' }),
      el('div', { class: 'guidance-cause-grid' }, [
        guidancePanel('If the result is high', g.highCauses, 'high', flag === 'high'),
        guidancePanel('If the result is low', g.lowCauses, 'low', flag === 'low'),
      ]),
      el('details', { class: 'guidance-sources' }, [
        el('summary', { text: 'Other factors that can shift or distort this result' }),
        el('div', { style: 'margin-top:.7rem' }, [C.InfluenceList(bm, { generic: !!bm.userMode })]),
      ]),
      sourceDetails,
    ]);
  }

  function directionAdvicePanel(title, advice, tone, active) {
    return el('article', { class: `direction-advice ${tone}${active ? ' active' : ''}` }, [
      el('div', { class: 'direction-advice-head' }, [
        el('h3', { text: title }),
        active ? el('span', { class: 'chip neutral', text: 'Applies to this result' }) : null,
      ]),
      el('p', { class: 'direction-aim', text: advice.aim }),
      el('h4', { text: 'Lifestyle and daily habits' }),
      guidanceList(advice.lifestyle),
      el('h4', { text: 'Clinician-managed options' }),
      guidanceList(advice.clinical),
    ]);
  }

  function ImprovementGuide(bm, flag) {
    const g = bm.guidance;
    const directional = g && g.directional;
    if (!directional || !directional.high || !directional.low) return null;
    return el('section', { class: 'card stack-sm' }, [
      sectionLabel('E', 'Practical ways to lower or raise this reading'),
      el('p', { class: 'muted small', style: 'margin:0', text: 'High and low results require different actions. Use the relevant pathway only after confirming the result and likely cause; some readings should not be deliberately changed.' }),
      el('div', { class: 'directional-guidance-grid' }, [
        directionAdvicePanel('If the result is high', directional.high, 'high', flag === 'high'),
        directionAdvicePanel('If the result is low', directional.low, 'low', flag === 'low'),
      ]),
      C.SafetyNotice('amber', 'Medication choices are diagnosis-, risk- and context-specific. Never start, stop or change a dose from this page.', { ico: 'shield' }),
      el('div', { class: 'follow-up-box' }, [
        el('b', { text: 'How clinicians usually follow up' }),
        el('p', { style: 'margin:.3rem 0 0', text: g.followUp }),
      ]),
      C.SafetyNotice('info', g.safety, { ico: 'info' }),
    ]);
  }

  /** @param {import('./types').Biomarker} bm */
  function BiomarkerDetail(bm, opts) {
    opts = opts || {};
    const userMode = !!bm.userMode;
    const cur = B.lib.effectiveCurrent(bm);
    const t = B.lib.computeTrend(bm);
    const flag = B.lib.labFlag(bm);
    const wrap = el('div', { class: 'stack-lg' });

    // hero
    wrap.appendChild(el('div', { class: 'detail-hero' }, [
      el('div', { class: 'eyebrow', text: bm.category.replace(/-/g, ' ') }),
      el('h1', { style: 'margin:.2rem 0', text: bm.name }),
      el('div', {}, [el('span', { class: 'val-big', text: String(cur.value) }), ' ', el('span', { class: 'unit', text: cur.unit })]),
      el('div', { class: 'muted small', style: 'margin-top:.3rem', text: `${cur.date ? fmtDate(cur.date) : 'Date not recorded'}${cur.fasting ? ' · fasting' : ''}${cur.corrected ? ' · edited by you' : ''}` }),
    ]));

    // A. Plain-language meaning
    wrap.appendChild(el('section', { class: 'card stack-sm' }, [
      sectionLabel('A', 'What this means'),
      el('p', { style: 'margin:0', text: bm.meaning }),
    ]));

    // B. Your pattern
    const patternChildren = [sectionLabel('B', 'Your pattern')];
    patternChildren.push(C.TrendVisualization(bm, { width: 140 }));
    // Demo uses the marker's curated note; user data gets a generic, value-driven
    // sentence (never the demo subject's specific numbers).
    if (userMode) {
      const where = flag === 'within' ? 'within' : flag === 'high' ? 'above' : flag === 'low' ? 'below' : 'not safely comparable with';
      const trendPhrase = t.direction === 'improving' ? ', and improving versus your previous result' : t.direction === 'worsening' ? ', and further from range than your previous result' : t.series.length < 2 ? ' (no previous value entered, so there is no trend yet)' : ', and about the same as before';
      const comparisonText = flag === 'unit-mismatch'
        ? `Your ${bm.shortName} is ${cur.value} ${cur.unit}. The available reference uses ${bm.reference.unit}, so LabReview has not compared or converted it. Confirm the unit against the original report.`
        : `Your ${bm.shortName} is ${cur.value} ${cur.unit} — ${where} the ${bm.reference.source === 'report' ? 'report' : 'illustrative catalog'} reference range${trendPhrase}. A single result is a signal to review in context, not a diagnosis.`;
      patternChildren.push(el('p', { style: 'margin:.6rem 0 0', text: comparisonText }));
    } else if (bm.patternNote) {
      patternChildren.push(el('p', { style: 'margin:.6rem 0 0', text: bm.patternNote }));
    }
    // Related results — only link to markers that exist in this report.
    const related = (bm.related || []).filter((rid) => B.data.hasMarker(rid));
    if (related.length) {
      patternChildren.push(el('div', { style: 'margin-top:.6rem' }, [
        el('span', { class: 'muted small', text: 'Related results: ' }),
        ...related.map((rid) => { const r = B.data.biomarker(rid); return r ? el('a', { href: '#/marker/' + rid, class: 'chip neutral', style: 'text-decoration:none;margin-right:.35rem', text: r.shortName }) : null; }),
      ]));
    }
    if (userMode) {
      patternChildren.push(C.SafetyNotice('info', el('span', {}, [el('b', { text: 'Limits: ' }), 'This is read on its own here. Your history, related results and a repeat measurement all help interpret it — a clinician can weigh those together.'])));
    } else if (bm.missingContext) {
      patternChildren.push(C.SafetyNotice('info', el('span', {}, [el('b', { text: 'Limits: ' }), bm.missingContext])));
    }
    wrap.appendChild(el('section', { class: 'card stack-sm' }, patternChildren));

    // C. Range explanation (text-first contextual model; no chart).
    wrap.appendChild(el('section', { class: 'card' }, [
      sectionLabel('C', 'Reference, recommended & favorable ranges'),
      C.RangeComparison(bm),
    ]));

    // D–E. Causes and cause-specific improvement options
    const abnormalGuide = AbnormalReadingGuide(bm, flag);
    if (abnormalGuide) wrap.appendChild(abnormalGuide);
    const improvementGuide = ImprovementGuide(bm, flag);
    if (improvementGuide) wrap.appendChild(improvementGuide);

    // medication relevance / timeline when a monitored therapy exists
    const relatedTherapy = B.data.profile.therapies.find((th) => (th.monitors || []).includes(bm.id));
    if (relatedTherapy) {
      wrap.appendChild(el('section', { class: 'card stack-sm' }, [
        sectionLabel(null, 'Medication & testing timeline'),
        el('p', { class: 'muted small', style: 'margin:0', text: `A therapy on file (${relatedTherapy.name}) may relate to this marker or is sometimes monitored during treatment.` }),
        C.MedicationTimeline(B.data.profile, bm),
      ]));
    }

    // F. Practical next steps
    if (bm.actions && bm.actions.length) {
      const stepsWrap = el('section', { class: 'card stack-sm' }, [
        sectionLabel('F', 'Practical next steps'),
        el('p', { class: 'muted small', style: 'margin:0', text: 'A few specific, measurable options — add any to your plan.' }),
      ]);
      bm.actions.slice(0, 3).forEach((a) => stepsWrap.appendChild(ActionCard(a, { compact: true })));
      wrap.appendChild(stepsWrap);
    }

    // G. Questions for your clinician
    let questions;
    if (userMode) {
      questions = [];
      if (bm.clinical) questions.push(`Given my overall risk, what ${bm.shortName} target is appropriate for me?`);
      if (flag !== 'within' || t.direction === 'worsening') questions.push(`Should this ${bm.shortName} be repeated to confirm, and on what timeline?`);
      questions.push('Could any medications, supplements, alcohol, or recent exercise be affecting this result?');
      questions.push('Does this result change anything about my overall care?');
      questions = questions.slice(0, 4);
    } else {
      questions = bm.clinicianQuestions || [];
    }
    if (questions.length) {
      const questionSection = bm.actions && bm.actions.length ? 'G' : 'F';
      wrap.appendChild(el('section', { class: 'card stack-sm' }, [
        sectionLabel(questionSection, 'Questions for your clinician'),
        el('ul', { style: 'margin:.2rem 0 0;padding-left:1.1rem' }, questions.map((q) => el('li', { style: 'margin-bottom:.35rem', text: q }))),
        el('a', { href: '#/summary', class: 'btn ghost small', style: 'margin-top:.5rem' }, [icon('print', 16), 'Add to clinician summary']),
      ]));
    }

    return wrap;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ACTION CARD + ACTION PLAN
  // ═══════════════════════════════════════════════════════════════════════════
  const STATUS_OPTS = [
    { key: 'planned', label: 'Planned' },
    { key: 'in-progress', label: 'In progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'not-for-me', label: 'Not for me' },
  ];

  function ActionCard(a, opts) {
    opts = opts || {};
    const status = B.lib.state.actionStatus[a.id] || (opts.inPlan ? 'planned' : 'unset');
    const card = el('div', { class: 'action' });
    card.append(
      el('div', { class: 'a-text', text: a.action }),
      el('div', { class: 'a-meta' }, [
        C.EvidenceLabel(a.confidence),
        el('span', { class: 'chip neutral', text: a.frequency }),
        el('span', { class: 'chip neutral', text: 'Horizon: ' + a.horizon }),
        a.clinicianInvolved ? el('span', { class: 'chip blue', text: 'Clinician recommended' }) : null,
      ]),
      el('div', { class: 'a-why' }, [el('b', { text: 'Why: ' }), a.rationale]),
      el('div', { class: 'a-why', style: 'margin-top:.25rem' }, [el('b', { text: 'Targets: ' }), a.addresses.map((id) => { const b = B.data.biomarker(id); return b ? b.shortName : id; }).join(', ')]),
    );

    const foot = el('div', { class: 'action-foot' });
    if (opts.compact && status === 'unset') {
      foot.appendChild(el('button', { class: 'btn secondary small', onClick: () => { setStatus(a.id, 'planned'); toast('Added to your plan'); B.render(); } }, [icon('plus', 15), 'Add to plan']));
    } else {
      const seg = el('div', { class: 'seg', role: 'group', 'aria-label': 'Action status' });
      STATUS_OPTS.forEach((o) => {
        seg.appendChild(el('button', { 'aria-pressed': status === o.key ? 'true' : 'false', onClick: () => { setStatus(a.id, o.key); B.render(); } }, o.label));
      });
      foot.appendChild(seg);
      if (!opts.compact) {
        foot.appendChild(el('button', { class: 'btn ghost small', onClick: () => { removeFromPlan(a.id); toast('Removed from plan'); B.render(); } }, [icon('x', 15), 'Remove']));
      }
    }
    card.appendChild(foot);
    return card;
  }

  function setStatus(id, key) {
    const s = Object.assign({}, B.lib.state.actionStatus); s[id] = key;
    const dismissed = B.lib.state.dismissedActions.filter((x) => x !== id);
    B.lib.setState({ actionStatus: s, dismissedActions: dismissed });
  }
  function removeFromPlan(id) {
    const s = Object.assign({}, B.lib.state.actionStatus); delete s[id];
    const dismissed = B.lib.state.dismissedActions.includes(id) ? B.lib.state.dismissedActions : B.lib.state.dismissedActions.concat(id);
    B.lib.setState({ actionStatus: s, dismissedActions: dismissed });
  }

  // Default plan goals: the lead action from each priority marker.
  function defaultGoalIds() {
    return B.data.priorities.map((p) => { const bm = B.data.biomarker(p.biomarkerIds[0]); return bm.actions && bm.actions[0] ? bm.actions[0].id : null; }).filter(Boolean);
  }
  function allActions() {
    const map = {};
    B.data.biomarkers.forEach((bm) => (bm.actions || []).forEach((a) => (map[a.id] = a)));
    return map;
  }

  function ActionPlan() {
    const map = allActions();
    const state = B.lib.state;
    // active set = default goals not dismissed, plus any explicitly-statused actions
    const ids = new Set();
    defaultGoalIds().forEach((id) => { if (!state.dismissedActions.includes(id)) ids.add(id); });
    Object.keys(state.actionStatus).forEach((id) => { if (!state.dismissedActions.includes(id)) ids.add(id); });

    const items = Array.from(ids).map((id) => ({ id, a: map[id], status: state.actionStatus[id] || 'planned' })).filter((x) => x.a);
    const active = items.filter((x) => x.status === 'planned' || x.status === 'in-progress');
    const done = items.filter((x) => x.status === 'completed');
    const notForMe = items.filter((x) => x.status === 'not-for-me');

    const wrap = el('div', { class: 'stack-lg fade-in' });
    wrap.appendChild(el('div', {}, [
      el('div', { class: 'eyebrow', text: 'Your plan' }),
      el('h1', { style: 'margin-top:.3rem', text: 'A small, realistic plan' }),
      el('p', { class: 'muted', text: 'A few specific actions — no scores, streaks or pressure. Aim for up to three active at once.' }),
    ]));

    if (active.length > 3) {
      wrap.appendChild(C.SafetyNotice('amber', `You have ${active.length} active actions. Consider keeping three or fewer active so the plan stays doable.`));
    }

    if (!items.length) {
      wrap.appendChild(EmptyState('list', 'No actions yet', 'Open a priority and add a practical next step to build your plan.'));
    }

    if (active.length) {
      wrap.appendChild(el('div', { class: 'stack' }, [el('h3', { text: `Active (${active.length})` }), ...active.map((x) => ActionCard(x.a, { inPlan: true }))]));
    }
    if (done.length) {
      wrap.appendChild(el('div', { class: 'stack' }, [el('h3', { text: `Completed (${done.length})` }), ...done.map((x) => ActionCard(x.a, { inPlan: true }))]));
    }
    if (notForMe.length) {
      wrap.appendChild(el('div', { class: 'stack' }, [el('h3', { class: 'muted', text: `Not for me (${notForMe.length})` }), ...notForMe.map((x) => ActionCard(x.a, { inPlan: true }))]));
    }

    wrap.appendChild(C.SafetyNotice('info', 'Actions marked “Clinician recommended” depend on medical judgment. Use them as discussion points, not instructions.'));
    return wrap;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ALL-RESULTS VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  const CATEGORIES = ['cardiovascular', 'blood-sugar', 'liver', 'kidney', 'thyroid', 'blood-cells', 'nutrients', 'electrolytes', 'inflammation'];
  let resultsUI = { q: '', cat: 'all', status: 'all', sort: 'importance' };

  function ResultsTable() {
    const wrap = el('div', { class: 'fade-in' });
    wrap.appendChild(el('div', { style: 'margin-bottom:1rem' }, [
      el('div', { class: 'eyebrow', text: 'All results' }),
      el('h1', { style: 'margin-top:.3rem', text: 'Every result' }),
      el('p', { class: 'muted', text: 'The full dataset, for when you want it. Search, filter and sort — then tap any row for detail.' }),
    ]));

    const body = el('div');
    function draw() {
      clear(body);
      let rows = B.data.biomarkers.slice();
      if (resultsUI.q) rows = rows.filter((b) => (b.name + ' ' + b.shortName).toLowerCase().includes(resultsUI.q.toLowerCase()));
      if (resultsUI.cat !== 'all') rows = rows.filter((b) => b.category === resultsUI.cat);
      if (resultsUI.status !== 'all') rows = rows.filter((b) => B.lib.labFlag(b) === (resultsUI.status === 'within' ? 'within' : 'out') || (resultsUI.status !== 'within' && B.lib.labFlag(b) !== 'within'));
      const importance = (b) => (B.data.priorities.some((p) => p.biomarkerIds.includes(b.id)) ? 0 : B.lib.labFlag(b) !== 'within' ? 1 : 2);
      rows.sort((a, b) => {
        if (resultsUI.sort === 'alpha') return a.name.localeCompare(b.name);
        if (resultsUI.sort === 'date') return B.lib.current(b).date.localeCompare(B.lib.current(a).date);
        return importance(a) - importance(b) || a.name.localeCompare(b.name);
      });

      const table = el('table', { class: 'results' }, [
        el('thead', {}, el('tr', {}, [
          el('th', { text: 'Result' }),
          el('th', { text: 'Current' }),
          el('th', { text: 'Trend' }),
          el('th', { text: 'Lab flag' }),
          el('th', { text: 'Updated' }),
        ])),
      ]);
      const tbody = el('tbody');
      if (!rows.length) {
        tbody.appendChild(el('tr', {}, el('td', { colspan: '5', class: 'muted', style: 'text-align:center;padding:2rem', text: 'No results match those filters.' })));
      }
      rows.forEach((b) => {
        const cur = B.lib.effectiveCurrent(b);
        const flag = B.lib.labFlag(b);
        const t = B.lib.computeTrend(b);
        const isPriority = B.data.priorities.some((p) => p.biomarkerIds.includes(b.id));
        const tr = el('tr', { tabindex: '0', role: 'link', 'aria-label': `${b.name}, ${cur.value} ${cur.unit}, open detail`,
          onClick: () => B.lib.navigate('marker/' + b.id),
          onKeydown: (e) => { if (e.key === 'Enter') B.lib.navigate('marker/' + b.id); } }, [
          el('td', {}, [el('div', { style: 'font-weight:600' }, [b.name, isPriority ? el('span', { class: 'chip amber', style: 'margin-left:.4rem', text: 'priority' }) : null]), el('div', { class: 'muted small', text: b.category.replace(/-/g, ' ') })]),
          el('td', { style: 'font-variant-numeric:tabular-nums' }, `${cur.value} ${cur.unit}`),
          el('td', {}, el('span', { class: 'muted small', text: { improving: '↘ improving', worsening: '↗ watch', stable: '→ stable', 'insufficient-data': '– no prior' }[t.direction] })),
          el('td', {}, el('span', { class: 'flag-dot ' + (flag === 'within' ? 'within' : flag) }, [el('span', { class: 'd' }), flag === 'within' ? 'within range' : flag === 'high' ? 'above range' : flag === 'low' ? 'below range' : flag === 'unit-mismatch' ? 'check unit' : '—'])),
          el('td', { class: 'muted small', text: fmtShortDate(cur.date) }),
        ]);
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      body.appendChild(el('div', { class: 'results-scroll' }, table));
    }

    const search = el('input', { type: 'search', placeholder: 'Search results', 'aria-label': 'Search results', value: resultsUI.q, onInput: (e) => { resultsUI.q = e.target.value; draw(); } });
    const catSel = el('select', { 'aria-label': 'Filter by category', onChange: (e) => { resultsUI.cat = e.target.value; draw(); } }, [el('option', { value: 'all', text: 'All categories' }), ...CATEGORIES.map((c) => el('option', { value: c, text: c.replace(/-/g, ' '), selected: resultsUI.cat === c ? true : null }))]);
    const statusSel = el('select', { 'aria-label': 'Filter by status', onChange: (e) => { resultsUI.status = e.target.value; draw(); } }, [
      el('option', { value: 'all', text: 'Any status' }), el('option', { value: 'within', text: 'Within range' }), el('option', { value: 'out', text: 'Outside range' }),
    ]);
    const sortSel = el('select', { 'aria-label': 'Sort', onChange: (e) => { resultsUI.sort = e.target.value; draw(); } }, [
      el('option', { value: 'importance', text: 'Sort: importance' }), el('option', { value: 'alpha', text: 'Sort: A–Z' }), el('option', { value: 'date', text: 'Sort: date' }),
    ]);
    catSel.value = resultsUI.cat; statusSel.value = resultsUI.status; sortSel.value = resultsUI.sort;

    wrap.appendChild(el('div', { class: 'controls' }, [
      el('div', { class: 'field' }, [el('label', { text: 'Search' }), search]),
      el('div', { class: 'field' }, [el('label', { text: 'Category' }), catSel]),
      el('div', { class: 'field' }, [el('label', { text: 'Status' }), statusSel]),
      el('div', { class: 'field' }, [el('label', { text: 'Sort' }), sortSel]),
    ]));
    wrap.appendChild(body);
    draw();
    return wrap;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CLINICIAN SUMMARY (printable one page)
  // ═══════════════════════════════════════════════════════════════════════════
  function ClinicianSummary() {
    const p = B.data.profile;
    const wrap = el('div', { class: 'fade-in' });
    wrap.appendChild(el('div', { class: 'no-print', style: 'display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap' }, [
      el('div', {}, [el('div', { class: 'eyebrow', text: 'Clinician summary' }), el('h1', { style: 'margin-top:.3rem', text: 'One page to bring to your appointment' })]),
      el('button', { class: 'btn', onClick: () => window.print() }, [icon('print', 18), 'Print / Save PDF']),
    ]));

    const isUser = (B.lib.state.report || {}).mode === 'user';
    const priorities = B.data.priorities;

    // gather questions — generic for user data, curated for the demo.
    const questions = [];
    priorities.forEach((pr) => {
      const bm = B.data.biomarker(pr.biomarkerIds[0]);
      if (isUser) {
        if (bm.clinical) questions.push(`Given my overall risk, what ${bm.shortName} target is appropriate for me?`);
        questions.push(`Should my ${bm.shortName} be repeated to confirm, and when?`);
      } else {
        (bm.clinicianQuestions || []).forEach((q) => questions.push(q));
      }
    });
    if (isUser) questions.push('Could any medications, supplements, alcohol, or recent exercise be affecting these results?');

    const sources = new Set();
    priorities.forEach((pr) => { const bm = B.data.biomarker(pr.biomarkerIds[0]); if (bm.clinical) sources.add(bm.clinical.evidenceId); if (bm.favorable && bm.favorable.evidenceId) sources.add(bm.favorable.evidenceId); });

    // Build the meta line from whatever we actually know.
    const metaParts = [p.name];
    if (p.age) metaParts.push('age ' + p.age);
    if (p.sexForInterpretation && p.sexForInterpretation !== 'not specified') metaParts.push(p.sexForInterpretation);
    if (p.collectionDate) metaParts.push('collected ' + fmtDate(p.collectionDate) + (p.fasting ? ' (fasting)' : ''));
    metaParts.push('prepared ' + fmtDate(localISODate()));

    const priTitle = isUser ? (priorities.length ? `Priorities (${priorities.length})` : 'Priorities') : 'Three priorities';

    const sheet = el('div', { class: 'summary-sheet' }, [
      el('h2', { text: 'LabReview — Discussion summary' }),
      el('div', { class: 'summary-line', style: 'margin-bottom:1rem' }, metaParts.join(' · ')),

      el('div', { class: 'summary-block', style: 'margin-bottom:1rem' }, [
        el('h4', { text: priTitle }),
        priorities.length
          ? el('ul', {}, priorities.map((pr) => el('li', {}, [el('b', { text: pr.title + ': ' }), pr.statusLabel + '. ' + pr.interpretation])))
          : el('p', { style: 'margin:0', class: 'muted', text: 'No results fell outside the laboratory reference ranges. Routine review as advised by your clinician.' }),
      ]),

      el('div', { class: 'summary-grid' }, [
        el('div', { class: 'summary-block' }, [
          el('h4', { text: 'Relevant trends' }),
          el('ul', {}, B.data.priorities.map((pr) => { const bm = B.data.biomarker(pr.biomarkerIds[0]); const t = B.lib.computeTrend(bm); return el('li', { text: `${bm.shortName}: ${bm.measurements.map((m) => m.value).join(' → ')} ${bm.unit} (${t.direction})` }); })),
        ]),
        el('div', { class: 'summary-block' }, [
          el('h4', { text: 'Medications & supplements' }),
          el('ul', {}, p.therapies.map((th) => el('li', { text: `${th.name} ${th.dose || ''}${th.startDate ? ', since ' + fmtShortDate(th.startDate) : ' (start date not recorded)'}` }))),
        ]),
      ]),

      el('div', { class: 'summary-block', style: 'margin-top:1rem' }, [
        el('h4', { text: 'Contextual factors' }),
        el('p', { style: 'margin:0', text: p.context }),
      ]),

      el('div', { class: 'summary-block', style: 'margin-top:1rem' }, [
        el('h4', { text: 'Questions I would like to discuss' }),
        el('ul', {}, questions.map((q) => el('li', { text: q }))),
      ]),

      el('div', { class: 'summary-block', style: 'margin-top:1rem' }, [
        el('h4', { text: 'Sources referenced' }),
        el('ul', {}, Array.from(sources).map((sid) => { const s = B.data.evidenceById(sid); return s ? el('li', {}, [`${s.organization}, ${s.title} (${s.datePublished}). `, el('a', { href: s.url, text: s.url })]) : null; })),
      ]),

      el('p', { class: 'print-disclaimer', text: 'This summary was generated by the person named above using LabReview, an educational decision-support prototype. It is not a diagnosis, not medical advice, and was not produced or reviewed by a clinician. Values may include user corrections. Please verify against the original laboratory report.' }),
    ]);
    wrap.appendChild(sheet);
    return wrap;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVACY + METHODOLOGY + PROFILE + STATES
  // ═══════════════════════════════════════════════════════════════════════════
  function PrivacyControls() {
    const wrap = el('div', { class: 'stack-lg fade-in' });
    wrap.appendChild(el('div', {}, [
      el('div', { class: 'eyebrow', text: 'Privacy' }),
      el('h1', { style: 'margin-top:.3rem', text: 'Your data stays with you' }),
      el('p', { class: 'muted', style: 'margin:.55rem 0 0', text: 'A plain-language view of what the prototype keeps, where it goes, and how you stay in control.' }),
    ]));

    const rows = [
      ['file', 'What is kept', 'The report values you choose to use, any corrections you make, and your plan choices.'],
      ['target', 'Why it is kept', 'Only to build your overview, action plan, and appointment summary on this device.'],
      ['home', 'Where it is processed', 'Entirely inside this browser. Your bloodwork is not uploaded to a LabReview server.'],
      ['info', 'How long it stays', 'It remains in this browser’s local storage until you delete it or clear your browser data.'],
      ['shield', 'AI and third parties', 'No report data is sent to an AI provider, analytics service, advertiser, or other third party.'],
      ['arrow', 'What appears in the URL', 'Only the page location. Medical values and identifying report details are never placed in the address bar.'],
    ];

    wrap.appendChild(el('div', { class: 'privacy-hero' }, [
      el('div', { class: 'privacy-hero-icon' }, icon('shield', 26)),
      el('div', {}, [
        el('h2', { text: 'Local by design' }),
        el('p', { text: 'Reading, organizing, and saving your results happens on this device in the current prototype.' }),
      ]),
    ]));

    wrap.appendChild(el('section', { 'aria-label': 'How your data is handled' }, [
      el('h2', { style: 'font-size:1.12rem;margin-bottom:.75rem', text: 'How your data is handled' }),
      el('div', { class: 'privacy-grid' }, rows.map(([ico, title, body]) =>
        el('article', { class: 'privacy-item' }, [
          el('div', { class: 'privacy-icon' }, icon(ico, 18)),
          el('h3', { text: title }),
          el('p', { text: body }),
        ])
      )),
    ]));

    wrap.appendChild(C.SafetyNotice('amber', 'Consumer health apps are not automatically covered by HIPAA. LabReview makes no HIPAA-compliance claim. Treat any real report as sensitive.'));

    wrap.appendChild(el('div', { class: 'card stack-sm privacy-delete' }, [
      el('h3', { text: 'Delete my data' }),
      el('p', { class: 'muted small', style: 'margin:0', text: 'This removes the report, corrections, plan, and local profile from this browser, then returns you to the start.' }),
      el('button', { class: 'btn', style: 'background:var(--red)', onClick: confirmDelete }, [icon('trash', 18), 'Delete uploaded report & local profile']),
    ]));
    return wrap;
  }

  function confirmDelete() {
    const overlay = el('div', { style: 'position:fixed;inset:0;background:rgba(43,42,39,.4);display:grid;place-items:center;z-index:60;padding:1rem', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Confirm deletion' });
    const box = el('div', { class: 'card stack', style: 'max-width:24rem' }, [
      el('h3', { text: 'Delete everything?' }),
      el('p', { class: 'muted small', style: 'margin:0', text: 'This clears the report, corrections and plan from this browser. It cannot be undone.' }),
      el('div', { style: 'display:flex;gap:.5rem;justify-content:flex-end' }, [
        el('button', { class: 'btn secondary small', onClick: () => overlay.remove() }, 'Cancel'),
        el('button', { class: 'btn small', style: 'background:var(--red)', onClick: () => { overlay.remove(); B.lib.resetAll(); location.hash = ''; B.render(); toast('All local data deleted'); } }, 'Delete'),
      ]),
    ]);
    overlay.appendChild(box);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
    box.querySelector('button').focus();
  }

  function Methodology() {
    const wrap = el('div', { class: 'stack-lg fade-in' });
    wrap.appendChild(el('div', {}, [el('div', { class: 'eyebrow', text: 'Methodology' }), el('h1', { style: 'margin-top:.3rem', text: 'How LabReview reasons' })]));

    wrap.appendChild(C.SafetyNotice('sage', 'LabReview distinguishes a laboratory reference interval from a clinical decision threshold and a potentially favorable target. These values answer different questions and may not apply equally to every person.', { strong: true }));

    const blocks = [
      ['Extracting values', 'This prototype reads embedded text from text-based PDFs locally in the browser; it does not perform image OCR. A person confirms or corrects every recognized value and unit before interpretation.'],
      ['Normalizing units', 'Values are compared only within a single unit system. Where a unit looks inconsistent it is flagged for confirmation rather than silently converted.'],
      ['Why lab ranges differ', 'A reference interval reflects a lab’s population, assay and equipment. If you enter or confirm the interval printed on your report, LabReview uses it. Otherwise it clearly labels a catalog interval as illustrative rather than presenting it as your lab’s range.'],
      ['Selecting recommended thresholds', 'Clinical thresholds come from named guidelines or well-established decision points, shown with the issuing body, date, applicability and a link. They are never presented as universal.'],
      ['What “potentially favorable” means', 'A goal tied to a specific objective and population, always labelled with an evidence strength — never a universal “optimal”. Where no defensible target exists, LabReview says so.'],
      ['Assigning evidence confidence', 'Each claim carries one of five labels from “guideline-backed” to “evidence uncertain”, based on the source type and consistency. Conflicts (e.g. vitamin D) are disclosed, not resolved silently.'],
      ['Handling medications', 'LabReview may note that a medication can influence a marker, is sometimes monitored, or that timing matters — always as a discussion point. It never tells you to start, stop, or change a dose.'],
      ['What LabReview cannot determine', 'It cannot diagnose, cannot establish cause from a single result, and cannot replace clinical judgment that weighs your full history.'],
      ['When to seek professional review', 'Any urgent safety flag, results that depend on medical risk, and anything worrying you are reasons to speak with a clinician.'],
    ];
    wrap.appendChild(el('div', { class: 'stack' }, blocks.map(([h, b]) => el('div', { class: 'card' }, [el('h3', { style: 'margin-bottom:.3rem', text: h }), el('p', { style: 'margin:0', class: 'muted', text: b })]))));

    // Developer note + safety layer + prototype states
    wrap.appendChild(el('div', { class: 'card stack-sm' }, [
      el('h3', { text: 'Developer notes' }),
      el('p', { class: 'muted small', style: 'margin:0', text: 'The urgency layer is deterministic and rule-based (see src/lib.js). Production red-flag thresholds must be clinically validated, account for units and context, fail safe on missing data, and be reviewed by qualified medical professionals. Generative text may only describe the level the deterministic layer assigns.' }),
      el('div', { style: 'display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.3rem' }, [
        el('button', { class: 'btn secondary small', onClick: () => { B.lib.setState({ demoMode: !B.lib.state.demoMode }); toast(B.lib.state.demoMode ? 'Urgent-demo mode on' : 'Urgent-demo mode off'); B.render(); } }, [icon('alert', 15), B.lib.state.demoMode ? 'Disable urgent-demo mode' : 'Enable urgent-demo mode']),
        el('a', { href: '#/states', class: 'btn ghost small' }, 'View prototype states'),
      ]),
      B.lib.state.demoMode ? C.SafetyNotice('amber', 'Urgent-demo mode is ON: safety thresholds are lowered so the urgent banner appears on the overview. The standard sample dataset never shows urgent warnings.') : null,
    ]));
    return wrap;
  }

  function Profile() {
    const p = B.data.profile;
    const wrap = el('div', { class: 'stack-lg fade-in' });
    const profileMeta = [p.age ? `Age ${p.age}` : null, p.sexForInterpretation && p.sexForInterpretation !== 'not specified' ? p.sexForInterpretation : null].filter(Boolean);
    wrap.appendChild(el('div', {}, [el('div', { class: 'eyebrow', text: 'Profile' }), el('h1', { style: 'margin-top:.3rem', text: p.name }), el('p', { class: 'muted', text: profileMeta.length ? profileMeta.join(' · ') + ' recorded for interpretation' : 'Age and sex not specified' })]));
    wrap.appendChild(el('div', { class: 'card stack-sm' }, [el('h3', { text: 'Context' }), el('p', { style: 'margin:0', text: p.context })]));
    wrap.appendChild(el('div', { class: 'card' }, [el('h3', { style: 'margin-bottom:.5rem', text: 'Medications & supplements' }), C.MedicationTimeline(p)]));
    return wrap;
  }

  // Gallery of prototype states for visual testing.
  function StatesGallery() {
    const wrap = el('div', { class: 'stack-lg fade-in' });
    wrap.appendChild(el('div', {}, [el('div', { class: 'eyebrow', text: 'Prototype states' }), el('h1', { style: 'margin-top:.3rem', text: 'Edge & empty states' }), el('p', { class: 'muted', text: 'Rendered together for visual testing. See README for the full list.' })]));

    const demo = (title, node) => el('div', { class: 'card stack-sm' }, [el('h3', { style: 'margin-bottom:.2rem', text: title }), node]);

    // no major priorities
    // missing historical data
    wrap.appendChild(demo('Missing historical data', C.TrendVisualization(B.data.biomarker('glucose'))));
    // conflicting units
    wrap.appendChild(demo('Conflicting units', C.SafetyNotice('amber', 'HbA1c was read as “5.8 mmol/mol”, which conflicts with the expected unit “%”. LabReview will not convert automatically — please confirm the correct unit.')));
    // medication without start date
    const noStartProfile = { therapies: [{ id: 'x', kind: 'medication', name: 'Example medication', dose: '20 mg daily' }], collectionDate: '2026-06-18', priorTestDates: [] };
    wrap.appendChild(demo('Medication entered without a start date', C.MedicationTimeline(noStartProfile)));
    // evidence unavailable
    wrap.appendChild(demo('Evidence unavailable', C.SafetyNotice('info', 'No sourced clinical target is available for this marker in the prototype dataset. Only the laboratory reference is shown.')));
    // error
    wrap.appendChild(demo('Error state', el('div', {}, [C.SafetyNotice('red', 'We couldn’t read that file. It may be password-protected or an unsupported format. You can try another file or use the demo report.'), el('button', { class: 'btn secondary small', style: 'margin-top:.5rem', onClick: () => { location.hash = ''; B.lib.resetAll(); B.render(); } }, 'Back to upload')])));
    // urgent (demo)
    wrap.appendChild(demo('Urgent (demo scenario)', UrgentBanner({ level: 'urgent', reason: 'Demo-only ALT threshold — not a real clinical cutoff.' }, B.data.biomarker('alt'))));

    return wrap;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MANUAL ENTRY — type your own results; they run through the same framework.
  // ═══════════════════════════════════════════════════════════════════════════
  const CAT_LABEL = { cardiovascular: 'Cardiovascular', 'blood-sugar': 'Blood sugar', liver: 'Liver', kidney: 'Kidney', thyroid: 'Thyroid', 'blood-cells': 'Blood cells', nutrients: 'Nutrients', electrolytes: 'Electrolytes', inflammation: 'Inflammation' };

  function ManualEntry() {
    const catalog = B.data.catalogList();
    const today = localISODate();
    const rows = []; // {id, unit, valInput, prevInput, refLowInput, refHighInput}
    const wrap = el('div', { class: 'stack-lg fade-in' });

    wrap.appendChild(el('div', {}, [
      el('a', { href: '#', class: 'back-link', onClick: (e) => { e.preventDefault(); if (B.lib.state.stage === 'app') { location.hash = '/overview'; } else { B.lib.setState({ stage: 'landing' }); location.hash = ''; B.render(); } } }, [icon('arrowLeft', 16), 'Back']),
      el('div', { class: 'eyebrow', style: 'margin-top:.6rem', text: 'Enter results manually' }),
      el('h1', { style: 'margin-top:.3rem', text: 'Type in your own results' }),
      el('p', { class: 'muted', text: 'Fill in only the results you have — leave the rest blank. Add a previous value to see a trend. If your report prints a reference range, enter its low and high limits so LabReview uses your laboratory’s range instead of an illustrative catalog range. Nothing is uploaded; it stays in your browser.' }),
    ]));

    // context fields
    const nameIn = el('input', { type: 'text', id: 'me-name', placeholder: 'optional', 'aria-label': 'Your name or label' });
    const ageIn = el('input', { type: 'number', min: '18', max: '120', id: 'me-age', placeholder: 'optional', 'aria-label': 'Age' });
    const sexIn = el('select', { id: 'me-sex', 'aria-label': 'Sex used for reference ranges' }, [
      el('option', { value: '', text: 'Not specified' }),
      el('option', { value: 'female', text: 'Female' }),
      el('option', { value: 'male', text: 'Male' }),
    ]);
    const dateIn = el('input', { type: 'date', id: 'me-date', value: today, 'aria-label': 'Collection date' });
    const prevDateIn = el('input', { type: 'date', id: 'me-prevdate', 'aria-label': 'Previous test date' });
    const fastingIn = el('input', { type: 'checkbox', id: 'me-fasting', style: 'width:auto' });
    wrap.appendChild(el('div', { class: 'card' }, [
      sectionLabel(null, 'About this report (optional)'),
      el('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:.75rem;margin-top:.5rem' }, [
        el('div', { class: 'field' }, [el('label', { for: 'me-name', text: 'Name / label' }), nameIn]),
        el('div', { class: 'field' }, [el('label', { for: 'me-age', text: 'Age' }), ageIn]),
        el('div', { class: 'field' }, [el('label', { for: 'me-sex', text: 'Sex for ranges' }), sexIn]),
        el('div', { class: 'field' }, [el('label', { for: 'me-date', text: 'Collection date' }), dateIn]),
        el('div', { class: 'field' }, [el('label', { for: 'me-prevdate', text: 'Previous test date' }), prevDateIn]),
        el('div', { class: 'field' }, [el('label', { for: 'me-fasting', text: 'Fasting sample' }), el('div', { style: 'display:flex;align-items:center;gap:.4rem;height:40px' }, [fastingIn, el('label', { for: 'me-fasting', class: 'muted small', text: 'Yes, fasting' })])]),
      ]),
    ]));

    // marker inputs grouped by category
    CATEGORIES.forEach((cat) => {
      const inCat = catalog.filter((b) => b.category === cat);
      if (!inCat.length) return;
      const card = el('div', { class: 'card' }, [sectionLabel(null, CAT_LABEL[cat] || cat)]);
      card.appendChild(el('div', { class: 'manual-legend muted small' }, [
        el('span', { text: 'Current' }), el('span', { text: 'Previous' }), el('span', { text: 'Lab low' }), el('span', { text: 'Lab high' }),
      ]));
      inCat.forEach((bm) => {
        const valInput = el('input', { type: 'number', step: 'any', inputmode: 'decimal', placeholder: 'value', 'aria-label': `${bm.name} current value in ${bm.unit}` });
        const prevInput = el('input', { type: 'number', step: 'any', inputmode: 'decimal', placeholder: 'previous', 'aria-label': `${bm.name} previous value` });
        const refLowInput = el('input', { type: 'number', step: 'any', inputmode: 'decimal', placeholder: 'low', 'aria-label': `${bm.name} laboratory reference low limit` });
        const refHighInput = el('input', { type: 'number', step: 'any', inputmode: 'decimal', placeholder: 'high', 'aria-label': `${bm.name} laboratory reference high limit` });
        rows.push({ id: bm.id, unit: bm.unit, valInput, prevInput, refLowInput, refHighInput });
        card.appendChild(el('div', { class: 'manual-row' }, [
          el('div', { class: 'manual-name' }, [el('div', { style: 'font-weight:600', text: bm.name }), el('div', { class: 'muted small', text: bm.unit })]),
          el('div', { class: 'manual-inputs' }, [valInput, prevInput, refLowInput, refHighInput]),
        ]));
      });
      wrap.appendChild(card);
    });

    // optional medications
    const medRows = [];
    const medCard = el('div', { class: 'card' }, [
      sectionLabel(null, 'Medications & supplements (optional)'),
      el('p', { class: 'muted small', style: 'margin:.2rem 0 .5rem', text: 'Used only to show a timeline and to remember to discuss possible effects — never to advise a change.' }),
    ]);
    for (let i = 0; i < 2; i++) {
      const nm = el('input', { type: 'text', placeholder: 'name', 'aria-label': 'Medication or supplement name' });
      const dose = el('input', { type: 'text', placeholder: 'dose (optional)', 'aria-label': 'Dose' });
      const since = el('input', { type: 'date', 'aria-label': 'Start date' });
      medRows.push({ nm, dose, since });
      medCard.appendChild(el('div', { class: 'manual-med' }, [nm, dose, since]));
    }
    wrap.appendChild(medCard);

    const errorNote = el('div', { role: 'alert', 'aria-live': 'polite' });
    wrap.appendChild(errorNote);

    wrap.appendChild(el('div', { style: 'display:flex;gap:.6rem;flex-wrap:wrap' }, [
      el('button', { class: 'btn', onClick: () => submitManual(rows, medRows, { nameIn, ageIn, sexIn, dateIn, prevDateIn, fastingIn }, errorNote) }, [icon('check', 18), 'Interpret my results']),
      el('button', { class: 'btn secondary', onClick: () => { if (B.lib.state.stage === 'app') location.hash = '/overview'; else { B.lib.setState({ stage: 'landing' }); location.hash = ''; B.render(); } } }, 'Cancel'),
    ]));

    wrap.appendChild(C.SafetyNotice('info', 'LabReview explains and organizes your results; it does not diagnose. Discuss anything that concerns you with a clinician.', { ico: 'shield' }));
    return wrap;
  }

  function submitManual(rows, medRows, ctx, errorNote) {
    const collDate = ctx.dateIn.value || '';
    const prevDate = ctx.prevDateIn.value || '';
    const fasting = ctx.fastingIn.checked;
    const measurements = {};
    const references = {};
    const order = [];
    let invalidReference = null;
    rows.forEach((r) => {
      const v = parseFloat(r.valInput.value);
      if (!isFinite(v)) return;
      const ms = [];
      const pv = parseFloat(r.prevInput.value);
      if (isFinite(pv)) ms.push({ date: prevDate, value: pv, unit: r.unit });
      ms.push({ date: collDate, value: v, unit: r.unit, current: true, fasting: fasting });
      measurements[r.id] = ms;
      const refLow = parseFloat(r.refLowInput.value);
      const refHigh = parseFloat(r.refHighInput.value);
      if (isFinite(refLow) && isFinite(refHigh) && refLow >= refHigh) invalidReference = r.id;
      if (isFinite(refLow) || isFinite(refHigh)) {
        references[r.id] = {
          low: isFinite(refLow) ? refLow : undefined,
          high: isFinite(refHigh) ? refHigh : undefined,
          unit: r.unit,
          labName: 'Your entered report',
          source: 'report',
          note: 'Entered by you from the reference interval printed on your report.',
        };
      }
      order.push(r.id);
    });
    if (!order.length) {
      clear(errorNote);
      errorNote.appendChild(C.SafetyNotice('amber', 'Enter at least one result value to continue.'));
      errorNote.scrollIntoView({ block: 'center' });
      return;
    }
    if (invalidReference) {
      clear(errorNote);
      errorNote.appendChild(C.SafetyNotice('amber', 'A laboratory low limit must be lower than its high limit. Please correct that range.'));
      errorNote.scrollIntoView({ block: 'center' });
      return;
    }
    const therapies = [];
    medRows.forEach((m, i) => {
      const name = m.nm.value.trim();
      if (!name) return;
      therapies.push({ id: 'rx-user-' + i, kind: 'medication', name: name, dose: m.dose.value.trim() || '', startDate: m.since.value || '' });
    });
    B.lib.startReport({ mode: 'user', source: 'manual', name: ctx.nameIn.value.trim() || 'You', age: parseInt(ctx.ageIn.value, 10) || null, sex: ctx.sexIn.value || '', collectionDate: collDate, fasting: fasting, therapies: therapies, measurements: measurements, references: references, order: order });
    B.lib.setState({ stage: 'app' });
    location.hash = '/overview';
    B.render();
    toast(`Interpreting ${order.length} result${order.length === 1 ? '' : 's'}`);
  }

  B.screens = { UploadFlow, ExtractionReview, ParseFailed, ManualEntry, Overview, PriorityView, BiomarkerDetail, ActionPlan, ResultsTable, ClinicianSummary, PrivacyControls, Methodology, Profile, StatesGallery, EmptyState, toast };

  function EmptyState(ico, title, text) {
    return el('div', { class: 'state-page' }, [icon(ico, 34), el('h3', { text: title }), el('p', { class: 'muted', text: text })]);
  }
})(window.Baseline);
