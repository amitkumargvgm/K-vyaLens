import React, { useState } from 'react';
import { KavyaAnalysisResult, OutputLanguage } from '../types/kavya';
import { ConfidenceBadge, VerificationBadge } from './ConfidenceBadge';
import { exportScholarDossierMarkdown, downloadScholarDossier } from '../utils/exportDossier';
import { 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  Search,
  MessageSquareText,
  FileCheck,
  Download,
  Share2
} from 'lucide-react';

interface AnalysisViewProps {
  result: KavyaAnalysisResult;
  onOpenInquiry: (initialQuestion?: string) => void;
  currentLanguage?: OutputLanguage;
  onLanguageChange?: (lang: OutputLanguage) => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  result,
  onOpenInquiry,
  currentLanguage,
  onLanguageChange
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'grammar' | 'meaning' | 'alankara' | 'rasa' | 'dhvani' | 'audit'>('all');
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(result.inputSanskrit);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDossier = () => {
    downloadScholarDossier(result);
  };

  const activeLang = currentLanguage || result.language;

  return (
    <div className="space-y-6 animate-fadeIn text-stone-900 dark:text-slate-200 transition-colors">
      {/* 1. Header Overview & Source Verification Banner */}
      <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm dark:shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-stone-200 dark:border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-slate-400 mb-1.5 font-mono">
              <span className="text-amber-700 dark:text-amber-400 font-bold">शास्त्रीय अनुशीलन परिणाम</span>
              <span aria-hidden="true" className="text-stone-300 dark:text-slate-600">·</span>
              <VerificationBadge 
                status={result.sourceVerification.status}
                isCanonicallyConfirmed={result.sourceVerification.isCanonicallyConfirmed}
              />
              <span aria-hidden="true" className="text-stone-300 dark:text-slate-600">·</span>
              <span>छन्द: <strong className="font-editorial text-amber-800 dark:text-amber-300 text-sm">{result.meterAnalysis.identifiedMeter}</strong></span>
            </div>

            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
              {result.sourceVerification.workIdentified || 'संस्कृत काव्य पद्य'}
              {result.sourceVerification.author && (
                <span className="font-normal text-stone-500 dark:text-slate-400 ml-2">
                  — {result.sourceVerification.author}
                </span>
              )}
            </h1>

            {result.sourceVerification.cantoOrActAndVerse && (
              <p className="text-xs text-stone-500 dark:text-slate-400 mt-1 font-serif">
                स्थान: {result.sourceVerification.cantoOrActAndVerse} · {result.sourceVerification.sourceCertaintyNotes}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Instant 3-Language Switcher (0ms, no re-examination) */}
            {onLanguageChange && (
              <div className="flex items-center bg-stone-100 dark:bg-slate-900 p-1 rounded-xl border border-stone-200 dark:border-slate-800 mr-1">
                <button
                  type="button"
                  onClick={() => onLanguageChange('sa')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-sanskrit cursor-pointer ${
                    activeLang === 'sa' 
                      ? 'bg-amber-600 dark:bg-amber-500 font-bold text-white dark:text-slate-950 shadow-sm' 
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                  title="संस्कृतटीका (Instant switch)"
                >
                  संस्कृतम्
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('hi')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-sanskrit cursor-pointer ${
                    activeLang === 'hi' 
                      ? 'bg-amber-600 dark:bg-amber-500 font-bold text-white dark:text-slate-950 shadow-sm' 
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                  title="हिन्दी व्याख्या (Instant switch)"
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeLang === 'en' 
                      ? 'bg-amber-600 dark:bg-amber-500 font-bold text-white dark:text-slate-950 shadow-sm' 
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                  title="English Critique (Instant switch)"
                >
                  English
                </button>
              </div>
            )}

            {/* Quick Actions */}
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-slate-900 hover:bg-stone-200 dark:hover:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-800 transition-colors cursor-pointer"
              title="मूल श्लोक कॉपी करें"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'कॉपी हुआ' : 'कॉपी'}</span>
            </button>

            <button
              onClick={handleDownloadDossier}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-colors cursor-pointer"
              title="डोज़ियर डाउनलोड करें"
            >
              <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>डोज़ियर</span>
            </button>

            <button
              onClick={() => onOpenInquiry()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white dark:text-slate-950 bg-amber-600 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 rounded-xl transition-colors cursor-pointer shadow-sm"
              title="काव्यशास्त्रीय जिज्ञासा पूछें"
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>जिज्ञासा</span>
            </button>
          </div>
        </div>

        {/* Original Text Display with Classical Styling */}
        <div className="p-6 sm:p-8 bg-amber-500/5 dark:bg-gradient-to-b dark:from-[#0B0F19] dark:to-[#0E1526] border border-amber-500/20 rounded-2xl text-center space-y-4 shadow-sm">
          <div className="font-sanskrit text-2xl sm:text-3xl lg:text-4xl leading-loose text-stone-900 dark:text-amber-100 font-medium whitespace-pre-line tracking-wide">
            {result.inputSanskrit}
          </div>

          {result.transliterationIAST && (
            <div className="pt-4 border-t border-stone-200 dark:border-slate-800/80 font-serif italic text-base sm:text-lg text-stone-600 dark:text-slate-300 whitespace-pre-line leading-relaxed max-w-4xl mx-auto">
              {result.transliterationIAST}
            </div>
          )}

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-500 dark:text-slate-400 font-mono">
            <span>छन्द: <strong className="text-amber-700 dark:text-amber-300">{result.meterAnalysis.identifiedMeter}</strong></span>
            <span aria-hidden="true" className="text-stone-300 dark:text-slate-600">·</span>
            <span>वर्ण-भार: {result.meterAnalysis.syllableCountPerPada}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-slate-600">·</span>
            <ConfidenceBadge confidence={result.meterAnalysis.confidence} />
            {result.meterAnalysis.yantiOrCaesuraNotes && (
              <>
                <span aria-hidden="true" className="text-stone-300 dark:text-slate-600">·</span>
                <span className="text-stone-500 dark:text-slate-400 font-serif">यति: {result.meterAnalysis.yantiOrCaesuraNotes}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Filter Tabs for Scholars */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-[#111726] rounded-2xl border border-stone-200 dark:border-slate-800 overflow-x-auto shadow-sm">
        {[
          { id: 'all', label: 'समग्र १० विभाग (All)' },
          { id: 'grammar', label: '१–२. पदच्छेद एवं व्याकरण' },
          { id: 'meaning', label: '३–४. पदार्थ एवं भावार्थ' },
          { id: 'alankara', label: '५. अलङ्कार निरूपण' },
          { id: 'rasa', label: '६. रस एवं भाव मीमांसा' },
          { id: 'dhvani', label: '७–८. ध्वनि, गुण एवं पाठभेद' },
          { id: 'audit', label: '९–१०. साक्ष्य-परीक्षा एवं सार' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold shadow-sm' 
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 2: Grammatical Observations */}
      {(activeTab === 'all' || activeTab === 'grammar') && (
        <section className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                ०२. व्याकरण एवं पदच्छेद निरूपणम् (Grammar & Morphology)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5 font-serif">
                पदच्छेद, अन्वय (वाक्यक्रम) तथा सामासिक पदों का विशद विग्रह
              </p>
            </div>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-mono font-semibold hidden sm:inline">
              पाणिनीय व्याकरण
            </span>
          </div>

          {/* Anvaya (Prose Order) */}
          <div className="p-4 sm:p-5 bg-stone-50 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
              अन्वयः (Syntactic Prose Order):
            </h3>
            <p className="font-sanskrit text-lg text-stone-900 dark:text-white leading-relaxed">
              {result.grammaticalObservations.anvaya}
            </p>
            {result.grammaticalObservations.syntaxNotes && (
              <p className="text-xs text-stone-500 dark:text-slate-400 pt-1 border-t border-stone-200 dark:border-slate-800/80 font-serif leading-relaxed">
                <span className="font-semibold text-stone-700 dark:text-slate-300">वाक्य-रीति टिप्पणी: </span>
                {result.grammaticalObservations.syntaxNotes}
              </p>
            )}
          </div>

          {/* Padaccheda Tokens */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 mb-2 font-mono">
              पदच्छेदः (Tokenized Constituents):
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.grammaticalObservations.padaccheda.map((token, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl font-sanskrit text-sm text-stone-800 dark:text-slate-200"
                >
                  {token}
                </span>
              ))}
            </div>
          </div>

          {/* Compounds Breakdown (Samāsa Vigraha) */}
          {result.grammaticalObservations.compounds && result.grammaticalObservations.compounds.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 font-mono">
                सामासिक पद एवं विग्रहवाक्य (Compounds & Resolution):
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.grammaticalObservations.compounds.map((cmp, i) => (
                  <div key={i} className="p-4 bg-stone-50 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-sanskrit text-base font-bold text-amber-800 dark:text-amber-300">{cmp.compound}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 dark:bg-slate-800 text-stone-700 dark:text-slate-300 border border-stone-300 dark:border-slate-700">
                        {cmp.type}
                      </span>
                    </div>
                    <div className="font-sanskrit text-xs text-stone-700 dark:text-slate-300">
                      <span className="text-stone-400 mr-1">विग्रह:</span>
                      {cmp.vigraha}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-slate-400 font-serif">
                      <span className="text-stone-400 mr-1">अर्थ:</span>
                      {cmp.meaning}
                    </div>
                    {cmp.ambiguityNote && (
                      <div className="text-[11px] text-amber-700 dark:text-amber-400/90 italic pt-1 border-t border-stone-200 dark:border-slate-800/80">
                        {cmp.ambiguityNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Morphological Units */}
          {result.grammaticalObservations.grammaticalUnits && result.grammaticalObservations.grammaticalUnits.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 font-mono">
                पद-साधुत्व एवं विभक्ति-प्रकृति-प्रत्यय (Grammatical Analysis):
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-stone-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                  <thead className="bg-stone-100 dark:bg-slate-900 text-stone-600 dark:text-slate-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3">पद (Token)</th>
                      <th className="p-3">मूल रूप / धातु</th>
                      <th className="p-3">विभक्ति / लकार / प्रत्यय</th>
                      <th className="p-3">अर्थ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-slate-800/80 bg-white dark:bg-slate-950/40">
                    {result.grammaticalObservations.grammaticalUnits.map((u, i) => (
                      <tr key={i} className="hover:bg-amber-500/5 dark:hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 font-sanskrit text-sm font-semibold text-amber-800 dark:text-amber-200">{u.token}</td>
                        <td className="p-3 font-sanskrit text-stone-700 dark:text-slate-300">{u.padaccheda}</td>
                        <td className="p-3 text-stone-700 dark:text-slate-300 font-mono text-[11px]">{u.grammaticalAnalysis}</td>
                        <td className="p-3 text-stone-600 dark:text-slate-400 font-serif">{u.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* SECTION 3 & 4: Meaning & Translation */}
      {(activeTab === 'all' || activeTab === 'meaning') && (
        <section className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                ०३–०४. पदार्थ, शब्दार्थ एवं भावार्थ (Semantics & Translation)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5 font-serif">
                अक्षरशः वाच्यार्थ तथा काव्यशास्त्रीय रससम्मत भावार्थ
              </p>
            </div>
          </div>

          {/* Word by Word Meaning */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
              प्रतिपदार्थः (Word-by-Word Meaning):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {result.grammaticalObservations.grammaticalUnits.map((item, i) => (
                <div key={i} className="p-3.5 bg-stone-50 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-1">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-sanskrit font-bold text-base text-amber-800 dark:text-amber-200">{item.token}</span>
                    <span className="text-[10px] text-stone-500 dark:text-slate-400 font-mono">{item.grammaticalAnalysis}</span>
                  </div>
                  <div className="text-xs text-stone-800 dark:text-slate-200 font-serif">{item.meaning}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Literal vs Interpretive Translation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 sm:p-5 bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 font-mono">
                वाच्यार्थ / शब्दार्थ (Literal Meaning - Padārtha):
              </span>
              <p className="font-serif text-sm sm:text-base text-stone-800 dark:text-slate-200 leading-relaxed">
                {result.literalMeaning.padartha}
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/30 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
                भावार्थ / तात्पर्यार्थ (Interpretive Bhavārtha):
              </span>
              <p className="font-serif text-sm sm:text-base text-stone-900 dark:text-amber-100 leading-relaxed font-medium">
                {result.interpretiveMeaning.bhavartha}
              </p>
              {result.interpretiveMeaning.poeticResonance && (
                <p className="text-xs text-stone-600 dark:text-slate-400 pt-1 border-t border-amber-500/20 italic">
                  {result.interpretiveMeaning.poeticResonance}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: Alaṅkāra Candidates */}
      {(activeTab === 'all' || activeTab === 'alankara') && (
        <section className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                ०५. अलङ्कार निरूपणम् (Figures of Speech / Alaṅkāra)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5 font-serif">
                साहित्यदर्पण एवं काव्यप्रकाश के शास्त्रीय लक्षणों पर आधारित सम्भावित अलङ्कार
              </p>
            </div>
            <span className="text-xs text-amber-700 dark:text-amber-400 font-mono">
              {result.alankaraCandidates.length} अलङ्काराः
            </span>
          </div>

          <div className="space-y-4">
            {result.alankaraCandidates.map((al, i) => (
              <div 
                key={i}
                className="p-5 bg-stone-50 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-3 transition-colors hover:border-amber-500/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200 dark:border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <span className="font-sanskrit text-lg font-bold text-amber-800 dark:text-amber-200">{al.nameSanskrit}</span>
                    <span className="text-xs text-stone-500 dark:text-slate-400 font-serif">({al.name})</span>
                    {al.shastraReference && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-200 dark:bg-slate-800 text-stone-700 dark:text-slate-300 font-mono">
                        {al.shastraReference}
                      </span>
                    )}
                  </div>
                  <ConfidenceBadge confidence={al.confidence} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <div className="font-mono text-stone-400 uppercase text-[10px]">आधारभूत साक्ष्य (Textual Evidence):</div>
                    <div className="font-sanskrit text-sm text-stone-900 dark:text-white p-2 rounded-xl bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800">
                      {al.textualEvidence}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-mono text-stone-400 uppercase text-[10px]">तर्क एवं संगति (Reasoning):</div>
                    <div className="font-serif text-stone-700 dark:text-slate-300 leading-relaxed">
                      {al.reasoning}
                    </div>

                    {al.counterArgumentsOrAlternatives && (
                      <div className="pt-2 text-stone-500 dark:text-slate-400">
                        <strong className="text-amber-700 dark:text-amber-400 font-mono text-[10px] uppercase">अन्य सम्भावना / विचार: </strong>
                        <span>{al.counterArgumentsOrAlternatives}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 6: Rasa Studio */}
      {(activeTab === 'all' || activeTab === 'rasa') && (
        <section className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                ०६. रस एवं भाव मीमांसा (Aesthetic Rasa & Emotion)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5 font-serif">
                विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः — भरतमुनिकृत रससूत्र
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm font-bold text-amber-800 dark:text-amber-300">
                प्रधान रस: {result.rasaAnalysis.primaryRasa}
              </span>
              <ConfidenceBadge confidence={result.rasaAnalysis.confidence} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Vibhava, Anubhava, Sanchari */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-4 bg-stone-50 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-2">
                  <div className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider font-mono text-[11px]">
                    विभावः (Causes / Determinants):
                  </div>
                  <div>
                    <span className="text-stone-400">आलम्बन:</span> <strong className="font-sanskrit text-stone-800 dark:text-slate-200">{result.rasaAnalysis.vibhava.alambana}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400">उद्दीपन:</span> <strong className="font-sanskrit text-stone-800 dark:text-slate-200">{result.rasaAnalysis.vibhava.uddipana}</strong>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-2">
                  <div className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider font-mono text-[11px]">
                    अनुभाव एवं व्यभिचारी भाव:
                  </div>
                  <div>
                    <span className="text-stone-400">अनुभाव (Consequents):</span> <strong className="font-sanskrit text-stone-800 dark:text-slate-200">{result.rasaAnalysis.anubhava.join(', ')}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400">व्यभिचारिभाव (Transitory):</span> <strong className="font-sanskrit text-stone-800 dark:text-slate-200">{result.rasaAnalysis.vyabhicaribhava.join(', ')}</strong>
                  </div>
                </div>
              </div>

              {/* Sthayibhava & Textual Cues */}
              <div className="p-4 bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-stone-400">स्थायिभाव:</span>
                  <span className="font-sanskrit text-base font-bold text-amber-800 dark:text-amber-200">{result.rasaAnalysis.sthayibhava}</span>
                </div>
                <div className="text-stone-600 dark:text-slate-300 font-serif leading-relaxed">
                  <strong className="text-stone-800 dark:text-white">औचित्य एवं साक्ष्य: </strong>
                  {result.rasaAnalysis.justificationAndCaution}
                </div>
              </div>
            </div>

            {/* Context & Hermeneutic Note */}
            <div className="p-5 bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/30 rounded-2xl space-y-3 text-xs">
              <span className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider font-mono text-[11px] block">
                काव्यशास्त्रीय सन्दर्भ
              </span>
              <p className="text-stone-700 dark:text-slate-300 font-serif leading-relaxed">
                {result.rasaAnalysis.contextDependencyNote}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7 & 8: Dhvani, Guna, Riti */}
      {(activeTab === 'all' || activeTab === 'dhvani') && (
        <section className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                ०७–०८. ध्वनि, गुण, रीति एवं पाठान्तर
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5 font-serif">
                वाच्यार्थ एवं व्यङ्ग्यार्थ का पृथक्करण, वैदर्भी/गौडी रीति, तथा पाठभेद
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dhvani (Suggested Meaning) */}
            <div className="p-5 bg-stone-50 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-amber-800 dark:text-amber-300">ध्वनि / व्यङ्ग्यार्थ (Suggested Sense)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 dark:bg-slate-800 text-stone-700 dark:text-slate-300">
                  {result.dhvaniFeature.category}
                </span>
              </div>
              <p className="font-serif text-sm text-stone-800 dark:text-slate-200 leading-relaxed font-medium">
                "{result.dhvaniFeature.vyangyartha}"
              </p>
              <div className="text-xs text-stone-500 dark:text-slate-400 font-serif pt-2 border-t border-stone-200 dark:border-slate-800/80">
                <strong className="text-stone-700 dark:text-slate-300">व्यञ्जना व्यापार: </strong>
                {result.dhvaniFeature.mechanism}
              </div>
            </div>

            {/* Guna, Riti, Vakrokti */}
            <div className="p-5 bg-stone-50 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-3 text-xs">
              <span className="font-serif font-bold text-base text-stone-900 dark:text-white block">
                काव्य-गुण, रीति एवं औचित्य
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-stone-200 dark:border-slate-800">
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">काव्य-गुण:</span>
                  <span className="font-sanskrit text-sm font-bold text-amber-800 dark:text-amber-200">{result.poeticDimension.guna}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-stone-200 dark:border-slate-800">
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">काव्य-रीति:</span>
                  <span className="font-sanskrit text-sm font-bold text-amber-800 dark:text-amber-200">{result.poeticDimension.riti}</span>
                </div>
              </div>

              {result.poeticDimension.vakroktiAspect && (
                <div className="pt-2">
                  <span className="text-stone-400 font-semibold">वक्रोक्ति-स्पर्श: </span>
                  <span className="text-stone-700 dark:text-slate-300 font-serif">{result.poeticDimension.vakroktiAspect}</span>
                </div>
              )}
              {result.poeticDimension.aucityaCompliance && (
                <div>
                  <span className="text-stone-400 font-semibold">औचित्य-परीक्षण: </span>
                  <span className="text-stone-700 dark:text-slate-300 font-serif">{result.poeticDimension.aucityaCompliance}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 9 & 10: Epistemic Audit & Research Summary */}
      {(activeTab === 'all' || activeTab === 'audit') && (
        <section className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                ०९–१०. साक्ष्य-परीक्षा एवं शोध-संक्षेप (Epistemic Audit & Summary)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5 font-serif">
                तथ्य, अनुमान और अनिश्चितता का वैज्ञानिक पृथक्करण
              </p>
            </div>
          </div>

          {/* Epistemic distinction */}
          <div className="p-4 bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-2 text-xs">
            <strong className="text-stone-800 dark:text-white block font-semibold">
              प्रत्यक्ष पाठ्य-तथ्य एवं आनुमानिक समीक्षा का पृथक्करण:
            </strong>
            <p className="text-stone-600 dark:text-slate-300 font-serif leading-relaxed">
              {result.epistemicAudit.explicitVersusInferredDistinction}
            </p>
            {result.epistemicAudit.avoidedForcedLabels.length > 0 && (
              <div className="pt-2 border-t border-stone-200 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400">
                <strong>असंयत आरोपों से परिहार: </strong>
                <span>{result.epistemicAudit.avoidedForcedLabels.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Research Summary Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl space-y-1.5">
              <strong className="text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider block font-mono text-[11px]">
                सर्वाधिक सम्पुष्ट व्याख्या (Strongest Interpretation):
              </strong>
              <p className="text-stone-800 dark:text-slate-200 font-serif leading-relaxed text-sm">
                {result.researchSummary.strongestInterpretation}
              </p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 rounded-2xl space-y-1.5">
              <strong className="text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider block font-mono text-[11px]">
                सर्वाधिक विचारणीय अंश (Ambiguity):
              </strong>
              <p className="text-stone-800 dark:text-slate-200 font-serif leading-relaxed text-sm">
                {result.researchSummary.mostUncertainClaim}
              </p>
            </div>
          </div>

          {/* Further Research Questions */}
          <div className="p-4 bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 rounded-2xl space-y-2 text-xs">
            <strong className="text-stone-900 dark:text-white block font-semibold">
              अग्रिम अनुसन्धान हेतु जिज्ञासा-प्रश्न:
            </strong>
            <p className="text-stone-700 dark:text-slate-300 italic font-serif leading-relaxed">
              "{result.researchSummary.furtherResearchQuestion}"
            </p>

            {result.researchSummary.claimsRequiringExpertReview.length > 0 && (
              <div className="pt-2 border-t border-stone-200 dark:border-slate-800">
                <strong className="text-stone-500 dark:text-slate-400 block font-semibold mb-1 text-[11px]">
                  विद्वत्-परीक्षण हेतु प्रस्तावित बिन्दु:
                </strong>
                <ul className="list-disc list-inside text-stone-700 dark:text-slate-300 space-y-0.5 font-serif">
                  {result.researchSummary.claimsRequiringExpertReview.map((claim, i) => (
                    <li key={i}>{claim}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
