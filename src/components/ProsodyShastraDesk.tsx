import React, { useState } from 'react';
import { scanSanskritMeter, KAVYASHASTRA_GLOSSARY } from '../utils/sanskritUtils';
import { OutputLanguage } from '../types/kavya';
import { I18N_STRINGS } from '../utils/i18n';
import { Activity, BookOpen, Search, Sparkles, Feather } from 'lucide-react';

interface ProsodyShastraDeskProps {
  language?: OutputLanguage;
}

export const ProsodyShastraDesk: React.FC<ProsodyShastraDeskProps> = ({ language = 'sa' }) => {
  const t = I18N_STRINGS[language] || I18N_STRINGS.sa;
  const [activeSubTab, setActiveSubTab] = useState<'lexicon' | 'prosody'>('lexicon');

  // Prosody Scanner State
  const [prosodyText, setProsodyText] = useState(`कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः
शापेनास्तङ्गमितमहिमा वर्षभोग्येण भर्तुः।
यक्षश्चक्रे जनकतनयास्नानपुण्योदकेषु
स्निग्धच्छायातरुषु वसतिं रामगिर्याश्रमेषु॥`);
  const scanResult = scanSanskritMeter(prosodyText);

  // Lexicon State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const terms = Object.values(KAVYASHASTRA_GLOSSARY);

  const filteredTerms = terms.filter((item) => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ref.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      categoryFilter === 'all' || 
      item.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn text-stone-900 dark:text-slate-200 transition-colors">
      {/* Top Banner & Sub-nav Toggle */}
      <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm dark:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.navProsody}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
            {language === 'sa' 
              ? 'काव्यशास्त्र-पारिभाषिक-कोषः रस-अलङ्कार-सिद्धान्ताश्च'
              : language === 'hi'
              ? 'काव्यशास्त्र एवं रस-अलङ्कार पारिभाषिक कोष'
              : 'Poetics Glossary: Rasa, Alaṅkāra, Guṇa & Dhvani'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 font-serif mt-0.5">
            {language === 'sa'
              ? 'काव्यप्रकाश-साहित्यदर्पण-ध्वन्यालोक-नाट्यशास्त्राणां प्रामाणिकाः सिद्धान्ताः'
              : language === 'hi'
              ? 'काव्यप्रकाश, साहित्यदर्पण, ध्वन्यालोक एवं नाट्यशास्त्र के पारिभाषिक सिद्धान्त एवं लक्षण'
              : 'Foundational concepts from Kāvyaprakāśa, Sāhityadarpaṇa, Dhvanyāloka, and Nāṭyaśāstra'}
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center bg-stone-100 dark:bg-slate-900 p-1 rounded-xl border border-stone-200 dark:border-slate-800 shrink-0">
          <button
            onClick={() => setActiveSubTab('lexicon')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'lexicon'
                ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold shadow-sm'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'sa' ? `काव्यशास्त्रकोषः (${terms.length})` : `काव्यशास्त्र कोष (${terms.length})`}</span>
          </button>
          <button
            onClick={() => setActiveSubTab('prosody')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'prosody'
                ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold shadow-sm'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{language === 'sa' ? 'छन्दः-प्रस्तारः' : 'त्वरित छन्दः प्रस्तार'}</span>
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: POETICS LEXICON */}
      {activeSubTab === 'lexicon' && (
        <div className="space-y-6">
          {/* Search & Filter Controls */}
          <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 dark:text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'sa' ? "पारिभाषिक-पदं, ग्रन्थं वा अन्विष्यताम्..." : "पारिभाषिक पद, लक्षण या ग्रन्थ खोजें (उदा. उपमा, रस, व्यञ्जना, मम्मट)..."}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 placeholder:text-stone-400"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['all', 'alaṅkāra', 'rasa', 'dhvani', 'saṃjñā', 'guṇa'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize whitespace-nowrap transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold'
                      : 'bg-stone-100 dark:bg-slate-900 text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200 border border-stone-200 dark:border-slate-800'
                  }`}
                >
                  {cat === 'all' ? (language === 'sa' ? 'सर्वाणि' : 'समग्र') : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Term Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTerms.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-sanskrit text-lg font-bold text-amber-800 dark:text-amber-200">
                      {item.term}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400 border border-stone-200 dark:border-slate-700 shrink-0">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-stone-500 dark:text-slate-400">
                  <span className="font-mono text-stone-400">प्रमाण ग्रन्थ:</span>
                  <span className="font-serif font-medium text-amber-700 dark:text-amber-300/90 truncate max-w-[200px]" title={item.ref}>
                    {item.ref}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: QUICK PROSODY SCANSION */}
      {activeSubTab === 'prosody' && (
        <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
              {language === 'sa' ? 'स्वयं छन्दः-प्रस्तार-परीक्षा' : 'स्वयं छन्दः प्रस्तार एवं मात्रा परीक्षण'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5 font-serif">
              यहाँ किसी भी श्लोक को लिखकर उसके लघु-गुरु (। / ऽ) वर्णों की स्वचालित गणना देखें
            </p>
          </div>

          <textarea
            rows={4}
            value={prosodyText}
            onChange={(e) => setProsodyText(e.target.value)}
            className="w-full p-4 font-sanskrit text-base rounded-2xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-amber-100 focus:outline-none focus:border-amber-500/80"
          />

          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase text-stone-500 dark:text-slate-400">
                {language === 'sa' ? 'अनुमित-छन्दः' : 'स्कैन निष्कर्ष:'}
              </span>
              <span className="font-editorial text-amber-800 dark:text-amber-300 font-bold text-lg">
                {scanResult.identifiedMeter}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-mono text-stone-500 dark:text-slate-400">पादशः प्रस्तार:</span>
              <div className="space-y-1.5">
                {scanResult.padas.map((pada, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-sanskrit text-stone-900 dark:text-amber-50 font-medium">
                      {pada.map(s => s.syllable).join('')}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-xs">
                      {pada.map((s, sIdx) => (
                        <span key={sIdx} className={`px-1 rounded ${s.weight === 'G' ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold' : 'bg-sky-500/10 text-sky-700 dark:text-sky-300'}`}>
                          {s.weight === 'G' ? 'ऽ' : '।'}
                        </span>
                      ))}
                      <span className="text-stone-400 ml-2">({scanResult.syllableCounts[idx] || pada.length} वर्ण)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {scanResult.meterNotes && (
              <p className="text-xs text-stone-500 dark:text-slate-400 italic">
                {scanResult.meterNotes}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
