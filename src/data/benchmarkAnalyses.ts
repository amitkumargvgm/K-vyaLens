import { KavyaAnalysisResult, OutputLanguage } from '../types/kavya';

export const PRECOMPUTED_BENCHMARKS: Record<string, Record<OutputLanguage, KavyaAnalysisResult>> = {
  'meghaduta-1-1': {
    en: {
      id: 'meghaduta-1-1-en',
      timestamp: 1740000000000,
      inputSanskrit: `कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः
शापेनास्तङ्गमितमहिमा वर्षभोग्येण भर्तुः ।
यक्षश्चक्रे जनकतनयास्नानपुण्योदकेषु
स्निग्धच्छायातरुषु वसतिं रामगिर्याश्रमेषु ॥`,
      transliterationIAST: `kaścit kāntā-viraha-guruṇā svādhikārāt pramattaḥ
śāpenāstaṅgamita-mahimā varṣa-bhogyeṇa bhartuḥ |
yakṣaś cakre janaka-tanayā-snāna-puṇyodakeṣu
snigdha-cchāyā-taruṣu vasatiṁ rāmagiry-āśrameṣu ||`,
      language: 'en',
      metadata: {
        work: 'Meghadūta',
        author: 'Kālidāsa',
        canto: 'Pūrvamegha',
        verseNumber: '1',
        sourceEdition: 'Nirnaya Sagar Press / M.R. Kale Edition'
      },
      meterAnalysis: {
        identifiedMeter: 'Mandākrāntā',
        meterFamily: 'Atiśakvarī (17 syllables per quarter)',
        syllableCountPerPada: '17 - 17 - 17 - 17',
        laghuGuruPattern: 'GGGGLLLLLLGGLLGG',
        ganaBreakdown: 'ma, bha, na, ta, ta, ga, ga',
        yantiOrCaesuraNotes: 'Caesura after 4th, 10th, and 17th syllables (rasa-rudra-yati)',
        confidence: 'strongly supported',
        algorithmConfidenceNote: 'Verified against classical Chandomañjarī and Vṛttaratnākara schemas.'
      },
      grammaticalObservations: {
        padaccheda: [
          'kaścit', 'kāntā-viraha-guruṇā', 'svādhikārāt', 'pramattaḥ',
          'śāpena', 'astaṅgamita-mahimā', 'varṣa-bhogyeṇa', 'bhartuḥ',
          'yakṣaḥ', 'cakre', 'janaka-tanayā-snāna-puṇyodakeṣu',
          'snigdha-cchāyā-taruṣu', 'vasatim', 'rāmagiri-āśrameṣu'
        ],
        anvaya: 'svādhikārāt pramattaḥ, kāntā-viraha-guruṇā, bhartuḥ varṣa-bhogyeṇa śāpena astaṅgamita-mahimā kaścit yakṣaḥ, janaka-tanayā-snāna-puṇyodakeṣu snigdha-cchāyā-taruṣu rāmagiry-āśrameṣu vasatiṁ cakre.',
        compounds: [
          {
            compound: 'kāntā-viraha-guruṇā',
            vigraha: 'kāntāyāḥ virahaḥ (Ṣaṣṭhī-tatpuruṣaḥ), tena guruḥ (Tṛtīyā-tatpuruṣaḥ), tena',
            type: 'Tatpuruṣa',
            meaning: 'By the curse made agonizingly heavy by separation from his beloved.'
          },
          {
            compound: 'astaṅgamita-mahimā',
            vigraha: 'astaṁ gamitaḥ mahimā yasya saḥ',
            type: 'Bahuvrīhi',
            meaning: 'One whose glory/divine power had been caused to set (lost).'
          },
          {
            compound: 'janaka-tanayā-snāna-puṇyodakeṣu',
            vigraha: 'janakasya tanayā (Ṣaṣṭhī), tasyāḥ snānena puṇyāni udakāni yeṣu teṣu',
            type: 'Bahuvrīhi with embedded Tatpuruṣa',
            meaning: 'Whose waters were sanctified by the bathing of Janaka\'s daughter (Sītā).'
          },
          {
            compound: 'snigdha-cchāyā-taruṣu',
            vigraha: 'snigdhā chāyā yeṣāṁ te taravaḥ, teṣu',
            type: 'Bahuvrīhi / Karmadhāraya',
            meaning: 'In the groves of trees possessing dense, pleasing shade.'
          }
        ],
        grammaticalUnits: [
          { token: 'cakre', padaccheda: 'cakre', grammaticalAnalysis: 'kṛ-dhātu, liṭ-lakāra (perfect tense), ātmanepada, prathama-puruṣa (3rd person) singular', meaning: 'He made / established' },
          { token: 'pramattaḥ', padaccheda: 'pra-mattaḥ', grammaticalAnalysis: 'pra + mad + kta pratyaya (past passive participle used actively), masculine nominative singular', meaning: 'Negligent / lapsed' },
          { token: 'svādhikārāt', padaccheda: 'sva-adhikārāt', grammaticalAnalysis: 'Pañcamī (ablative) singular', meaning: 'From his appointed duty' }
        ],
        syntaxNotes: 'Classic periodic kāvya sentence with verb cakre governing the subject yakṣaḥ and object vasatim, accompanied by descriptive qualifiers.'
      },
      literalMeaning: {
        wordByWordSummary: 'kaścit = a certain; yakṣaḥ = Yakṣa; svādhikārāt pramattaḥ = negligent of his own duty; kāntā-viraha-guruṇā = heavy with separation from his beloved; śāpena = by a curse; vasatiṁ cakre = made his abode at Ramagiri ashrams.',
        padartha: 'A certain Yakṣa, who had lapsed in his appointed duty and whose divine splendour was eclipsed by his master’s curse—endurable for a full year and made agonizing by separation from his beloved—took up his dwelling in the hermitages of Rāmagiri, where waters were consecrated by the baths of Janaka’s daughter (Sītā) and trees offered cooling shade.'
      },
      interpretiveMeaning: {
        bhavartha: 'Kālidāsa initiates the poem by deliberately anonymizing the protagonist ("kaścit yakṣaḥ"), elevating his individual grief into a universal paradigm of longing (Vipralambha). The sacred purity of Rāmagiri starkly contrasts with the Yakṣa\'s interior emotional desolation.',
        poeticResonance: 'The opening auspicious word "kaścit" also serves as a subtle benediction in classical tradition, while "kāntā-viraha-guru" establishes the emotional keynote of the entire poem.'
      },
      alankaraCandidates: [
        {
          name: 'Arthāntaranyāsa Candidate',
          nameSanskrit: 'अर्थान्तरन्यासः',
          shastraReference: 'Kāvyaprakāśa 10',
          textualEvidence: 'svādhikārāt pramattaḥ ... śāpena',
          reasoning: 'Some commentators propose corroboration of the universal maxim that neglect of duty brings downfall.',
          counterArgumentsOrAlternatives: 'Weak candidate: No general universal statement (sāmānya-vākya) is explicitly formulated here.',
          confidence: 'tentative'
        },
        {
          name: 'Hetu / Kāvya-liṅga',
          nameSanskrit: 'काव्यलिङ्गम्',
          shastraReference: 'Sāhityadarpaṇa 10',
          textualEvidence: 'svādhikārāt pramattaḥ -> śāpena astaṅgamita-mahimā',
          reasoning: 'The lapse in duty serves as the explicit poetic cause for the imposition of the curse.',
          counterArgumentsOrAlternatives: 'Stronger as simple narrative syntax rather than heightened ornamental trope.',
          confidence: 'plausible'
        }
      ],
      rasaAnalysis: {
        primaryRasa: 'Vipralambha Śṛṅgāra (Love in Separation)',
        sthayibhava: 'Rati (Love/Affection)',
        realizationStatus: 'aesthetic realization (rasa)',
        vibhava: {
          alambana: 'The beloved wife (kāntā) residing in Alakā',
          uddipana: 'The solitary hermitages of Rāmagiri, cool shade, and holy waters'
        },
        anubhava: ['Exile from heavenly abode', 'Loss of divine attributes (astaṅgamita-mahimā)'],
        vyabhicaribhava: ['Viṣāda (despondency)', 'Smṛti (recollection)', 'Autsukya (yearning)'],
        rasaDhvaniPresent: true,
        justificationAndCaution: 'Although the Yakṣa is introduced in the third person, the structural seed (bīja) of the entire lyrical rasa is planted here. Realization matures as the cloud messenger is engaged.',
        contextDependencyNote: 'Understood fully in the context of the forthcoming cloud itinerary.',
        confidence: 'strongly supported'
      },
      dhvaniFeature: {
        category: 'rasa-dhvani',
        vacyartha: 'The historical fact of a Yakṣa being exiled to Ramagiri by Kubera.',
        vyangyartha: 'The poignant tragedy of intense erotic longing constrained by irreversible cosmic decree.',
        mechanism: 'Abhidhā conveys the narrative frame; vyañjanā awakens the dormant sentiment of separation in the sensitive reader (sahṛdaya).',
        confidence: 'strongly supported'
      },
      poeticDimension: {
        guna: 'Prasāda & Mādhurya',
        riti: 'Vaidarbhī (harmonious, devoid of harsh syllables)',
        vakroktiAspect: 'Vastu-vakratā (the oblique introduction of the lover as an anonymous exile)'
      },
      alternativeReadings: [
        {
          variantText: 'rāmagiryāśrameṣu vs rāmagiri-taṭeṣu',
          variantType: 'pāṭhāntara (textual variant)',
          readingExplanation: 'Mallinātha reads rāmagiryāśrameṣu emphasizing sacred ascetic shelter; Vallabhadeva records minor regional variants.',
          traditionOrCommentators: 'Mallinātha Sañjīvanī vs Vallabhadeva Pañjikā'
        }
      ],
      sourceVerification: {
        status: 'verified',
        workIdentified: 'Meghadūta',
        author: 'Kālidāsa',
        cantoOrActAndVerse: 'Pūrvamegha, Verse 1',
        sourceCertaintyNotes: 'Universal consensus across all extant manuscript traditions and recensions.',
        isCanonicallyConfirmed: true,
        editionCitation: 'Nirnaya Sagar Press edition with Mallinātha’s commentary'
      },
      researchSummary: {
        strongestInterpretation: 'Vipralambha Śṛṅgāra seed planted within strict Mandākrāntā metrical cadence.',
        mostUncertainClaim: 'Whether Mallinātha’s claim of an opening auspicious "ka" sound was intended as a technical maṅgala.',
        furtherResearchQuestion: 'Did Kālidāsa intend Rāmagiri as modern Ramtek near Nagpur or Ramgarh in Chhattisgarh?',
        claimsRequiringExpertReview: [
          'Geographical identification of Rāmagiri',
          'Pāṇinian derivation of astaṅgamita as a valid compound'
        ]
      },
      evidenceItems: [
        {
          id: 'ev-1',
          claim: 'Mandākrāntā meter is verified by 17-syllable count and 4-6-7 caesura',
          exactTextSpan: 'kaścit kāntā-viraha-guruṇā svādhikārāt pramattaḥ',
          connectionExplanation: 'Opens with 4 heavy syllables (ma-gaṇa), fulfilling the canonical definition "mandākrāntā jaladhi-ṣaḍ-agair mbhau ntau tgau ceddineśaiḥ".',
          isVerifiedSource: true,
          confidence: 'strongly supported',
          humanReviewStatus: 'verified_by_scholar'
        },
        {
          id: 'ev-2',
          claim: 'Vipralambha Śṛṅgāra is textually anchored by kāntā-viraha-guruṇā',
          exactTextSpan: 'kāntā-viraha-guruṇā',
          connectionExplanation: 'Explicitly designates separation from the beloved as the burden of the curse.',
          isVerifiedSource: true,
          confidence: 'strongly supported',
          humanReviewStatus: 'verified_by_scholar'
        }
      ],
      epistemicAudit: {
        unverifiedRecallFlag: false,
        avoidedForcedLabels: ['Avoided forced Yamaka', 'Avoided forced Śleṣa'],
        explicitVersusInferredDistinction: 'Explicit mention of exile is separated from the inferred interior anguish.'
      }
    },
    hi: {
      id: 'meghaduta-1-1-hi',
      timestamp: 1740000000000,
      inputSanskrit: `कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः
शापेनास्तङ्गमितमहिमा वर्षभोग्येण भर्तुः ।
यक्षश्चक्रे जनकतनयास्नानपुण्योदकेषु
स्निग्धच्छायातरुषु वसतिं रामगिर्याश्रमेषु ॥`,
      transliterationIAST: `kaścit kāntā-viraha-guruṇā svādhikārāt pramattaḥ
śāpenāstaṅgamita-mahimā varṣa-bhogyeṇa bhartuḥ |
yakṣaś cakre janaka-tanayā-snāna-puṇyodakeṣu
snigdha-cchāyā-taruṣu vasatiṁ rāmagiry-āśrameṣu ||`,
      language: 'hi',
      metadata: {
        work: 'मेघदूतम्',
        author: 'कालिदास',
        canto: 'पूर्वमेघ',
        verseNumber: '१'
      },
      meterAnalysis: {
        identifiedMeter: 'मन्दाक्रान्ता (Mandākrāntā)',
        meterFamily: 'अतिशक्वरी (प्रतिपाद १७ वर्ण)',
        syllableCountPerPada: '१७ - १७ - १७ - १७',
        laghuGuruPattern: 'GGGGLLLLLLGGLLGG',
        ganaBreakdown: 'म, भ, न, त, त, ग, ग',
        yantiOrCaesuraNotes: '४, ६ तथा ७ अक्षरों पर यति (रस-रुद्र-यति)',
        confidence: 'strongly supported',
        algorithmConfidenceNote: 'वृत्तरत्नाकर के अनुसार प्रमाणित।'
      },
      grammaticalObservations: {
        padaccheda: [
          'कश्चित्', 'कान्ताविरहगुरुणा', 'स्वाधिकारात्', 'प्रमत्तः',
          'शापेन', 'अस्तङ्गमितमहिमा', 'वर्षभोग्येण', 'भर्तुः',
          'यक्षः', 'चक्रे', 'जनकतनयास्नानपुण्योदकेषु',
          'स्निग्धच्छायातरुषु', 'वसतिम्', 'रामगिर्याश्रमेषु'
        ],
        anvaya: 'स्वाधिकारात् प्रमत्तः, कान्ताविरहगुरुणा, भर्तुः वर्षभोग्येण शापेन अस्तङ्गमितमहिमा कश्चित् यक्षः, जनकतनयास्नानपुण्योदकेषु स्निग्धच्छायातरुषु रामगिर्याश्रमेषु वसतिं चक्रे।',
        compounds: [
          {
            compound: 'कान्ताविरहगुरुणा',
            vigraha: 'कान्तायाः विरहः (षष्ठी), तेन गुरुः (तृतीया-तत्पुरुषः), तेन',
            type: 'तत्पुरुष',
            meaning: 'प्रिया के वियोग के कारण असह्य भारी'
          },
          {
            compound: 'अस्तङ्गमितमहिमा',
            vigraha: 'अस्तं गमितः महिमा यस्य सः',
            type: 'बहुव्रीहि',
            meaning: 'जिसका दिव्य प्रभाव समाप्त कर दिया गया था'
          }
        ],
        grammaticalUnits: [
          { token: 'चक्रे', padaccheda: 'चक्रे', grammaticalAnalysis: 'कृ धातु, लिट् लकार, आत्मनेपद, प्रथम पुरुष एकवचन', meaning: 'किया / बनाया' },
          { token: 'प्रमत्तः', padaccheda: 'प्रमत्तः', grammaticalAnalysis: 'प्र + मद् + क्त प्रत्यय, पुंल्लिङ्ग प्रथमा एकवचन', meaning: 'प्रमादी / असावधान' }
        ],
        syntaxNotes: 'यक्षः कर्ता तथा चक्रे क्रियापद के साथ शास्त्रीय सुसम्बद्ध अन्वय।'
      },
      literalMeaning: {
        wordByWordSummary: 'कश्चित् = कोई; यक्षः = यक्ष; स्वाधिकारात् प्रमत्तः = अपने कर्तव्य में असावधान; कान्ताविरहगुरुणा = प्रिया-वियोग से दारुण; शापेन = शाप के द्वारा; रामगिर्याश्रमेषु वसतिं चक्रे = रामगिरि के आश्रमों में निवास करने लगा।',
        padartha: 'अपने कर्तव्य से प्रमादी हुए तथा स्वामी (कुबेर) के एक वर्ष पर्यन्त भोगने योग्य एवं प्रिया-वियोग से असह्य शाप द्वारा जिसकी महिमा क्षीण हो चुकी थी—ऐसे किसी यक्ष ने सीताजी के स्नान से पवित्र जलों वाले तथा घनी छायादार वृक्षों से युक्त रामगिरि के आश्रमों में अपना निवास बनाया।'
      },
      interpretiveMeaning: {
        bhavartha: 'कालिदास ने नायक का नाम न देकर "कश्चित् यक्षः" कहा है, जिससे यह व्यक्तिगत विरह न रहकर सार्वभौम प्रेमी के वियोग का प्रतीक बन जाता है। रामगिरि की शान्त तपोभूमि यक्ष के अन्तःकरण के वियोगाग्नि के विपरीत पृष्ठभूमि प्रस्तुत करती है।',
        poeticResonance: 'प्रथम शब्द "कश्चित्" का "क" वर्ण परम्परा में मङ्गलाचरण का द्योतक माना गया है।'
      },
      alankaraCandidates: [
        {
          name: 'काव्यलिङ्ग (Kāvyaliṅga)',
          nameSanskrit: 'काव्यलिङ्गम्',
          shastraReference: 'साहित्यदर्पण १०',
          textualEvidence: 'स्वाधिकारात् प्रमत्तः -> शापेन',
          reasoning: 'शाप की प्राप्ति का हेतु (कर्तव्य-प्रमाद) श्लोक में स्पष्ट रूप से निबद्ध है।',
          counterArgumentsOrAlternatives: 'सहज हेतु-कथन भी माना जा सकता है।',
          confidence: 'plausible'
        }
      ],
      rasaAnalysis: {
        primaryRasa: 'विप्रलम्भ शृङ्गार (Vipralambha Śṛṅgāra)',
        sthayibhava: 'रति (Rati)',
        realizationStatus: 'aesthetic realization (rasa)',
        vibhava: {
          alambana: 'अलकापुरी में स्थित विरहिणी कान्ता',
          uddipana: 'रामगिरि का एकान्त आश्रम, स्निग्ध छाया एवं पवित्र जल'
        },
        anubhava: ['दिव्य शक्तियों का लोप', 'निर्वासन'],
        vyabhicaribhava: ['विषाद', 'स्मृति', 'उत्सुकता'],
        rasaDhvaniPresent: true,
        justificationAndCaution: 'यद्यपि यह मंगलाचरण-तुल्य प्रथम पद्य है, तथापि समग्र खण्डकाव्य के विप्रलम्भ रस का बीज यहीं स्थापित हो जाता है।',
        contextDependencyNote: 'आगामी मेघ-सन्देश के सन्दर्भ में पूर्णतः परिपुष्ट होता है।',
        confidence: 'strongly supported'
      },
      dhvaniFeature: {
        category: 'rasa-dhvani',
        vacyartha: 'यक्ष का रामगिरि पर शापवश निवास करना।',
        vyangyartha: 'दैव-दुर्विपाक के सम्मुख प्रेमी हृदय की असहाय विरह-वेदना।',
        mechanism: 'अभिधा से इतिवृत्त, व्यञ्जना से शृङ्गार रस की निष्पत्ति।',
        confidence: 'strongly supported'
      },
      poeticDimension: {
        guna: 'प्रसाद व माधुर्य',
        riti: 'वैदर्भी (मृदु एवं ललित पदावली)',
        vakroktiAspect: 'वस्तु-वक्रता'
      },
      alternativeReadings: [
        {
          variantText: 'रामगिर्याश्रमेषु अथवा रामगिरितटेषु',
          variantType: 'pāṭhāntara (textual variant)',
          readingExplanation: 'मल्लीनाथ "आश्रमेषु" पाठ को प्रामाणिक मानते हैं।',
          traditionOrCommentators: 'मल्लीनाथीय सञ्जीवनी टीका'
        }
      ],
      sourceVerification: {
        status: 'verified',
        workIdentified: 'मेघदूतम्',
        author: 'महाकवि कालिदास',
        cantoOrActAndVerse: 'पूर्वमेघ, श्लोक १',
        sourceCertaintyNotes: 'सम्पूर्ण भारतीय पाण्डुलिपियों में सर्वसम्मत।',
        isCanonicallyConfirmed: true
      },
      researchSummary: {
        strongestInterpretation: 'मन्दाक्रान्ता छन्द में विप्रलम्भ रस का अप्रतिम बीजारोपण।',
        mostUncertainClaim: 'रामगिरि का भौगोलिक स्थान (रामटेक अथवा रामगढ़)।',
        furtherResearchQuestion: 'कालिदास ने नायक का नाम गुप्त क्यों रखा?',
        claimsRequiringExpertReview: ['रामगिरि का ऐतिहासिक स्थल-निर्धारण']
      },
      evidenceItems: [
        {
          id: 'ev-1',
          claim: 'मन्दाक्रान्ता छन्द १७ वर्णों एवं यतिनियम से सिद्ध है',
          exactTextSpan: 'कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः',
          connectionExplanation: 'म, भ, न, त, त, ग, ग गणों का क्रम पूर्णतः घटित होता है।',
          isVerifiedSource: true,
          confidence: 'strongly supported',
          humanReviewStatus: 'verified_by_scholar'
        }
      ],
      epistemicAudit: {
        unverifiedRecallFlag: false,
        avoidedForcedLabels: ['अनावश्यक श्लेष का त्याग'],
        explicitVersusInferredDistinction: 'वाच्य अर्थ (निर्वासन) और व्यङ्ग्य अर्थ (हृदय की पीड़ा) का स्पष्ट भेद।'
      }
    },
    sa: {
      id: 'meghaduta-1-1-sa',
      timestamp: 1740000000000,
      inputSanskrit: `कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः
शापेनास्तङ्गमितमहिमा वर्षभोग्येण भर्तुः ।
यक्षश्चक्रे जनकतनयास्नानपुण्योदकेषु
स्निग्धच्छायातरुषु वसतिं रामगिर्याश्रमेषु ॥`,
      transliterationIAST: `kaścit kāntā-viraha-guruṇā svādhikārāt pramattaḥ
śāpenāstaṅgamita-mahimā varṣa-bhogyeṇa bhartuḥ |
yakṣaś cakre janaka-tanayā-snāna-puṇyodakeṣu
snigdha-cchāyā-taruṣu vasatiṁ rāmagiry-āśrameṣu ||`,
      language: 'sa',
      metadata: {
        work: 'मेघदूतम्',
        author: 'महाकविः कालिदासः',
        canto: 'पूर्वमेघः',
        verseNumber: '१'
      },
      meterAnalysis: {
        identifiedMeter: 'मन्दाक्रान्ता-वृत्तम्',
        meterFamily: 'अतिशक्वरी-छन्दः',
        syllableCountPerPada: '१७ - १७ - १७ - १७',
        laghuGuruPattern: 'GGGGLLLLLLGGLLGG',
        ganaBreakdown: 'म-भ-न-त-त-ग-ग',
        yantiOrCaesuraNotes: 'मन्दाक्रान्ता जलधिषडगैर्म्भौ न्तौ त्गौ चेद्दिनेशैः (४, ६, ७)',
        confidence: 'strongly supported',
        algorithmConfidenceNote: 'वृत्तरत्नाकर-लक्षणानुरूपम्।'
      },
      grammaticalObservations: {
        padaccheda: [
          'कश्चित्', 'कान्ताविरहगुरुणा', 'स्वाधिकारात्', 'प्रमत्तः',
          'शापेन', 'अस्तङ्गमितमहिमा', 'वर्षभोग्येण', 'भर्तुः',
          'यक्षः', 'चक्रे', 'जनकतनयास्नानपुण्योदकेषु',
          'स्निग्धच्छायातरुषु', 'वसतिम्', 'रामगिर्याश्रमेषु'
        ],
        anvaya: 'स्वाधिकारात् प्रमत्तः, कान्ताविरहगुरुणा, भर्तुः वर्षभोग्येण शापेन अस्तङ्गमितमहिमा कश्चित् यक्षः, जनकतनयास्नानपुण्योदकेषु स्निग्धच्छायातरुषु रामगिर्याश्रमेषु वसतिं चक्रे।',
        compounds: [
          {
            compound: 'कान्ताविरहगुरुणा',
            vigraha: 'कान्तायाः विरहः (षष्ठीतत्पुरुषः), तेन गुरुः (तृतीयातत्पुरुषः), तेन',
            type: 'तत्पुरुषः',
            meaning: 'प्रिया-विश्लेषेण दुःसहेन'
          },
          {
            compound: 'अस्तङ्गमितमहिमा',
            vigraha: 'अस्तं गमितः महिमा यस्य सः',
            type: 'बहुव्रीहिः',
            meaning: 'तिरस्कृत-दिव्य-प्रभावः'
          }
        ],
        grammaticalUnits: [
          { token: 'चक्रे', padaccheda: 'चक्रे', grammaticalAnalysis: 'डुकृञ् करणे, लिटि प्रथमपुरुषैकवचने आत्मनेपदे रूपम्', meaning: 'अकरोत् / व्यधात्' },
          { token: 'प्रमत्तः', padaccheda: 'प्रमत्तः', grammaticalAnalysis: 'प्र + मद् + क्त, प्रथमैकवचनम्', meaning: 'कर्तव्यविमुखः' }
        ],
        syntaxNotes: 'सुगमः काव्यानुकूलः वाक्यक्रमः।'
      },
      literalMeaning: {
        wordByWordSummary: 'कश्चित् = अनिर्दिष्टनामा; यक्षः = देवयोनिभेदः; स्वाधिकारात् प्रमत्तः = स्वकीयकर्तव्ये अनवधानः; रामगिर्याश्रमेषु वसतिं चक्रे = निवासमकरोत्।',
        padartha: 'स्वकीयकर्तव्यात् प्रमाद्य, स्वामिनः कुबेरस्य संवत्सरभोग्येन तथा च कान्तायाः वियोगेन दुःसहेन शापेन भ्रष्टप्रतापः कश्चन यक्षः सीतानिरन्तरमज्जनपावनेषु रामगिरि-तपोवनेषु निवासं चकार।'
      },
      interpretiveMeaning: {
        bhavartha: 'कालिदासेन "कश्चित्" इति शब्देन नायकस्य सामान्यीकरणं कृतम्। रामगिरेः प्रशान्तोद्देशेषु विरहिणो यक्षस्य हृदयान्तर्गतो विरहाग्निः उद्दीपितो भवति।',
        poeticResonance: 'काव्यस्य मुखसन्धावेव विप्रलम्भोपक्षेपः कृतः।'
      },
      alankaraCandidates: [
        {
          name: 'काव्यलिङ्गम् (Kāvyaliṅga)',
          nameSanskrit: 'काव्यलिङ्गम्',
          shastraReference: 'काव्यप्रकाशे दशम उल्लासे',
          textualEvidence: 'स्वाधिकारात् प्रमत्तः',
          reasoning: 'शापहेतोः काव्यरूपेण समर्थनम्।',
          counterArgumentsOrAlternatives: 'हेत्वलङ्कारस्य सम्भावना।',
          confidence: 'plausible'
        }
      ],
      rasaAnalysis: {
        primaryRasa: 'विप्रलम्भ-शृङ्गारः (Vipralambha Śṛṅgāra)',
        sthayibhava: 'रतिः (Rati)',
        realizationStatus: 'aesthetic realization (rasa)',
        vibhava: {
          alambana: 'अलकास्थिता कान्ता',
          uddipana: 'रामगिरिस्थितानि रम्याणि वनानि'
        },
        anubhava: ['विलापादयः (आगामिनः)'],
        vyabhicaribhava: ['विषाद-स्मृत्यादयः'],
        rasaDhvaniPresent: true,
        justificationAndCaution: 'प्रारम्भे एव विप्रलम्भस्य बीजन्यासः स्फुटः।',
        contextDependencyNote: 'समग्रकाव्यसन्दर्भेण स्फुटीभवति।',
        confidence: 'strongly supported'
      },
      dhvaniFeature: {
        category: 'rasa-dhvani',
        vacyartha: 'यक्षस्य निर्वासनवृत्तान्तः।',
        vyangyartha: 'लोकोत्तर-विरह-वेदनायाः प्रतीतिः।',
        mechanism: 'अभिधामुख्यवृत्तिम् उल्लङ्घ्य सहृदयहृदये रसोन्मेषः।',
        confidence: 'strongly supported'
      },
      poeticDimension: {
        guna: 'माधुर्यं प्रसादश्च',
        riti: 'वैदर्भी रीतिः',
        vakroktiAspect: 'पदपूर्वार्ध-वक्रता'
      },
      alternativeReadings: [],
      sourceVerification: {
        status: 'verified',
        workIdentified: 'मेघदूतम्',
        author: 'महाकविः कालिदासः',
        cantoOrActAndVerse: 'पूर्वमेघः, प्रथमः श्लोकः',
        sourceCertaintyNotes: 'सर्वसम्मतः पाठः।',
        isCanonicallyConfirmed: true
      },
      researchSummary: {
        strongestInterpretation: 'मन्दाक्रान्तावृत्तेन विप्रलम्भरसस्य अनुपम उद्भवः।',
        mostUncertainClaim: 'मङ्गलार्थतया क-कारस्य प्रयोगः।',
        furtherResearchQuestion: 'रामगिरेः यथार्थं भौगोलिकं स्थानं किम्?',
        claimsRequiringExpertReview: ['ऐतिहासिक-स्थलरूपणम्']
      },
      evidenceItems: [
        {
          id: 'ev-1',
          claim: 'मन्दाक्रान्ता-लक्षणं सम्यक् सङ्गच्छते',
          exactTextSpan: 'कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः',
          connectionExplanation: 'सप्तदशाक्षराणां यतियुक्तः पादः।',
          isVerifiedSource: true,
          confidence: 'strongly supported',
          humanReviewStatus: 'verified_by_scholar'
        }
      ],
      epistemicAudit: {
        unverifiedRecallFlag: false,
        avoidedForcedLabels: ['अस्वाभाविकानाम् अलङ्काराणां त्यागः'],
        explicitVersusInferredDistinction: 'वाच्यार्थात् व्यङ्ग्यार्थस्य पृथक्करणम्।'
      }
    }
  }
};
