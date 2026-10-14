import React, { useState, useEffect } from 'react';
import { Header, AppView } from './components/Header';
import { PassageInput } from './components/PassageInput';
import { AnalysisView } from './components/AnalysisView';
import { ChhandaKnowledgeView } from './components/ChhandaKnowledgeView';
import { ProsodyShastraDesk } from './components/ProsodyShastraDesk';
import { SanskritToolsDesk } from './components/SanskritToolsDesk';
import { DeveloperProfileView } from './components/DeveloperProfileView';
import { MainPageEducationalContent } from './components/MainPageEducationalContent';
import { ScholarlyInquiryModal } from './components/ScholarlyInquiryModal';
import { KavyaAnalysisResult, OutputLanguage, VerseMetadata } from './types/kavya';
import { BENCHMARK_VERSES } from './data/canonicalVerses';
import { PRECOMPUTED_BENCHMARKS } from './data/benchmarkAnalyses';
import { generateLocalHeuristicAnalysis } from './utils/fallbackAnalysis';
import { I18N_STRINGS } from './utils/i18n';
import { 
  Feather, 
  BookOpen, 
  Music, 
  Wrench, 
  User 
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('workbench');
  
  // Default empty state on load as requested (no pre-loaded shloka or result)
  const [passageText, setPassageText] = useState<string>('');
  
  // Default language: Sanskrit ('sa') as requested ("site ki default language sanskrit ya english ho")
  const [language, setLanguage] = useState<OutputLanguage>(() => {
    const saved = localStorage.getItem('kavyalens_lang');
    if (saved === 'hi' || saved === 'sa' || saved === 'en') return saved;
    return 'sa'; // Default Sanskrit!
  });

  const [traditionFocus, setTraditionFocus] = useState('pan-dhvani');
  const [metadata, setMetadata] = useState<VerseMetadata>({
    work: '',
    author: '',
    canto: '',
    verseNumber: '',
    sourceEdition: ''
  });
  const [analysisResult, setAnalysisResult] = useState<KavyaAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string>('');

  // Default theme: Light theme as requested by user ("default light ho")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('kavyalens_theme');
    if (saved) return saved === 'dark';
    return false; // Default Light mode!
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('kavyalens_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('kavyalens_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const t = I18N_STRINGS[language] || I18N_STRINGS.sa;

  // Instant 3-language switching across entire app (0ms, no re-examination required!)
  const handleLanguageChange = (newLang: OutputLanguage) => {
    setLanguage(newLang);
    localStorage.setItem('kavyalens_lang', newLang);

    // 1. Check if the current analysis has the multilingualStore with this language
    if (analysisResult?.multilingualStore?.[newLang]) {
      setAnalysisResult(analysisResult.multilingualStore[newLang]!);
      return;
    }

    // 2. Check if active benchmark has this language precomputed
    if (activeBenchmarkId && PRECOMPUTED_BENCHMARKS[activeBenchmarkId]?.[newLang]) {
      setAnalysisResult(PRECOMPUTED_BENCHMARKS[activeBenchmarkId][newLang]);
      return;
    }

    // 3. If analysis already exists for unseen verse, construct language variant immediately
    if (analysisResult && passageText.trim()) {
      const generated = generateLocalHeuristicAnalysis(passageText, newLang, metadata);
      if (analysisResult.multilingualStore) {
        generated.multilingualStore = analysisResult.multilingualStore;
      }
      setAnalysisResult(generated);
    }
  };

  // Execute Analysis with fast response
  const handleAnalyze = async () => {
    if (!passageText.trim() || isLoading) return;

    setIsLoading(true);

    // Check if this verse matches our precomputed cache
    const matchedBenchmark = BENCHMARK_VERSES.find(b => 
      b.devanagari.replace(/\s+/g, '') === passageText.replace(/\s+/g, '')
    );

    if (matchedBenchmark && PRECOMPUTED_BENCHMARKS[matchedBenchmark.id]?.[language]) {
      setActiveBenchmarkId(matchedBenchmark.id);
      setAnalysisResult(PRECOMPUTED_BENCHMARKS[matchedBenchmark.id][language]);
      setIsLoading(false);
      setActiveView('workbench');
      return;
    }

    // Circuit-breaker for fast response (<7s)
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        const fallback = generateLocalHeuristicAnalysis(passageText, language, metadata);
        setAnalysisResult(fallback);
        setIsLoading(false);
      }
    }, 7000);

    try {
      const response = await fetch('/api/analyze-verse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: passageText.trim(),
          language,
          traditionFocus,
          metadata
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.details || 'विश्लेषण पूर्ण करने में असमर्थ');
      }

      const result: KavyaAnalysisResult = await response.json();
      setActiveBenchmarkId('');
      setAnalysisResult(result);
      setActiveView('workbench');
    } catch {
      clearTimeout(timeoutId);
      const fallback = generateLocalHeuristicAnalysis(passageText, language, metadata);
      setAnalysisResult(fallback);
      setActiveView('workbench');
    } finally {
      setIsLoading(false);
    }
  };

  // Load Benchmark Verse on user click
  const handleLoadBenchmark = (id: string) => {
    const verse = BENCHMARK_VERSES.find(b => b.id === id);
    if (verse) {
      setActiveBenchmarkId(id);
      setPassageText(verse.devanagari);
      setMetadata({
        work: verse.work,
        author: verse.author,
        canto: verse.location,
        verseNumber: '१',
        sourceEdition: 'प्रामाणिक पाठ'
      });

      if (PRECOMPUTED_BENCHMARKS[id]?.[language]) {
        setAnalysisResult(PRECOMPUTED_BENCHMARKS[id][language]);
      } else {
        const instantAnalysis = generateLocalHeuristicAnalysis(verse.devanagari, language, {
          work: verse.work,
          author: verse.author,
          canto: verse.location
        });
        setAnalysisResult(instantAnalysis);
      }

      setActiveView('workbench');
    }
  };

  // Reset & Clear Verse
  const handleClear = () => {
    setPassageText('');
    setAnalysisResult(null);
    setActiveBenchmarkId('');
    setMetadata({
      work: '',
      author: '',
      canto: '',
      verseNumber: '',
      sourceEdition: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#090D16] text-stone-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 pb-20 md:pb-8">
      {/* Top Bar Header with Global Language Switcher & Dark/Light Toggle */}
      <Header
        activeView={activeView}
        onNavigate={setActiveView}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-7">
        
        {/* VIEW 1: WORKBENCH (Verse Analyzer) */}
        {activeView === 'workbench' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Verse Input Area with Image OCR */}
            <PassageInput
              passageText={passageText}
              setPassageText={setPassageText}
              language={language}
              setLanguage={handleLanguageChange}
              traditionFocus={traditionFocus}
              setTraditionFocus={setTraditionFocus}
              metadata={metadata}
              setMetadata={setMetadata}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              onLoadBenchmark={handleLoadBenchmark}
              onClear={handleClear}
            />

            {/* Analysis Results Display */}
            {analysisResult && (
              <AnalysisView
                result={analysisResult}
                onOpenInquiry={() => setIsInquiryModalOpen(true)}
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
            )}

            {/* Useful Reading Guide on Main Page */}
            <MainPageEducationalContent 
              onNavigate={setActiveView} 
              language={language} 
            />
          </div>
        )}

        {/* VIEW 2: CHHANDA KNOWLEDGE & GHATANA */}
        {activeView === 'chhanda' && (
          <div className="animate-fadeIn">
            <ChhandaKnowledgeView language={language} />
          </div>
        )}

        {/* VIEW 3: POETICS & KAVYASHASTRA GLOSSARY */}
        {activeView === 'prosody_shastra' && (
          <div className="animate-fadeIn">
            <ProsodyShastraDesk language={language} />
          </div>
        )}

        {/* VIEW 4: SANSKRIT TOOLS */}
        {activeView === 'tools' && (
          <div className="animate-fadeIn">
            <SanskritToolsDesk language={language} />
          </div>
        )}

        {/* VIEW 5: ABOUT & DEVELOPER AMIT KUMAR AKS */}
        {activeView === 'developer' && (
          <div className="animate-fadeIn">
            <DeveloperProfileView language={language} />
          </div>
        )}

      </main>

      {/* Interactive Scholarly Inquiry Modal */}
      <ScholarlyInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        result={analysisResult}
        language={language}
      />

      {/* Fixed Mobile App Bottom Navigation Bar with EXACTLY 5 Localized Buttons */}
      <nav 
        aria-label="Bottom Navigation" 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-lg border-t border-stone-200 dark:border-slate-800 px-1 py-1.5 flex items-center justify-around shadow-2xl transition-colors duration-200 lg:hidden"
      >
        <button
          onClick={() => setActiveView('workbench')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all min-w-[58px] cursor-pointer ${
            activeView === 'workbench'
              ? 'text-amber-700 dark:text-amber-300 font-bold bg-amber-500/15'
              : 'text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
          }`}
        >
          <Feather className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">{t.dockWorkbench}</span>
        </button>

        <button
          onClick={() => setActiveView('chhanda')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all min-w-[58px] cursor-pointer ${
            activeView === 'chhanda'
              ? 'text-amber-700 dark:text-amber-300 font-bold bg-amber-500/15'
              : 'text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
          }`}
        >
          <Music className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">{t.dockChhanda}</span>
        </button>

        <button
          onClick={() => setActiveView('prosody_shastra')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all min-w-[58px] cursor-pointer ${
            activeView === 'prosody_shastra'
              ? 'text-amber-700 dark:text-amber-300 font-bold bg-amber-500/15'
              : 'text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">{t.dockProsody}</span>
        </button>

        <button
          onClick={() => setActiveView('tools')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all min-w-[58px] cursor-pointer ${
            activeView === 'tools'
              ? 'text-amber-700 dark:text-amber-300 font-bold bg-amber-500/15'
              : 'text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">{t.dockTools}</span>
        </button>

        <button
          onClick={() => setActiveView('developer')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all min-w-[58px] cursor-pointer ${
            activeView === 'developer'
              ? 'text-amber-700 dark:text-amber-300 font-bold bg-amber-500/15'
              : 'text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[10px] tracking-tight">{t.dockDeveloper}</span>
        </button>
      </nav>
    </div>
  );
}
