import React, { useState } from 'react';
import { scanSanskritMeter } from '../utils/sanskritUtils';
import { OutputLanguage } from '../types/kavya';
import { I18N_STRINGS } from '../utils/i18n';
import { 
  Wrench, 
  Activity, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  Search,
  Sparkles,
  RefreshCw,
  Scissors
} from 'lucide-react';

interface SanskritToolsDeskProps {
  language?: OutputLanguage;
}

export const SanskritToolsDesk: React.FC<SanskritToolsDeskProps> = ({ language = 'sa' }) => {
  const t = I18N_STRINGS[language] || I18N_STRINGS.sa;
  const [activeTool, setActiveTool] = useState<'scanner' | 'sandhi' | 'anvaya' | 'vibhakti'>('scanner');

  // Scanner State
  const [inputVerse, setInputVerse] = useState<string>('वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये।\nजगतः पितरौ वन्दे पार्वतीपरमेश्वरौ॥');
  const [scanResult, setScanResult] = useState(() => scanSanskritMeter(inputVerse));

  // Sandhi Search State
  const [sandhiSearch, setSandhiSearch] = useState('');
  const [selectedSandhiCategory, setSelectedSandhiCategory] = useState<'all' | 'swara' | 'vyanjana' | 'visarga'>('all');

  const handleScan = (text: string) => {
    setInputVerse(text);
    setScanResult(scanSanskritMeter(text));
  };

  const SANDHI_RULES = [
    {
      category: 'swara',
      name: 'दीर्घ सन्धि (अकः सवर्णे दीर्घः)',
      rule: 'अ/आ + अ/आ = आ, इ/ई + इ/ई = ई, उ/ऊ + उ/ऊ = ऊ, ऋ/ॠ + ऋ = ॠ',
      examples: [
        { combined: 'विद्यालयः', split: 'विद्या + आलयः', meaning: 'ज्ञान का घर' },
        { combined: 'कवीन्द्रः', split: 'कवि + इन्द्रः', meaning: 'कवियों में श्रेष्ठ' },
        { combined: 'भानूदयः', split: 'भानु + उदयः', meaning: 'सूर्य का उदय' },
        { combined: 'पितॄणम्', split: 'पितृ + ऋणम्', meaning: 'पूर्वजों का ऋण' }
      ]
    },
    {
      category: 'swara',
      name: 'गुण सन्धि (आद्गुणः)',
      rule: 'अ/आ + इ/ई = ए, अ/आ + उ/ऊ = ओ, अ/आ + ऋ = अर्',
      examples: [
        { combined: 'सुरेशः', split: 'सुर + ईशः', meaning: 'देवताओं का स्वामी' },
        { combined: 'महोत्सवः', split: 'महा + उत्सवः', meaning: 'महान् उत्सव' },
        { combined: 'महर्षिः', split: 'महा + ऋषिः', meaning: 'महान् ऋषि' }
      ]
    },
    {
      category: 'swara',
      name: 'वृद्धि सन्धि (वृद्धिरेचि)',
      rule: 'अ/आ + ए/ऐ = ऐ, अ/आ + ओ/औ = औ',
      examples: [
        { combined: 'सदैव', split: 'सदा + एव', meaning: 'हमेशा ही' },
        { combined: 'मतैक्यम्', split: 'मत + ऐक्यम्', meaning: 'मतों की एकता' },
        { combined: 'वनौषधिः', split: 'वन + औषधिः', meaning: 'जंगल की जड़ी-बूटी' }
      ]
    },
    {
      category: 'swara',
      name: 'यण् सन्धि (इको यणचि)',
      rule: 'इ/ई + असमान स्वर = य्, उ/ऊ + असमान स्वर = व्, ऋ + असमान स्वर = र्',
      examples: [
        { combined: 'इत्यादि', split: 'इति + आदि', meaning: 'प्रारम्भ से' },
        { combined: 'स्वागतम्', split: 'सु + आगतम्', meaning: 'शुभ आगमन' },
        { combined: 'पित्राज्ञा', split: 'पितृ + आज्ञा', meaning: 'पिता का आदेश' }
      ]
    },
    {
      category: 'swara',
      name: 'अयादि सन्धि (एचोऽयवायावः)',
      rule: 'ए = अय्, ऐ = आय्, ओ = अव्, औ = आव्',
      examples: [
        { combined: 'नयनम्', split: 'ने + अनम्', meaning: 'नेत्र / आँख' },
        { combined: 'गायकः', split: 'गै + अकः', meaning: 'गाने वाला' },
        { combined: 'पवनः', split: 'पो + अनः', meaning: 'वायु' },
        { combined: 'पावकः', split: 'पौ + अकः', meaning: 'अग्नि' }
      ]
    },
    {
      category: 'vyanjana',
      name: 'श्चुत्व सन्धि (स्तोः श्चुना श्चुः)',
      rule: 'स्/त-वर्ग + श्/च-वर्ग = श्/च-वर्ग',
      examples: [
        { combined: 'सच्चित्', split: 'सत् + चित्', meaning: 'सत्य और चेतना' },
        { combined: 'रामश्शेते', split: 'रामस् + शेते', meaning: 'राम सोता है' },
        { combined: 'उज्ज्वलः', split: 'उत् + ज्वलः', meaning: 'प्रकाशमान' }
      ]
    },
    {
      category: 'vyanjana',
      name: 'जश्त्व सन्धि (झलां जशोऽन्ते)',
      rule: 'पदान्त वर्ग के प्रथम वर्ण (क्, च्, ट्, त्, प्) → तृतीय वर्ण (ग्, ज्, ड्, द्, ब्)',
      examples: [
        { combined: 'वागीशः', split: 'वाक् + ईशः', meaning: 'वाणी का स्वामी' },
        { combined: 'अजन्तम्', split: 'अच् + अन्तम्', meaning: 'स्वरान्त शब्द' },
        { combined: 'जगदीशः', split: 'जगत् + ईशः', meaning: 'संसार का स्वामी' }
      ]
    },
    {
      category: 'visarga',
      name: 'उत्व सन्धि (अतो रोरप्लुतादप्लुते)',
      rule: 'ह्रस्व अ + ः + अ अथवा हश् वर्ण = ओ',
      examples: [
        { combined: 'शिवोऽर्च्यः', split: 'शिवः + अर्च्यः', meaning: 'शिव पूजनीय हैं' },
        { combined: 'मनोरथः', split: 'मनस् (मनः) + रथः', meaning: 'हृदय की इच्छा' },
        { combined: 'तपोवनम्', split: 'तपः + वनम्', meaning: 'तपस्या का वन' }
      ]
    },
    {
      category: 'visarga',
      name: 'सत्व सन्धि (विसर्जनीयस्य सः)',
      rule: 'विसर्ग (ः) + ख्, फ्, अथवा त्/थ् = स्',
      examples: [
        { combined: 'नमस्ते', split: 'नमः + ते', meaning: 'आपको प्रणाम' },
        { combined: 'इतस्ततः', split: 'इतः + ततः', meaning: 'इधर-उधर' },
        { combined: 'हरिस्त्राता', split: 'हरिः + त्राता', meaning: 'हरि रक्षक हैं' }
      ]
    }
  ];

  const filteredSandhi = SANDHI_RULES.filter(r => {
    const matchesCat = selectedSandhiCategory === 'all' || r.category === selectedSandhiCategory;
    const matchesSearch = 
      r.name.toLowerCase().includes(sandhiSearch.toLowerCase()) ||
      r.rule.toLowerCase().includes(sandhiSearch.toLowerCase()) ||
      r.examples.some(e => e.combined.includes(sandhiSearch) || e.split.includes(sandhiSearch));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>{t.navTools}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
              {t.toolsHeaderTitle}
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl">
              {t.toolsHeaderSubtitle}
            </p>
          </div>

          {/* Tool Tab Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-slate-900 rounded-xl border border-stone-200 dark:border-slate-800 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTool('scanner')}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTool === 'scanner'
                  ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm font-semibold'
                  : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
              }`}
            >
              {t.toolScanner}
            </button>
            <button
              onClick={() => setActiveTool('sandhi')}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTool === 'sandhi'
                  ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm font-semibold'
                  : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
              }`}
            >
              {t.toolSandhi}
            </button>
            <button
              onClick={() => setActiveTool('anvaya')}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTool === 'anvaya'
                  ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm font-semibold'
                  : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
              }`}
            >
              {t.toolAnvaya}
            </button>
            <button
              onClick={() => setActiveTool('vibhakti')}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTool === 'vibhakti'
                  ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm font-semibold'
                  : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
              }`}
            >
              {t.toolVibhakti}
            </button>
          </div>
        </div>
      </div>

      {/* TOOL 1: CHHANDAS SCANNER */}
      {activeTool === 'scanner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{language === 'sa' ? 'पद्यं पादं वा प्रविशतु' : 'पद्य या पाद प्रविष्ट करें'}</span>
                </span>
                <button
                  onClick={() => handleScan('अर्थो हि कन्या परकीय एव\nतामद्य सम्प्रेष्य परिग्रहीतुः।')}
                  className="text-xs text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>इन्द्रवज्रा नमूना</span>
                </button>
              </div>

              <textarea
                rows={5}
                value={inputVerse}
                onChange={(e) => handleScan(e.target.value)}
                placeholder="यहाँ संस्कृत पद्य या पाद लिखें..."
                className="w-full p-3 font-sanskrit text-base rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
              />

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: 'अनुष्टुप्', text: 'वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये।\nजगतः पितरौ वन्दे पार्वतीपरमेश्वरौ॥' },
                  { label: 'वसन्ततिलका', text: 'पापान्निवारयति योजयते हिताय\nगुह्यं निगूहति गुणान् प्रकटीकरोति।' },
                  { label: 'मालिनी', text: 'सरसिजमनुविद्धं शैवलेनापि रम्यं\nमलिनमपि हिमांशोर्लक्ष्म लक्ष्मीं तनोति।' }
                ].map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => handleScan(sample.text)}
                    className="px-2.5 py-1 text-xs rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:border-amber-500 cursor-pointer"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prosody Rule Reference Note */}
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-xs text-stone-600 dark:text-slate-400 space-y-1.5">
              <strong className="text-stone-800 dark:text-slate-200 block">
                लघु-गुरु निर्धारण नियम (Syllable Weight Rules):
              </strong>
              <p>• ह्रस्व स्वर (अ, इ, उ, ऋ, ऌ) = लघु (।)</p>
              <p>• दीर्घ स्वर (आ, ई, ऊ, ॠ, ए, ऐ, ओ, औ) = गुरु (ऽ)</p>
              <p>• अनुस्वारयुक्त (ं) एवं विसर्गयुक्त (ः) वर्ण = गुरु (ऽ)</p>
              <p>• संयुक्त वर्ण से पूर्ववर्ती ह्रस्व वर्ण = गुरु (ऽ)</p>
              <p>• पाद का अन्तिम वर्ण आवश्यकतानुसार गुरु माना जा सकता है (सानुस्वारश्च दीर्घश्च विसर्गी च गुरुर्भवेत्। वर्णः संयोगपूर्वश्च तथा पादान्तोऽपि वा॥)</p>
            </div>
          </div>

          {/* Right Column: Scan Output */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
                  स्कैन परिणाम (Prosody Meter Analysis)
                </h3>
                <span className="text-xs px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-semibold font-serif">
                  {scanResult.identifiedMeter}
                </span>
              </div>

              {/* Pada Results */}
              <div className="space-y-3">
                {scanResult.padas.map((pada, padaIdx) => (
                  <div key={padaIdx} className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-slate-400">
                      <span>पाद {padaIdx + 1} ({scanResult.syllableCounts[padaIdx] || pada.length} वर्ण)</span>
                    </div>

                    <div className="font-sanskrit text-base text-stone-900 dark:text-amber-100 font-medium">
                      {pada.map(s => s.syllable).join('')}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pada.map((syl, sylIdx) => (
                        <div
                          key={sylIdx}
                          className="flex flex-col items-center p-1 rounded bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs min-w-[28px]"
                        >
                          <span className="font-sanskrit text-stone-800 dark:text-slate-200">{syl.syllable}</span>
                          <span className={`font-mono font-bold text-xs ${syl.weight === 'G' ? 'text-amber-600 dark:text-amber-400' : 'text-sky-600 dark:text-sky-400'}`}>
                            {syl.weight === 'G' ? 'ऽ' : '।'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {scanResult.meterNotes && (
                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-stone-600 dark:text-slate-400 font-serif">
                  टिप्पणी: {scanResult.meterNotes}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: SANDHI SPLITTER & RULES */}
      {activeTool === 'sandhi' && (
        <div className="p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-stone-100 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>सन्धि-विच्छेद एवं शास्त्रीय नियमावली (Sandhi Rules & Splitter)</span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
                पाणिनीय अष्टाध्यायी सूत्रों के अनुसार स्वर, व्यञ्जन एवं विसर्ग सन्धियों के उदाहरण एवं विच्छेद।
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'सभी' },
                { id: 'swara', label: 'स्वर सन्धि (अच्)' },
                { id: 'vyanjana', label: 'व्यञ्जन सन्धि (हल्)' },
                { id: 'visarga', label: 'विसर्ग सन्धि' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSandhiCategory(cat.id as any)}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    selectedSandhiCategory === cat.id
                      ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 font-semibold'
                      : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400 dark:text-slate-500" />
            <input 
              type="text"
              placeholder="सन्धि या शब्द खोजें (उदा. दीर्घ, सदैव, जगदीश, नमस्ते)..."
              value={sandhiSearch}
              onChange={(e) => setSandhiSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Rules Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSandhi.map((rule, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-900/60 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-stone-900 dark:text-amber-200 text-sm">
                    {rule.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 uppercase font-mono">
                    {rule.category}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 font-mono text-xs text-stone-800 dark:text-slate-200">
                  {rule.rule}
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold text-stone-500 dark:text-slate-400">प्रमुख उदाहरण:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {rule.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="p-2 rounded bg-white/80 dark:bg-slate-800/80 border border-stone-100 dark:border-slate-700/60 space-y-0.5">
                        <div className="font-sanskrit font-bold text-amber-800 dark:text-amber-300">
                          {ex.combined}
                        </div>
                        <div className="text-[11px] text-stone-600 dark:text-slate-300 font-sanskrit">
                          = {ex.split}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          ({ex.meaning})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 3: ANVAYA METHODS */}
      {activeTool === 'anvaya' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
              १
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">
              दण्डान्वय-पद्धति (Dandānvaya Method)
            </h3>
            <p className="text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
              इसमें श्लोक के शब्दों को गद्य के स्वाभाविक व्याकरण-क्रम (कर्ता → कर्म → क्रिया) में व्यवस्थित किया जाता है।
            </p>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="font-semibold text-stone-800 dark:text-slate-200">क्रमबद्ध सोपान:</div>
              <p>१. <strong>क्रियापद</strong> की पहचान करें (उदा. वन्दे, अस्ति, भवति)।</p>
              <p>२. <strong>कर्ता</strong> ढूँढें (कः वन्दे? → अहम्)।</p>
              <p>३. <strong>कर्म</strong> जोड़ें (कं वन्दे? → पार्वतीपरमेश्वरौ)।</p>
              <p>४. <strong>विशेषण</strong> और कारक जोड़ें (कथम्भूतान्? → वागर्थाविव सम्पृक्तौ, किमर्थम्? → वागर्थप्रतिपत्तये)।</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-700 dark:text-sky-400 flex items-center justify-center font-bold">
              २
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">
              खण्डान्वय-पद्धति (Khaṇḍānvaya Method)
            </h3>
            <p className="text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
              यह प्रश्नोत्तरी-आधारित अध्यापन विधि है, जिसमें क्रियापद को केंद्र में रखकर प्रश्न पूछे जाते हैं और उत्तर से अन्वय स्वयं निष्पन्न होता है।
            </p>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="font-semibold text-stone-800 dark:text-slate-200">प्रश्नोत्तर रूप:</div>
              <p>• <em>क्रिया का?</em> → वन्दे (प्रणाम करता हूँ)।</p>
              <p>• <em>कः वन्दते?</em> → (अहं) कविः कालिदासः।</p>
              <p>• <em>कौ वन्दे?</em> → पितरौ जगतः पार्वतीपरमेश्वरौ।</p>
              <p>• <em>कौ सदृशौ?</em> → वागर्थौ इव सम्पृक्तौ।</p>
              <p>• <em>कस्मै प्रयोजनाय?</em> → वागर्थप्रतिपत्तये।</p>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: VIBHAKTI & KARAKA */}
      {activeTool === 'vibhakti' && (
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">
                सप्त-विभक्ति एवं कारक समन्वय तालिका (Vibhakti & Case Syntactic Table)
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
                श्लोक में अन्वय करते समय किस विभक्ति का अर्थ किस प्रश्न से निकलता है:
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-stone-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-stone-100 dark:bg-slate-900 text-stone-700 dark:text-slate-300 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3 border-b border-stone-200 dark:border-slate-800">विभक्ति</th>
                  <th className="p-3 border-b border-stone-200 dark:border-slate-800">कारक</th>
                  <th className="p-3 border-b border-stone-200 dark:border-slate-800">चिह्न / अर्थ</th>
                  <th className="p-3 border-b border-stone-200 dark:border-slate-800">अन्वय-प्रश्न</th>
                  <th className="p-3 border-b border-stone-200 dark:border-slate-800">उदाहरण (राम शब्द)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-slate-800">
                {[
                  { vib: 'प्रथमा', kar: 'कर्ता', sign: 'ने (शून्य)', q: 'कः / का / किम् (कौन?)', eg: 'रामः (राम ने)' },
                  { vib: 'द्वितीया', kar: 'कर्म', sign: 'को', q: 'कम् / काम् / किम् (किसको?)', eg: 'रामम् (राम को)' },
                  { vib: 'तृतीया', kar: 'करण', sign: 'से / द्वारा', q: 'केन / कया (किसके द्वारा?)', eg: 'रामेण (राम से)' },
                  { vib: 'चतुर्थी', kar: 'सम्प्रदान', sign: 'के लिए', q: 'कस्मै / कस्यै (किसके लिए?)', eg: 'रामाय (राम के लिए)' },
                  { vib: 'पञ्चमी', kar: 'अपादान', sign: 'से (अलग होने में)', q: 'कस्मात् / कस्याः (कहाँ से?)', eg: 'रामात् (राम से)' },
                  { vib: 'षष्ठी', kar: 'सम्बन्ध', sign: 'का / के / की / रा / रे / री', q: 'कस्य / कस्याः (किसका?)', eg: 'रामस्य (राम का)' },
                  { vib: 'सप्तमी', kar: 'अधिकरण', sign: 'में / पर / पे', q: 'कस्मिन् / कस्याम् / कुत्र (कहाँ?)', eg: 'रामे (राम में)' },
                  { vib: 'सम्बोधन', kar: 'सम्बोधन', sign: 'हे / भोः / अरे', q: 'हे कः!', eg: 'हे राम!' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-amber-500/5 dark:hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-amber-800 dark:text-amber-300">{row.vib}</td>
                    <td className="p-3 text-stone-800 dark:text-slate-200 font-medium">{row.kar}</td>
                    <td className="p-3 text-stone-600 dark:text-slate-400">{row.sign}</td>
                    <td className="p-3 font-mono text-stone-700 dark:text-slate-300">{row.q}</td>
                    <td className="p-3 font-sanskrit text-stone-900 dark:text-amber-100">{row.eg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
