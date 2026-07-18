/**
 * Baseline — Typed data model (authored as JSDoc typedefs).
 *
 * This file defines the shape of every clinical and product entity used by the
 * prototype. It intentionally contains NO presentation logic — clinical content
 * lives in data.js and rendering lives in components.js / screens.js.
 *
 * These typedefs are consumed by editors and can be checked with
 * `tsc --checkJs --allowJs --noEmit` if a TypeScript toolchain is available.
 * The running app does not require compilation.
 *
 * @namespace Baseline
 */
window.Baseline = window.Baseline || {};

/**
 * Confidence / evidence-strength labels. Ordered from strongest to weakest.
 * @typedef {(
 *   'guideline-backed' |
 *   'strong-outcome-evidence' |
 *   'associated-with-favorable-outcomes' |
 *   'expert-consensus' |
 *   'evidence-uncertain'
 * )} EvidenceLabel
 */

/**
 * Deterministic urgency levels. Assigned by the safety layer (lib.js),
 * never by generative text.
 * @typedef {('routine' | 'worth-discussing' | 'prompt-clinical-review' | 'urgent')} UrgencyLevel
 */

/**
 * Trend direction relative to prior measurements.
 * @typedef {('improving' | 'worsening' | 'stable' | 'insufficient-data')} TrendDirection
 */

/**
 * Biomarker category groupings used for filtering.
 * @typedef {(
 *   'cardiovascular' | 'blood-sugar' | 'liver' | 'kidney' |
 *   'thyroid' | 'blood-cells' | 'nutrients' | 'electrolytes' |
 *   'inflammation'
 * )} Category
 */

/**
 * Whether "better" for a marker means lower, higher, within-a-band, or is not
 * a simple continuum. Drives whether optimization language is permitted.
 * @typedef {('lower-better' | 'higher-better' | 'in-band' | 'context-dependent')} Directionality
 */

/**
 * A structured, citable evidence source.
 * @typedef {Object} EvidenceSource
 * @property {string} id
 * @property {string} claim              Plain-language claim this source supports.
 * @property {string} biomarkerId        Marker the claim applies to.
 * @property {string} population         Population the evidence applies to.
 * @property {string} organization       Issuing/authoring organization.
 * @property {string} title              Source title.
 * @property {string} datePublished      Publication or revision date (ISO or year).
 * @property {string} url                Link to the source.
 * @property {('clinical-guideline'|'official-labeling'|'systematic-review'|'consensus-statement'|'government-agency'|'observational-study')} evidenceType
 * @property {EvidenceLabel} confidence
 * @property {string} lastReviewed       When this dataset entry was last reviewed.
 */

/**
 * The laboratory reference interval printed on the report.
 * @typedef {Object} ReferenceInterval
 * @property {number} [low]
 * @property {number} [high]
 * @property {string} unit
 * @property {string} labName            Laboratory the range came from.
 * @property {string} note               "Sample-laboratory range" labelling.
 * @property {('report'|'catalog')} [source] Whether copied from the user's report or supplied by the catalog.
 */

/**
 * A recognized clinical decision threshold or guideline range.
 * @typedef {Object} ClinicalTarget
 * @property {number} [low]
 * @property {number} [high]
 * @property {string} unit
 * @property {string} appliesTo          Who the recommendation applies to.
 * @property {string} outcome            Outcome it is intended to influence.
 * @property {string} variesBy           What changes the target (age/sex/risk/etc.).
 * @property {string} organization
 * @property {string} datePublished
 * @property {string} evidenceId         -> EvidenceSource.id
 * @property {EvidenceLabel} confidence
 */

/**
 * A carefully qualified favorable ("optimal") target — always objective-scoped.
 * @typedef {Object} FavorableTarget
 * @property {number} [low]
 * @property {number} [high]
 * @property {string} unit
 * @property {string} objective          The health objective, e.g. "lower cardiovascular risk".
 * @property {string} population         Population the evidence applies to.
 * @property {string} tradeoffs          Important tradeoffs.
 * @property {string} evidenceId         -> EvidenceSource.id
 * @property {EvidenceLabel} confidence
 * @property {boolean} [none]            When true, no defensible optimal exists.
 * @property {string} [noneNote]         Message shown when none === true.
 */

/**
 * A single measurement of a biomarker at a point in time.
 * @typedef {Object} Measurement
 * @property {string} date               ISO collection date.
 * @property {number} value
 * @property {string} unit
 * @property {boolean} [fasting]
 * @property {boolean} [current]         The measurement under review.
 */

