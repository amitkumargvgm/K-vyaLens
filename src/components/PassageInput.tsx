import React, { useState, useEffect, useRef } from 'react';
import { BENCHMARK_VERSES } from '../data/canonicalVerses';
import { scanSanskritMeter } from '../utils/sanskritUtils';
import { OutputLanguage, VerseMetadata } from '../types/kavya';
import { I18N_STRINGS } from '../utils/i18n';
import { 
  RefreshCw, 
  Feather, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Sparkles, 
  X, 
  Camera, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PassageInputProps {
  passageText: string;
  setPassageText: (text: string) => void;
  language: OutputLanguage;
  setLanguage: (lang: OutputLanguage) => void;
  traditionFocus: string;
  setTraditionFocus: (trad: string) => void;
  metadata: VerseMetadata;
  setMetadata: (meta: VerseMetadata) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onLoadBenchmark: (id: string) => void;
  onClear: () => void;
}

export const PassageInput: React.FC<PassageInputProps> = ({
  passageText,
  setPassageText,
  language,
  setLanguage,
  traditionFocus,
  setTraditionFocus,
  metadata,
  setMetadata,
  onAnalyze,
  isLoading,
  onLoadBenchmark,
  onClear,
}) => {
  const t = I18N_STRINGS[language] || I18N_STRINGS.sa;
  const [metricPreview, setMetricPreview] = useState<ReturnType<typeof scanSanskritMeter> | null>(null);
  const [showMetadata, setShowMetadata] = useState(false);
  
  // Image OCR Extraction State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExtractingImage, setIsExtractingImage] = useState(false);
  const [ocrPreviewImage, setOcrPreviewImage] = useState<string | null>(null);
  const [ocrSuccessMsg, setOcrSuccessMsg] = useState<string | null>(null);
  const [ocrErrorMsg, setOcrErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (passageText.trim().length > 10) {
      const scanned = scanSanskritMeter(passageText);
      setMetricPreview(scanned);
    } else {
      setMetricPreview(null);
    }
  }, [passageText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isLoading && passageText.trim()) {
        onAnalyze();
      }
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset messages
    setOcrSuccessMsg(null);
    setOcrErrorMsg(null);

    // Read image as base64
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      setOcrPreviewImage(base64Data);
      setIsExtractingImage(true);

      try {
        const response = await fetch('/api/extract-verse-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageBase64: base64Data,
            mimeType: file.type || 'image/jpeg',
            language,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || errData.details || 'OCR extraction failed.');
        }

        const data = await response.json();
        if (data.extractedText) {
          setPassageText(data.extractedText);
          setOcrSuccessMsg(
            language === 'sa'
              ? `चित्रात् श्लोकः निष्कासितः! (छन्दः: ${data.estimatedMeter || 'अनुमितम्'})`
              : language === 'hi'
              ? `चित्र से श्लोक सफलतापूर्वक निकाला गया! (अनुमानित छन्द: ${data.estimatedMeter || 'परीक्षित'})`
              : `Verse extracted successfully from image! (Meter: ${data.estimatedMeter || 'Detected'})`
          );
        } else {
          throw new Error('No Sanskrit text found in image.');
        }
      } catch (err: any) {
        console.error('Image extraction error:', err);
        setOcrErrorMsg(
          language === 'sa'
            ? `चित्रात् श्लोकोद्धारे समस्या: ${err.message}`
            : language === 'hi'
            ? `चित्र से श्लोक निकालने में त्रुटि: ${err.message}`
            : `Failed to extract verse from image: ${err.message}`
        );
      } finally {
        setIsExtractingImage(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      setOcrErrorMsg('Failed to read image file.');
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white dark:bg-[#111726] border border-stone-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm dark:shadow-xl space-y-5 text-stone-900 dark:text-slate-200 transition-colors">
      
      {/* Hidden File Input for Image Upload / Camera */}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        capture="environment"
        className="hidden" 
      />

      {/* Editor Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
            <Feather className="w-3.5 h-3.5" />
            <span>{t.navWorkbench}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
            {t.inputTitle}
          </h2>
          <p className="text-xs text-stone-500 dark:text-slate-400 mt-0.5">
            {t.inputSubtitle}
          </p>
        </div>

        {/* Action Controls: OCR Image Upload Button + Language Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Upload Image / Camera OCR Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isExtractingImage || isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            title={t.imageUploadDesc}
          >
            {isExtractingImage ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600 dark:text-amber-400" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            )}
            <span>{isExtractingImage ? t.extractingImage : t.btnExtractImage}</span>
          </button>

          {/* Quick Language Switcher */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-slate-900/80 p-1 rounded-xl border border-stone-200 dark:border-slate-700">
            {(['sa', 'hi', 'en'] as OutputLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  language === lang
                    ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                }`}
              >
                {lang === 'sa' ? 'संस्कृतम्' : lang === 'hi' ? 'हिन्दी' : 'English'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Image Extraction Banner / Notification */}
      {isExtractingImage && (
        <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-center gap-3 text-xs text-amber-800 dark:text-amber-200 animate-pulse">
          {ocrPreviewImage && (
            <img 
              src={ocrPreviewImage} 
              alt="Thumbnail preview" 
              className="w-10 h-10 object-cover rounded-lg border border-amber-400" 
            />
          )}
          <div className="flex-1">
            <strong>{t.extractingImage}</strong>
            <p className="text-[11px] opacity-80">
              {language === 'sa' 
                ? 'दृष्ट्या श्लोकस्य देवनागरी-लिप्याम् उद्धरणं क्रियते...' 
                : 'चित्रावलोकन द्वारा देवनागरी अक्षरों की पहचान की जा रही है...'}
            </p>
          </div>
        </div>
      )}

      {ocrSuccessMsg && (
        <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between gap-2 text-xs text-emerald-800 dark:text-emerald-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{ocrSuccessMsg}</span>
          </div>
          <button 
            onClick={() => setOcrSuccessMsg(null)}
            className="p-1 text-emerald-700 hover:text-emerald-900"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {ocrErrorMsg && (
        <div className="p-3 rounded-2xl border border-red-500/30 bg-red-500/10 flex items-center justify-between gap-2 text-xs text-red-800 dark:text-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{ocrErrorMsg}</span>
          </div>
          <button 
            onClick={() => setOcrErrorMsg(null)}
            className="p-1 text-red-700 hover:text-red-900"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          rows={5}
          value={passageText}
          onChange={(e) => setPassageText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.inputPlaceholder}
          className="w-full bg-stone-50 dark:bg-[#0B0F19] text-stone-900 dark:text-amber-50 border border-stone-200 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 font-sanskrit text-lg sm:text-xl leading-relaxed focus:outline-none focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/10 placeholder:text-stone-400 dark:placeholder:text-slate-600 transition-all resize-y shadow-inner"
        />

        {passageText && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-200/80 dark:bg-slate-800 text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200 hover:bg-stone-300 dark:hover:bg-slate-700 transition-colors"
            title={t.btnClear}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Real-time Meter & Syllable Status Badge */}
      {metricPreview && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-stone-500 dark:text-slate-400">{t.estimatedMeter}</span>
            <strong className="text-amber-700 dark:text-amber-300 font-serif font-bold text-sm">
              {metricPreview.identifiedMeter}
            </strong>
          </div>
          <div className="flex items-center gap-3 text-stone-500 dark:text-slate-400">
            <span>{t.syllablesCount}: <strong className="text-stone-800 dark:text-slate-200">{metricPreview.syllableCounts.reduce((acc, c) => acc + c, 0)}</strong></span>
            <span>{t.padasCount}: <strong className="text-stone-800 dark:text-slate-200">{metricPreview.padas.length}</strong></span>
          </div>
        </div>
      )}

      {/* Optional Metadata Toggle */}
      <div>
        <button
          onClick={() => setShowMetadata(!showMetadata)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-amber-300 transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{t.metadataToggle}</span>
          {showMetadata ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showMetadata && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-stone-50 dark:bg-slate-900/50 border border-stone-200 dark:border-slate-800 rounded-xl animate-fadeIn">
            <div>
              <label className="block text-[11px] font-medium text-stone-500 dark:text-slate-400 mb-1">{t.fieldWork}</label>
              <input
                type="text"
                placeholder="उदा. रघुवंशम् / अभिज्ञानशाकुन्तलम्"
                value={metadata.work || ''}
                onChange={(e) => setMetadata({ ...metadata, work: e.target.value })}
                className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-800 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-500 dark:text-slate-400 mb-1">{t.fieldAuthor}</label>
              <input
                type="text"
                placeholder="उदा. कालिदासः / भवभूतिः"
                value={metadata.author || ''}
                onChange={(e) => setMetadata({ ...metadata, author: e.target.value })}
                className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-800 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-500 dark:text-slate-400 mb-1">{t.fieldVerseNo}</label>
              <input
                type="text"
                placeholder="उदा. १.१ / ४.२"
                value={metadata.verseNumber || ''}
                onChange={(e) => setMetadata({ ...metadata, verseNumber: e.target.value })}
                className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-800 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-500 dark:text-slate-400 mb-1">{t.fieldTradition}</label>
              <select
                value={traditionFocus}
                onChange={(e) => setTraditionFocus(e.target.value)}
                className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-800 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              >
                <option value="pan-dhvani">ध्वनि एवं रस सम्प्रदाय (आनन्दवर्धन, मम्मट)</option>
                <option value="rasa">रस सम्प्रदाय (भरतमुनि, अभिनवगुप्त)</option>
                <option value="alankara">अलङ्कार सम्प्रदाय (भामह, दण्डी, उद्भट)</option>
                <option value="vakrokti">वक्रोक्ति सम्प्रदाय (कुन्तक)</option>
                <option value="aucitya">औचित्य सम्प्रदाय (क्षेमेन्द्र)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Sample Verse Chips for Easy Testing */}
      <div className="space-y-2 pt-1 border-t border-stone-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-slate-400">
          <span className="font-medium flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{t.sampleChipsLabel}</span>
          </span>
          <span className="text-[11px] text-stone-400">{t.sampleChipsHint}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {BENCHMARK_VERSES.map((b) => (
            <button
              key={b.id}
              onClick={() => onLoadBenchmark(b.id)}
              className="text-xs px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700/80 bg-stone-50 dark:bg-slate-900/60 hover:bg-amber-500/10 hover:border-amber-500/50 text-stone-700 dark:text-slate-300 hover:text-amber-800 dark:hover:text-amber-200 transition-all font-serif flex items-center gap-1.5"
            >
              <span>{b.title}</span>
              <span className="text-[10px] text-stone-400 dark:text-slate-500 font-sans">({b.author})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Trigger Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-stone-500 dark:text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>पदच्छेद, व्याकरण, रस, अलङ्कार, ध्वनि एवं छन्दः-विश्लेषण</span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {passageText && (
            <button
              onClick={onClear}
              className="px-4 py-3 rounded-xl border border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              {t.btnReset}
            </button>
          )}

          <button
            onClick={onAnalyze}
            disabled={isLoading || !passageText.trim()}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 text-white dark:text-slate-950 font-serif font-bold text-sm sm:text-base shadow-md shadow-amber-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white dark:text-slate-950" />
                <span>{t.btnAnalyzing}</span>
              </>
            ) : (
              <>
                <Feather className="w-4 h-4 text-white dark:text-slate-950" />
                <span>{t.btnAnalyze}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
