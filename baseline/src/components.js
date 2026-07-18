/**
 * Baseline — Reusable presentation components.
 * Each component is a pure factory returning a DOM node. No clinical thresholds
 * are decided here; content comes from data.js and lib.js.
 */
(function (B) {
  'use strict';
  const { el, fmtDate, fmtShortDate, computeTrend, EVIDENCE_META, URGENCY_META } = B.lib;

  // ── Icons (inline, no icon font) ───────────────────────────────────────────
  const ICONS = {
    upload: 'M12 16V4m0 0 4 4m-4-4-4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
    check: 'M20 6 9 17l-5-5',
    arrow: 'm9 6 6 6-6 6',
    arrowLeft: 'm15 18-6-6 6-6',
    info: 'M12 16v-5m0-3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
    plus: 'M12 5v14m-7-7h14',
    x: 'M18 6 6 18M6 6l12 12',
    dots: 'M12 5h.01M12 12h.01M12 19h.01',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 0v6h6',
    print: 'M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2m-12 0h12v4H6z',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    home: 'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5',
    target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
    trash: 'M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
    alert: 'M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
    heart: 'M12 21s-7-4.3-9.5-8.5C.8 9.6 2 6 5.5 6 7.5 6 9 7.2 12 10c3-2.8 4.5-4 6.5-4 3.5 0 4.7 3.6 3 6.5C19 16.7 12 21 12 21Z',
  };
  function icon(name, size, opts) {
    size = size || 20;
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('width', size);
    s.setAttribute('height', size);
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke', (opts && opts.stroke) || 'currentColor');
    s.setAttribute('stroke-width', (opts && opts.weight) || '1.9');
    s.setAttribute('stroke-linecap', 'round');
    s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('aria-hidden', 'true');
    s.classList.add('ic');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', ICONS[name] || '');
    s.appendChild(p);
    return s;
  }

  // ── SafetyNotice ───────────────────────────────────────────────────────────
  /**
   * @param {('info'|'sage'|'amber'|'red')} kind
   * @param {string|Node} content
   * @param {{strong?:boolean, role?:string, ico?:string}} [opts]
   */
  function SafetyNotice(kind, content, opts) {
    opts = opts || {};
    const toneClass = kind === 'info' ? '' : kind;
    return el(
      'div',
      {
        class: 'notice ' + toneClass + (opts.strong ? ' strong' : ''),
        role: opts.role || (kind === 'red' ? 'alert' : 'note'),
      },
      [
        icon(opts.ico || (kind === 'red' ? 'alert' : kind === 'sage' ? 'shield' : 'info'), 18),
        el('div', {}, typeof content === 'string' ? el('span', { text: content }) : content),
      ]
    );
  }

  // Standard reusable medication-change safety line.
  const MED_SAFETY_TEXT =
    'Do not change a prescribed medication based on this result alone. Discuss it with the prescribing clinician.';

  // ── EvidenceLabel ──────────────────────────────────────────────────────────
  /** @param {import('./types').EvidenceLabel} confidence */
  function EvidenceLabel(confidence, opts) {
    const meta = EVIDENCE_META[confidence] || { label: confidence, tone: 'neutral' };
    return el('span', { class: 'chip ' + meta.tone, title: 'Evidence strength' }, [
      el('span', { class: 'dot' }),
      (opts && opts.prefix ? opts.prefix + ' ' : '') + meta.label,
    ]);
  }

  // ── EvidenceSource ─────────────────────────────────────────────────────────
  /** @param {string} evidenceId */
  function EvidenceSource(evidenceId) {
    const s = B.data.evidenceById(evidenceId);
    if (!s) return el('div', { class: 'evidence-src' }, 'Source unavailable.');
    return el('div', { class: 'evidence-src' }, [
      el('div', { class: 'claim', text: s.claim }),
      el('div', { class: 'meta' }, [
        el('span', { text: `${s.organization} · ${s.title} · ${s.datePublished}` }),
      ]),
      el('div', { class: 'meta', style: 'margin-top:.3rem;display:flex;gap:.5rem;flex-wrap:wrap;align-items:center' }, [
        EvidenceLabel(s.confidence),
        el('span', { class: 'chip neutral', text: s.evidenceType.replace(/-/g, ' ') }),
        el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: 'View source ↗' }),
      ]),
      el('div', { class: 'meta', style: 'margin-top:.3rem', text: `Applies to: ${s.population} · Dataset reviewed ${s.lastReviewed}` }),
    ]);
  }

  // ── TrendVisualization ─────────────────────────────────────────────────────
  /** Compact direction arrow + accessible text summary. @param {import('./types').Biomarker} bm */
  function TrendVisualization(bm, opts) {
    opts = opts || {};
    const t = computeTrend(bm);
    const vals = t.series;
    const dirWord = { improving: 'Improving', worsening: 'Worsening', stable: 'Stable', 'insufficient-data': 'No prior data' }[t.direction];
    let movement = 'no-data';
    if (vals.length >= 2) {
      const first = vals[0];
      const last = vals[vals.length - 1];
      const change = first !== 0 ? Math.abs(((last - first) / first) * 100) : Math.abs(last - first);
      movement = change < 2 ? 'stable' : last > first ? 'up' : 'down';
    }
    const movementMeta = {
      up: { arrow: '↑', label: 'Up' },
      down: { arrow: '↓', label: 'Down' },
      stable: { arrow: '→', label: 'Stable' },
      'no-data': { arrow: '—', label: 'No prior result' },
    }[movement];
    const srText =
      t.series.length >= 2
        ? `Movement: ${movementMeta.label}. Clinical direction: ${dirWord}. ${bm.shortName} values over time: ${t.series
            .map((v, i) => `${v} ${bm.unit} in ${fmtShortDate(bm.measurements[i].date)}`)
            .join(', ')}. Net change ${t.deltaText}. ${t.meaningful ? 'This change may be meaningful.' : 'This change is small.'}`
        : `No previous result on file for ${bm.name}.`;

    return el('div', { class: `trend ${movement} ${t.direction}` }, [
      el('span', { class: 'trend-arrow', 'aria-hidden': 'true', text: movementMeta.arrow }),
      el('div', { class: 'trend-summary' }, [
        el('span', { class: 'visually-hidden', text: srText }),
        el('span', { 'aria-hidden': 'true' }, [
          el('b', { text: movementMeta.label }),
          t.series.length >= 2 ? ` · ${t.deltaText}` : '',
        ]),
      ]),
    ]);
  }

  // ── RangeComparison ────────────────────────────────────────────────────────
  /** Text-first reference, clinical, and favorable context. */
  function RangeComparison(bm) {
    const cur = B.lib.effectiveCurrent(bm);
    const ref = bm.reference;

    if (!B.lib.unitsComparable(cur.unit, ref.unit)) {
      return el('div', { class: 'range-comparison' }, [
        SafetyNotice('amber', `This result uses ${cur.unit}, while the reference uses ${ref.unit}. LabReview will not compare or convert them automatically. Confirm the unit against the original report.`),
        FourConcepts(bm),
      ]);
    }
    return el('div', { class: 'range-comparison' }, [FourConcepts(bm)]);
  }

  // The four-part range model as an accordion.
  function FourConcepts(bm) {
    const cur = B.lib.effectiveCurrent(bm);
    const t = computeTrend(bm);

    const concept = (title, chip, bodyChildren, open) =>
      el('details', { class: 'range-concept', open: open ? true : null }, [
        el('summary', {}, [
          el('span', {}, [title, chip ? ' ' : null, chip]),
          icon('arrow', 16, { stroke: 'currentColor' }),
        ]),
        el('div', { class: 'body' }, bodyChildren),
      ]);
    // patch caret class (summary's last svg)
    function withCaret(node) {
      const svg = node.querySelector('summary > svg');
      if (svg) svg.classList.add('caret');
      return node;
    }

    // 1. Your result
    const c1 = withCaret(
      concept('1 · Your result', el('span', { class: 'chip neutral', text: cur.corrected ? 'Edited' : 'Measured' }), [
        el('dl', { class: 'kv' }, [
          el('dt', { text: 'Value' }), el('dd', { text: `${cur.value} ${cur.unit}` }),
          el('dt', { text: 'Collected' }), el('dd', { text: fmtDate(cur.date) }),
          cur.fasting != null ? el('dt', { text: 'Fasting' }) : null,
          cur.fasting != null ? el('dd', { text: cur.fasting ? 'Yes' : 'Not recorded' }) : null,
          el('dt', { text: 'Trend' }), el('dd', {}, TrendVisualization(bm)),
        ]),
      ], true)
    );

    // 2. Report reference range or clearly-labelled catalog fallback
    const ref = bm.reference;
    const refText =
      ref.low != null && ref.high != null ? `${ref.low}–${ref.high} ${ref.unit}` : ref.high != null ? `up to ${ref.high} ${ref.unit}` : `at least ${ref.low} ${ref.unit}`;
    const c2 = withCaret(
      concept(ref.source === 'report' ? '2 · Your report’s reference range' : '2 · Illustrative catalog range', el('span', { class: ref.source === 'report' ? 'chip sage' : 'chip neutral', text: refText }), [
        el('p', { text: `From ${ref.labName}. ${ref.note}` }),
        el('p', { class: 'small muted', text: ref.source === 'report'
          ? 'A laboratory reference range describes values commonly observed in that laboratory’s reference population. It is not automatically a treatment target or a guarantee of good health.'
          : 'This fallback is not your laboratory’s range. Reference intervals vary with assay, laboratory, age and sex; use the interval printed on your report whenever possible.' }),
      ])
    );

    // 3. Clinically recommended range / decision threshold
    let c3;
    if (bm.clinical) {
      const clin = bm.clinical;
      const clinText = clin.low != null && clin.high != null ? `${clin.low}–${clin.high} ${clin.unit}` : clin.high != null ? `≤ ${clin.high} ${clin.unit}` : `≥ ${clin.low} ${clin.unit}`;
      c3 = withCaret(
        concept('3 · Clinically recommended threshold', el('span', { class: 'chip blue', text: clinText }), [
          el('dl', { class: 'kv' }, [
            el('dt', { text: 'Applies to' }), el('dd', { text: clin.appliesTo }),
            el('dt', { text: 'Intended outcome' }), el('dd', { text: clin.outcome }),
            el('dt', { text: 'Changes with' }), el('dd', { text: clin.variesBy }),
            el('dt', { text: 'Issued by' }), el('dd', { text: `${clin.organization} (${clin.datePublished})` }),
            el('dt', { text: 'Certainty' }), el('dd', {}, EvidenceLabel(clin.confidence)),
          ]),
          el('p', { class: 'small muted', text: 'A guideline threshold is not universally applicable; it depends on the factors above.' }),
          EvidenceSource(clin.evidenceId),
        ])
      );
    } else {
      c3 = withCaret(
        concept('3 · Clinically recommended threshold', el('span', { class: 'chip neutral', text: 'None established' }), [
          el('p', { text: 'No widely recognized clinical decision threshold applies to this marker in isolation. It is interpreted in context alongside related results.' }),
        ])
      );
    }

    // 4. Favorable / optimal target
    let c4;
    const fav = bm.favorable;
    if (fav && !fav.none) {
      const favText = fav.low != null && fav.high != null ? `${fav.low}–${fav.high} ${fav.unit}` : fav.high != null ? `≤ ${fav.high} ${fav.unit}` : `≥ ${fav.low} ${fav.unit}`;
      c4 = withCaret(
        concept('4 · Potentially favorable target', el('span', { class: 'chip violet', text: favText }), [
          el('p', { class: 'small', style: 'font-weight:600', text: 'Potentially favorable target for this objective — not a universal “optimal”.' }),
          el('dl', { class: 'kv' }, [
            el('dt', { text: 'Objective' }), el('dd', { text: fav.objective }),
            el('dt', { text: 'Population' }), el('dd', { text: fav.population }),
            fav.tradeoffs ? el('dt', { text: 'Tradeoffs' }) : null,
            fav.tradeoffs ? el('dd', { text: fav.tradeoffs }) : null,
            el('dt', { text: 'Evidence' }), el('dd', {}, EvidenceLabel(fav.confidence)),
          ]),
          EvidenceSource(fav.evidenceId),
        ])
      );
    } else if (fav && fav.none) {
      c4 = withCaret(
        concept('4 · Potentially favorable target', el('span', { class: 'chip neutral', text: 'No universal optimal' }), [
          el('p', { text: fav.noneNote }),
        ])
      );
    } else {
      c4 = withCaret(
        concept('4 · Potentially favorable target', el('span', { class: 'chip neutral', text: 'No universal optimal' }), [
          el('p', { text: 'No universal optimal range is established for this marker. Your trend and clinical context are more informative than pursuing a single number.' }),
        ])
      );
    }

    const why = withCaret(
      concept('Why are these ranges different?', null, [
        el('p', { text: 'These three ideas answer different questions:' }),
        el('ul', { style: 'margin:.2rem 0 .5rem 1.1rem;padding:0' }, [
          el('li', {}, [el('b', { text: ref.source === 'report' ? 'Your report reference' : 'The illustrative catalog range' }), ref.source === 'report' ? ' describes what is common in that laboratory’s reference population.' : ' is a fallback and may differ from the range on your report.']),
          el('li', {}, [el('b', { text: 'A clinical threshold' }), ' is where a guideline suggests action to change an outcome — and depends on your personal risk.']),
          el('li', {}, [el('b', { text: 'A favorable target' }), ' is a goal linked to a specific objective, with a stated evidence quality.']),
        ]),
        el('p', { class: 'small muted', text: 'They may not apply equally to every person, which is why LabReview never merges them into a single good-or-bad score.' }),
      ])
    );

    return el('div', { class: 'range-concepts', style: 'margin-top:1rem' }, [c1, c2, c3, c4, why]);
  }

  // ── InfluenceList ──────────────────────────────────────────────────────────
  const GROUP_META = {
    everyday: 'Everyday factors',
    medication: 'Medications',
    supplement: 'Supplements',
    testing: 'Testing conditions',
  };
  const DIR_META = {
    raises: { label: 'may raise', tone: 'amber' },
    lowers: { label: 'may lower', tone: 'sage' },
    either: { label: 'may raise or lower', tone: 'neutral' },
    'affects-interpretation': { label: 'affects interpretation', tone: 'blue' },
  };

  /**
   * @param {import('./types').Biomarker} bm
   * @param {{generic?:boolean}} [opts] generic=true (user data): show everyday &
   *   testing factors, and collapse medication/supplement into one non-personal
   *   note (since we don't know the user's specific medicines).
   */
  function InfluenceList(bm, opts) {
    opts = opts || {};
    const groups = opts.generic ? ['everyday', 'testing'] : ['everyday', 'medication', 'supplement', 'testing'];
    const wrap = el('div', {});
    let any = false;
    groups.forEach((g) => {
      const items = (bm.influences || []).filter((f) => f.group === g);
      if (!items.length) return;
      any = true;
      const det = el('details', { class: 'influence-group' }, [
        el('summary', {}, [
          el('span', {}, GROUP_META[g]),
          el('span', { style: 'display:flex;align-items:center;gap:.5rem' }, [
            el('span', { class: 'count', text: `${items.length}` }),
            (function () { const s = icon('arrow', 16); s.classList.add('caret'); return s; })(),
          ]),
        ]),
        ...items.map((f) => {
          const d = DIR_META[f.direction];
          return el('div', { class: 'influence' }, [
            el('div', { class: 'top' }, [
              el('span', { class: 'name', text: f.name }),
              el('span', { class: `chip ${d.tone} dir`, text: d.label }),
              EvidenceLabel(f.evidence),
              el('span', { class: 'chip neutral', text: f.magnitude === 'small' ? 'small effect' : 'possibly meaningful' }),
              el('span', { class: 'chip neutral', text: f.timing }),
            ]),
            el('p', { text: f.explanation }),
          ]);
        }),
      ]);
      wrap.appendChild(det);
    });
    // In generic (user) mode, add one non-personal medication/supplement note
    // where the catalog knows such factors exist for this marker.
    if (opts.generic && (bm.influences || []).some((f) => f.group === 'medication' || f.group === 'supplement')) {
      any = true;
      wrap.appendChild(el('details', { class: 'influence-group' }, [
        el('summary', {}, [el('span', {}, 'Medications & supplements'), (function () { const s = icon('arrow', 16); s.classList.add('caret'); return s; })()]),
        el('div', { class: 'influence' }, [
          el('p', { style: 'margin:0', text: 'Several medicines and supplements can raise or lower this marker. If you take any, note them and their timing, and discuss possible effects with your prescriber. Do not change a prescribed medication based on this result alone.' }),
        ]),
      ]));
    }
    if (!any) {
      wrap.appendChild(SafetyNotice('info', 'No specific influencing factors are catalogued for this marker in the prototype dataset.'));
    }
    return wrap;
  }

  // ── MedicationTimeline ─────────────────────────────────────────────────────
  /**
   * @param {import('./types').Profile} profile
   * @param {import('./types').Biomarker} [bm] optional focus marker to interleave lab dates
   */
  function MedicationTimeline(profile, bm) {
    const events = [];
    profile.therapies.forEach((th) => {
      if (th.startDate) {
        events.push({ date: th.startDate, kind: th.kind, cls: '', title: `Started ${th.name}`, text: `${th.dose || ''}${th.note ? ' — ' + th.note : ''}` });
      } else {
        events.push({ date: '0000-00', kind: th.kind, cls: 'warn', title: `${th.name} — start date not recorded`, text: 'A start date is missing, so any relationship to test timing cannot be assessed. Worth confirming with your prescriber.' });
      }
      (th.doseChanges || []).forEach((dc) => events.push({ date: dc.date, cls: 'warn', title: `${th.name} dose change`, text: dc.dose }));
      if (th.stopDate) events.push({ date: th.stopDate, cls: 'warn', title: `Stopped ${th.name}`, text: '' });
    });
    // lab dates for focus marker (or all draws)
    const draws = bm ? bm.measurements.map((m) => m.date) : [profile.collectionDate, ...profile.priorTestDates];
    Array.from(new Set(draws)).forEach((d) =>
      events.push({ date: d, cls: 'lab', title: bm ? `${bm.shortName} measured` : 'Blood draw', text: bm ? `${(bm.measurements.find((m) => m.date === d) || {}).value} ${bm.unit}` : '' })
    );

    events.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

    const tl = el('div', { class: 'timeline' }, events.map((e) =>
      el('div', { class: 'tl-item ' + e.cls }, [
        el('div', { class: 'tl-date', text: e.date === '0000-00' ? 'Date unknown' : fmtDate(e.date) }),
        el('div', { class: 'tl-title', text: e.title }),
        e.text ? el('p', { text: e.text }) : null,
      ])
    ));

    return el('div', {}, [
      tl,
      SafetyNotice('info', MED_SAFETY_TEXT, { ico: 'shield' }),
    ]);
  }

  // ── PrioritySummary card ───────────────────────────────────────────────────
  /** @param {import('./types').Priority} p @param {number} index */
  function PrioritySummary(p, index) {
    const toneByTrend = { improving: 'sage', worsening: 'amber', stable: 'neutral', 'insufficient-data': 'neutral' };
    const trendWord = { improving: 'Improving', worsening: 'Worth reviewing', stable: 'Stable', 'insufficient-data': 'New' }[p.trend];
    const card = el('button', {
      class: 'priority slide-in',
      style: `animation-delay:${index * 60}ms`,
      onClick: () => B.lib.navigate('priority/' + index),
      'aria-label': `Explore priority ${index + 1}: ${p.title}. ${p.statusLabel}.`,
    }, [
      el('div', { class: 'p-head' }, [
        el('span', { class: 'p-index', text: `Priority ${index + 1} of 3` }),
        el('span', { class: `chip ${toneByTrend[p.trend]}`, text: trendWord }),
      ]),
      el('h3', { text: p.title }),
      el('div', { class: 'p-status', text: p.statusLabel }),
      el('div', { class: 'p-interp', text: p.interpretation }),
      el('div', { class: 'p-next' }, [el('b', { text: 'Next step: ' }), p.nextStep]),
      el('span', { class: 'cta' }, ['Explore the reasoning', icon('arrow', 15)]),
    ]);
    return card;
  }

  // ── PriorityNavigator ──────────────────────────────────────────────────────
  function PriorityNavigator(index, total) {
    const dots = el('div', { class: 'pri-dots', role: 'tablist', 'aria-label': 'Priorities' });
    for (let i = 0; i < total; i++) {
      dots.appendChild(el('button', {
        role: 'tab',
        'aria-current': i === index ? 'true' : null,
        'aria-label': `Priority ${i + 1}`,
        onClick: () => B.lib.navigate('priority/' + i),
      }));
    }
    const prev = el('button', { class: 'btn ghost small', disabled: index === 0 || null, onClick: () => B.lib.navigate('priority/' + (index - 1)) }, [icon('arrowLeft', 16), 'Previous']);
    const next = el('button', { class: 'btn ghost small', disabled: index === total - 1 || null, onClick: () => B.lib.navigate('priority/' + (index + 1)) }, ['Next', icon('arrow', 16)]);
    return el('div', { class: 'pri-nav' }, [prev, dots, next]);
  }

  B.components = {
    icon,
    SafetyNotice,
    MED_SAFETY_TEXT,
    EvidenceLabel,
    EvidenceSource,
    TrendVisualization,
    RangeComparison,
    InfluenceList,
    MedicationTimeline,
    PrioritySummary,
    PriorityNavigator,
  };
})(window.Baseline);
