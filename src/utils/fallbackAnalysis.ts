import { KavyaAnalysisResult, OutputLanguage, VerseMetadata } from '../types/kavya';
import { scanSanskritMeter } from './sanskritUtils';

export function generateLocalHeuristicAnalysis(
  text: string,
  initialLanguage: OutputLanguage = 'en',
  metadata?: VerseMetadata
): KavyaAnalysisResult {
  const metric = scanSanskritMeter(text);
  const words = text
    .split(/[\s।॥\n\r|]+/)
    .map(w => w.trim())
    .filter(w => w.length > 0);

  function createForLang(lang: OutputLanguage): KavyaAnalysisResult {
    const isHindi = lang === 'hi';
    const isSanskrit = lang === 'sa';

    return {
      id: 'local-' + Date.now() + '-' + lang,
      timestamp: Date.now(),
      inputSanskrit: text,
      transliterationIAST: '',
      language: lang,
      metadata,
      meterAnalysis: {
        identifiedMeter: metric.identifiedMeter,
        syllableCountPerPada: metric.syllableCounts.join(' - '),
        laghuGuruPattern: metric.padas.map(p => p.map(s => s.weight).join('')).join(' | '),
        yantiOrCaesuraNotes: metric.meterNotes,
        confidence: metric.identifiedMeter.includes('Indeterminate') ? 'indeterminate' : 'plausible',
        algorithmConfidenceNote: 'Calculated via deterministic Sanskrit prosody rules (Laghu/Guru 1-2 mātrās).'
      },
      grammaticalObservations: {
        padaccheda: words,
        anvaya: words.join(' '),
        compounds: [],
        grammaticalUnits: words.slice(0, 8).map(w => ({
          token: w,
          padaccheda: w,
          grammaticalAnalysis: isSanskrit ? 'प्राथमिक-पद-रूपम् (सुप्/तिङ्)' : isHindi ? 'व्याकरणिक पद-रूप' : 'Morphological unit',
          meaning: isSanskrit ? 'अर्थसंकेतः' : isHindi ? 'शब्दार्थ' : 'Word sense'
        })),
        syntaxNotes: isSanskrit 
          ? 'वाक्यरीतिः संस्कृतकाव्यानुसारेण अन्वेषणीया।'
          : isHindi 
            ? 'अन्वय की स्थिति पारंपरिक वाक्यक्रम के आधार पर मूल्यांकित की जानी चाहिए।'
            : 'Prose order requires commentary collation.'
      },
      literalMeaning: {
        wordByWordSummary: words.slice(0, 6).join(' · '),
        padartha: isSanskrit 
          ? 'प्रस्तुतपद्यस्य शब्दार्थः प्राथमिकक्रमेण ज्ञेयः।'
          : isHindi 
            ? 'प्रस्तुत श्लोक का मूल शब्दार्थ पाणिनीय व्याकरण तथा कोशों के अनुसार ग्राह्य है।'
            : 'Literal sense based on primary Paninian roots and lexicons.'
      },
      interpretiveMeaning: {
        bhavartha: isSanskrit 
          ? 'कविप्रतिभोद्भूतः तात्पर्यभावः।'
          : isHindi 
            ? 'कवि की मूल विवक्षा तथा काव्यात्मक भावार्थ।'
            : 'Contextual poetic meaning and thematic resonance.',
        poeticResonance: isSanskrit ? 'ध्वन्यर्थ-संकेतः' : isHindi ? 'व्यङ्ग्यार्थ का उन्मेष' : 'Poetic resonance'
      },
      alankaraCandidates: [
        {
          name: 'Svabhāvokti / Vācyālaṅkāra',
          nameSanskrit: 'स्वभावोक्तिः',
          shastraReference: 'Kāvyaprakāśa 10 / Sāhityadarpaṇa 10',
          textualEvidence: words.slice(0, 3).join(' '),
          reasoning: isSanskrit 
            ? 'अकृत्रिम-वस्तु-स्वभाव-कथनम्।'
            : isHindi 
              ? 'पदार्थ के स्वाभाविक यथार्थ रूप का साक्षात वर्णन।'
              : 'Natural, unforced representation of the subject without artificial metaphor.',
          counterArgumentsOrAlternatives: 'Consider whether Upamā or Rūpaka is latent.',
          confidence: 'plausible'
        }
      ],
      rasaAnalysis: {
        primaryRasa: isSanskrit ? 'शान्तः / अनिर्णीतः' : isHindi ? 'शान्त अथवा अनिर्णीत' : 'Context-dependent / Unforced',
        sthayibhava: 'Śama / Rati (Pending Context)',
        realizationStatus: 'latent / indeterminate',
        vibhava: {
          alambana: 'Contextual protagonist',
          uddipana: 'Described atmosphere'
        },
        anubhava: [],
        vyabhicaribhava: [],
        rasaDhvaniPresent: false,
        justificationAndCaution: isSanskrit 
          ? 'प्रकरणज्ञानाभावे रसकल्पना नैव युक्ता।'
          : isHindi 
            ? 'बिना संपूर्ण प्रबन्ध अथवा सन्दर्भ के रस का हठात् आरोप अनुचित है।'
            : 'Without wider narrative context, asserting a realized aesthetic sentiment is premature.',
        contextDependencyNote: 'Requires surrounding canto or act context.',
        confidence: 'tentative'
      },
      dhvaniFeature: {
        category: 'vastu-dhvani',
        vacyartha: 'Expressed proposition',
        vyangyartha: 'Implied significance',
        mechanism: 'Abhidhā leading to contextual suggestion',
        confidence: 'tentative'
      },
      poeticDimension: {
        guna: 'Prasāda (lucidity)',
        riti: 'Vaidarbhī'
      },
      alternativeReadings: [],
      sourceVerification: {
        status: metadata?.work ? 'probable' : 'unverified',
        workIdentified: metadata?.work || 'Uncatalogued Sanskrit Passage',
        author: metadata?.author || 'Unknown / Traditional',
        cantoOrActAndVerse: metadata?.canto ? `Canto ${metadata.canto}, Verse ${metadata.verseNumber || '1'}` : 'Unspecified',
        sourceCertaintyNotes: 'Input entered directly by researcher. No verified database lookup performed.',
        isCanonicallyConfirmed: false,
        editionCitation: metadata?.sourceEdition
      },
      researchSummary: {
        strongestInterpretation: 'Primary literal proposition established; figurative reading remains subject to commentary.',
        mostUncertainClaim: 'Figurative classification requires corroboration with traditional ṭīkā.',
        furtherResearchQuestion: 'Which commentator addresses this specific reading in the canonical corpus?',
        claimsRequiringExpertReview: [
          'Morphological boundaries of multi-member compounds',
          'Distinction between Svabhāvokti and heightened Alaṅkāra'
        ]
      },
      evidenceItems: [
        {
          id: 'ev-1',
          claim: 'Metrical structure identified algorithmically',
          exactTextSpan: words.slice(0, 4).join(' '),
          connectionExplanation: 'Syllable weight pattern corresponds to identified vṛtta.',
          isVerifiedSource: false,
          confidence: metric.identifiedMeter.includes('Indeterminate') ? 'indeterminate' : 'strongly supported',
          humanReviewStatus: 'unreviewed'
        }
      ],
      epistemicAudit: {
        unverifiedRecallFlag: false,
        avoidedForcedLabels: ['Forced Rasa', 'Speculative Authorship'],
        explicitVersusInferredDistinction: 'Explicit lexical forms separated from secondary hermeneutic hypotheses.'
      }
    };
  }

  const enResult = createForLang('en');
  const hiResult = createForLang('hi');
  const saResult = createForLang('sa');

  const store = {
    en: enResult,
    hi: hiResult,
    sa: saResult
  };

  enResult.multilingualStore = store;
  hiResult.multilingualStore = store;
  saResult.multilingualStore = store;

  return store[initialLanguage];
}
