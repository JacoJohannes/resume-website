/**
 * Baseline — Clinical content dataset (kept separate from presentation).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * PROTOTYPE DATA NOTICE
 * This is a small, hand-curated evidence dataset for an educational decision-
 * support PROTOTYPE. Values reflect widely-cited authoritative guidance as of the
 * dataset's `lastReviewed` dates. Thresholds, units and applicability MUST be
 * re-verified against current primary guidance before any real-world use, and
 * red-flag rules must be validated by qualified clinicians. Nothing here
 * establishes a diagnosis.
 * ─────────────────────────────────────────────────────────────────────────────
 */
(function (B) {
  'use strict';

  /** @type {Record<string, import('./types').EvidenceSource>} */
  const evidence = {
    'ev-dyslipidemia-2026': {
      id: 'ev-dyslipidemia-2026',
      claim: 'LDL-C and non-HDL-C goals are risk-based; Lp(a), apoB, triglycerides and hsCRP can refine cardiovascular risk in selected contexts.',
      biomarkerId: 'ldl',
      population: 'Adults, primary and secondary prevention of atherosclerotic cardiovascular disease.',
      organization: 'ACC / AHA / Multisociety',
      title: '2026 Guideline on the Management of Dyslipidemia',
      datePublished: '2026-03-13',
      url: 'https://professional.heart.org/en/guidelines-statements/2026-accahaaacvprabcacpmadaagsaphaaspcnlapcna-guideline-on-the-management-ofcir0000000000001423',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-ldl-esc-2019': {
      id: 'ev-ldl-esc-2019',
      claim: 'For very-high-risk patients an LDL-C goal below 55 mg/dL (1.4 mmol/L) is recommended; lower LDL-C is associated with fewer cardiovascular events across trials.',
      biomarkerId: 'ldl',
      population: 'Adults stratified by cardiovascular risk (European guidance).',
      organization: 'ESC / EAS',
      title: '2019 Guidelines for the Management of Dyslipidaemias',
      datePublished: '2019-08-31',
      url: 'https://doi.org/10.1093/eurheartj/ehz455',
      evidenceType: 'clinical-guideline',
      confidence: 'strong-outcome-evidence',
      lastReviewed: '2026-07',
    },
    'ev-ada-2026': {
      id: 'ev-ada-2026',
      claim: 'HbA1c 5.7–6.4% and fasting glucose 100–125 mg/dL define increased risk for diabetes ("prediabetes"); these are risk categories, not a diagnosis of disease.',
      biomarkerId: 'hba1c',
      population: 'Non-pregnant adults; diagnostic categories.',
      organization: 'American Diabetes Association',
      title: 'Standards of Care in Diabetes — 2026, Diagnosis & Classification',
      datePublished: '2025-12-08',
      url: 'https://doi.org/10.2337/dc26-S002',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-acg-liver-2017': {
      id: 'ev-acg-liver-2017',
      claim: 'The "true" upper limit of normal for ALT in healthy individuals is lower than many lab reference intervals (roughly 29–33 U/L for men); mild elevations warrant evaluation of common causes in context rather than alarm.',
      biomarkerId: 'alt',
      population: 'Adults with abnormal liver chemistries.',
      organization: 'American College of Gastroenterology',
      title: 'ACG Clinical Guideline: Evaluation of Abnormal Liver Chemistries',
      datePublished: '2017-01-01',
      url: 'https://doi.org/10.1038/ajg.2016.517',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-fda-statin-2012': {
      id: 'ev-fda-statin-2012',
      claim: 'Routine periodic liver-enzyme monitoring is no longer recommended solely because of statin use; serious liver injury from statins is rare. Liver tests are advised before starting and if clinically indicated.',
      biomarkerId: 'alt',
      population: 'Adults taking statin medications.',
      organization: 'U.S. Food & Drug Administration',
      title: 'FDA Drug Safety Communication: Important safety label changes to cholesterol-lowering statin drugs',
      datePublished: '2012-02-28',
      url: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-drug-safety-communication-important-safety-label-changes-cholesterol-lowering-statin-drugs',
      evidenceType: 'official-labeling',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-vitd-nam-2011': {
      id: 'ev-vitd-nam-2011',
      claim: 'A serum 25-hydroxyvitamin D of 20 ng/mL (50 nmol/L) meets the needs of at least 97.5% of the population for bone health.',
      biomarkerId: 'vitd',
      population: 'General North American population, bone health.',
      organization: 'National Academy of Medicine (Institute of Medicine)',
      title: 'Dietary Reference Intakes for Calcium and Vitamin D',
      datePublished: '2011-01-01',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK56070/',
      evidenceType: 'government-agency',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-vitd-endo-2024': {
      id: 'ev-vitd-endo-2024',
      claim: 'For generally healthy adults, outcome-specific 25-hydroxyvitamin D blood thresholds have not been established in clinical trials; routine testing is not recommended without an indication.',
      biomarkerId: 'vitd',
      population: 'Generally healthy adults without an established indication for vitamin D testing or treatment.',
      organization: 'Endocrine Society',
      title: 'Vitamin D for the Prevention of Disease: Clinical Practice Guideline',
      datePublished: '2024-06-03',
      url: 'https://www.endocrine.org/clinical-practice-guidelines/vitamin-d-for-prevention-of-disease',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-kdigo-2024': {
      id: 'ev-kdigo-2024',
      claim: 'An eGFR below 60 mL/min/1.73m² persisting for at least 3 months defines chronic kidney disease; a single value above 60 with no other markers is generally reassuring.',
      biomarkerId: 'egfr',
      population: 'Adults, evaluation of kidney function.',
      organization: 'KDIGO',
      title: '2024 Clinical Practice Guideline for the Evaluation and Management of CKD',
      datePublished: '2024-01-01',
      url: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-aha-trig-2011': {
      id: 'ev-aha-trig-2011',
      claim: 'A fasting triglyceride level below 150 mg/dL is considered normal; below ~100 mg/dL is described as optimal in AHA scientific guidance.',
      biomarkerId: 'triglycerides',
      population: 'Adults, cardiovascular risk assessment.',
      organization: 'American Heart Association',
      title: 'Triglycerides and Cardiovascular Disease: A Scientific Statement',
      datePublished: '2011-04-18',
      url: 'https://www.ahajournals.org/doi/10.1161/CIR.0b013e3182160726',
      evidenceType: 'consensus-statement',
      confidence: 'associated-with-favorable-outcomes',
      lastReviewed: '2026-07',
    },
    'ev-who-hgb-2024': {
      id: 'ev-who-hgb-2024',
      claim: 'In non-pregnant men, a haemoglobin at or above 13.0 g/dL is generally used as the threshold below which anaemia is considered.',
      biomarkerId: 'hemoglobin',
      population: 'Non-pregnant adult men.',
      organization: 'World Health Organization',
      title: 'Guideline on haemoglobin cutoffs to define anaemia in individuals and populations',
      datePublished: '2024-03-05',
      url: 'https://www.who.int/publications/i/item/9789240088542',
      evidenceType: 'government-agency',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-who-ferritin-2020': {
      id: 'ev-who-ferritin-2020',
      claim: 'In apparently healthy adults, a ferritin below 15 ng/mL is the WHO cutoff for iron deficiency; inflammation can raise ferritin and requires a different interpretive approach.',
      biomarkerId: 'ferritin',
      population: 'Apparently healthy adults.',
      organization: 'World Health Organization',
      title: 'WHO guideline on use of ferritin concentrations to assess iron status',
      datePublished: '2020-04-21',
      url: 'https://www.who.int/publications/i/item/9789240000124',
      evidenceType: 'government-agency',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-ata-tsh': {
      id: 'ev-ata-tsh',
      claim: 'A TSH within roughly 0.4–4.0 mIU/L is commonly considered within the reference range for non-pregnant adults; interpretation depends on symptoms, free T4 and clinical context.',
      biomarkerId: 'tsh',
      population: 'Non-pregnant adults, thyroid assessment.',
      organization: 'American Thyroid Association',
      title: 'Guidelines for the Treatment of Hypothyroidism',
      datePublished: '2014-12-01',
      url: 'https://doi.org/10.1089/thy.2014.0028',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-kdigo-uacr-2024': {
      id: 'ev-kdigo-uacr-2024',
      claim: 'Urine ACR below 30 mg/g is category A1; 30–300 mg/g is A2 and above 300 mg/g is A3. An abnormal result should be confirmed, preferably with a first-morning sample.',
      biomarkerId: 'uacr',
      population: 'Adults being evaluated for chronic kidney disease.',
      organization: 'KDIGO',
      title: '2024 Clinical Practice Guideline for the Evaluation and Management of CKD',
      datePublished: '2024-03-01',
      url: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-primary-prevention-2019': {
      id: 'ev-primary-prevention-2019',
      claim: 'An hs-CRP of 2.0 mg/L or higher can be considered a cardiovascular risk-enhancing factor during clinician–patient risk discussion.',
      biomarkerId: 'hscrp',
      population: 'Selected adults undergoing primary prevention cardiovascular risk assessment.',
      organization: 'ACC / AHA',
      title: '2019 Guideline on the Primary Prevention of Cardiovascular Disease',
      datePublished: '2019-03-17',
      url: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000000678',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-nice-b12-2024': {
      id: 'ev-nice-b12-2024',
      claim: 'Total B12 below 180 ng/L supports deficiency; 180–350 ng/L is indeterminate and may need clinical context or additional testing.',
      biomarkerId: 'vitb12',
      population: 'People aged 16 years and older being evaluated for vitamin B12 deficiency.',
      organization: 'NICE',
      title: 'Vitamin B12 deficiency in over 16s: diagnosis and management (NG239)',
      datePublished: '2024-03-06',
      url: 'https://www.nice.org.uk/guidance/ng239/chapter/recommendations',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-ada-prevention-2026': {
      id: 'ev-ada-prevention-2026',
      claim: 'For adults at high risk of type 2 diabetes, an intensive prevention program targeting 5–7% weight loss and at least 150 minutes per week of moderate activity is recommended; metformin is considered for selected higher-risk adults.',
      biomarkerId: 'hba1c',
      population: 'Adults with prediabetes or otherwise at high risk of type 2 diabetes.',
      organization: 'American Diabetes Association',
      title: 'Standards of Care in Diabetes — 2026: Prevention or Delay of Diabetes',
      datePublished: '2025-12-08',
      url: 'https://diabetesjournals.org/care/article/49/Supplement_1/S50/163924/3-Prevention-or-Delay-of-Diabetes-and-Associated',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-aasld-masld-2025': {
      id: 'ev-aasld-masld-2025',
      claim: 'Metabolic liver disease management is built on weight, cardiometabolic risk and alcohol assessment; selected people with non-cirrhotic MASH and moderate-to-advanced fibrosis may be candidates for specialist-directed drug therapy.',
      biomarkerId: 'alt',
      population: 'Adults being evaluated or treated for metabolic dysfunction-associated steatotic liver disease.',
      organization: 'American Association for the Study of Liver Diseases',
      title: 'Clinical Assessment and Management of Metabolic Dysfunction-Associated Steatotic Liver Disease',
      datePublished: '2025-11-07',
      url: 'https://www.aasld.org/practice-guidelines/clinical-assessment-and-management-metabolic-dysfunction-associated-steatotic',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-ata-hyperthyroidism': {
      id: 'ev-ata-hyperthyroidism',
      claim: 'Low TSH with elevated thyroid hormone can reflect hyperthyroidism; treatment depends on cause and may include symptom control, antithyroid medication, radioactive iodine or surgery.',
      biomarkerId: 'tsh',
      population: 'People being evaluated or treated for hyperthyroidism.',
      organization: 'American Thyroid Association',
      title: 'Hyperthyroidism',
      datePublished: '2021-03-01',
      url: 'https://www.thyroid.org/hyperthyroidism/',
      evidenceType: 'professional-guidance',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-who-anemia-2025': {
      id: 'ev-who-anemia-2025',
      claim: 'Anaemia is a finding with many causes, including iron or vitamin deficiency, blood loss, infection, inflammation, chronic disease and inherited red-cell disorders; treatment should address the cause.',
      biomarkerId: 'hemoglobin',
      population: 'People with low haemoglobin or suspected anaemia.',
      organization: 'World Health Organization',
      title: 'Anaemia fact sheet',
      datePublished: '2025-02-10',
      url: 'https://www.who.int/news-room/fact-sheets/detail/ANAEMIA',
      evidenceType: 'government-agency',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-nhlbi-platelets': {
      id: 'ev-nhlbi-platelets',
      claim: 'High or low platelets can be reactive, medication-related, immune or marrow-related; treatment varies by cause and bleeding or clotting risk.',
      biomarkerId: 'platelets',
      population: 'People with thrombocytosis, thrombocytopenia or platelet dysfunction.',
      organization: 'National Heart, Lung, and Blood Institute',
      title: 'Platelet Disorders — Treatment',
      datePublished: '2022-03-24',
      url: 'https://www.nhlbi.nih.gov/health/platelet-disorders/treatment',
      evidenceType: 'government-agency',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-medline-wbc': {
      id: 'ev-medline-wbc',
      claim: 'WBC abnormalities can reflect infection, inflammation, allergy, smoking, medicines, immune disease or marrow disease; the differential and clinical context are required.',
      biomarkerId: 'wbc',
      population: 'People with an abnormal total white blood cell count.',
      organization: 'U.S. National Library of Medicine',
      title: 'White Blood Count (WBC)',
      datePublished: '2024-03-21',
      url: 'https://medlineplus.gov/lab-tests/white-blood-count-wbc/',
      evidenceType: 'government-agency',
      confidence: 'expert-consensus',
      lastReviewed: '2026-07',
    },
    'ev-medline-creatinine': {
      id: 'ev-medline-creatinine',
      claim: 'Creatinine is affected by kidney filtration, hydration, muscle mass, intense exercise, meat intake and some medicines; one abnormal result does not diagnose kidney disease.',
      biomarkerId: 'creatinine',
      population: 'Adults having kidney function assessed.',
      organization: 'U.S. National Library of Medicine',
      title: 'Creatinine Test',
      datePublished: '2023-12-01',
      url: 'https://medlineplus.gov/lab-tests/creatinine-test/',
      evidenceType: 'government-agency',
      confidence: 'expert-consensus',
      lastReviewed: '2026-07',
    },
    'ev-medline-bun': {
      id: 'ev-medline-bun',
      claim: 'BUN may rise with impaired kidney function, dehydration, high protein intake, bleeding or some medicines and may fall with low protein intake, malnutrition or liver disease.',
      biomarkerId: 'bun',
      population: 'Adults having kidney function or hydration assessed.',
      organization: 'U.S. National Library of Medicine',
      title: 'BUN (Blood Urea Nitrogen)',
      datePublished: '2024-01-01',
      url: 'https://medlineplus.gov/lab-tests/bun-blood-urea-nitrogen/',
      evidenceType: 'government-agency',
      confidence: 'expert-consensus',
      lastReviewed: '2026-07',
    },
    'ev-medline-albumin': {
      id: 'ev-medline-albumin',
      claim: 'Low serum albumin may occur with liver disease, kidney loss, inflammation, malnutrition or malabsorption; high albumin most often reflects dehydration.',
      biomarkerId: 'albumin',
      population: 'Adults with abnormal serum albumin.',
      organization: 'U.S. National Library of Medicine',
      title: 'Albumin Blood Test',
      datePublished: '2024-06-01',
      url: 'https://medlineplus.gov/lab-tests/albumin-blood-test/',
      evidenceType: 'government-agency',
      confidence: 'expert-consensus',
      lastReviewed: '2026-07',
    },
    'ev-medline-sodium': {
      id: 'ev-medline-sodium',
      claim: 'Blood sodium primarily reflects water balance. Both high and low sodium can be dangerous and require cause-specific correction rather than unsupervised salt or water changes.',
      biomarkerId: 'sodium',
      population: 'Adults with hyponatremia or hypernatremia.',
      organization: 'U.S. National Library of Medicine',
      title: 'Sodium Blood Test',
      datePublished: '2024-05-01',
      url: 'https://medlineplus.gov/lab-tests/sodium-blood-test/',
      evidenceType: 'government-agency',
      confidence: 'expert-consensus',
      lastReviewed: '2026-07',
    },
    'ev-ukka-potassium-2023': {
      id: 'ev-ukka-potassium-2023',
      claim: 'Clinically important hyperkalaemia requires confirmation, ECG/risk assessment, review of causes and medicines, and severity-dependent treatment; newer potassium binders have defined roles.',
      biomarkerId: 'potassium',
      population: 'Adults with hyperkalaemia.',
      organization: 'UK Kidney Association',
      title: 'Clinical Practice Guideline: Management of Hyperkalaemia in Adults',
      datePublished: '2023-12-19',
      url: 'https://guidelines.ukkidney.org/hyperkalaemia/',
      evidenceType: 'clinical-guideline',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
    'ev-nih-vitd-2025': {
      id: 'ev-nih-vitd-2025',
      claim: '25-hydroxyvitamin D below 12 ng/mL is associated with deficiency, at least 20 ng/mL is adequate for most people for bone health, and excess supplement intake can cause toxicity.',
      biomarkerId: 'vitd',
      population: 'General adults and people being assessed for vitamin D deficiency or excess.',
      organization: 'NIH Office of Dietary Supplements',
      title: 'Vitamin D — Health Professional Fact Sheet',
      datePublished: '2025-06-27',
      url: 'https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/',
      evidenceType: 'government-agency',
      confidence: 'guideline-backed',
      lastReviewed: '2026-07',
    },
  };

  // ── Sample profile ────────────────────────────────────────────────────────
  /** @type {import('./types').Profile} */
  const profile = {
    name: 'Generic Patient',
    age: 42,
    sexForInterpretation: 'male',
    collectionDate: '2026-06-18',
    fasting: true,
    priorTestDates: ['2024-11-12', '2025-09-09'],
    context:
      'Desk-based work; exercises about twice weekly; alcohol roughly 6–8 drinks per week. No iron supplement is recorded.',
    therapies: [
      {
        id: 'sup-vitd',
        kind: 'supplement',
        name: 'Vitamin D3 (cholecalciferol)',
        dose: '1,000 IU once daily',
        startDate: '2025-03-01',
        monitors: ['vitd'],
        note: 'An over-the-counter supplement that can raise 25-hydroxyvitamin D over weeks to months.',
      },
    ],
  };

  const D = { c: '2026-06-18', p1: '2024-11-12', p2: '2025-09-09' };

  function noUniversalOptimal(unit, objective, note, evidenceId) {
    return {
      none: true,
      unit,
      objective,
      population: 'General adults',
      tradeoffs: '',
      evidenceId: evidenceId || '',
      confidence: 'evidence-uncertain',
      noneNote: note,
    };
  }

  function reviewAction(id, name, addresses, rationale) {
    return {
      id: 'act-' + id + '-review',
      action: `If ${name} is outside the applicable reference range, ask whether it should be repeated and interpreted with related results before trying to change it.`,
      rationale: rationale || 'A repeat result and the surrounding panel help distinguish a persistent finding from normal biological or testing variation.',
      addresses: addresses || [id],
      frequency: 'Once, if out of range',
      horizon: 'At your next appropriate clinical review',
      confidence: 'expert-consensus',
      clinicianInvolved: true,
    };
  }

  function guidance(highCauses, lowCauses, lifestyle, clinicianManaged, followUp, safety, evidenceIds) {
    return {
      highCauses,
      lowCauses,
      lifestyle,
      clinicianManaged,
      followUp,
      safety,
      evidenceIds,
    };
  }

  // ── Biomarkers ────────────────────────────────────────────────────────────
  /** @type {import('./types').Biomarker[]} */
  const biomarkers = [
    // ---- LDL-C (elevated but improving in the demo) ------------------------
    {
      id: 'ldl',
      name: 'LDL cholesterol',
      shortName: 'LDL-C',
      category: 'cardiovascular',
      directionality: 'lower-better',
      unit: 'mg/dL',
      measurements: [
        { date: D.p1, value: 148, unit: 'mg/dL', fasting: true },
        { date: D.p2, value: 135, unit: 'mg/dL', fasting: true },
        { date: D.c, value: 122, unit: 'mg/dL', fasting: true, current: true },
      ],
      reference: {
        high: 100,
        unit: 'mg/dL',
        labName: 'Sample Reference Lab',
        note: 'Listed by the sample laboratory as a desirable cut-point, not an individual target.',
      },
      clinical: {
        high: 70,
        unit: 'mg/dL',
        appliesTo:
          'Adults with established ASCVD who are not classified as very high risk; very-high-risk secondary prevention uses a lower goal below 55 mg/dL.',
        outcome: 'Reduce the long-term risk of heart attack and stroke.',
        variesBy:
          'Overall ASCVD risk, prior cardiovascular events, diabetes, age, family history and treatment response — not sex alone.',
        organization: 'ACC/AHA/Multisociety',
        datePublished: '2026',
        evidenceId: 'ev-dyslipidemia-2026',
        confidence: 'guideline-backed',
      },
      favorable: {
        high: 55,
        unit: 'mg/dL',
        objective: 'Lower long-term atherosclerotic cardiovascular risk',
        population:
          'Very-high-risk secondary-prevention patients; this is not a goal for every adult.',
        tradeoffs:
          'Reaching lower levels may require higher medication intensity. The right balance is a clinical decision, not a number to chase alone.',
        evidenceId: 'ev-ldl-esc-2019',
        confidence: 'strong-outcome-evidence',
      },
      meaning:
        'LDL cholesterol is the cholesterol carried by low-density lipoprotein particles. Over many years, higher LDL-C contributes to the build-up of plaque in artery walls, which relates to heart attack and stroke risk. It is one input into overall cardiovascular risk, not a verdict on its own.',
      patternNote:
        'Your LDL-C has improved from 148 → 135 → 122 mg/dL but remains above the sample laboratory cut-point. The appropriate target depends on overall cardiovascular risk rather than this result alone.',
      missingContext:
        'A repeat lipid panel and your calculated cardiovascular risk (including blood pressure and smoking status) would help place this number in context. This result alone cannot determine whether your current target has been reached.',
      related: ['hdl', 'triglycerides', 'total-cholesterol'],
      influences: [
        {
          group: 'everyday',
          name: 'Dietary saturated fat',
          direction: 'raises',
          evidence: 'strong-outcome-evidence',
          magnitude: 'potentially-meaningful',
          timing: 'Weeks',
          explanation:
            'Diets higher in saturated fat tend to raise LDL-C; replacing some saturated fat with unsaturated fat is associated with lower LDL-C.',
        },
        {
          group: 'everyday',
          name: 'Soluble fibre intake',
          direction: 'lowers',
          evidence: 'associated-with-favorable-outcomes',
          magnitude: 'small',
          timing: 'Weeks',
          explanation:
            'Soluble fibre (oats, legumes, psyllium) can modestly lower LDL-C for some people.',
        },
        {
          group: 'everyday',
          name: 'Overall dietary pattern and activity',
          direction: 'lowers',
          evidence: 'guideline-backed',
          magnitude: 'potentially-meaningful',
          timing: 'Weeks to months',
          explanation:
            'A heart-healthy eating pattern, regular activity and weight management when relevant can contribute to lower LDL-C.',
        },
        {
          group: 'testing',
          name: 'Fasting status',
          direction: 'affects-interpretation',
          evidence: 'expert-consensus',
          magnitude: 'small',
          timing: 'Day of draw',
          explanation:
            'Calculated LDL-C can vary with triglycerides and fasting. Your sample was recorded as fasting, which supports comparison across visits.',
        },
      ],
      actions: [
        {
          id: 'act-ldl-diet',
          action:
            'Swap 3 high-saturated-fat meals per week (e.g. processed/red-meat or fried dishes) for meals built around fish, legumes, olive oil and vegetables.',
          rationale:
            'Reducing dietary saturated fat is associated with lower LDL-C over weeks.',
          addresses: ['ldl'],
          frequency: '3 meals per week',
          horizon: '6–12 weeks to see a lipid-panel change',
          confidence: 'strong-outcome-evidence',
          clinicianInvolved: false,
        },
        {
          id: 'act-ldl-fibre',
          action:
            'Add one daily serving of soluble fibre — 40 g oats or ½ cup cooked legumes — on 5 days each week.',
          rationale: 'Soluble fibre can modestly lower LDL-C for some people.',
          addresses: ['ldl'],
          frequency: '5 days per week',
          horizon: '6–8 weeks',
          confidence: 'associated-with-favorable-outcomes',
          clinicianInvolved: false,
        },
        {
          id: 'act-ldl-review',
          action:
            'Book a clinician review to confirm the LDL target appropriate for your overall cardiovascular risk and whether your treatment response is on track.',
          rationale:
            'The right LDL target is individualized and depends on medical risk you cannot calculate from this number alone.',
          addresses: ['ldl'],
          frequency: 'Once, before your next lipid panel',
          horizon: 'Next appointment',
          confidence: 'guideline-backed',
          clinicianInvolved: true,
        },
      ],
      clinicianQuestions: [
        'Given my overall cardiovascular risk, what LDL target is appropriate for me?',
        'Does this improving LDL-C pattern change whether treatment should be considered?',
        'Should I have a repeat lipid panel, and when?',
      ],
    },

    // ---- HbA1c (healthy, stable example) -----------------------------------
    {
      id: 'hba1c',
      name: 'Hemoglobin A1c',
      shortName: 'HbA1c',
      category: 'blood-sugar',
      directionality: 'lower-better',
      unit: '%',
      measurements: [
        { date: D.p1, value: 4.9, unit: '%' },
        { date: D.p2, value: 4.8, unit: '%' },
        { date: D.c, value: 4.8, unit: '%', current: true },
      ],
      reference: {
        low: 4.0,
        high: 5.6,
        unit: '%',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory non-diabetic reference interval.',
      },
      clinical: {
        low: 5.7,
        high: 6.4,
        unit: '%',
        appliesTo:
          'Non-pregnant adults. 5.7–6.4% is the "increased risk" (prediabetes) category; 6.5% or above on repeat testing is a diagnostic threshold for diabetes.',
        outcome:
          'Identify people at higher risk of developing type 2 diabetes so risk can be reduced early.',
        variesBy:
          'Pregnancy, certain anaemias and haemoglobin variants can affect HbA1c interpretation.',
        organization: 'American Diabetes Association',
        datePublished: '2026',
        evidenceId: 'ev-ada-2026',
        confidence: 'guideline-backed',
      },
      favorable: {
        high: 5.6,
        unit: '%',
        objective: 'Lower long-term risk of progressing to type 2 diabetes',
        population:
          'Adults without diabetes; lower values within the normal range are associated with lower progression risk.',
        tradeoffs:
          'HbA1c reflects roughly the past 3 months and is one signal among several. Trend matters more than a single reading.',
        evidenceId: 'ev-ada-2026',
        confidence: 'associated-with-favorable-outcomes',
      },
      meaning:
        'HbA1c estimates your average blood sugar over roughly the previous three months by measuring how much glucose is attached to hemoglobin. It changes slowly, which makes it useful for spotting gradual trends rather than day-to-day swings.',
      patternNote:
        'Your HbA1c is low and stable within the sample non-diabetic reference interval: 4.9 → 4.8 → 4.8%. Lower is not always better, but this result is not concerning when it agrees with glucose and red-cell results.',
      missingContext:
        'Weight trend, waist measurement, activity level and family history all shape what this means. This result alone cannot determine why the trend is occurring.',
      related: ['glucose'],
      influences: [
        {
          group: 'everyday',
          name: 'Physical activity (especially resistance + aerobic)',
          direction: 'lowers',
          evidence: 'strong-outcome-evidence',
          magnitude: 'potentially-meaningful',
          timing: 'Weeks to months',
          explanation:
            'Regular activity improves insulin sensitivity and is associated with lower HbA1c over time.',
        },
        {
          group: 'everyday',
          name: 'Refined-carbohydrate and sugary-drink intake',
          direction: 'raises',
          evidence: 'associated-with-favorable-outcomes',
          magnitude: 'potentially-meaningful',
          timing: 'Weeks to months',
          explanation:
            'Frequent sugary drinks and refined carbohydrates are associated with higher average glucose for many people.',
        },
        {
          group: 'everyday',
          name: 'Alcohol intake',
          direction: 'either',
          evidence: 'expert-consensus',
          magnitude: 'small',
          timing: 'Ongoing',
          explanation:
            'Regular alcohol intake is a possible contributor to metabolic and liver markers; your own intake is worth reviewing together as a pattern.',
        },
        {
          group: 'testing',
          name: 'Anaemia or haemoglobin variants',
          direction: 'affects-interpretation',
          evidence: 'guideline-backed',
          magnitude: 'potentially-meaningful',
          timing: 'Any draw',
          explanation:
            'Conditions affecting red blood cells can make HbA1c read higher or lower than true average glucose; it is worth interpreting alongside a hemoglobin result.',
        },
      ],
      actions: [
        {
          id: 'act-a1c-resistance',
          action:
            'Add two 20-minute resistance-training sessions each week (e.g. bodyweight or bands), alongside your current activity.',
          rationale:
            'Building muscle and moving more improves insulin sensitivity and is associated with lower HbA1c.',
          addresses: ['hba1c', 'glucose'],
          frequency: '2 sessions per week',
          horizon: '3 months (one HbA1c cycle)',
          confidence: 'strong-outcome-evidence',
          clinicianInvolved: false,
        },
        {
          id: 'act-a1c-drinks',
          action:
            'Replace sugary or mixed drinks with water or unsweetened options on at least 5 days per week.',
          rationale:
            'Lowering refined-sugar intake is associated with lower average glucose for many people.',
          addresses: ['hba1c', 'glucose'],
          frequency: '5 days per week',
          horizon: '2–3 months',
          confidence: 'associated-with-favorable-outcomes',
          clinicianInvolved: false,
        },
        {
          id: 'act-a1c-repeat',
          action:
            'Keep HbA1c and fasting glucose on the routine testing schedule recommended for your overall health history.',
          rationale:
            'A stable HbA1c of 4.8% with a normal fasting glucose does not need an early repeat solely to pursue a lower number.',
          addresses: ['hba1c'],
          frequency: 'At routine follow-up',
          horizon: 'Clinician-recommended interval',
          confidence: 'guideline-backed',
          clinicianInvolved: true,
        },
      ],
      clinicianQuestions: [
        'Does my HbA1c agree with my fasting glucose and red-cell results?',
        'Is routine follow-up sufficient for this result?',
        'Could any red-cell condition make this HbA1c read artificially low?',
      ],
    },

    // ---- Fasting glucose (part of blood-sugar cluster) ---------------------
    {
      id: 'glucose',
      name: 'Fasting glucose',
      shortName: 'Glucose',
      category: 'blood-sugar',
      directionality: 'in-band',
      unit: 'mg/dL',
      measurements: [{ date: D.c, value: 82, unit: 'mg/dL', fasting: true, current: true }],
      reference: {
        low: 70,
        high: 99,
        unit: 'mg/dL',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory fasting reference interval.',
      },
      clinical: {
        low: 100,
        high: 125,
        unit: 'mg/dL',
        appliesTo:
          'Non-pregnant adults, fasting sample. 100–125 mg/dL is the impaired-fasting-glucose (increased-risk) category; 126 mg/dL or above on repeat testing is a diagnostic threshold for diabetes.',
        outcome: 'Detect increased diabetes risk early.',
        variesBy: 'Requires a genuine fast; recent food or illness affects the value.',
        organization: 'American Diabetes Association',
        datePublished: '2026',
        evidenceId: 'ev-ada-2026',
        confidence: 'guideline-backed',
      },
      favorable: {
        high: 99,
        unit: 'mg/dL',
        objective: 'Lower diabetes progression risk',
        population: 'Adults without diabetes.',
        tradeoffs: 'A single fasting value is more variable than HbA1c; read them together.',
        evidenceId: 'ev-ada-2026',
        confidence: 'associated-with-favorable-outcomes',
      },
      meaning:
        'Fasting glucose is your blood sugar after not eating overnight. It is a quick snapshot rather than an average, so it varies more from day to day than HbA1c.',
      patternNote:
        'At 82 mg/dL this is comfortably within the sample fasting reference interval and is consistent with the HbA1c result.',
      missingContext: 'Confirming a true overnight fast and repeating the test add confidence.',
      related: ['hba1c'],
      influences: [
        {
          group: 'testing',
          name: 'Fasting duration',
          direction: 'affects-interpretation',
          evidence: 'guideline-backed',
          magnitude: 'potentially-meaningful',
          timing: 'Day of draw',
          explanation:
            'Incomplete fasting raises fasting glucose. Your sample was recorded as fasting.',
        },
        {
          group: 'everyday',
          name: 'Acute stress or poor sleep before the draw',
          direction: 'raises',
          evidence: 'expert-consensus',
          magnitude: 'small',
          timing: 'Day of draw',
          explanation: 'Short-term stress can transiently raise glucose.',
        },
      ],
      clinicianQuestions: [
        'Should fasting glucose be repeated to confirm this reading?',
      ],
    },

    // ---- DEMO PRIORITY: ALT ------------------------------------------------
    {
      id: 'alt',
      name: 'Alanine aminotransferase',
      shortName: 'ALT',
      category: 'liver',
      directionality: 'lower-better',
      unit: 'U/L',
      measurements: [
        { date: D.p1, value: 32, unit: 'U/L' },
        { date: D.p2, value: 52, unit: 'U/L' },
        { date: D.c, value: 78, unit: 'U/L', current: true },
      ],
      reference: {
        low: 7,
        high: 45,
        unit: 'U/L',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory reference interval; healthy upper limits are debated (see clinical threshold).',
      },
      clinical: {
        high: 33,
        unit: 'U/L',
        appliesTo:
          'Adult men. Expert guidance suggests a "true healthy" ALT upper limit near 29–33 U/L — lower than many printed lab ranges — for deciding when to evaluate.',
        outcome:
          'Avoid missing early liver stress that a wider lab range might not flag; interpret in clinical context.',
        variesBy:
          'Sex, body weight, muscle activity and the specific assay used all shift the appropriate threshold.',
        organization: 'American College of Gastroenterology',
        datePublished: '2017',
        evidenceId: 'ev-acg-liver-2017',
        confidence: 'guideline-backed',
      },
      favorable: {
        none: true,
        unit: 'U/L',
        objective: 'Liver health',
        population: 'General adults',
        tradeoffs: '',
        evidenceId: 'ev-acg-liver-2017',
        confidence: 'evidence-uncertain',
        noneNote:
          'No universal optimal ALT is established for an individual. A lower value within range is generally unremarkable, but there is no meaningful benefit to chasing a specific number. Your trend and overall clinical context are more informative.',
      },
      meaning:
        'ALT is an enzyme found mainly in liver cells. When liver cells are stressed or inflamed, more ALT can appear in the blood, so it is used as a general marker of liver activity. Many everyday factors — including body weight, alcohol and recent intense exercise — can nudge it.',
      patternNote:
        'Your ALT has risen from 32 to 52 to 78 U/L and is now above the sample reference interval. AST and GGT are elevated as well, so the pattern warrants confirmation and cause-focused review rather than interpretation of ALT alone.',
      missingContext:
        'A repeat liver panel, symptoms, alcohol and exercise timing, medicines, supplements and hepatitis risk all help interpret this pattern.',
      related: ['ast', 'ggt', 'ferritin'],
      influences: [
        {
          group: 'everyday',
          name: 'Alcohol intake',
          direction: 'raises',
          evidence: 'strong-outcome-evidence',
          magnitude: 'potentially-meaningful',
          timing: 'Days to weeks',
          explanation:
            'Regular alcohol intake is a common contributor to elevated liver enzymes; your own intake is worth reviewing with a clinician as part of the overall picture.',
        },
        {
          group: 'everyday',
          name: 'Metabolic / fatty-liver factors',
          direction: 'raises',
          evidence: 'associated-with-favorable-outcomes',
          magnitude: 'potentially-meaningful',
          timing: 'Months',
          explanation:
            'Higher body weight and rising blood sugar are associated with mild ALT elevation; your ALT and blood-sugar trends may be related.',
        },
        {
          group: 'everyday',
          name: 'Recent strenuous exercise',
          direction: 'raises',
          evidence: 'expert-consensus',
          magnitude: 'potentially-meaningful',
          timing: 'Up to several days before the draw',
          explanation:
            'Intense or unaccustomed exercise shortly before a blood draw can transiently raise ALT (and AST), independent of the liver.',
        },
        {
          group: 'medication',
          name: 'Medicines and supplements',
          direction: 'either',
          evidence: 'guideline-backed',
          magnitude: 'small',
          timing: 'Weeks after starting',
          explanation:
            'Some medicines and supplements can affect liver enzymes. Any possible relationship is a discussion point for a clinician or pharmacist—do not stop a prescribed medicine based on this result alone.',
        },
      ],
      actions: [
        {
          id: 'act-alt-exercise-timing',
          action:
            'Avoid unusually strenuous or unaccustomed exercise in the 2–3 days before any repeat liver panel, if clinically appropriate.',
          rationale:
            'Recent intense exercise can transiently raise ALT and muddy interpretation.',
          addresses: ['alt', 'ast'],
          frequency: 'Before the next liver-panel draw',
          horizon: 'Next test',
          confidence: 'expert-consensus',
          clinicianInvolved: false,
        },
        {
          id: 'act-alt-alcohol',
          action:
            'Trial reducing alcohol to no more than 2 drinks per week for 8 weeks and note it before your next draw.',
          rationale:
            'Lowering alcohol is associated with improvement in mildly elevated liver enzymes for many people.',
          addresses: ['alt'],
          frequency: 'Daily habit for 8 weeks',
          horizon: '8–12 weeks',
          confidence: 'associated-with-favorable-outcomes',
          clinicianInvolved: false,
        },
        {
          id: 'act-alt-review',
          action:
            'Ask your clinician whether the mildly elevated ALT should be repeated before any further evaluation, and record your medication, supplement and alcohol timing beforehand.',
          rationale:
            'Interpretation depends on medical risk and context a clinician can weigh; a repeat confirms whether the change persists.',
          addresses: ['alt'],
          frequency: 'Once',
          horizon: 'Next appointment',
          confidence: 'guideline-backed',
          clinicianInvolved: true,
        },
      ],
      clinicianQuestions: [
        'Should the mildly elevated ALT be repeated before considering additional evaluation?',
        'Could my alcohol intake, recent exercise, or medications be affecting this result?',
        'Does the combination of ALT, AST, GGT and ferritin suggest any specific follow-up testing?',
      ],
    },

    // ---- Supporting markers (lighter content) ------------------------------
    {
      id: 'hdl',
      name: 'HDL cholesterol',
      shortName: 'HDL-C',
      category: 'cardiovascular',
      directionality: 'context-dependent',
      unit: 'mg/dL',
      measurements: [{ date: D.c, value: 55, unit: 'mg/dL', fasting: true, current: true }],
      reference: {
        low: 40,
        unit: 'mg/dL',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory lower cut-point for adult men.',
      },
      favorable: {
        none: true,
        unit: 'mg/dL',
        objective: 'Cardiovascular risk',
        population: 'General adults',
        tradeoffs: '',
        evidenceId: 'ev-dyslipidemia-2026',
        confidence: 'evidence-uncertain',
        noneNote:
          'Higher HDL is not automatically better. Very high HDL has not been shown to reduce risk, and raising HDL with medication has not improved outcomes in trials. There is no defensible universal optimal target for this marker.',
      },
      meaning:
        'HDL cholesterol is often described as "good" cholesterol, but it is better thought of as one part of your overall lipid picture rather than a number to maximize.',
      patternNote: 'At 55 mg/dL this is within the sample reference range. HDL should not be maximized or interpreted without the rest of the lipid panel.',
      related: ['ldl', 'triglycerides'],
    },
    {
      id: 'triglycerides',
      name: 'Triglycerides',
      shortName: 'Trig',
      category: 'cardiovascular',
      directionality: 'lower-better',
      unit: 'mmol/L',
      measurements: [{ date: D.c, value: 0.45, unit: 'mmol/L', fasting: true, current: true }],
      reference: {
        high: 1.7,
        unit: 'mmol/L',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory fasting cut-point; 1.7 mmol/L is approximately 150 mg/dL.',
      },
      favorable: {
        high: 1.13,
        unit: 'mmol/L',
        objective: 'Lower cardiovascular risk',
        population: 'Adults, fasting measurement.',
        tradeoffs: 'Strongly affected by recent meals and alcohol; fasting matters.',
        evidenceId: 'ev-aha-trig-2011',
        confidence: 'associated-with-favorable-outcomes',
      },
      meaning:
        'Triglycerides are a type of fat in the blood. Levels respond quickly to diet, alcohol and recent meals.',
      patternNote: 'At 0.45 mmol/L (about 40 mg/dL), triglycerides are low and within both the sample reference and favorable bands. Lower is not a goal if it reflects undernutrition, illness or another cause.',
      related: ['ldl', 'hdl', 'hba1c'],
    },
    {
      id: 'total-cholesterol',
      name: 'Total cholesterol',
      shortName: 'Total chol',
      category: 'cardiovascular',
      directionality: 'context-dependent',
      unit: 'mg/dL',
      measurements: [{ date: D.c, value: 185, unit: 'mg/dL', fasting: true, current: true }],
      reference: {
        high: 200,
        unit: 'mg/dL',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory desirable cut-point.',
      },
      favorable: {
        none: true,
        unit: 'mg/dL',
        objective: 'Cardiovascular risk',
        population: 'General adults',
        tradeoffs: '',
        evidenceId: 'ev-dyslipidemia-2026',
        confidence: 'evidence-uncertain',
        noneNote:
          'Total cholesterol combines LDL, HDL and other fractions, so a single "optimal" number is not meaningful on its own. LDL-C, HDL-C and triglycerides together are more informative.',
      },
      meaning:
        'Total cholesterol sums several cholesterol fractions. Because it blends "helpful" and "less helpful" components, it is best read alongside LDL, HDL and triglycerides.',
      patternNote: 'At 185 mg/dL this is within the sample cut-point. The component values remain more useful than total cholesterol alone.',
      related: ['ldl', 'hdl', 'triglycerides'],
    },
    {
      id: 'ast',
      name: 'Aspartate aminotransferase',
      shortName: 'AST',
      category: 'liver',
      directionality: 'lower-better',
      unit: 'U/L',
      measurements: [
        { date: D.p1, value: 28, unit: 'U/L' },
        { date: D.p2, value: 39, unit: 'U/L' },
        { date: D.c, value: 52, unit: 'U/L', current: true },
      ],
      reference: {
        low: 8,
        high: 40,
        unit: 'U/L',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory reference interval.',
      },
      meaning:
        'AST is another enzyme that can rise with liver stress, but it is also found in muscle, so recent exercise can raise it too. It is usually read alongside ALT.',
      patternNote: 'AST has risen from 28 to 39 to 52 U/L and is now above the sample reference interval. Because AST can come from liver or muscle, it should be read with ALT, GGT, symptoms and recent exercise.',
      related: ['alt', 'ggt'],
    },
    {
      id: 'creatinine',
      name: 'Creatinine',
      shortName: 'Creat',
      category: 'kidney',
      directionality: 'context-dependent',
      unit: 'mg/dL',
      measurements: [{ date: D.c, value: 1.02, unit: 'mg/dL', current: true }],
      reference: {
        low: 0.74,
        high: 1.35,
        unit: 'mg/dL',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory reference interval for adult men.',
      },
      referencesBySex: {
        male: { low: 0.74, high: 1.35, unit: 'mg/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult-male interval; laboratories differ.' },
        female: { low: 0.59, high: 1.04, unit: 'mg/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult-female interval; laboratories differ.' },
      },
      referenceUnspecified: { low: 0.59, high: 1.35, unit: 'mg/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Broad illustrative adult interval because sex was not specified; use the range on the report.' },
      meaning:
        'Creatinine is a waste product filtered by the kidneys. It is influenced by muscle mass and hydration, and is used together with eGFR to estimate kidney function.',
      patternNote: 'At 1.02 mg/dL this is within the sample reference range.',
      related: ['egfr'],
    },
    {
      id: 'egfr',
      name: 'Estimated GFR',
      shortName: 'eGFR',
      category: 'kidney',
      directionality: 'higher-better',
      unit: 'mL/min/1.73m²',
      measurements: [{ date: D.c, value: 105, unit: 'mL/min/1.73m²', current: true }],
      reference: {
        low: 90,
        unit: 'mL/min/1.73m²',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory lower cut-point; values are often reported as ">90".',
      },
      clinical: {
        low: 60,
        unit: 'mL/min/1.73m²',
        appliesTo:
          'Adults. A value below 60 sustained for at least 3 months, or other kidney-damage markers, is used to define chronic kidney disease.',
        outcome: 'Detect and stage reduced kidney function.',
        variesBy: 'Age, muscle mass, and the estimating equation used.',
        organization: 'KDIGO',
        datePublished: '2024',
        evidenceId: 'ev-kdigo-2024',
        confidence: 'guideline-backed',
      },
      favorable: {
        none: true,
        unit: 'mL/min/1.73m²',
        objective: 'Kidney health',
        population: 'General adults',
        tradeoffs: '',
        evidenceId: 'ev-kdigo-2024',
        confidence: 'evidence-uncertain',
        noneNote:
          'eGFR is an estimate that naturally declines with age. There is no benefit to chasing a higher number; a stable value above 60 without other markers is generally reassuring.',
      },
      meaning:
        'Estimated GFR approximates how well your kidneys filter blood, calculated from creatinine. It is an estimate, not a direct measurement.',
      patternNote: 'At 105 mL/min/1.73m² this is above the sample cut-point. Kidney health is still interpreted with uACR, trend and clinical context.',
      related: ['creatinine'],
    },
    {
      id: 'tsh',
      name: 'Thyroid-stimulating hormone',
      shortName: 'TSH',
      category: 'thyroid',
      directionality: 'in-band',
      unit: 'mIU/L',
      measurements: [{ date: D.c, value: 2.1, unit: 'mIU/L', current: true }],
      reference: {
        low: 0.4,
        high: 4.0,
        unit: 'mIU/L',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory reference interval for non-pregnant adults.',
      },
      clinical: {
        low: 0.4,
        high: 4.0,
        unit: 'mIU/L',
        appliesTo: 'Non-pregnant adults; interpreted with symptoms and free T4.',
        outcome: 'Screen thyroid function.',
        variesBy: 'Pregnancy, age and certain medications shift the interpretation.',
        organization: 'American Thyroid Association',
        datePublished: '2014',
        evidenceId: 'ev-ata-tsh',
        confidence: 'guideline-backed',
      },
      favorable: {
        none: true,
        unit: 'mIU/L',
        objective: 'Thyroid health',
        population: 'General adults',
        tradeoffs: '',
        evidenceId: 'ev-ata-tsh',
        confidence: 'evidence-uncertain',
        noneNote:
          'TSH is an "in-range is what matters" marker rather than one where lower or higher is better. There is no optimal number to pursue within the normal range.',
      },
      meaning:
        'TSH is a pituitary hormone that regulates the thyroid. It is a screening signal that is interpreted together with symptoms and, when needed, thyroid hormone levels.',
      patternNote: 'At 2.1 mIU/L this is comfortably within the sample reference range.',
      related: [],
    },
    {
      id: 'hemoglobin',
      name: 'Hemoglobin',
      shortName: 'Hgb',
      category: 'blood-cells',
      directionality: 'in-band',
      unit: 'g/dL',
      measurements: [{ date: D.c, value: 15.1, unit: 'g/dL', current: true }],
      reference: {
        low: 13.5,
        high: 17.5,
        unit: 'g/dL',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory reference interval for adult men.',
      },
      referencesBySex: {
        male: { low: 13.5, high: 17.5, unit: 'g/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult-male interval; altitude and smoking matter.' },
        female: { low: 12.0, high: 15.5, unit: 'g/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative non-pregnant adult-female interval; altitude and smoking matter.' },
      },
      referenceUnspecified: { low: 12.0, high: 17.5, unit: 'g/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Broad illustrative non-pregnant adult interval because sex was not specified; it is not an anaemia decision threshold.' },
      clinical: {
        low: 13.0,
        unit: 'g/dL',
        appliesTo: 'Non-pregnant adult men; threshold below which anaemia is considered.',
        outcome: 'Detect anaemia.',
        variesBy: 'Sex, pregnancy, altitude and smoking.',
        organization: 'World Health Organization',
        datePublished: '2024',
        evidenceId: 'ev-who-hgb-2024',
        confidence: 'guideline-backed',
      },
      clinicalBySex: {
        male: {
          low: 13.0, unit: 'g/dL', appliesTo: 'Non-pregnant adult men; threshold below which anaemia is considered.', outcome: 'Detect anaemia.', variesBy: 'Pregnancy, altitude and smoking.', organization: 'World Health Organization', datePublished: '2024', evidenceId: 'ev-who-hgb-2024', confidence: 'guideline-backed',
        },
        female: {
          low: 12.0, unit: 'g/dL', appliesTo: 'Non-pregnant adult women; threshold below which anaemia is considered.', outcome: 'Detect anaemia.', variesBy: 'Pregnancy, altitude and smoking.', organization: 'World Health Organization', datePublished: '2024', evidenceId: 'ev-who-hgb-2024', confidence: 'guideline-backed',
        },
      },
      favorable: {
        none: true,
        unit: 'g/dL',
        objective: 'Blood health',
        population: 'General adults',
        tradeoffs: '',
        evidenceId: 'ev-who-hgb-2024',
        confidence: 'evidence-uncertain',
        noneNote:
          'Hemoglobin is best kept within range rather than maximized; higher-than-normal values are not a goal and can themselves warrant evaluation.',
      },
      meaning:
        'Hemoglobin is the protein in red blood cells that carries oxygen. Low values may indicate anaemia; the goal is to be within range, not high.',
      patternNote: 'At 15.1 g/dL this is within the sample reference range.',
      related: ['ferritin'],
    },
    {
      id: 'ferritin',
      name: 'Ferritin',
      shortName: 'Ferritin',
      category: 'nutrients',
      directionality: 'in-band',
      unit: 'ng/mL',
      measurements: [
        { date: D.c, value: 75, unit: 'ng/mL', current: true },
      ],
      reference: {
        low: 30,
        high: 400,
        unit: 'ng/mL',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory reference interval for adult men.',
      },
      referencesBySex: {
        male: { low: 30, high: 400, unit: 'ng/mL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult-male interval; inflammation can raise ferritin.' },
        female: { low: 15, high: 150, unit: 'ng/mL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult-female interval; menopause, pregnancy and inflammation matter.' },
      },
      referenceUnspecified: { low: 15, high: 400, unit: 'ng/mL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Broad illustrative adult interval because sex and menopausal status were not specified; inflammation can raise ferritin.' },
      clinical: {
        low: 30,
        unit: 'ng/mL',
        appliesTo:
          'Apparently healthy adults; below ~30 ng/mL is a sensitive threshold for iron deficiency, and below 15 ng/mL indicates depleted stores.',
        outcome: 'Detect iron deficiency.',
        variesBy: 'Ferritin rises with inflammation, which can mask low iron.',
        organization: 'World Health Organization',
        datePublished: '2020',
        evidenceId: 'ev-who-ferritin-2020',
        confidence: 'guideline-backed',
      },
      meaning:
        'Ferritin reflects your body’s iron stores. It can also rise with inflammation, so it is interpreted in context.',
      patternNote: 'At 75 ng/mL, ferritin is within the sample reference interval and above the WHO threshold commonly used to identify iron deficiency in apparently healthy adults.',
      missingContext: 'Ferritin can rise with inflammation, so CBC, transferrin saturation and clinical context still matter when symptoms suggest iron deficiency.',
      related: ['hemoglobin'],
    },
    {
      id: 'vitd',
      name: 'Vitamin D (25-OH)',
      shortName: 'Vit D',
      category: 'nutrients',
      directionality: 'in-band',
      unit: 'ng/mL',
      measurements: [{ date: D.c, value: 42, unit: 'ng/mL', current: true }],
      reference: {
        low: 30,
        high: 100,
        unit: 'ng/mL',
        labName: 'Sample Reference Lab',
        note: 'Sample-laboratory "sufficiency" cut-point — note that authorities disagree on this number.',
      },
      clinical: {
        low: 20,
        unit: 'ng/mL',
        appliesTo:
          'General population (bone health). The NAM concluded 20 ng/mL meets the needs of nearly everyone; the 2024 Endocrine Society guideline does not define an outcome-specific blood target for generally healthy adults.',
        outcome: 'Support bone health; avoid deficiency.',
        variesBy: 'Reason for testing, age, bone disease, calcium disorders and other clinical indications.',
        organization: 'National Academy of Medicine (2011), contextualized by Endocrine Society (2024)',
        datePublished: '2011–2024',
        evidenceId: 'ev-vitd-nam-2011',
        confidence: 'guideline-backed',
      },
      favorable: {
        none: true,
        unit: 'ng/mL',
        objective: 'General disease prevention',
        population: 'Generally healthy adults without a specific indication for testing.',
        tradeoffs: '',
        evidenceId: 'ev-vitd-endo-2024',
        confidence: 'guideline-backed',
        noneNote:
          'No outcome-specific “optimal” blood level has been established in clinical trials for generally healthy adults. The 2024 Endocrine Society guideline advises against routine testing in this population; more is not automatically better.',
      },
      meaning:
        'Vitamin D (measured as 25-hydroxyvitamin D) supports calcium balance and bone health. Expert bodies disagree on the ideal blood level, which is why "sufficient" and "optimal" are shown separately here.',
      patternNote:
        'At 42 ng/mL this meets the sample-lab cut-point and is above the NAM bone-health threshold. The current Endocrine Society guideline does not endorse an “optimal” blood target for generally healthy adults.',
      related: [],
    },

    // ---- Expanded cardiovascular risk markers -----------------------------
    {
      id: 'non-hdl',
      name: 'Non-HDL cholesterol',
      shortName: 'Non-HDL-C',
      category: 'cardiovascular',
      directionality: 'lower-better',
      unit: 'mg/dL',
      measurements: [{ date: D.c, value: 130, unit: 'mg/dL', fasting: true, current: true }],
      reference: { high: 130, unit: 'mg/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative desirable cut-point; individual goals are risk-based.' },
      clinical: {
        high: 85, unit: 'mg/dL',
        appliesTo: 'Very-high-risk secondary prevention. This goal does not apply universally.',
        outcome: 'Reduce recurrent atherosclerotic cardiovascular events.',
        variesBy: 'ASCVD history and whether the person meets very-high-risk criteria.',
        organization: 'ACC/AHA/Multisociety', datePublished: '2026',
        evidenceId: 'ev-dyslipidemia-2026', confidence: 'guideline-backed',
      },
      favorable: noUniversalOptimal('mg/dL', 'Lower atherosclerotic cardiovascular risk', 'There is no single optimal non-HDL-C for everyone. The appropriate goal becomes lower as cardiovascular risk rises.', 'ev-dyslipidemia-2026'),
      meaning: 'Non-HDL cholesterol is total cholesterol minus HDL cholesterol. It captures cholesterol in all potentially artery-forming particles and can be especially useful when triglycerides are elevated.',
      patternNote: 'At 130 mg/dL this is at the illustrative catalog cut-point. It is mathematically consistent with total cholesterol of 185 mg/dL and HDL-C of 55 mg/dL.',
      related: ['ldl', 'triglycerides', 'apob'],
      influences: [
        { group: 'everyday', name: 'Overall dietary pattern and activity', direction: 'lowers', evidence: 'strong-outcome-evidence', magnitude: 'potentially-meaningful', timing: 'Weeks to months', explanation: 'Replacing saturated fat with unsaturated fat, increasing fibre and regular activity can improve the atherogenic lipid profile.' },
        { group: 'testing', name: 'Calculated value', direction: 'affects-interpretation', evidence: 'expert-consensus', magnitude: 'small', timing: 'Same draw', explanation: 'Non-HDL-C is calculated from total cholesterol minus HDL-C, so all three values should come from the same sample.' },
      ],
      actions: [reviewAction('non-hdl', 'non-HDL cholesterol', ['non-hdl', 'ldl', 'triglycerides'], 'Risk-based goals and the full lipid pattern matter more than this number in isolation.')],
    },
    {
      id: 'apob',
      name: 'Apolipoprotein B',
      shortName: 'ApoB',
      category: 'cardiovascular',
      directionality: 'lower-better',
      unit: 'mg/dL',
      measurements: [{ date: D.c, value: 82, unit: 'mg/dL', fasting: true, current: true }],
      reference: { high: 130, unit: 'mg/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative upper cut-point; treatment goals vary by cardiovascular risk.' },
      favorable: noUniversalOptimal('mg/dL', 'Lower atherogenic particle burden', 'Lower ApoB generally means fewer atherogenic particles, but the treatment goal is risk-based rather than a universal optimal.', 'ev-dyslipidemia-2026'),
      meaning: 'ApoB estimates the number of potentially artery-forming lipoprotein particles. It can reveal risk that LDL-C alone may miss, particularly with diabetes or high triglycerides.',
      patternNote: 'At 82 mg/dL this is below the illustrative upper cut-point. An individual treatment goal would still depend on overall cardiovascular risk.',
      related: ['ldl', 'non-hdl', 'triglycerides'],
      influences: [{ group: 'everyday', name: 'Diet, body weight and activity', direction: 'lowers', evidence: 'strong-outcome-evidence', magnitude: 'potentially-meaningful', timing: 'Weeks to months', explanation: 'Heart-healthy eating, activity and weight management can improve ApoB alongside LDL-C and triglycerides.' }],
      actions: [reviewAction('apob', 'ApoB', ['apob', 'ldl', 'non-hdl'], 'ApoB is most useful when interpreted with the standard lipid panel and overall ASCVD risk.')],
    },
    {
      id: 'lpa',
      name: 'Lipoprotein(a)',
      shortName: 'Lp(a)',
      category: 'cardiovascular',
      directionality: 'lower-better',
      unit: 'nmol/L',
      measurements: [{ date: D.c, value: 18, unit: 'nmol/L', current: true }],
      reference: { high: 125, unit: 'nmol/L', labName: 'Sample Reference Lab', source: 'catalog', note: '2026 guideline risk-enhancing cut-point; do not convert to mg/dL with a fixed factor.' },
      clinical: {
        high: 125, unit: 'nmol/L',
        appliesTo: 'Adults; current guidance recommends measuring Lp(a) at least once in adulthood.',
        outcome: 'Identify a largely inherited, independent cardiovascular risk enhancer.',
        variesBy: 'Risk is continuous; assay units matter. 125 nmol/L (50 mg/dL) is risk-enhancing and 250 nmol/L (100 mg/dL) signals substantially higher risk.',
        organization: 'ACC/AHA', datePublished: '2019',
        evidenceId: 'ev-primary-prevention-2019', confidence: 'guideline-backed',
      },
      favorable: noUniversalOptimal('nmol/L', 'Lower inherited cardiovascular risk', 'Lp(a) is largely genetic and does not have a lifestyle-achieved “optimal” target. The practical response to a high result is to refine overall risk and manage modifiable risk factors with a clinician.', 'ev-dyslipidemia-2026'),
      meaning: 'Lp(a) is a mostly inherited lipoprotein that can raise lifetime heart attack and stroke risk. It is usually stable enough that one adult measurement is informative.',
      patternNote: 'At 18 nmol/L this is well below the guideline risk-enhancing cut-point.',
      related: ['ldl', 'apob', 'non-hdl'],
      influences: [
        { group: 'everyday', name: 'Lifestyle changes', direction: 'affects-interpretation', evidence: 'guideline-backed', magnitude: 'small', timing: 'Long term', explanation: 'Lifestyle usually has little effect on Lp(a) itself, but healthy habits still lower overall cardiovascular risk.' },
        { group: 'testing', name: 'Assay units', direction: 'affects-interpretation', evidence: 'guideline-backed', magnitude: 'potentially-meaningful', timing: 'Any draw', explanation: 'nmol/L and mg/dL are not reliably interchangeable with a single conversion factor.' },
      ],
      actions: [reviewAction('lpa', 'Lp(a)', ['lpa', 'ldl', 'apob'], 'A high Lp(a) is handled by refining overall risk and addressing modifiable risks, not by trying to change it through supplements or a special diet.')],
    },
    {
      id: 'hscrp',
      name: 'High-sensitivity C-reactive protein',
      shortName: 'hs-CRP',
      category: 'inflammation',
      directionality: 'lower-better',
      unit: 'mg/L',
      measurements: [{ date: D.c, value: 0.4, unit: 'mg/L', current: true }],
      reference: { high: 3.0, unit: 'mg/L', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative cardiovascular-risk band; acute illness can make this uninterpretable.' },
      clinical: {
        high: 2.0, unit: 'mg/L',
        appliesTo: 'Selected adults when cardiovascular risk remains uncertain and there is no acute infection or inflammatory flare.',
        outcome: 'Refine ASCVD risk as one risk-enhancing factor.',
        variesBy: 'Infection, injury, chronic inflammatory disease, smoking and obesity; repeat testing may be needed.',
        organization: 'ACC/AHA/Multisociety', datePublished: '2026',
        evidenceId: 'ev-dyslipidemia-2026', confidence: 'guideline-backed',
      },
      favorable: noUniversalOptimal('mg/L', 'Cardiovascular risk refinement', 'There is no universal hs-CRP number to chase. It is a nonspecific risk signal and should not be interpreted during acute illness.', 'ev-primary-prevention-2019'),
      meaning: 'hs-CRP is a sensitive but nonspecific marker of inflammation. It can help refine cardiovascular risk, but it cannot identify the cause of inflammation.',
      patternNote: 'At 0.4 mg/L this is below the guideline risk-enhancing threshold, assuming you were well at the time of testing. It is not a number that needs to be driven lower.',
      related: ['ldl', 'apob'],
      influences: [
        { group: 'everyday', name: 'Recent infection, injury or hard exercise', direction: 'raises', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Days', explanation: 'Short-term inflammation can raise hs-CRP and make cardiovascular-risk interpretation misleading.' },
        { group: 'everyday', name: 'Smoking, adiposity and inactivity', direction: 'raises', evidence: 'associated-with-favorable-outcomes', magnitude: 'potentially-meaningful', timing: 'Months', explanation: 'These factors are associated with chronic low-grade inflammation and higher cardiovascular risk.' },
      ],
      actions: [reviewAction('hscrp', 'hs-CRP', ['hscrp'], 'An unexpected elevation is often repeated when you are well before it is used for cardiovascular risk decisions.')],
    },

    // ---- Kidney, liver and chemistry --------------------------------------
    {
      id: 'uacr', name: 'Urine albumin-to-creatinine ratio', shortName: 'uACR', category: 'kidney', directionality: 'lower-better', unit: 'mg/g',
      measurements: [{ date: D.c, value: 8, unit: 'mg/g', current: true }],
      reference: { high: 30, unit: 'mg/g', labName: 'Sample Reference Lab', source: 'catalog', note: 'KDIGO A1 category cut-point; confirm an elevated random result.' },
      clinical: { high: 30, unit: 'mg/g', appliesTo: 'Adults at risk for CKD. 30–300 mg/g is A2 and above 300 mg/g is A3.', outcome: 'Detect kidney damage that eGFR alone can miss.', variesBy: 'Exercise, fever, urinary infection, menstruation and sample timing; persistence for at least 3 months matters.', organization: 'KDIGO', datePublished: '2024', evidenceId: 'ev-kdigo-uacr-2024', confidence: 'guideline-backed' },
      favorable: noUniversalOptimal('mg/g', 'Lower kidney and cardiovascular risk', 'Below 30 mg/g is the A1 category; there is no benefit to chasing zero. Trend and persistence matter.', 'ev-kdigo-uacr-2024'),
      meaning: 'uACR detects small amounts of albumin leaking into urine. It complements eGFR and can reveal early kidney damage even when filtration looks normal.',
      patternNote: 'At 8 mg/g this is in KDIGO category A1.',
      related: ['egfr', 'creatinine'],
      influences: [{ group: 'testing', name: 'Temporary albuminuria', direction: 'raises', evidence: 'guideline-backed', magnitude: 'potentially-meaningful', timing: 'Days', explanation: 'Hard exercise, fever, urinary infection and menstruation can temporarily raise uACR; an elevated random result should be confirmed with a first-morning sample.' }],
      actions: [reviewAction('uacr', 'uACR', ['uacr', 'egfr'], 'KDIGO advises confirming an elevated ACR and judging chronicity rather than diagnosing CKD from one sample.')],
    },
    {
      id: 'bun', name: 'Blood urea nitrogen', shortName: 'BUN', category: 'kidney', directionality: 'context-dependent', unit: 'mg/dL',
      measurements: [{ date: D.c, value: 15, unit: 'mg/dL', current: true }],
      reference: { low: 7, high: 20, unit: 'mg/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult interval; laboratories differ.' },
      favorable: noUniversalOptimal('mg/dL', 'Kidney and hydration assessment', 'BUN is context-dependent; there is no optimal value within range. Hydration, protein intake, bleeding and kidney function can all shift it.'),
      meaning: 'BUN measures nitrogen from urea, a protein-breakdown waste product. It is influenced by hydration and protein intake as well as kidney function.',
      patternNote: 'At 15 mg/dL this is within the illustrative catalog interval.',
      related: ['creatinine', 'egfr'],
      influences: [{ group: 'everyday', name: 'Hydration and protein intake', direction: 'either', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Days', explanation: 'Dehydration or high protein intake can raise BUN; low protein intake can lower it.' }],
      actions: [reviewAction('bun', 'BUN', ['bun', 'creatinine', 'egfr'])],
    },
    {
      id: 'alp', name: 'Alkaline phosphatase', shortName: 'ALP', category: 'liver', directionality: 'context-dependent', unit: 'U/L',
      measurements: [{ date: D.c, value: 78, unit: 'U/L', current: true }],
      reference: { low: 44, high: 147, unit: 'U/L', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult interval; age, pregnancy and assay matter.' },
      favorable: noUniversalOptimal('U/L', 'Liver and bone assessment', 'ALP is an in-range, context-dependent marker. Higher or lower is not inherently better.'),
      meaning: 'ALP is an enzyme found mainly in bile ducts and bone. An abnormal result is interpreted with GGT, bilirubin, calcium and the clinical context.',
      patternNote: 'At 78 U/L this is within the illustrative catalog interval.',
      related: ['ggt', 'bilirubin', 'alt'],
      influences: [{ group: 'testing', name: 'Growth, pregnancy and bone turnover', direction: 'raises', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Ongoing', explanation: 'ALP can come from bone as well as liver, so the source must be determined rather than assumed.' }],
      actions: [reviewAction('alp', 'ALP', ['alp', 'ggt', 'bilirubin'])],
    },
    {
      id: 'ggt', name: 'Gamma-glutamyl transferase', shortName: 'GGT', category: 'liver', directionality: 'lower-better', unit: 'U/L',
      measurements: [
        { date: D.p1, value: 35, unit: 'U/L' },
        { date: D.p2, value: 56, unit: 'U/L' },
        { date: D.c, value: 86, unit: 'U/L', current: true },
      ],
      reference: { low: 9, high: 48, unit: 'U/L', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult interval; sex and assay affect the range.' },
      favorable: noUniversalOptimal('U/L', 'Liver and bile-duct assessment', 'There is no universal optimal GGT. It is nonspecific and is most useful in a pattern with ALP and other liver tests.'),
      meaning: 'GGT is an enzyme concentrated in the liver and bile ducts. It can help determine whether a raised ALP is likely coming from the liver.',
      patternNote: 'GGT has risen from 35 to 56 to 86 U/L and is now above the illustrative catalog interval. GGT is nonspecific, but the accompanying ALT and AST elevations make the overall liver-enzyme pattern more important than this number alone.',
      missingContext: 'Alcohol timing, medicines, supplements, metabolic risk and the rest of the liver panel help determine whether the elevation persists and what may be contributing.',
      related: ['alp', 'alt', 'ast', 'bilirubin', 'ferritin'],
      influences: [{ group: 'everyday', name: 'Alcohol use', direction: 'raises', evidence: 'associated-with-favorable-outcomes', magnitude: 'potentially-meaningful', timing: 'Days to weeks', explanation: 'Alcohol can raise GGT, but GGT alone cannot diagnose alcohol-related liver disease.' }],
      actions: [reviewAction('ggt', 'GGT', ['ggt', 'alp', 'alt'])],
    },
    {
      id: 'bilirubin', name: 'Total bilirubin', shortName: 'Bilirubin', category: 'liver', directionality: 'context-dependent', unit: 'mg/dL',
      measurements: [{ date: D.c, value: 0.7, unit: 'mg/dL', current: true }],
      reference: { low: 0.1, high: 1.2, unit: 'mg/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative total-bilirubin interval; fractionation may be needed if elevated.' },
      favorable: noUniversalOptimal('mg/dL', 'Liver and red-cell assessment', 'Bilirubin is not a number to minimize. A persistent elevation is interpreted by direct/indirect fraction and the rest of the panel.'),
      meaning: 'Bilirubin is produced when red blood cells are broken down and is processed by the liver. Elevations can arise before, within or after the liver.',
      patternNote: 'At 0.7 mg/dL this is within the illustrative catalog interval.',
      related: ['alt', 'alp', 'hemoglobin'],
      influences: [{ group: 'testing', name: 'Fasting and Gilbert syndrome', direction: 'raises', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Days', explanation: 'Fasting, illness or dehydration can raise unconjugated bilirubin in people with Gilbert syndrome.' }],
      actions: [reviewAction('bilirubin', 'bilirubin', ['bilirubin', 'alt', 'alp'])],
    },
    {
      id: 'albumin', name: 'Albumin', shortName: 'Albumin', category: 'liver', directionality: 'in-band', unit: 'g/dL',
      measurements: [{ date: D.c, value: 4.5, unit: 'g/dL', current: true }],
      reference: { low: 3.5, high: 5.0, unit: 'g/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult interval; assay and hydration matter.' },
      favorable: noUniversalOptimal('g/dL', 'Protein, liver and fluid-status assessment', 'Albumin should be interpreted within range and in context; higher is not automatically better.'),
      meaning: 'Albumin is the main protein in blood. It reflects several processes—including liver synthesis, inflammation, nutrition, kidney loss and hydration—so it is nonspecific.',
      patternNote: 'At 4.5 g/dL this is within the illustrative catalog interval.',
      related: ['alt', 'uacr'],
      influences: [{ group: 'everyday', name: 'Hydration and inflammation', direction: 'either', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Days to weeks', explanation: 'Dehydration can concentrate albumin; inflammation or fluid overload can lower it.' }],
      actions: [reviewAction('albumin', 'albumin', ['albumin', 'uacr'])],
    },
    {
      id: 'sodium', name: 'Sodium', shortName: 'Na', category: 'electrolytes', directionality: 'in-band', unit: 'mmol/L',
      measurements: [{ date: D.c, value: 140, unit: 'mmol/L', current: true }],
      reference: { low: 135, high: 145, unit: 'mmol/L', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult interval; use the reporting laboratory’s range.' },
      favorable: noUniversalOptimal('mmol/L', 'Fluid and electrolyte balance', 'Sodium must stay in a narrow physiological band. Do not try to “optimize” it with extra salt or water based on one result.'),
      meaning: 'Blood sodium reflects water balance more than dietary sodium intake. Abnormal values can be clinically important and should not be self-corrected.',
      patternNote: 'At 140 mmol/L this is within the illustrative catalog interval.',
      related: ['potassium', 'creatinine'],
      influences: [{ group: 'everyday', name: 'Fluid balance, vomiting or diarrhea', direction: 'either', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Hours to days', explanation: 'Changes in body water and fluid losses can move sodium in either direction.' }],
      actions: [reviewAction('sodium', 'sodium', ['sodium'], 'Meaningful sodium abnormalities can require prompt context-specific care; do not self-treat with salt or water.')],
    },
    {
      id: 'potassium', name: 'Potassium', shortName: 'K', category: 'electrolytes', directionality: 'in-band', unit: 'mmol/L',
      measurements: [{ date: D.c, value: 4.3, unit: 'mmol/L', current: true }],
      reference: { low: 3.5, high: 5.1, unit: 'mmol/L', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult interval; hemolysis can falsely raise the result.' },
      favorable: noUniversalOptimal('mmol/L', 'Heart, nerve and muscle function', 'Potassium must stay within a narrow band. Higher or lower is not better, and supplements can be dangerous without clinical guidance.'),
      meaning: 'Potassium is essential for heart rhythm, nerves and muscles. Both low and high values can matter, and a damaged blood sample can create a false high result.',
      patternNote: 'At 4.3 mmol/L this is within the illustrative catalog interval.',
      related: ['sodium', 'creatinine', 'egfr'],
      influences: [{ group: 'testing', name: 'Sample hemolysis', direction: 'raises', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Blood draw', explanation: 'Red-cell damage during collection can falsely elevate potassium, often prompting a repeat test.' }],
      actions: [reviewAction('potassium', 'potassium', ['potassium', 'egfr'], 'An unexpected potassium result is commonly confirmed and reviewed with kidney function and medications; do not self-supplement.')],
    },

    // ---- Expanded blood-cell, thyroid and nutrient markers ----------------
    {
      id: 'wbc', name: 'White blood cell count', shortName: 'WBC', category: 'blood-cells', directionality: 'in-band', unit: '×10⁹/L',
      measurements: [{ date: D.c, value: 6.1, unit: '×10⁹/L', current: true }],
      reference: { low: 4.0, high: 11.0, unit: '×10⁹/L', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult interval; the differential count provides important context.' },
      favorable: noUniversalOptimal('×10⁹/L', 'Immune and marrow assessment', 'There is no optimal WBC within range. Infection, medicines, smoking and many other factors can change it.'),
      meaning: 'WBC counts immune cells in the blood. A high or low total count is nonspecific and is interpreted with the white-cell differential and symptoms.',
      patternNote: 'At 6.1 ×10⁹/L this is within the illustrative catalog interval.',
      related: ['platelets', 'hemoglobin'],
      influences: [{ group: 'everyday', name: 'Infection, inflammation and acute stress', direction: 'raises', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Hours to days', explanation: 'Common short-term illnesses and stress responses can temporarily raise WBC.' }],
      actions: [reviewAction('wbc', 'WBC', ['wbc'], 'The differential, symptoms and trend usually matter more than the total count alone.')],
    },
    {
      id: 'platelets', name: 'Platelet count', shortName: 'Platelets', category: 'blood-cells', directionality: 'in-band', unit: '×10⁹/L',
      measurements: [{ date: D.c, value: 248, unit: '×10⁹/L', current: true }],
      reference: { low: 150, high: 450, unit: '×10⁹/L', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult interval; laboratories differ.' },
      favorable: noUniversalOptimal('×10⁹/L', 'Clotting and marrow assessment', 'Platelets are an in-band marker; neither a higher nor lower normal value is a goal.'),
      meaning: 'Platelets help blood clot. Counts can change with infection, inflammation, iron deficiency, medicines and bone-marrow conditions.',
      patternNote: 'At 248 ×10⁹/L this is within the illustrative catalog interval.',
      related: ['wbc', 'hemoglobin', 'ferritin'],
      influences: [{ group: 'everyday', name: 'Infection, inflammation or iron deficiency', direction: 'raises', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Days to months', explanation: 'Reactive platelet elevations are common and are interpreted with the rest of the CBC and iron studies.' }],
      actions: [reviewAction('platelets', 'platelets', ['platelets', 'wbc', 'ferritin'])],
    },
    {
      id: 'hematocrit', name: 'Hematocrit', shortName: 'Hct', category: 'blood-cells', directionality: 'in-band', unit: '%',
      measurements: [{ date: D.c, value: 45, unit: '%', current: true }],
      reference: { low: 41, high: 53, unit: '%', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative interval for adult men; sex, altitude and hydration matter.' },
      referencesBySex: {
        male: { low: 41, high: 53, unit: '%', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult-male interval; altitude and hydration matter.' },
        female: { low: 36, high: 46, unit: '%', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative non-pregnant adult-female interval; altitude and hydration matter.' },
      },
      referenceUnspecified: { low: 36, high: 53, unit: '%', labName: 'Sample Reference Lab', source: 'catalog', note: 'Broad illustrative non-pregnant adult interval because sex was not specified; use the range on the report.' },
      favorable: noUniversalOptimal('%', 'Oxygen-carrying red-cell assessment', 'Hematocrit should be interpreted in range with hemoglobin; higher is not better.'),
      meaning: 'Hematocrit is the percentage of blood volume occupied by red blood cells. Hydration can shift it even when red-cell mass has not changed.',
      patternNote: 'At 45% this is within the illustrative catalog interval for adult men.',
      related: ['hemoglobin', 'mcv'],
      influences: [{ group: 'everyday', name: 'Hydration, altitude and smoking', direction: 'either', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Days to months', explanation: 'Dehydration can concentrate hematocrit; altitude and smoking can raise red-cell production.' }],
      actions: [reviewAction('hematocrit', 'hematocrit', ['hematocrit', 'hemoglobin'])],
    },
    {
      id: 'mcv', name: 'Mean corpuscular volume', shortName: 'MCV', category: 'blood-cells', directionality: 'in-band', unit: 'fL',
      measurements: [{ date: D.c, value: 90, unit: 'fL', current: true }],
      reference: { low: 80, high: 100, unit: 'fL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative adult interval.' },
      favorable: noUniversalOptimal('fL', 'Classifying red-cell patterns', 'MCV is a classification clue, not a target. Values within range do not rule out iron, B12 or folate problems.'),
      meaning: 'MCV is the average size of red blood cells. Low values can point toward iron-related or inherited patterns; high values can occur with B12/folate deficiency, alcohol or medicines.',
      patternNote: 'At 90 fL this is within the illustrative catalog interval.',
      related: ['hemoglobin', 'ferritin', 'vitb12'],
      influences: [{ group: 'everyday', name: 'Iron, B12, folate and alcohol', direction: 'either', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Weeks to months', explanation: 'Nutrient status and alcohol exposure can shift red-cell size; the pattern across the CBC matters.' }],
      actions: [reviewAction('mcv', 'MCV', ['mcv', 'hemoglobin', 'ferritin', 'vitb12'])],
    },
    {
      id: 'freet4', name: 'Free thyroxine', shortName: 'Free T4', category: 'thyroid', directionality: 'in-band', unit: 'ng/dL',
      measurements: [{ date: D.c, value: 1.2, unit: 'ng/dL', current: true }],
      reference: { low: 0.8, high: 1.8, unit: 'ng/dL', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative interval; use the assay-specific laboratory range.' },
      favorable: noUniversalOptimal('ng/dL', 'Thyroid assessment', 'Free T4 is interpreted with TSH, symptoms and the assay range. There is no universal optimal value within range.', 'ev-ata-tsh'),
      meaning: 'Free T4 is the unbound portion of the main hormone produced by the thyroid. It helps explain an abnormal TSH and is assay-dependent.',
      patternNote: 'At 1.2 ng/dL this is within the illustrative catalog interval.',
      related: ['tsh'],
      influences: [{ group: 'supplement', name: 'Biotin supplements', direction: 'affects-interpretation', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Days', explanation: 'High-dose biotin can interfere with some thyroid assays; disclose supplement use before testing.' }],
      actions: [reviewAction('freet4', 'free T4', ['freet4', 'tsh'])],
    },
    {
      id: 'vitb12', name: 'Vitamin B12', shortName: 'B12', category: 'nutrients', directionality: 'in-band', unit: 'ng/L',
      measurements: [{ date: D.c, value: 420, unit: 'ng/L', current: true }],
      reference: { low: 180, high: 900, unit: 'ng/L', labName: 'Sample Reference Lab', source: 'catalog', note: 'Illustrative interval aligned to NICE’s lower threshold; assay-specific ranges vary.' },
      clinical: {
        low: 180, unit: 'ng/L',
        appliesTo: 'People aged 16+ being evaluated for B12 deficiency. 180–350 ng/L is indeterminate; above 350 makes deficiency less likely.',
        outcome: 'Identify deficiency while avoiding false reassurance from the absence of anaemia or macrocytosis.',
        variesBy: 'Assay, supplements, pregnancy, metformin/acid-suppressing medicines, kidney disease and symptoms.',
        organization: 'NICE', datePublished: '2024', evidenceId: 'ev-nice-b12-2024', confidence: 'guideline-backed',
      },
      favorable: noUniversalOptimal('ng/L', 'Avoid vitamin B12 deficiency', 'Above 350 ng/L makes deficiency less likely in the NICE framework, but there is no proven benefit to maximizing B12. Symptoms and confirmatory tests can still matter.', 'ev-nice-b12-2024'),
      meaning: 'Vitamin B12 supports nerves, DNA production and red blood cells. Deficiency can occur without anaemia, and a borderline result may need symptoms or additional tests such as methylmalonic acid.',
      patternNote: 'At 420 ng/L this is above the NICE indeterminate band, making deficiency less likely.',
      related: ['mcv', 'hemoglobin'],
      influences: [
        { group: 'everyday', name: 'Low intake of animal or fortified foods', direction: 'lowers', evidence: 'expert-consensus', magnitude: 'potentially-meaningful', timing: 'Months to years', explanation: 'People eating little or no animal food need a reliable fortified-food or supplement source.' },
        { group: 'medication', name: 'Metformin or acid-suppressing medicines', direction: 'lowers', evidence: 'guideline-backed', magnitude: 'potentially-meaningful', timing: 'Months to years', explanation: 'Long-term use can contribute to low B12 in some people; medication changes require a prescriber.' },
      ],
      actions: [{
        id: 'act-vitb12-review',
        action: 'If B12 is below 350 ng/L or symptoms suggest deficiency, ask whether confirmatory testing and a cause-focused treatment plan are appropriate before starting high-dose supplements.',
        rationale: 'NICE separates confirmed, indeterminate and unlikely deficiency bands, and recommends interpreting the result with symptoms and risk factors.',
        addresses: ['vitb12', 'mcv', 'hemoglobin'], frequency: 'Once, if low or indeterminate', horizon: 'Clinical review', confidence: 'guideline-backed', clinicianInvolved: true,
      }],
    },
  ];

  // Cause- and treatment-oriented educational guidance. Medication entries
  // describe options a clinician may consider after establishing the cause;
  // they are never instructions to start, stop or adjust treatment.
  const abnormalGuidance = {
    ldl: guidance(
      ['Inherited lipid patterns (including familial hypercholesterolaemia)', 'Higher saturated/trans-fat intake, excess weight and low activity', 'Diabetes, hypothyroidism, kidney disease or some medicines'],
      ['Lipid-lowering treatment', 'Hyperthyroidism, malnutrition or severe chronic illness', 'Inherited low-lipoprotein patterns (uncommon)'],
      ['Replace saturated fats with unsaturated fats from fish, nuts, seeds and olive oil', 'Increase soluble fibre from oats, beans, lentils or psyllium', 'Build regular aerobic and resistance activity; pursue sustainable weight loss if appropriate', 'Avoid tobacco and manage blood pressure and diabetes risk'],
      ['Risk-based statin therapy is usually the pharmacologic foundation', 'Ezetimibe, bempedoic acid or a PCSK9-targeting therapy may be added when risk and response justify it', 'Secondary causes such as hypothyroidism or nephrotic syndrome are treated directly'],
      'Confirm the result and calculate overall cardiovascular risk. Recheck after a meaningful lifestyle or medication change on the timeline chosen by the prescriber.',
      'Do not change a statin or other lipid medicine based on one result. Pregnancy, liver disease, drug interactions and muscle symptoms can change the safest choice.',
      ['ev-dyslipidemia-2026']
    ),
    hdl: guidance(
      ['Genetics, alcohol intake and some medicines can produce very high HDL', 'Very high HDL is not always protective and should be interpreted with ApoB, LDL-C and non-HDL-C'],
      ['High triglycerides, insulin resistance, smoking, inactivity or excess weight', 'Some inherited lipid patterns, liver disease or medicines'],
      ['Stop smoking, move regularly and improve insulin sensitivity through activity and sustainable weight management', 'Choose unsaturated fats and high-fibre foods while reducing refined carbohydrates', 'Keep alcohol within lower-risk limits; do not drink alcohol to raise HDL'],
      ['Medicines are not prescribed solely to raise HDL because raising the number has not reliably improved outcomes', 'Clinicians instead treat LDL-C, non-HDL-C, ApoB, triglycerides and the person’s overall risk'],
      'Interpret HDL as part of the complete lipid pattern rather than as “good cholesterol” in isolation.',
      'Do not use niacin, alcohol or supplements simply to raise HDL without clinician guidance.',
      ['ev-dyslipidemia-2026']
    ),
    triglycerides: guidance(
      ['Recent food or alcohol, insulin resistance/diabetes, excess weight and refined carbohydrates', 'Hypothyroidism, kidney/liver disease, pregnancy or inherited disorders', 'Medicines such as estrogens, steroids, some antipsychotics, retinoids or certain HIV therapies'],
      ['Low calorie or fat intake, malabsorption, hyperthyroidism or severe illness', 'Some lipid-lowering treatment or inherited low-lipid patterns'],
      ['Reduce or avoid alcohol—especially when triglycerides are very high', 'Reduce sugary drinks and refined carbohydrates; favour fibre-rich minimally processed foods', 'Increase activity and pursue sustainable weight loss when appropriate', 'Improve glucose control with professional support if diabetes is present'],
      ['Statins are the foundation when the goal is cardiovascular-risk reduction', 'Fibrates or prescription omega-3 therapy may be used for severe levels to reduce pancreatitis risk', 'Icosapent ethyl is considered only for selected high-risk people with persistent elevation'],
      'Repeat under standardized conditions if needed and look for diabetes, alcohol, thyroid, kidney, liver, medication and genetic contributors.',
      'Triglycerides around or above 500 mg/dL need prompt clinical review; levels around or above 1,000 mg/dL carry substantial pancreatitis risk.',
      ['ev-dyslipidemia-2026', 'ev-aha-trig-2011']
    ),
    'total-cholesterol': guidance(
      ['High LDL/non-HDL particles, high triglycerides, genetics, hypothyroidism or nephrotic/liver disease', 'Dietary pattern, diabetes and some medicines can contribute'],
      ['Lipid-lowering treatment, hyperthyroidism, malnutrition, malabsorption or severe chronic illness'],
      ['Use the same heart-healthy pattern recommended for LDL and triglycerides', 'Prioritize fibre, unsaturated fat, activity, tobacco avoidance and sustainable weight management'],
      ['Treatment is based on LDL-C, non-HDL-C, ApoB and total cardiovascular risk—not total cholesterol alone', 'Statins and add-on therapies may be appropriate after risk assessment'],
      'Review the component values. A high total cholesterol driven by HDL has different implications from one driven by LDL or triglyceride-rich particles.',
      'Do not choose medication or a target from total cholesterol alone.',
      ['ev-dyslipidemia-2026']
    ),
    'non-hdl': guidance(
      ['Higher LDL and triglyceride-rich particles from genetics, insulin resistance, diabetes, diet, excess weight or hypothyroidism', 'Kidney disease, some medicines and high triglycerides can contribute'],
      ['Lipid-lowering treatment, hyperthyroidism, malnutrition or severe illness'],
      ['Replace saturated fat with unsaturated fat, increase soluble fibre and reduce refined carbohydrates', 'Exercise regularly, avoid tobacco and pursue sustainable weight loss when appropriate'],
      ['Risk-based statin therapy is commonly first-line', 'Ezetimibe, bempedoic acid or PCSK9-targeting therapy may be added for selected risk profiles', 'Marked triglyceride elevation may require additional cause-specific treatment'],
      'Interpret with LDL-C, triglycerides and ApoB; non-HDL-C is particularly useful when triglycerides are elevated.',
      'The goal depends on cardiovascular risk and is not the same for everyone.',
      ['ev-dyslipidemia-2026']
    ),
    apob: guidance(
      ['A larger number of LDL and remnant particles, often with insulin resistance, diabetes or high triglycerides', 'Inherited dyslipidaemia, hypothyroidism, kidney disease or dietary patterns that raise atherogenic particles'],
      ['Lipid-lowering treatment, hyperthyroidism, malnutrition or uncommon inherited low-ApoB disorders'],
      ['Use an LDL-lowering dietary pattern with more unsaturated fat and soluble fibre', 'Increase activity, address excess weight and improve glucose control when relevant', 'Avoid smoking'],
      ['Statins lower ApoB-containing particles; ezetimibe, bempedoic acid and PCSK9-targeting therapies may add lowering', 'Treatment intensity depends on absolute cardiovascular risk and the full lipid pattern'],
      'ApoB is most useful when it changes risk interpretation—for example with diabetes, high triglycerides or discordant LDL-C.',
      'Do not chase an isolated ApoB target without an overall cardiovascular-risk assessment.',
      ['ev-dyslipidemia-2026']
    ),
    lpa: guidance(
      ['Genetics accounts for most of the level', 'Kidney, liver or thyroid disease can sometimes alter it', 'Risk rises continuously; assay units must be preserved'],
      ['A genetically lower level is usual and is not something that needs treatment'],
      ['Lifestyle usually changes Lp(a) very little, but exercise, tobacco avoidance, blood-pressure control and heart-healthy eating reduce overall risk', 'Keep LDL-C and other modifiable risk factors well managed'],
      ['Clinicians may intensify LDL-lowering therapy when high Lp(a) changes overall risk', 'PCSK9-targeting therapies modestly lower Lp(a) while lowering LDL; lipoprotein apheresis is reserved for selected very-high-risk cases', 'Dedicated Lp(a)-lowering drugs remain an evolving specialist area'],
      'Confirm units and generally measure once in adulthood; repeat testing is mainly useful when a secondary cause or major treatment change is suspected.',
      'Supplements and special diets have not been shown to reliably normalize genetically high Lp(a).',
      ['ev-dyslipidemia-2026']
    ),
    hscrp: guidance(
      ['Recent infection, injury, surgery, hard exercise or an inflammatory flare', 'Smoking, excess adiposity, poor metabolic health or chronic inflammatory disease', 'Less commonly, a persistent occult infection or other inflammatory condition'],
      ['A low value is usually reassuring and is not a deficiency state'],
      ['Repeat when well if the elevation was unexpected', 'Stop smoking, exercise consistently, improve sleep and pursue sustainable weight loss when appropriate', 'Use a heart-healthy dietary pattern and manage dental or chronic inflammatory conditions'],
      ['Treatment targets the identified infection or inflammatory disease—not the hs-CRP number', 'Statins may be chosen from overall cardiovascular risk and can also lower hs-CRP', 'Specialist anti-inflammatory therapy is diagnosis-specific and is not started for an isolated hs-CRP'],
      'If above 10 mg/L, clinicians commonly look for acute inflammation and repeat after recovery before using it for cardiovascular risk.',
      'hs-CRP is nonspecific. It cannot diagnose infection, autoimmune disease or cardiovascular disease on its own.',
      ['ev-primary-prevention-2019', 'ev-dyslipidemia-2026']
    ),
    hba1c: guidance(
      ['Prediabetes or diabetes from insulin resistance or reduced insulin production', 'Glucocorticoids, some antipsychotics, endocrine disorders, pregnancy or prolonged illness', 'Iron deficiency and reduced red-cell turnover can falsely raise HbA1c'],
      ['Glucose-lowering treatment, recurrent hypoglycaemia or low calorie intake', 'Blood loss, haemolysis, transfusion, pregnancy or other shortened red-cell survival can falsely lower HbA1c'],
      ['For high-risk adults, aim for at least 150 minutes/week of moderate activity plus resistance training', 'If appropriate, target sustainable 5–7% weight loss through an evidence-based eating pattern', 'Reduce sugary drinks and refined carbohydrates; emphasize fibre-rich foods, adequate sleep and consistent meal patterns'],
      ['Metformin may be considered for selected higher-risk adults with prediabetes', 'Diagnosed diabetes may be treated with metformin, GLP-1-based therapy, SGLT2 inhibitors, insulin or other agents according to heart, kidney, weight and hypoglycaemia considerations', 'Low HbA1c with diabetes treatment may require medication review'],
      'Confirm a diagnostic-range result unless symptoms and unequivocal hyperglycaemia are present. Interpret with glucose and conditions that alter red-cell lifespan.',
      'Never reduce insulin or another glucose-lowering drug without a prescriber. Symptoms of severe high or low glucose require urgent assessment.',
      ['ev-ada-2026', 'ev-ada-prevention-2026']
    ),
    glucose: guidance(
      ['Prediabetes/diabetes, incomplete fasting, acute illness, stress, poor sleep or glucocorticoids', 'Endocrine disorders and some medicines can also raise glucose'],
      ['Glucose-lowering medicines, prolonged fasting, alcohol without food, severe liver/adrenal disease or insulin-producing tumours', 'Sample delay can artifactually lower glucose'],
      ['Use the same activity, eating-pattern, sleep and weight-management strategies described for HbA1c', 'Standardize fasting conditions when repeating a borderline result'],
      ['Prediabetes treatment is risk-based; metformin is considered for selected high-risk adults', 'Diabetes medication is individualized and may include metformin, GLP-1-based therapy, SGLT2 inhibitors, insulin or other agents', 'Documented hypoglycaemia requires review of the cause and any glucose-lowering regimen'],
      'Repeat a borderline fasting value and interpret it with HbA1c or an oral glucose tolerance test when appropriate.',
      'Confusion, fainting, seizures, vomiting, dehydration or very high/low glucose symptoms require urgent care.',
      ['ev-ada-2026', 'ev-ada-prevention-2026']
    ),
    alt: guidance(
      ['Metabolic dysfunction-associated steatotic liver disease, alcohol-related injury or viral hepatitis', 'Medicines/supplements, autoimmune or inherited liver disease', 'Hard exercise or muscle injury can sometimes contribute'],
      ['Low ALT is usually not a treatment target; very low values may accompany low muscle mass, frailty or vitamin B6 deficiency'],
      ['If metabolic liver disease is likely, gradual weight loss, regular activity and improved glucose/lipid control can help', 'Reduce or avoid alcohol while an unexplained elevation is evaluated', 'Review supplements and non-prescription products with a clinician or pharmacist'],
      ['Treatment is cause-specific: antiviral therapy, management of metabolic disease, or supervised withdrawal/substitution of an offending drug', 'Selected people with fibrotic MASH may qualify for specialist-directed therapy', 'Statins are not routinely stopped for a mild isolated elevation'],
      'Confirm the abnormality and interpret the size and pattern with AST, ALP, bilirubin, symptoms, medicines, alcohol and hepatitis risk.',
      'Jaundice, confusion, significant bleeding, severe abdominal pain or very large enzyme elevations need prompt assessment.',
      ['ev-acg-liver-2017', 'ev-aasld-masld-2025', 'ev-fda-statin-2012']
    ),
    ast: guidance(
      ['Liver injury from metabolic disease, alcohol, viral hepatitis, medicines or autoimmune disease', 'Muscle injury, strenuous exercise, heart injury or haemolysis because AST is not liver-specific'],
      ['A low AST is usually not clinically important; occasionally it accompanies low muscle mass or vitamin B6 deficiency'],
      ['Avoid hard exercise before a repeat if muscle contribution is possible', 'Reduce alcohol and use a cardiometabolic health plan when relevant', 'Review medications and supplements rather than stopping them independently'],
      ['Treatment addresses the liver, muscle or other identified cause', 'Clinicians may check CK, hepatitis tests, imaging or other liver studies depending on the pattern'],
      'Compare AST with ALT, ALP, bilirubin and CK; the ratio is only a clue and does not diagnose alcohol-related disease.',
      'Symptoms of acute hepatitis or muscle breakdown, dark urine, jaundice or a marked rise warrant prompt care.',
      ['ev-acg-liver-2017']
    ),
    alp: guidance(
      ['Bile-duct obstruction or cholestatic liver disease, especially when GGT is also high', 'Increased bone turnover, healing fracture, vitamin D/parathyroid disorders', 'Pregnancy and growth can physiologically raise ALP'],
      ['Malnutrition, zinc/magnesium deficiency, hypothyroidism or rare hypophosphatasia'],
      ['There is no universal lifestyle method to lower ALP; address alcohol/metabolic risk only when liver disease is implicated', 'Ensure adequate overall nutrition and bone-health intake when deficiency is confirmed'],
      ['Clinicians may use GGT, ALP isoenzymes, ultrasound or other imaging to identify liver versus bone origin', 'Treatment may involve relieving obstruction, treating PBC/PSC, or treating the responsible bone/endocrine disorder'],
      'Repeat and identify the tissue source before acting on the number.',
      'ALP elevation with jaundice, fever or right-upper-abdominal pain can signal obstruction or infection and needs prompt assessment.',
      ['ev-acg-liver-2017']
    ),
    ggt: guidance(
      ['Alcohol exposure, metabolic liver disease, cholestasis or bile-duct disease', 'Enzyme-inducing medicines and some supplements', 'GGT is sensitive but nonspecific'],
      ['Low GGT is usually not clinically meaningful'],
      ['Reduce or avoid alcohol while an unexplained elevation is assessed', 'Improve metabolic health through activity, weight management and glucose/lipid control when relevant', 'Review medicines and supplements with a clinician'],
      ['Treatment targets the cause; GGT itself is not treated', 'When ALP is high, GGT helps decide whether the source is likely hepatobiliary'],
      'Interpret with ALP, ALT, AST and bilirubin; do not use GGT alone to diagnose alcohol-related liver disease.',
      'Do not stop prescription medicines solely to lower GGT.',
      ['ev-acg-liver-2017']
    ),
    bilirubin: guidance(
      ['Unconjugated: Gilbert syndrome, fasting/illness, haemolysis or ineffective red-cell production', 'Conjugated: hepatitis, medication injury, impaired bile flow or obstruction', 'The direct/indirect fraction and other liver tests determine the pathway'],
      ['Low bilirubin is common and not considered a problem to correct'],
      ['Regular meals and hydration may reduce benign Gilbert-related fluctuations', 'Avoid alcohol and review medicines only when liver disease is suspected', 'No lifestyle plan should delay evaluation of jaundice'],
      ['Gilbert syndrome needs no drug treatment', 'Other treatment may include managing haemolysis/hepatitis or relieving bile-duct obstruction', 'Medication-related injury is handled by a clinician'],
      'Repeat and fractionate persistent elevation; review CBC, liver enzymes, urine/stool changes and symptoms.',
      'New jaundice, pale stool, dark urine, fever, confusion or significant pain needs prompt medical review.',
      ['ev-acg-liver-2017', 'ev-who-anemia-2025']
    ),
    albumin: guidance(
      ['Dehydration is the usual cause of a high serum albumin', 'Prolonged tourniquet use or some medicines can occasionally affect the result'],
      ['Inflammation, liver disease, kidney protein loss or fluid overload', 'Malnutrition, malabsorption, major burns or severe systemic illness'],
      ['Correct hydration only when safe and appropriate', 'Use a balanced protein-adequate diet if intake is genuinely insufficient; a dietitian can help in kidney/liver disease', 'Address alcohol and metabolic risk when liver disease is present'],
      ['Treatment targets the cause—such as kidney/liver disease, inflammation or malabsorption', 'Diuretics, kidney-protective therapy or albumin infusion have narrow diagnosis-specific roles'],
      'Interpret with liver tests, uACR/urinalysis, inflammation, weight change and fluid status.',
      'Do not take high-protein supplements or large fluid loads simply to change albumin.',
      ['ev-medline-albumin', 'ev-kdigo-2024']
    ),
    creatinine: guidance(
      ['Reduced kidney filtration, acute kidney injury, dehydration or urinary obstruction', 'High muscle mass, intense exercise, muscle injury, cooked meat or creatine supplements', 'Some medicines raise creatinine by changing secretion without true kidney injury'],
      ['Low muscle mass, ageing/frailty, malnutrition or severe liver disease', 'Pregnancy can lower creatinine through increased filtration'],
      ['Avoid dehydration and unnecessary NSAID use when clinically appropriate', 'Control blood pressure and diabetes, avoid tobacco and exercise regularly', 'Do not overuse creatine or high-dose protein supplements before a standardized repeat'],
      ['Treatment depends on cause: restore circulation, relieve obstruction, treat infection or adjust a contributing medicine', 'For established CKD, ACE inhibitor/ARB, SGLT2 inhibitor and other therapies may protect kidneys in eligible people'],
      'Interpret with eGFR, uACR, prior values, muscle mass and medication changes; repeat promptly if an acute rise is suspected.',
      'Falling urine output, swelling, breathlessness, vomiting or a rapid creatinine rise needs urgent assessment.',
      ['ev-medline-creatinine', 'ev-kdigo-2024']
    ),
    egfr: guidance(
      ['An unusually high estimate can reflect low creatinine from low muscle mass or pregnancy; early diabetic hyperfiltration is another possibility'],
      ['Chronic kidney disease, acute kidney injury, dehydration, poor kidney blood flow or urinary obstruction', 'Creatinine-based equations can underestimate filtration in very muscular people'],
      ['Control blood pressure and glucose, avoid tobacco, remain active and use a kidney-appropriate eating pattern', 'Avoid recurrent dehydration and unnecessary nephrotoxic medicines', 'Protein, sodium and potassium advice should be individualized rather than self-restricted'],
      ['ACE inhibitor/ARB and SGLT2 inhibitor therapy may slow CKD in eligible people', 'Finerenone or GLP-1-based therapy has roles in selected diabetic CKD', 'Acute reductions require cause-specific treatment and medication review'],
      'CKD requires persistence for at least three months or other evidence of kidney damage. Confirm unexpected values and pair with uACR.',
      'A rapid decline, eGFR below 30, severe albuminuria or symptoms of kidney failure warrants timely specialist review.',
      ['ev-kdigo-2024']
    ),
    uacr: guidance(
      ['Persistent kidney damage from diabetes, hypertension or glomerular disease', 'Temporary elevation from hard exercise, fever, urinary infection, menstruation or marked hyperglycaemia', 'Heart failure and other systemic illness can contribute'],
      ['Below 30 mg/g is category A1 and does not need to be pushed toward zero'],
      ['Use good blood-pressure and glucose control, avoid smoking and follow a kidney-appropriate lower-sodium pattern', 'Exercise regularly, but avoid hard exercise immediately before a confirmation sample'],
      ['ACE inhibitor or ARB therapy reduces albuminuria and kidney risk in eligible people', 'SGLT2 inhibitors and, in selected diabetic CKD, finerenone may add kidney/cardiovascular protection'],
      'Confirm an elevated random result with a first-morning sample and establish persistence; interpret alongside eGFR.',
      'Do not diagnose CKD or start medication from one elevated sample.',
      ['ev-kdigo-uacr-2024', 'ev-kdigo-2024']
    ),
    bun: guidance(
      ['Reduced kidney function, dehydration, high protein intake or catabolic illness', 'Gastrointestinal bleeding, steroids, burns, heart failure or poor kidney perfusion'],
      ['Low protein intake, malnutrition, overhydration or reduced urea production from liver disease'],
      ['Normalize hydration only when safe; use an appropriate—not automatically high or low—protein intake', 'Review supplements and recent dietary changes', 'Manage blood pressure, diabetes and kidney risk'],
      ['Treatment addresses kidney injury, bleeding, liver disease or fluid imbalance', 'Medication changes and protein targets depend on the diagnosis and kidney stage'],
      'Interpret with creatinine, eGFR, hydration, diet, medications and symptoms.',
      'Do not use BUN alone to diagnose kidney failure or deliberately overhydrate to lower it.',
      ['ev-medline-bun', 'ev-kdigo-2024']
    ),
    tsh: guidance(
      ['Primary hypothyroidism, autoimmune thyroiditis or inadequate thyroid-hormone replacement', 'Poor absorption or interactions with iron, calcium, food and some medicines', 'Recovery from illness can transiently raise TSH'],
      ['Hyperthyroidism, thyroiditis or excessive thyroid-hormone replacement', 'Pregnancy, severe illness, pituitary disease or assay interference can alter interpretation'],
      ['There is no proven diet that replaces thyroid hormone or treats Graves’ disease', 'Take prescribed levothyroxine consistently and separate it from interfering products as instructed', 'Avoid high-dose iodine/kelp and disclose biotin use before testing'],
      ['Confirmed hypothyroidism is usually treated with levothyroxine', 'Hyperthyroidism treatment may include beta-blockers for symptoms, antithyroid drugs, radioactive iodine or surgery depending on cause', 'Replacement doses are adjusted using repeat testing and clinical context'],
      'Always interpret TSH with free T4, symptoms, pregnancy status, medicines and prior values; repeat after an appropriate interval if mildly abnormal.',
      'Do not start iodine or change thyroid medication yourself. Palpitations, chest pain, severe weakness or confusion require prompt care.',
      ['ev-ata-tsh', 'ev-ata-hyperthyroidism']
    ),
    freet4: guidance(
      ['Hyperthyroidism, thyroiditis or excessive thyroid-hormone replacement', 'Assay interference—including biotin—or uncommon binding/protein effects'],
      ['Primary hypothyroidism, pituitary/hypothalamic disease or severe non-thyroid illness', 'Some medicines can reduce production, conversion or measured free T4'],
      ['Use thyroid medicine exactly as prescribed and time blood tests consistently relative to dosing', 'Avoid high-dose iodine/kelp and disclose biotin', 'Lifestyle supports general health but does not correct true hormone deficiency or excess'],
      ['Low free T4 with primary hypothyroidism is generally treated with levothyroxine', 'High free T4 from hyperthyroidism may require antithyroid therapy, radioactive iodine or surgery', 'Central patterns require endocrine evaluation rather than TSH-only dosing'],
      'Interpret with TSH and symptoms; repeat with an assay-aware plan if results conflict with the clinical picture.',
      'Do not change thyroid hormone or antithyroid medication from a single result.',
      ['ev-ata-tsh', 'ev-ata-hyperthyroidism']
    ),
    hemoglobin: guidance(
      ['Dehydration, altitude, smoking or chronic low oxygen from lung disease/sleep apnoea', 'Testosterone or erythropoietin use, kidney tumours or myeloproliferative disease'],
      ['Blood loss, iron/B12/folate deficiency, inflammation, kidney disease or pregnancy', 'Haemolysis, inherited red-cell disorders or bone-marrow disease'],
      ['Use iron-, B12- and folate-containing foods when a deficiency is established', 'Stop smoking and evaluate possible sleep apnoea or chronic lung disease', 'Hydrate normally before a repeat; do not overhydrate'],
      ['Iron or B12 replacement is used only for confirmed deficiency and the cause of loss/malabsorption is treated', 'Erythropoiesis-stimulating therapy has selected CKD/oncology roles; transfusion is severity- and symptom-dependent', 'Polycythaemia may require phlebotomy and specialist cytoreductive therapy'],
      'Review MCV, ferritin, B12, reticulocytes and symptoms; high values may need oxygen assessment and a repeat when normally hydrated.',
      'Chest pain, severe breathlessness, fainting, active bleeding or neurologic symptoms require urgent assessment.',
      ['ev-who-hgb-2024', 'ev-who-anemia-2025']
    ),
    wbc: guidance(
      ['Infection, inflammation, allergy, tissue injury, pregnancy, smoking or acute stress', 'Corticosteroids and other medicines', 'Persistent marked elevation can reflect a marrow or blood disorder'],
      ['Viral infection, severe infection, autoimmune disease, liver/spleen disease or nutrient deficiency', 'Chemotherapy and many other medicines', 'Bone-marrow failure or blood cancer'],
      ['Do not try to “boost immunity” from the total count alone', 'Stop smoking and support recovery with sleep, nutrition and appropriate infection care', 'If neutropenic, follow clinician-specific food and infection precautions'],
      ['Treatment targets the cause: antimicrobials for a diagnosed infection, adjustment of a causative medicine, immune treatment or cancer therapy', 'Growth factor such as G-CSF is reserved for selected neutropenia'],
      'Repeat with a white-cell differential and smear when appropriate; symptoms and the specific cell type matter more than the total alone.',
      'Fever with significant neutropenia is an emergency. Persistent unexplained elevation, weight loss, bruising or night sweats needs timely review.',
      ['ev-medline-wbc']
    ),
    platelets: guidance(
      ['Reactive rise from infection, inflammation, iron deficiency, surgery or loss of spleen function', 'Less commonly, a myeloproliferative neoplasm or other cancer'],
      ['Sample clumping, viral infection, medicines, alcohol/liver-spleen disease or immune thrombocytopenia', 'Bone-marrow failure, thrombotic microangiopathy or severe systemic illness'],
      ['There is no direct lifestyle method to normalize platelets; treat iron deficiency/inflammation and reduce alcohol only when relevant', 'Avoid tobacco and manage cardiovascular risk if a persistent high count is confirmed'],
      ['Reactive abnormalities are treated by addressing the cause', 'Immune thrombocytopenia may require corticosteroids, IVIG or thrombopoietin-receptor therapy', 'High-risk myeloproliferative disease may require aspirin and cytoreduction under specialist care'],
      'Confirm with repeat CBC and smear; bleeding/clotting symptoms and trend determine urgency.',
      'Do not start aspirin for a high count or stop it for a low count without advice. Active bleeding or stroke/clot symptoms are emergencies.',
      ['ev-nhlbi-platelets']
    ),
    hematocrit: guidance(
      ['Dehydration, altitude, smoking, sleep apnoea or chronic lung/heart disease', 'Testosterone/erythropoietin use or polycythaemia'],
      ['Anaemia from blood loss, nutrient deficiency, kidney disease, inflammation, haemolysis or marrow disease', 'Pregnancy or fluid overload can dilute hematocrit'],
      ['Hydrate normally, stop smoking and evaluate possible sleep apnoea', 'Use nutrient-focused changes only after confirming the deficiency'],
      ['Treatment mirrors the haemoglobin cause: replacement for proven deficiency, treatment of blood loss/chronic disease, or selected ESA/transfusion use', 'True erythrocytosis may require phlebotomy and specialist therapy'],
      'Interpret with haemoglobin, red-cell count, MCV and hydration; repeat persistent abnormalities.',
      'Do not donate blood or take iron simply to change hematocrit without establishing the cause.',
      ['ev-who-hgb-2024', 'ev-who-anemia-2025']
    ),
    mcv: guidance(
      ['B12 or folate deficiency, alcohol use, liver disease, hypothyroidism or some medicines', 'Reticulocytosis after blood loss/haemolysis or a marrow disorder'],
      ['Iron deficiency, thalassaemia trait, inflammation/chronic disease, lead exposure or sideroblastic disorders'],
      ['Use iron-, folate- and B12-rich foods when intake is inadequate', 'Reduce alcohol if macrocytosis is present', 'Address gastrointestinal symptoms or restrictive diets that may impair absorption'],
      ['Replace only the confirmed nutrient deficiency and investigate blood loss/malabsorption', 'Treat thyroid, liver, inflammatory or marrow disease as appropriate', 'Haemoglobinopathy testing may explain persistent low MCV'],
      'Interpret with haemoglobin, RDW, reticulocytes, ferritin, B12/folate and smear rather than treating MCV itself.',
      'Do not take folic acid alone when B12 deficiency is possible because anaemia may improve while neurologic injury progresses.',
      ['ev-who-anemia-2025', 'ev-nice-b12-2024', 'ev-who-ferritin-2020']
    ),
    ferritin: guidance(
      ['Inflammation/infection, liver disease, metabolic dysfunction or recent iron treatment', 'Iron overload from haemochromatosis, repeated transfusions or excess supplementation', 'Ferritin can be high even when usable iron is low'],
      ['Iron deficiency from menstrual or gastrointestinal blood loss, pregnancy, low intake or malabsorption', 'Frequent blood donation can contribute'],
      ['Eat iron-rich foods and pair plant iron with vitamin C when deficiency is confirmed', 'Address heavy menstrual loss and gastrointestinal symptoms with a clinician', 'Avoid unnecessary iron supplements when ferritin is high'],
      ['Oral iron is common first-line treatment for confirmed deficiency; IV iron is used for selected intolerance, malabsorption or higher-need settings', 'The cause of blood loss must be treated', 'Confirmed iron overload may require phlebotomy or specialist chelation'],
      'Interpret with transferrin saturation, CBC and inflammation; a normal/high ferritin does not exclude deficiency during inflammation.',
      'Do not take iron “just in case.” Iron overload and occult gastrointestinal bleeding both require diagnosis-specific care.',
      ['ev-who-ferritin-2020', 'ev-who-anemia-2025']
    ),
    vitd: guidance(
      ['Excess vitamin D supplementation; very high levels can cause hypercalcaemia and kidney injury'],
      ['Low sun exposure, low intake, darker skin pigmentation, ageing or obesity', 'Malabsorption, liver/kidney disease and some anticonvulsant or glucocorticoid medicines'],
      ['Use food sources such as fortified foods and oily fish', 'Use safe, modest sun exposure consistent with skin-cancer guidance—never tanning beds', 'Take only an evidence-based maintenance supplement when appropriate'],
      ['Confirmed deficiency may be treated with vitamin D2 or D3 using a clinician-selected dose and interval', 'Malabsorption, kidney/liver disease and calcium disorders require specialized regimens', 'Toxicity is treated by stopping excess intake and managing hypercalcaemia medically'],
      'Interpret the reason for testing, calcium, kidney function and supplement dose; routine target-chasing is not recommended for healthy adults.',
      'More is not better. Long-term high doses can cause kidney stones, arrhythmia and kidney failure.',
      ['ev-nih-vitd-2025', 'ev-vitd-endo-2024', 'ev-vitd-nam-2011']
    ),
    vitb12: guidance(
      ['Supplements or injections are the common cause', 'Liver/kidney disease, inflammation or myeloid disorders can raise total B12 without proving adequate cellular function'],
      ['Low animal/fortified-food intake, autoimmune gastritis or gastric/ileal surgery', 'Coeliac/Crohn disease, metformin, acid-suppressing medicines or nitrous oxide exposure'],
      ['Use reliable fortified foods or supplements for vegan/low-animal-food diets', 'Avoid recreational nitrous oxide', 'Address malabsorption risk and medication review with a clinician'],
      ['Oral replacement is appropriate for many dietary or uncertain causes', 'Lifelong intramuscular replacement is used for autoimmune gastritis, total gastrectomy or complete terminal-ileal resection', 'Neurologic symptoms may prompt treatment before every test is finalized'],
      'Borderline results may need methylmalonic acid or homocysteine plus symptom/risk assessment.',
      'Do not assume a high total B12 from supplements guarantees normal function; do not treat folate deficiency without excluding B12 deficiency.',
      ['ev-nice-b12-2024']
    ),
    sodium: guidance(
      ['Water deficit from dehydration, diarrhoea, fever or impaired access to water', 'Diabetes insipidus or osmotic water loss', 'Rarely, excessive sodium administration'],
      ['Water retention from SIADH, heart failure, cirrhosis or kidney disease', 'Diuretics, antidepressants and other medicines', 'Vomiting/diarrhoea, adrenal insufficiency or excessive water intake'],
      ['There is no safe universal lifestyle correction; follow an individualized fluid plan', 'Replace ordinary fluid losses appropriately and review endurance-exercise hydration habits', 'Do not force water or salt'],
      ['Treatment depends on volume status and cause and may use controlled fluids, fluid restriction, saline, diuretics or diagnosis-specific hormonal therapy', 'Correction rate is carefully limited to prevent brain injury'],
      'Repeat unexpected results and assess glucose, serum/urine osmolality, medicines and volume status.',
      'Confusion, seizures, severe weakness or a marked sodium abnormality is an emergency. Never self-correct aggressively.',
      ['ev-medline-sodium']
    ),
    potassium: guidance(
      ['Sample haemolysis, kidney impairment, uncontrolled diabetes/acidosis or tissue breakdown', 'ACE inhibitors/ARBs, mineralocorticoid antagonists, potassium-sparing diuretics, trimethoprim and supplements', 'Adrenal insufficiency or low aldosterone'],
      ['Vomiting/diarrhoea, diuretics, laxative overuse, low magnesium or poor intake', 'Excess aldosterone, some kidney-tubule disorders or insulin/beta-agonist shifts'],
      ['Dietary potassium changes should follow confirmation and kidney/medication review', 'Correct vomiting, diarrhoea or laxative misuse and maintain balanced intake', 'Do not use potassium salt substitutes or supplements without advice'],
      ['Low potassium may require oral/IV potassium and magnesium plus treatment of losses', 'High potassium may require medication adjustment, diuretics or potassium binders', 'Severe hyperkalaemia may need urgent calcium, insulin/glucose and other hospital treatment'],
      'Repeat a possible haemolysed sample and review ECG, kidney function, glucose/acid-base status and medicines.',
      'Both high and low potassium can trigger dangerous arrhythmias. Weakness, palpitations or a marked abnormality needs urgent assessment.',
      ['ev-ukka-potassium-2023', 'ev-kdigo-2024']
    ),
  };

  // ── The three overview priorities ─────────────────────────────────────────
  /** @type {import('./types').Priority[]} */
  const priorities = [
    {
      id: 'pri-ldl',
      title: 'LDL cholesterol',
      statusLabel: 'Improving, but still elevated',
      trend: 'improving',
      interpretation:
        'LDL-C has fallen from 148 to 122 mg/dL but remains above the sample laboratory cut-point. The appropriate target depends on overall cardiovascular risk.',
      nextStep: 'Review overall cardiovascular risk and ask what LDL-C target and treatment approach fit that risk.',
      biomarkerIds: ['ldl'],
      urgency: 'worth-discussing',
    },
    {
      id: 'pri-alt',
      title: 'ALT (liver enzyme)',
      statusLabel: 'Elevated and increasing',
      trend: 'worsening',
      interpretation:
        'ALT has risen from 32 to 78 U/L. AST and GGT are elevated too, making the combined liver-enzyme pattern more useful than ALT alone.',
      nextStep: 'Ask whether the liver panel should be repeated and review alcohol, exercise, medicines and supplements beforehand.',
      biomarkerIds: ['alt'],
      urgency: 'worth-discussing',
    },
    {
      id: 'pri-ggt',
      title: 'GGT (liver enzyme)',
      statusLabel: 'Elevated alongside ALT and AST',
      trend: 'worsening',
      interpretation:
        'GGT has risen from 35 to 86 U/L. It is nonspecific, but the parallel ALT and AST elevations make this a pattern worth confirming.',
      nextStep: 'Review alcohol exposure, medicines, supplements and the rest of the liver panel with a clinician.',
      biomarkerIds: ['ggt'],
      urgency: 'worth-discussing',
    },
  ];

  // ── Active-report resolution ───────────────────────────────────────────────
  // `biomarkers` above is the static CATALOG (clinical definitions + the demo's
  // Generic Patient measurements). At runtime the app may instead show measurements
  // the user typed or that were parsed from their own PDF. We keep the clinical
  // definitions (reference/guideline/favorable/meaning/influences) — which are
  // valid for anyone — and swap in the user's measurements. Narrative fields that
  // were written specifically for the demo (patternNote, missingContext, tuned
  // actions/questions) are gated to demo mode by the UI via `bm.userMode`.
  const catalog = biomarkers;
  const catalogById = {};
  catalog.forEach((b) => {
    b.guidance = abnormalGuidance[b.id];
    catalogById[b.id] = b;
  });
  const demoProfile = profile;
  const demoPriorities = priorities;

  /** @returns {?{mode:string, name?:string, sex?:string, age?:number, fasting?:boolean, collectionDate?:string, context?:string, therapies?:any[], measurements:Object, order?:string[]}} */
  function activeReport() {
    return (B.lib && B.lib.state && B.lib.state.report) || null;
  }

  function resolveBiomarkers() {
    const rep = activeReport();
    if (!rep || rep.mode === 'demo') return catalog;
    const out = [];
    const order = rep.order || Object.keys(rep.measurements || {});
    order.forEach((id) => {
      const def = catalogById[id];
      const ms = rep.measurements && rep.measurements[id];
      if (def && ms && ms.length) {
        const sex = rep.sex === 'male' || rep.sex === 'female' ? rep.sex : '';
        const catalogReference = (sex && def.referencesBySex && def.referencesBySex[sex]) || def.referenceUnspecified || def.reference;
        const catalogClinical = (sex && def.clinicalBySex && def.clinicalBySex[sex]) || (def.clinicalBySex ? undefined : def.clinical);
        const reportRef = rep.references && rep.references[id];
        const reference = reportRef
          ? Object.assign({}, reportRef, { source: 'report', labName: reportRef.labName || 'Your uploaded / entered report', note: reportRef.note || 'Entered or confirmed from your report.' })
          : Object.assign({}, catalogReference, { source: 'catalog', labName: 'LabReview catalog', note: `${catalogReference.note || 'Illustrative adult range.'} LabReview did not capture a range from your report; use the range printed by your laboratory.` });
        out.push(Object.assign({}, def, { measurements: ms.slice(), reference, clinical: catalogClinical, userMode: true }));
      }
    });
    return out;
  }

  function resolveProfile() {
    const rep = activeReport();
    if (!rep || rep.mode === 'demo') return demoProfile;
    const bms = resolveBiomarkers();
    const dates = [];
    bms.forEach((b) => b.measurements.forEach((m) => m.date && dates.push(m.date)));
    dates.sort();
    return {
      name: rep.name || 'You',
      age: rep.age || null,
      sexForInterpretation: rep.sex || 'not specified',
      collectionDate: rep.collectionDate || dates[dates.length - 1] || '',
      fasting: !!rep.fasting,
      priorTestDates: [],
      context: rep.context || '',
      therapies: rep.therapies || [],
    };
  }

  // Generic, value-driven narrative helpers for user data (never diagnostic).
  function statusLabelFor(flag, t) {
    const dir = { improving: 'improving', worsening: 'worth watching', stable: 'stable', 'insufficient-data': 'new reading' }[t.direction];
    if (flag === 'unit-mismatch') return 'Unit needs confirmation';
    if (flag === 'high') return `Above the lab reference · ${dir}`;
    if (flag === 'low') return `Below the lab reference · ${dir}`;
    return `Within the lab reference · ${dir}`;
  }
  function interpretationFor(bm, flag, t) {
    const cur = B.lib.current(bm);
    if (flag === 'unit-mismatch') return `Your ${bm.name} is recorded as ${cur.value} ${cur.unit}, but the available reference uses ${bm.reference.unit}. LabReview has not compared or converted these units.`;
    const where = flag === 'high' ? 'above' : flag === 'low' ? 'below' : 'within';
    let s = `Your ${bm.name} is ${cur.value} ${cur.unit}, ${where} the laboratory reference range`;
    if (t.direction === 'improving') s += ' and moving in a reassuring direction';
    else if (t.direction === 'worsening') s += ' and has moved further from range since your previous result';
    s += '. This is a signal to review, not a diagnosis.';
    return s;
  }
  function nextStepFor(bm, flag) {
    if (bm.clinical) return `Discuss the target appropriate for you with a clinician, and whether ${bm.shortName} should be repeated.`;
    return `Bring this ${bm.shortName} result to a clinician to interpret in the context of your history.`;
  }

  function computeUserPriorities(bms) {
    const scored = bms
      .map((bm) => {
        const flag = B.lib.labFlag(bm);
        const t = B.lib.computeTrend(bm);
        let score = 0;
        if (flag === 'unit-mismatch') score += 4;
        if (flag === 'high' || flag === 'low') score += 2;
        if (t.direction === 'worsening') score += 2;
        if (t.direction === 'improving' && (flag === 'high' || flag === 'low')) score += 1;
        return { bm, flag, t, score };
      })
      .filter((x) => x.score > 0);
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map(({ bm, flag, t }) => ({
      id: 'pri-' + bm.id,
      title: bm.name,
      statusLabel: statusLabelFor(flag, t),
      trend: t.direction,
      interpretation: interpretationFor(bm, flag, t),
      nextStep: nextStepFor(bm, flag),
      biomarkerIds: [bm.id],
      urgency: B.lib.classify(bm, false).level,
    }));
  }

  function resolvePriorities() {
    const rep = activeReport();
    if (!rep || rep.mode === 'demo') return demoPriorities;
    return computeUserPriorities(resolveBiomarkers());
  }

  B.data = {
    evidence,
    catalog,
    /** All biomarker definitions, for the manual-entry form. */
    catalogList: () => catalog,
    /** @param {string} id */
    evidenceById: (id) => evidence[id],
    /** @param {string} id */
    biomarker: (id) => resolveBiomarkers().find((b) => b.id === id) || catalogById[id],
    /** Whether a marker is present in the active report. */
    hasMarker: (id) => resolveBiomarkers().some((b) => b.id === id),
    get biomarkers() {
      return resolveBiomarkers();
    },
    get profile() {
      return resolveProfile();
    },
    get priorities() {
      return resolvePriorities();
    },
  };
})(window.Baseline);
