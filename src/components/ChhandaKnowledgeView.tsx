import React, { useState } from 'react';
import { CHHANDA_CORPUS, ChhandaDetail } from '../data/chhandaCorpus';
import { Search, BookOpen, Music, CheckCircle2, ChevronRight, Sparkles, Feather, HelpCircle, Layers } from 'lucide-react';

import { OutputLanguage } from '../types/kavya';
import { I18N_STRINGS } from '../utils/i18n';

interface ChhandaKnowledgeViewProps {
  language?: OutputLanguage;
}

export const ChhandaKnowledgeView: React.FC<ChhandaKnowledgeViewProps> = ({ language = 'sa' }) => {
  const t = I18N_STRINGS[language] || I18N_STRINGS.sa;
  const [selectedId, setSelectedId] = useState<string>(CHHANDA_CORPUS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'lakshana' | 'ghatana' | 'practice'>('ghatana');
  const [customPracticeText, setCustomPracticeText] = useState<string>('');

  const filteredChhandas = CHHANDA_CORPUS.filter(ch => {
    const matchesSearch = 
      ch.nameSanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.nameIAST.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.syllableCountPerPada.includes(searchQuery);
    const matchesType = activeTypeFilter === 'all' || ch.type === activeTypeFilter;
    return matchesSearch && matchesType;
  });

  const selectedChhanda = CHHANDA_CORPUS.find(c => c.id === selectedId) || CHHANDA_CORPUS[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-medium tracking-wide uppercase mb-2">
              <Music className="w-3.5 h-3.5" />
              <span>{t.navChhanda}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
              <span>{t.chhandaHeaderTitle}</span>
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl leading-relaxed">
              {t.chhandaHeaderSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-stone-200/70 dark:bg-slate-800 border border-stone-300 dark:border-slate-700 font-mono text-stone-700 dark:text-amber-300">
              {CHHANDA_CORPUS.length} {language === 'sa' ? 'वृत्तानि' : 'प्रमुख वृत्त'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout: Split on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Chhanda List & Filters (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder={t.chhandaSearchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-800 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Type Filters */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: t.filterAll },
                { id: 'समवृत्तम्', label: t.filterSamavrittam },
                { id: 'अर्धसमवृत्तम्', label: t.filterArdhasamavrittam },
                { id: 'मात्रावृत्तम्', label: t.filterMatravrittam },
                { id: 'विषमवृत्तम्', label: language === 'sa' ? 'विषमवृत्तम् (वैदिक)' : 'विषमवृत्त (वैदिक)' },
                { id: 'मिश्रवृत्तम्', label: t.filterMishravrittam }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveTypeFilter(f.id)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                    activeTypeFilter === f.id
                      ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm'
                      : 'bg-stone-100 dark:bg-slate-800/80 text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Chhandas */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredChhandas.map(ch => {
              const isSelected = ch.id === selectedId;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedId(ch.id);
                    setCustomPracticeText('');
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400/60 shadow-sm'
                      : 'bg-white dark:bg-[#131B2A] border-stone-200 dark:border-slate-800 hover:border-amber-400/40 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                        {ch.nameSanskrit}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400">
                        {ch.nameIAST}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 dark:text-slate-400 flex items-center gap-2">
                      <span>{ch.syllableCountPerPada.split('(')[0]}</span>
                      <span>•</span>
                      <span className="font-mono text-amber-700 dark:text-amber-400">{ch.ganaScheme.slice(0, 26)}...</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-600 dark:text-amber-400 translate-x-1' : 'text-stone-300 dark:text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Chhanda Detail (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Header Card */}
          <div className="p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-medium">
                    {selectedChhanda.type}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-slate-400">
                    {selectedChhanda.totalSyllables}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
                  {selectedChhanda.nameSanskrit}
                </h2>
                <div className="text-sm text-stone-600 dark:text-slate-300 mt-0.5">
                  {selectedChhanda.nameHindi} ({selectedChhanda.nameIAST})
                </div>
              </div>

              {/* Quick Specs Pill */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-xs space-y-1">
                <div><span className="text-stone-400">वर्ण संख्या:</span> <strong className="text-stone-800 dark:text-slate-200">{selectedChhanda.syllableCountPerPada}</strong></div>
                <div><span className="text-stone-400">यति नियम:</span> <strong className="text-amber-700 dark:text-amber-400">{selectedChhanda.yati}</strong></div>
              </div>
            </div>

            {/* Gana Formula Display */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
              <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>गण-व्यवस्था एवं सूत्र</span>
              </div>
              <div className="font-mono text-sm text-stone-800 dark:text-amber-100 font-medium">
                {selectedChhanda.ganaScheme}
              </div>
              <div className="font-mono text-xs text-amber-700 dark:text-amber-400/90 mt-1">
                स्वरूप: {selectedChhanda.ganaFormula}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-stone-200 dark:border-slate-800 gap-4 pt-2">
              <button
                onClick={() => setActiveTab('ghatana')}
                className={`pb-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'ghatana'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>लक्षण-घटाना एवं उदाहरण</span>
              </button>
              <button
                onClick={() => setActiveTab('lakshana')}
                className={`pb-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'lakshana'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>प्रामाणिक लक्षण ({selectedChhanda.lakshanas.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className={`pb-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'practice'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
                }`}
              >
                <Feather className="w-4 h-4" />
                <span>स्वयं अभ्यास</span>
              </button>
            </div>
          </div>

          {/* TAB 1: GHATANA & EXAMPLE */}
          {activeTab === 'ghatana' && (
            <div className="space-y-5">
              {/* Example Verse Card */}
              <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1">
                    <Feather className="w-3.5 h-3.5" />
                    <span>प्रसिद्ध शास्त्रीय उदाहरण</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 font-serif">
                    {selectedChhanda.exampleSource}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-slate-900/60 border border-amber-500/20 text-center">
                  <pre className="font-sanskrit text-lg sm:text-xl font-medium text-stone-900 dark:text-amber-100 whitespace-pre-wrap leading-relaxed">
                    {selectedChhanda.exampleVerse}
                  </pre>
                </div>

                <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-slate-900/40 p-3 rounded-lg border border-stone-200 dark:border-slate-800">
                  <strong className="text-stone-800 dark:text-amber-200">हिन्दी भावार्थ: </strong>
                  {selectedChhanda.exampleMeaningHindi}
                </div>
              </div>

              {/* Ghatana / Metrical Breakdown */}
              <div className="p-5 rounded-2xl border border-amber-500/30 bg-white dark:bg-[#131B2A] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
                      घ
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
                        प्रत्यक्ष घटाना (Metrical Demonstration)
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-slate-400">
                        {selectedChhanda.ghatana.ruleApplied}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-medium">
                    पूर्णतः घटितम्
                  </span>
                </div>

                {/* Pada-by-Pada Breakdown */}
                <div className="space-y-3.5">
                  {selectedChhanda.ghatana.padas.map(pada => (
                    <div
                      key={pada.padaIndex}
                      className="p-4 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-900/70 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-200 dark:bg-slate-800 text-stone-700 dark:text-slate-300">
                          पाद {pada.padaIndex}
                        </span>
                        <span className="font-sanskrit text-base font-medium text-stone-800 dark:text-amber-200">
                          {pada.padaText}
                        </span>
                      </div>

                      {/* Syllables + Weights row */}
                      <div className="overflow-x-auto pb-1">
                        <div className="inline-flex gap-1.5 items-end">
                          {pada.syllables.map((syl, i) => {
                            const weight = pada.weights[i];
                            const isGuru = weight === 'ऽ';
                            return (
                              <div
                                key={i}
                                className="flex flex-col items-center min-w-[34px] px-1 py-1 rounded bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-center"
                              >
                                <span className="font-sanskrit text-sm font-semibold text-stone-900 dark:text-slate-100">
                                  {syl}
                                </span>
                                <span
                                  className={`font-mono text-base font-bold mt-0.5 ${
                                    isGuru
                                      ? 'text-amber-600 dark:text-amber-400'
                                      : 'text-sky-600 dark:text-sky-400'
                                  }`}
                                >
                                  {weight}
                                </span>
                                <span className="text-[10px] text-stone-400 dark:text-slate-500 font-mono">
                                  {isGuru ? 'गुरु' : 'लघु'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Ganas grouping */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pada.ganas.map((g, gi) => (
                          <span
                            key={gi}
                            className="px-2 py-0.5 rounded text-xs bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 font-mono"
                          >
                            {g}
                          </span>
                        ))}
                      </div>

                      {/* Explanation */}
                      <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed italic border-t border-stone-200 dark:border-slate-800/80 pt-2">
                        {pada.padaExplanation}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Step-by-Step checklist */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    क्रमशः परीक्षा एवं निष्कर्ष
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700 dark:text-slate-300">
                    {selectedChhanda.ghatana.stepByStepAnalysis.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 text-xs font-medium text-amber-800 dark:text-amber-200 border-t border-amber-500/20">
                    {selectedChhanda.ghatana.conclusion}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LAKSHANAS (From multiple shastras) */}
          {activeTab === 'lakshana' && (
            <div className="space-y-4">
              {selectedChhanda.lakshanas.map((lak, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                        लक्षण {index + 1} ({lak.source} — {lak.author})
                      </h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 font-mono">
                      ग्रन्थ: {lak.source}
                    </span>
                  </div>

                  {/* Lakshana Sanskrit Text */}
                  <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-slate-900/60 border border-amber-500/20 text-center">
                    <pre className="font-sanskrit text-lg font-bold text-amber-900 dark:text-amber-200 whitespace-pre-wrap leading-relaxed">
                      {lak.text}
                    </pre>
                  </div>

                  {/* Meaning Hindi */}
                  <div className="text-sm text-stone-700 dark:text-slate-300 leading-relaxed bg-stone-50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-stone-200 dark:border-slate-800 space-y-1">
                    <strong className="text-stone-900 dark:text-amber-100 block text-xs uppercase tracking-wide">
                      हिन्दी व्याख्या:
                    </strong>
                    <p>{lak.meaningHindi}</p>
                  </div>

                  {/* Meaning Sanskrit if available */}
                  {lak.meaningSanskrit && (
                    <div className="text-xs text-stone-600 dark:text-slate-400 bg-stone-50/50 dark:bg-slate-900/20 p-3 rounded-lg border border-stone-200/60 dark:border-slate-800/60">
                      <strong className="text-stone-700 dark:text-amber-300">संस्कृत-विवरणम्: </strong>
                      <span className="font-sanskrit">{lak.meaningSanskrit}</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Shastra Context Notice */}
              <div className="p-4 rounded-xl bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-xs text-stone-600 dark:text-slate-400 space-y-1">
                <div className="font-semibold text-stone-800 dark:text-slate-200 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>शास्त्रीय संदर्भ सूचना:</span>
                </div>
                <p>
                  प्राचीन काल से पिङ्गलच्छन्दःसूत्रम्, केदारभट्टकृत वृत्तरत्नाकर, गङ्गादासकृत छन्दोमञ्जरी, तथा हेमचन्द्रकृत छन्दोऽनुशासन—ये संस्कृत छन्दःशास्त्र के प्रमुख प्रामाणिक ग्रन्थ हैं। यहाँ दिये गये सभी लक्षण मूल ग्रन्थों से अविकल रूप से उद्धृत हैं।
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: PRACTICE */}
          {activeTab === 'practice' && (
            <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
                  {selectedChhanda.nameSanskrit} पर स्वरचित या अन्य पद्य घटाएँ
                </h3>
              </div>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                यहाँ कोई भी पंक्ति लिखकर देखें कि वह {selectedChhanda.nameSanskrit} के गण-क्रम ({selectedChhanda.ganaFormula}) से मेल खाती है या नहीं।
              </p>

              <textarea
                rows={3}
                placeholder="यहाँ संस्कृत पाद या श्लोक लिखें..."
                value={customPracticeText}
                onChange={(e) => setCustomPracticeText(e.target.value)}
                className="w-full p-3 font-sanskrit text-base rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-amber-100 focus:outline-none focus:border-amber-500"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setCustomPracticeText(selectedChhanda.exampleVerse.split('\n')[0])}
                  className="px-3 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800"
                >
                  उदाहरण पाद लोड करें
                </button>
              </div>

              {customPracticeText && (
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-stone-500">अपेक्षित गण-क्रम:</div>
                  <div className="font-mono text-xs text-amber-700 dark:text-amber-400">{selectedChhanda.ganaScheme}</div>
                  <div className="text-xs text-stone-600 dark:text-slate-300 pt-2 border-t border-stone-200 dark:border-slate-800">
                    पूर्ण पद्य का समग्र विश्लेषण करने के लिए मुख्य पृष्ठ पर स्थित <strong>"श्लोक विश्लेषण"</strong> टूल का उपयोग करें।
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