/**
 * A factor that may influence a result.
 * @typedef {Object} ContextualFactor
 * @property {('everyday'|'medication'|'supplement'|'testing')} group
 * @property {string} name
 * @property {('raises'|'lowers'|'either'|'affects-interpretation')} direction
 * @property {EvidenceLabel} evidence
 * @property {('small'|'potentially-meaningful')} magnitude
 * @property {string} timing
 * @property {string} explanation
 */

/**
 * A concrete, measurable practical action.
 * @typedef {Object} PracticalAction
 * @property {string} id
 * @property {string} action             Specific, measurable action text.
 * @property {string} rationale          Why it may help.
 * @property {string[]} addresses        Biomarker ids / outcomes it addresses.
 * @property {string} frequency
 * @property {string} horizon            Expected time horizon.
 * @property {EvidenceLabel} confidence
 * @property {boolean} clinicianInvolved Whether professional guidance is needed.
 * @property {('planned'|'in-progress'|'completed'|'not-for-me'|'unset')} [status]
 */

/**
 * Cause- and treatment-oriented education for an abnormal result.
 * Medication content describes clinician-managed options, not user instructions.
 * @typedef {Object} AbnormalGuidance
 * @property {string[]} highCauses
 * @property {string[]} lowCauses
 * @property {string[]} lifestyle
 * @property {string[]} clinicianManaged
 * @property {string} followUp
 * @property {string} safety
 * @property {string[]} evidenceIds
 */

/**
 * A full biomarker definition + clinical content.
 * @typedef {Object} Biomarker
 * @property {string} id
 * @property {string} name
 * @property {string} shortName
 * @property {Category} category
 * @property {Directionality} directionality
 * @property {string} unit
 * @property {Measurement[]} measurements     Chronological; last item is current.
 * @property {ReferenceInterval} reference
 * @property {Record<string, ReferenceInterval>} [referencesBySex] Optional catalog fallbacks keyed by male/female.
 * @property {ReferenceInterval} [referenceUnspecified] Broad fallback when sex is not supplied.
 * @property {ClinicalTarget} [clinical]      Optional — only when one exists.
 * @property {Record<string, ClinicalTarget>} [clinicalBySex] Optional sex-specific clinical thresholds.
 * @property {FavorableTarget} [favorable]    Optional — only when defensible.
 * @property {string} meaning                 Plain-language meaning (2-3 sentences).
 * @property {string} [patternNote]           Interpretation of the trend/pattern.
 * @property {string} [missingContext]        Context that limits interpretation.
 * @property {string[]} [related]             Related biomarker ids.
 * @property {ContextualFactor[]} [influences]
 * @property {PracticalAction[]} [actions]
 * @property {string[]} [clinicianQuestions]
 * @property {AbnormalGuidance} [guidance]
 */

/**
 * A prioritized item on the overview (max 3 shown).
 * @typedef {Object} Priority
 * @property {string} id
 * @property {string} title
 * @property {string} statusLabel        e.g. "Improving, but still above target".
 * @property {TrendDirection} trend
 * @property {string} interpretation     One sentence.
 * @property {string} nextStep           One practical next step.
 * @property {string[]} biomarkerIds     Marker(s) in this cluster.
 * @property {UrgencyLevel} urgency
 */

/**
 * A medication or supplement with a timeline.
 * @typedef {Object} Therapy
 * @property {string} id
 * @property {('medication'|'supplement')} kind
 * @property {string} name
 * @property {string} [dose]
 * @property {string} [startDate]        May be undefined (unknown-start state).
 * @property {string} [stopDate]
 * @property {{date:string,dose:string}[]} [doseChanges]
 * @property {string[]} [monitors]       Biomarker ids routinely monitored.
 * @property {string} [note]
 */

/**
 * The subject / user profile.
 * @typedef {Object} Profile
 * @property {string} name
 * @property {number} age
 * @property {string} sexForInterpretation
 * @property {string} collectionDate
 * @property {boolean} fasting
 * @property {string[]} priorTestDates
 * @property {string} context            Free-text lifestyle context.
 * @property {Therapy[]} therapies
 */

/**
 * A deterministic safety classification result.
 * @typedef {Object} SafetyClassification
 * @property {string} biomarkerId
 * @property {UrgencyLevel} level
 * @property {string} reason             Human-readable rule that fired.
 * @property {string} ruleId             Identifier of the deterministic rule.
 */
