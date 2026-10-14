export type QualitativeConfidence = 'strongly supported' | 'plausible' | 'tentative' | 'indeterminate';

export type VerificationStatus = 'verified' | 'probable' | 'unverified' | 'fragmentary';

export type OutputLanguage = 'sa' | 'hi' | 'en';

export interface VerseMetadata {
  work?: string;
  author?: string;
  canto?: string;
  verseNumber?: string;
  sourceEdition?: string;
}

export interface CompoundBreakdown {
  compound: string;
  vigraha: string;
  type: string; // e.g., Tatpuruṣa, Bahuvrīhi, Dvandva, Karmadhāraya
  meaning: string;
  ambiguityNote?: string;
}

export interface GrammaticalUnit {
  token: string;
  padaccheda: string;
  grammaticalAnalysis: string; // Vibhakti, Lakāra, Pratyaya, Dhātu
  meaning: string;
  isAmbiguous?: boolean;
}

export interface AlankaraCandidate {
  name: string;
  nameSanskrit: string;
  shastraReference?: string;
  textualEvidence: string;
  reasoning: string;
  counterArgumentsOrAlternatives: string;
  confidence: QualitativeConfidence;
}

export interface RasaAnalysis {
  primaryRasa: string;
  sthayibhava: string;
  realizationStatus: 'depicted emotion' | 'aesthetic realization (rasa)' | 'latent / indeterminate' | 'not applicable (didactic / descriptive)';
  vibhava: {
    alambana: string;
    uddipana: string;
  };
  anubhava: string[];
  vyabhicaribhava: string[];
  rasaDhvaniPresent: boolean;
  justificationAndCaution: string;
  contextDependencyNote: string; // States whether narrative context is required
  confidence: QualitativeConfidence;
}

export interface DhvaniFeature {
  category: 'vastu-dhvani' | 'alaṅkāra-dhvani' | 'rasa-dhvani' | 'lakṣaṇā-mūla vyañjanā' | 'abhidhā-mūla vyañjanā' | 'none / indeterminate';
  vacyartha: string;
  vyangyartha: string;
  mechanism: string;
  scholasticDispute?: string;
  confidence: QualitativeConfidence;
}

export interface PoeticDimension {
  guna: string; // Mādhurya, Ojas, Prasāda
  riti: string; // Vaidarbhī, Gauḍī, Pāñcālī
  vakroktiAspect?: string;
  aucityaCompliance?: string;
  doshaEvaluation?: string;
  vritti?: string;
  shastraRemarks?: string;
}

export interface AlternativeReading {
  variantText?: string;
  variantType: 'pāṭhāntara (textual variant)' | 'scholastic school difference' | 'syntactic split (anvaya-bheda)';
  readingExplanation: string;
  traditionOrCommentators: string;
}

export interface SourceVerification {
  status: VerificationStatus;
  workIdentified: string;
  author: string;
  cantoOrActAndVerse: string;
  sourceCertaintyNotes: string;
  isCanonicallyConfirmed: boolean;
  editionCitation?: string;
}

export interface EvidenceItem {
  id: string;
  claim: string;
  exactTextSpan: string;
  connectionExplanation: string;
  supportingSource?: string;
  isVerifiedSource: boolean;
  alternativeInterpretation?: string;
  confidence: QualitativeConfidence;
  humanReviewStatus: 'unreviewed' | 'verified_by_scholar' | 'disputed' | 'flagged_for_expert';
  reviewerNotes?: string;
}

export interface ResearchSummary {
  strongestInterpretation: string;
  mostUncertainClaim: string;
  furtherResearchQuestion: string;
  claimsRequiringExpertReview: string[];
}

export interface MeterAnalysis {
  identifiedMeter: string;
  meterFamily?: string;
  syllableCountPerPada: string;
  laghuGuruPattern?: string;
  ganaBreakdown?: string;
  yantiOrCaesuraNotes?: string;
  confidence: QualitativeConfidence;
  irregularityWarning?: string;
  algorithmConfidenceNote: string;
}

export interface KavyaAnalysisResult {
  id: string;
  timestamp: number;
  inputSanskrit: string;
  transliterationIAST: string;
  language: OutputLanguage;
  metadata?: VerseMetadata;
  
  // 1. Original text & Meter
  meterAnalysis: MeterAnalysis;
  
  // 2. Grammatical observations
  grammaticalObservations: {
    padaccheda: string[];
    anvaya: string;
    compounds: CompoundBreakdown[];
    grammaticalUnits: GrammaticalUnit[];
    syntaxNotes: string;
    segmentationUncertainties?: string[];
  };
  
  // 3. Literal meaning
  literalMeaning: {
    wordByWordSummary: string;
    padartha: string;
  };
  
  // 4. Interpretive meaning
  interpretiveMeaning: {
    bhavartha: string;
    poeticResonance: string;
    underlyingAssumptions?: string;
  };
  
  // 5. Alaṅkāra candidates
  alankaraCandidates: AlankaraCandidate[];
  
  // 6. Rasa analysis
  rasaAnalysis: RasaAnalysis;
  
  // 7. Dhvani and other poetic features
  dhvaniFeature: DhvaniFeature;
  poeticDimension: PoeticDimension;
  
  // 8. Alternative readings
  alternativeReadings: AlternativeReading[];
  
  // 9. Source verification
  sourceVerification: SourceVerification;
  
  // 10. Research summary
  researchSummary: ResearchSummary;
  
  // Module 7: Evidence Items
  evidenceItems: EvidenceItem[];
  
  // Epistemic Self-Audit
  epistemicAudit: {
    unverifiedRecallFlag: boolean;
    avoidedForcedLabels: string[];
    explicitVersusInferredDistinction: string;
  };

  // Instant 3-Language Multilingual Pack (sa, hi, en)
  multilingualPacks?: Record<OutputLanguage, {
    padartha: string;
    bhavartha: string;
    poeticResonance: string;
    alankaraNotes?: string;
    rasaNotes?: string;
    dhvaniNotes?: string;
    strongestInterpretation?: string;
    mostUncertainClaim?: string;
  }>;
  multilingualStore?: Partial<Record<OutputLanguage, KavyaAnalysisResult>>;
}

export interface BenchmarkVerse {
  id: string;
  title: string;
  author: string;
  work: string;
  location: string;
  devanagari: string;
  iast: string;
  meter: string;
  categoryTag: string;
  scholarlyFocus: string;
  precomputedAnalysis?: Record<OutputLanguage, Partial<KavyaAnalysisResult>>;
}

export interface EvaluationRecord {
  id: string;
  verseId: string;
  claim: string;
  category: 'grammar' | 'alankara' | 'rasa' | 'dhvani' | 'meter' | 'source';
  verdict: 'correct' | 'incorrect' | 'unsupported' | 'unresolved';
  notes: string;
  timestamp: number;
}

export interface ComparisonSession {
  verseText: string;
  interpretationA: {
    title: string;
    content: string;
    rasa?: string;
    alankara?: string;
    confidence: QualitativeConfidence;
  };
  interpretationB: {
    title: string;
    content: string;
    rasa?: string;
    alankara?: string;
    confidence: QualitativeConfidence;
  };
  reviewerNotes: string;
}
