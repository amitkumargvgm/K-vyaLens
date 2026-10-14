import { OutputLanguage } from '../types/kavya';

export interface AppTranslations {
  // Brand
  brandTitle: string;
  brandSubtitle: string;
  
  // Navigation
  navWorkbench: string;
  navChhanda: string;
  navProsody: string;
  navTools: string;
  navDeveloper: string;

  // Theme
  themeLight: string;
  themeDark: string;

  // Bottom dock labels
  dockWorkbench: string;
  dockChhanda: string;
  dockProsody: string;
  dockTools: string;
  dockDeveloper: string;

  // Passage Input
  inputTitle: string;
  inputSubtitle: string;
  inputPlaceholder: string;
  btnAnalyze: string;
  btnAnalyzing: string;
  btnReset: string;
  btnClear: string;
  btnExtractImage: string;
  extractingImage: string;
  imageUploadTitle: string;
  imageUploadDesc: string;
  sampleChipsLabel: string;
  sampleChipsHint: string;
  metadataToggle: string;
  fieldWork: string;
  fieldAuthor: string;
  fieldVerseNo: string;
  fieldTradition: string;
  estimatedMeter: string;
  syllablesCount: string;
  padasCount: string;
  langSelectLabel: string;

  // Analysis View
  tabOverview: string;
  tabGrammar: string;
  tabRasa: string;
  tabAlankara: string;
  tabPoetics: string;
  tabAudit: string;
  btnExportDossier: string;
  btnInquire: string;
  wordByWord: string;
  anvayaTitle: string;
  compoundsTitle: string;
  grammarUnitsTitle: string;
  primaryRasaTitle: string;
  sthayibhavaTitle: string;
  realizationStatusTitle: string;
  vibhavaTitle: string;
  anubhavaTitle: string;
  vyabhicariTitle: string;
  dhvaniTitle: string;
  vacyarthaTitle: string;
  vyangyarthaTitle: string;
  confidenceStrong: string;
  confidencePlausible: string;
  confidenceTentative: string;
  confidenceIndeterminate: string;

  // Chhanda View
  chhandaHeaderTitle: string;
  chhandaHeaderSubtitle: string;
  chhandaSearchPlaceholder: string;
  filterAll: string;
  filterSamavrittam: string;
  filterMatravrittam: string;
  filterArdhasamavrittam: string;
  filterMishravrittam: string;
  tabLakshana: string;
  tabGhatana: string;
  tabPractice: string;
  lakshanaSources: string;
  ghatanaExplanation: string;
  padasAnalysis: string;

  // Tools Desk
  toolsHeaderTitle: string;
  toolsHeaderSubtitle: string;
  toolScanner: string;
  toolSandhi: string;
  toolVibhakti: string;
  toolAnvaya: string;

  // Developer Profile
  devBadge: string;
  devName: string;
  devDegree: string;
  devUniversity: string;
  btnPortfolio: string;
  btnEmail: string;
  devVisionTitle: string;
  devVisionDesc: string;
  devRigorTitle: string;
  devRigorDesc: string;
  faqTitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  footerNote: string;
}

export const I18N_STRINGS: Record<OutputLanguage, AppTranslations> = {
  sa: {
    brandTitle: 'KāvyaLens',
    brandSubtitle: 'संस्कृतसाहित्य-काव्यशास्त्र-विमर्श-मञ्चः',
    
    navWorkbench: 'श्लोक-विश्लेषणम्',
    navChhanda: 'छन्दः-कोषः एवं प्रस्तारः',
    navProsody: 'काव्यशास्त्र-कोषः',
    navTools: 'संस्कृत-उपकरणानि',
    navDeveloper: 'परिचयः / रचयिता',

    themeLight: 'प्रकाश-मोड',
    themeDark: 'रात्रि-मोड',

    dockWorkbench: 'विश्लेषणम्',
    dockChhanda: 'छन्दः-कोषः',
    dockProsody: 'काव्यशास्त्रम्',
    dockTools: 'उपकरणानि',
    dockDeveloper: 'परिचयः',

    inputTitle: 'संस्कृत-श्लोक-प्रवेशः',
    inputSubtitle: 'पाठ्यग्रन्थात्, मातृकातः स्वरचितः वा श्लोकः अत्र लिख्यताम् अथवा चित्रेण गृह्यताम्।',
    inputPlaceholder: 'अत्र देवनागर्याम् अथवा IAST-लिप्यां श्लोकः प्रवेष्टव्यः... (उदा. वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये...)',
    btnAnalyze: 'श्लोकानुशीलनं कुरु',
    btnAnalyzing: 'शास्त्रीयानुशीलनं प्रचलति...',
    btnReset: 'पुनः स्थापयतु',
    btnClear: 'मार्जनम्',
    btnExtractImage: 'चित्रात् श्लोकोद्धारः (चित्र OCR)',
    extractingImage: 'चित्रात् श्लोकोद्धरणं क्रियते...',
    imageUploadTitle: 'श्लोकचित्रम् आरोपयतु (Upload Verse Photo)',
    imageUploadDesc: 'पुस्तकस्य, पाण्डुलिप्याः वा चित्रं चित्वा तस्मात् श्लोकं निष्कासयतु।',
    sampleChipsLabel: 'परीक्षार्थं प्रसिद्ध-श्लोकाः:',
    sampleChipsHint: 'स्पर्शेन पूरयतु',
    metadataToggle: 'ग्रन्थ-कवि-सन्दर्भः (ऐच्छिकः)',
    fieldWork: 'ग्रन्थनाम',
    fieldAuthor: 'कविनाम / रचयिता',
    fieldVerseNo: 'सर्गः / अङ्कः / श्लोकसङ्ख्या',
    fieldTradition: 'काव्यशास्त्र-सम्प्रदायः',
    estimatedMeter: 'अनुमित-छन्दः:',
    syllablesCount: 'वर्णसङ्ख्या',
    padasCount: 'पादाः',
    langSelectLabel: 'भाषा:',

    tabOverview: 'अवलोकनम्',
    tabGrammar: 'पदच्छेदः अन्वयश्च',
    tabRasa: 'रसः ध्वनिश्च',
    tabAlankara: 'अलङ्काराः',
    tabPoetics: 'काव्यगुणाः रीतिश्च',
    tabAudit: 'साक्ष्य-प्रमाण-परीक्षाम्',
    btnExportDossier: 'शोधपत्रं डाउनलोड्',
    btnInquire: 'विद्वत्-प्रश्नोत्तरी',
    wordByWord: 'पदार्थ-प्रतिपादनम्',
    anvayaTitle: 'अन्वय-क्रमः',
    compoundsTitle: 'समास-विग्रहाः',
    grammarUnitsTitle: 'व्याकरण-विशेषाः',
    primaryRasaTitle: 'प्रधान-रसः',
    sthayibhavaTitle: 'स्थायिभावः',
    realizationStatusTitle: 'रस-निष्पत्ति-स्थितिः',
    vibhavaTitle: 'विभावौ (आलम्बन-उद्दीपने)',
    anubhavaTitle: 'अनुभावाः',
    vyabhicariTitle: 'व्यभिचारिभावाः',
    dhvaniTitle: 'ध्वनि-स्वरूपम्',
    vacyarthaTitle: 'वाच्यार्थः',
    vyangyarthaTitle: 'व्यङ्ग्यार्थः',
    confidenceStrong: 'सुदृढ-साक्ष्यम्',
    confidencePlausible: 'सम्भाव्यम्',
    confidenceTentative: 'प्रास्ताविकम्',
    confidenceIndeterminate: 'अनिर्णितम्',

    chhandaHeaderTitle: 'छन्दोविज्ञानम् एवं लक्षण-घटाना',
    chhandaHeaderSubtitle: 'वृत्तरत्नाकर-छन्दोमञ्जरी-ग्रन्थानां प्रामाणिक-लक्षणानि, गण-योजना, वर्ण-गणना तथा श्लोकेषु प्रत्यक्ष-घटाना।',
    chhandaSearchPlaceholder: 'छन्दः अन्विष्यताम् (उदा. अनुष्टुप्, इन्द्रवज्रा, ११)...',
    filterAll: 'सर्वाणि',
    filterSamavrittam: 'समवृत्तम्',
    filterMatravrittam: 'मात्रावृत्तम्',
    filterArdhasamavrittam: 'अर्धसमवृत्तम्',
    filterMishravrittam: 'मिश्रवृत्तम्',
    tabLakshana: 'लक्षणानि प्रमाणानि च',
    tabGhatana: 'चरण-घटाना (Laghu-Guru)',
    tabPractice: 'स्वरचित-परीक्षाम्',
    lakshanaSources: 'प्रामाणिक-लक्षण-ग्रन्थाः',
    ghatanaExplanation: 'चरणशः लघु-गुरु-गण-प्रस्तारः',
    padasAnalysis: 'पादानुसारेण घटाना',

    toolsHeaderTitle: 'संस्कृत-काव्यशास्त्रीय-उपकरणानि',
    toolsHeaderSubtitle: 'छन्दः-स्कैनर्, सन्धि-विच्छेद-नियमकोषः, विभक्ति-सारणी तथा अन्वय-रचना-सहकारिणी।',
    toolScanner: 'छन्दः एवं गण-प्रस्तारः',
    toolSandhi: 'सन्धि-विच्छेद-नियमावली',
    toolVibhakti: 'विभक्ति एवं शब्दरूप-सारणी',
    toolAnvaya: 'दण्डान्वय-खण्डान्वय-विधिः',

    devBadge: 'अनुसन्धानम् एवं निर्माणम् (Developer & Researcher)',
    devName: 'Amit Kumar AKS',
    devDegree: 'शास्त्री चतुर्थ-वर्ष छात्रः (Shastri 4th Year Student)',
    devUniversity: 'राष्ट्रियसंस्कृतविश्वविद्यालयः (National Sanskrit University), तिरुपति, आन्ध्रप्रदेशः',
    btnPortfolio: 'Check Portfolio',
    btnEmail: 'amitkumargvgm@gmail.com',
    devVisionTitle: 'काव्यलेन्स (KāvyaLens) ध्येयम्',
    devVisionDesc: 'संस्कृतसाहित्यस्य काव्यशास्त्रस्य च अध्येतॄणां कृते शास्त्रीय-साक्ष्य-समन्वितानां श्लोक-विश्लेषणानां निष्पक्षं सुलभं च मञ्चम्।',
    devRigorTitle: 'शास्त्रीय-प्रामाणिकता एवं साक्ष्य-निष्ठा',
    devRigorDesc: 'भरतमुनि-आनन्दवर्धन-मम्मट-विश्वनाथ-केदारभट्टानां शास्त्रीय-नियमैः एव परिणामः प्रस्तूयते। कल्पितानि वचनानि निषिद्धानि।',
    faqTitle: 'प्रायिक-प्रश्नोत्तराणि — कथं कार्यं करोति?',
    faq1Q: '१. किं केवलं सञ्चितात् (Database) विवरणम् आगच्छति?',
    faq1A: 'न! अत्र शास्त्रीय-गणित-नियम-चालितः विश्लेषक-इञ्जिन् अस्ति। नूतनः स्वरचितः वा श्लोकः अपि वर्ण-गण-लघु-गुरु-विभक्ति-विच्छेद-पूर्वकं परिशील्यते।',
    faq2Q: '२. परिणामस्य त्रुटि-सम्भावना कियती?',
    faq2A: 'वर्ण-गणनायां गण-क्रमे च ९८%+ विशुद्धता वर्तते। अलङ्कार-रस-ध्वनिषु प्राचीन-आचार्याणामपि मतभेदाः सन्ति, अतः साक्ष्य-विश्वास-स्तराः (Strongly supported, Plausible) स्पष्टं दर्श्यन्ते।',
    faq3Q: '३. भाषा-परिवर्तनेन सद्यः परिणाम-प्राप्तिः:',
    faq3A: 'एकवारं विश्लेषिते सति पुनः जाल-सम्पर्कं विनापि संस्कृत-हिन्दी-आङ्ग्ल-भाषासु क्षणमात्रेण परिणामः परिवर्तते।',
    footerNote: 'अभिकल्पकः विकासकश्च: Amit Kumar AKS | शास्त्री चतुर्थ-वर्ष छात्रः, राष्ट्रियसंस्कृतविश्वविद्यालयः, तिरुपति'
  },
  hi: {
    brandTitle: 'KāvyaLens',
    brandSubtitle: 'संस्कृत काव्यशास्त्र एवं साहित्य विश्लेषण मञ्च',

    navWorkbench: 'श्लोक विश्लेषण',
    navChhanda: 'छन्द-कोष एवं घटाना',
    navProsody: 'काव्यशास्त्र कोष',
    navTools: 'संस्कृत उपकरण',
    navDeveloper: 'परिचय / रचयिता',

    themeLight: 'प्रकाश मोड',
    themeDark: 'डार्क मोड',

    dockWorkbench: 'विश्लेषण',
    dockChhanda: 'छन्द-कोष',
    dockProsody: 'काव्यशास्त्र',
    dockTools: 'उपकरण',
    dockDeveloper: 'परिचय',

    inputTitle: 'संस्कृत श्लोक प्रविष्ट करें',
    inputSubtitle: 'पाठ्यपुस्तक, पाण्डुलिपि अथवा स्वरचित कोई भी श्लोक यहाँ लिखें अथवा चित्र खींचकर निकालें।',
    inputPlaceholder: 'यहाँ देवनागरी अथवा IAST में श्लोक प्रविष्ट करें... (उदा. वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये...)',
    btnAnalyze: 'श्लोक का अनुशीलन करें',
    btnAnalyzing: 'शास्त्रीय अनुशीलन जारी है...',
    btnReset: 'रीसेट करें',
    btnClear: 'साफ करें',
    btnExtractImage: 'चित्र से श्लोक निकालें (OCR)',
    extractingImage: 'चित्र से श्लोक निकाला जा रहा है...',
    imageUploadTitle: 'श्लोक का चित्र अपलोड करें (Upload Verse Photo)',
    imageUploadDesc: 'पुस्तक या पाण्डुलिपि का फोटो अपलोड करें, ऐप स्वतः श्लोक पहचान लेगा।',
    sampleChipsLabel: 'परीक्षार्थ प्रसिद्ध श्लोक नमूने:',
    sampleChipsHint: 'क्लिक करके भरें',
    metadataToggle: 'ग्रन्थ एवं कवि का संदर्भ जोड़ें (वैकल्पिक)',
    fieldWork: 'ग्रन्थ का नाम',
    fieldAuthor: 'रचयिता / कवि',
    fieldVerseNo: 'सर्ग / अङ्क / संख्या',
    fieldTradition: 'काव्यशास्त्र सम्प्रदाय',
    estimatedMeter: 'अनुमानित छन्द:',
    syllablesCount: 'वर्ण-संख्या',
    padasCount: 'पाद',
    langSelectLabel: 'भाषा:',

    tabOverview: 'संक्षिप्त विवरण',
    tabGrammar: 'पदच्छेद एवं अन्वय',
    tabRasa: 'रस एवं ध्वनि',
    tabAlankara: 'अलङ्कार',
    tabPoetics: 'काव्य गुण एवं रीति',
    tabAudit: 'प्रमाण एवं प्रामाणिकता',
    btnExportDossier: 'शोध-पत्र डाउनलोड करें',
    btnInquire: 'विद्वान से प्रश्न पूछें',
    wordByWord: 'पदार्थ प्रतिपादन',
    anvayaTitle: 'अन्वय क्रम',
    compoundsTitle: 'समास विग्रह',
    grammarUnitsTitle: 'व्याकरण इकाइयाँ',
    primaryRasaTitle: 'प्रधान रस',
    sthayibhavaTitle: 'स्थायी भाव',
    realizationStatusTitle: 'रस निष्पत्ति स्थिति',
    vibhavaTitle: 'विभाव (आलम्बन एवं उद्दीपन)',
    anubhavaTitle: 'अनुभाव',
    vyabhicariTitle: 'व्यभिचारी भाव',
    dhvaniTitle: 'ध्वनि स्वरूप',
    vacyarthaTitle: 'वाच्यार्थ',
    vyangyarthaTitle: 'व्यङ्ग्यार्थ',
    confidenceStrong: 'सुदृढ़ साक्ष्य',
    confidencePlausible: 'सम्भावित',
    confidenceTentative: 'प्रास्ताविक',
    confidenceIndeterminate: 'अनिर्णित',

    chhandaHeaderTitle: 'छन्द-विज्ञान एवं लक्षण-घटाना',
    chhandaHeaderSubtitle: 'वृत्तरत्नाकर एवं छन्दोमञ्जरी के प्रामाणिक लक्षण, गण-व्यवस्था, वर्ण-गणना तथा प्रसिद्ध श्लोकों पर लघु-गुरु घटाकर प्रत्यक्ष दर्शन।',
    chhandaSearchPlaceholder: 'छन्द खोजें (उदा. अनुष्टुप्, इन्द्रवज्रा, 11)...',
    filterAll: 'सभी',
    filterSamavrittam: 'समवृत्त',
    filterMatravrittam: 'मात्रावृत्त',
    filterArdhasamavrittam: 'अर्धसमवृत्त',
    filterMishravrittam: 'मिश्रवृत्त',
    tabLakshana: 'लक्षण एवं प्रमाण',
    tabGhatana: 'लक्षण-घटाना (Laghu-Guru)',
    tabPractice: 'स्वरचित श्लोक परीक्षण',
    lakshanaSources: 'प्रामाणिक लक्षण ग्रन्थ',
    ghatanaExplanation: 'चरणशः लघु-गुरु एवं गण प्रस्तार',
    padasAnalysis: 'पादानुसार घटाना',

    toolsHeaderTitle: 'संस्कृत अध्ययन एवं व्याकरण उपकरण',
    toolsHeaderSubtitle: 'छन्द स्कैनर, सन्धि-विच्छेद नियमावली, विभक्ति सारणी तथा अन्वय रचना मार्गदर्शिका।',
    toolScanner: 'छन्द एवं गण स्कैनर',
    toolSandhi: 'सन्धि-विच्छेद एवं नियमावली',
    toolVibhakti: 'विभक्ति एवं शब्दरूप सारणी',
    toolAnvaya: 'दण्डान्वय एवं खण्डान्वय विधि',

    devBadge: 'अनुसन्धान एवं निर्माण (Developer & Researcher)',
    devName: 'Amit Kumar AKS',
    devDegree: 'शास्त्री चतुर्थ-वर्ष छात्र (Shastri 4th Year Student)',
    devUniversity: 'राष्ट्रियसंस्कृतविश्वविद्यालयः (National Sanskrit University), तिरुपति, आन्ध्रप्रदेश',
    btnPortfolio: 'Check Portfolio',
    btnEmail: 'amitkumargvgm@gmail.com',
    devVisionTitle: 'काव्यलेन्स (KāvyaLens) का उद्देश्य',
    devVisionDesc: 'संस्कृत साहित्य और काव्यशास्त्र के अध्येताओं, शोधार्थियों और जिज्ञासुओं के लिए निष्पक्ष, साक्ष्य-सम्मत और गहन विश्लेषक मञ्च।',
    devRigorTitle: 'शास्त्रीय प्रामाणिकता एवं साक्ष्य-निष्ठा',
    devRigorDesc: 'भरतमुनि, आनन्दवर्धन, मम्मट, विश्वनाथ और केदारभट्ट के नियमों के आलोक में ही साक्ष्य प्रस्तुत किए जाते हैं।',
    faqTitle: 'यह कैसे काम करता है और परिणाम कहाँ से आते हैं?',
    faq1Q: '१. क्या यह केवल डेटाबेस (Database) से विवरण लाता है?',
    faq1A: 'नहीं! यह केवल रटे हुए श्लोकों तक सीमित नहीं है। इसमें अन्तर्निर्मित शास्त्रीय विश्लेषक इंजन है, जो किसी भी अप्रकट या स्वरचित श्लोक का भी प्रत्यक्ष विश्लेषण करता है।',
    faq2Q: '२. परिणाम के गलत होने की सम्भावना कितनी है?',
    faq2A: 'वर्ण-गणना और गण-क्रम में ९८%+ सटीकता होती है। अलङ्कार, रस और ध्वनि में प्राचीन आचार्यों के मतभेद होने के कारण स्पष्ट साक्ष्य और विश्वास-स्तर प्रदर्शित किए जाते हैं।',
    faq3Q: '३. भाषा परिवर्तन पर तुरंत ३ भाषाओं में परिणाम:',
    faq3A: 'एक बार विश्लेषण होने के बाद आप बिना पुनः लोड किए एक क्लिक में हिन्दी, संस्कृत और अंग्रेजी तीनों प्रारूपों में तात्कालिक रूप से देख सकते हैं।',
    footerNote: 'अभिकल्पक एवं विकासक: Amit Kumar AKS | शास्त्री चतुर्थ-वर्ष छात्र, राष्ट्रियसंस्कृतविश्वविद्यालयः, तिरुपति'
  },
  en: {
    brandTitle: 'KāvyaLens',
    brandSubtitle: 'Sanskrit Literary Intelligence Platform',

    navWorkbench: 'Verse Analyzer',
    navChhanda: 'Chhanda Corpus & Scansion',
    navProsody: 'Poetics Glossary',
    navTools: 'Sanskrit Utilities',
    navDeveloper: 'Developer & NSU Scholar',

    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',

    dockWorkbench: 'Analyzer',
    dockChhanda: 'Chhanda',
    dockProsody: 'Poetics',
    dockTools: 'Utilities',
    dockDeveloper: 'About',

    inputTitle: 'Enter Sanskrit Verse',
    inputSubtitle: 'Input any verse from classical texts, manuscripts, or original compositions, or extract via image photo.',
    inputPlaceholder: 'Enter Sanskrit verse in Devanagari or IAST... (e.g., vāgarthāviva sampṛktau vāgarthapratipattaye...)',
    btnAnalyze: 'Analyze Verse',
    btnAnalyzing: 'Analyzing according to Shastras...',
    btnReset: 'Reset',
    btnClear: 'Clear',
    btnExtractImage: 'Extract from Image (OCR)',
    extractingImage: 'Extracting Sanskrit text from image...',
    imageUploadTitle: 'Upload Shloka Image (Photo OCR)',
    imageUploadDesc: 'Select or snap a photo of any printed or handwritten Sanskrit verse.',
    sampleChipsLabel: 'Classical Benchmark Verses:',
    sampleChipsHint: 'Click to populate',
    metadataToggle: 'Add Text & Poet Reference (Optional)',
    fieldWork: 'Work Title',
    fieldAuthor: 'Author / Poet',
    fieldVerseNo: 'Canto / Verse Number',
    fieldTradition: 'Poetics Tradition',
    estimatedMeter: 'Estimated Meter:',
    syllablesCount: 'Syllables',
    padasCount: 'Padas',
    langSelectLabel: 'Language:',

    tabOverview: 'Overview',
    tabGrammar: 'Grammar & Anvaya',
    tabRasa: 'Rasa & Dhvani',
    tabAlankara: 'Figures of Speech',
    tabPoetics: 'Poetic Style & Guna',
    tabAudit: 'Scholarly Verification',
    btnExportDossier: 'Download Dossier',
    btnInquire: 'Inquire on Verse',
    wordByWord: 'Word-by-Word Gloss',
    anvayaTitle: 'Syntactic Anvaya Order',
    compoundsTitle: 'Compound Vigraha',
    grammarUnitsTitle: 'Morphological Parsing',
    primaryRasaTitle: 'Primary Rasa',
    sthayibhavaTitle: 'Permanent State (Sthāyībhāva)',
    realizationStatusTitle: 'Aesthetic Realization Status',
    vibhavaTitle: 'Determinants (Vibhāva)',
    anubhavaTitle: 'Consequents (Anubhāva)',
    vyabhicariTitle: 'Transient Emotions (Vyabhicāribhāva)',
    dhvaniTitle: 'Poetic Resonance (Dhvani)',
    vacyarthaTitle: 'Literal Utterance (Vācyārtha)',
    vyangyarthaTitle: 'Suggested Meaning (Vyaṅgyārtha)',
    confidenceStrong: 'Strongly Supported',
    confidencePlausible: 'Plausible',
    confidenceTentative: 'Tentative',
    confidenceIndeterminate: 'Indeterminate',

    chhandaHeaderTitle: 'Chhanda Metrics & Rule Demonstration',
    chhandaHeaderSubtitle: 'Authoritative rules from Vṛttaratnākara and Chhandomañjarī, gana schemes, caesuras, and step-by-step Laghu-Guru reductions on classical verses.',
    chhandaSearchPlaceholder: 'Search meter (e.g. Anustup, Indravajra, 11)...',
    filterAll: 'All',
    filterSamavrittam: 'Samavṛttam',
    filterMatravrittam: 'Mātravṛttam',
    filterArdhasamavrittam: 'Ardhasamavṛttam',
    filterMishravrittam: 'Miśravṛttam',
    tabLakshana: 'Rules & Authorities',
    tabGhatana: 'Step-by-step Ghatana',
    tabPractice: 'Original Verse Test',
    lakshanaSources: 'Authoritative Shastric Treatises',
    ghatanaExplanation: 'Pada-wise Laghu-Guru & Gana Partition',
    padasAnalysis: 'Scansion Analysis by Pada',

    toolsHeaderTitle: 'Sanskrit Study & Grammatical Tools',
    toolsHeaderSubtitle: 'Metrical scanner, Sandhi resolution tables, Vibhakti declension charts, and Dandānvaya-Khaṇḍānvaya syntactical assistant.',
    toolScanner: 'Meter & Gana Scanner',
    toolSandhi: 'Sandhi Rules & Splitter',
    toolVibhakti: 'Vibhakti Declension Charts',
    toolAnvaya: 'Anvaya Syntactic Order',

    devBadge: 'Research & Engineering (Developer & Researcher)',
    devName: 'Amit Kumar AKS',
    devDegree: 'Shastri 4th Year Student (शास्त्री चतुर्थ-वर्ष छात्र)',
    devUniversity: 'National Sanskrit University (राष्ट्रियसंस्कृतविश्वविद्यालयः), Tirupati, AP',
    btnPortfolio: 'Check Portfolio',
    btnEmail: 'amitkumargvgm@gmail.com',
    devVisionTitle: 'Mission of KāvyaLens',
    devVisionDesc: 'An evidence-driven, academic platform for scholars, researchers, and students of Sanskrit literature and Kāvyashāstra to analyze classical and original verses.',
    devRigorTitle: 'Shastric Rigor & Evidence-based Analysis',
    devRigorDesc: 'Grounded in foundational authorities: Bharata Muni, Ānandavardhana, Mammaṭa, Viśvanātha, and Kedāra Bhaṭṭa. Unverified claims are strictly flagged.',
    faqTitle: 'Frequently Asked Questions: How does KāvyaLens work?',
    faq1Q: '1. Does it only retrieve verses from a pre-saved database?',
    faq1A: 'No! Beyond pre-verified canonical benchmarks, it contains a live Sanskrit computational analysis engine. Even unpublished, fragmented, or freshly composed verses receive pada-split, sandhi analysis, scansion, and shastric diagnostics.',
    faq2Q: '2. What is the potential error margin?',
    faq2A: 'Mathematical rules of prosody and grammar (syllable counts, Laghu-Guru, gana schemes) have 98%+ precision. In aesthetic dimensions (rasa, alankara, dhvani) where classical commentators themselves disagree, KāvyaLens provides transparent confidence labels.',
    faq3Q: '3. Instant multi-language toggle across 3 languages:',
    faq3A: 'Once examined, all analytical content transforms instantly between Sanskrit, Hindi, and English with a single tap, without requiring re-computation.',
    footerNote: 'Designed and Developed by: Amit Kumar AKS | Shastri 4th Year, National Sanskrit University, Tirupati'
  }
};
