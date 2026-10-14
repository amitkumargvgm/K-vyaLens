import React, { useState } from 'react';
import { KavyaAnalysisResult, OutputLanguage } from '../types/kavya';
import { X, Send, AlertCircle, HelpCircle, Sparkles, BookOpen } from 'lucide-react';

interface ScholarlyInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: KavyaAnalysisResult | null;
  language: OutputLanguage;
}

interface QAPair {
  question: string;
  answer: string;
  timestamp: number;
}

export const ScholarlyInquiryModal: React.FC<ScholarlyInquiryModalProps> = ({
  isOpen,
  onClose,
  result,
  language
}) => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<QAPair[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !result) return null;

  const quickPrompts = [
    'इस श्लोक में अन्य संभावित अलङ्कार क्यों निरस्त किए गए?',
    'मुख्य सामासिक पदों का सटीक विग्रह क्या है?',
    'पारंपरिक टीकाकारों (जैसे मल्लीनाथ) का इस पंक्ति पर क्या मंतव्य है?',
    'क्या इस पद्य में कोई सूक्ष्म काव्यदोष उपस्थित है?',
    'क्या यह विशुद्ध रस-ध्वनि का उदाहरण है अथवा वाच्य-प्रधान है?'
  ];

  const handleSubmit = async (qText: string) => {
    const q = qText.trim();
    if (!q || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/scholarly-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verseText: result.inputSanskrit,
          currentAnalysis: result,
          question: q,
          language
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.details || 'जिज्ञासा समाधान में त्रुटि हुई');
      }

      const data = await res.json();
      setHistory(prev => [...prev, {
        question: q,
        answer: data.answer,
        timestamp: Date.now()
      }]);
      setQuestion('');
    } catch (err: any) {
      setError(err.message || 'त्रुटि उत्पन्न हुई');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden text-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-white">
              काव्यशास्त्रीय जिज्ञासा एवं समीक्षा
            </h3>
            <p className="text-xs text-slate-400 font-serif mt-0.5">
              श्लोक: <span className="font-sanskrit text-amber-300 font-medium">{result.sourceVerification.workIdentified || 'प्रस्तुत पद्य'}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Chat History */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-6 text-slate-400 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-bold text-white">विशिष्ट काव्यशास्त्रीय प्रश्न पूछें</p>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto font-serif leading-relaxed">
                  पाणिनीय व्याकरण, रस-निष्पत्ति, अलङ्कार-भेद अथवा टीका-विषयक कोई भी प्रश्न यहाँ पूछ सकते हैं।
                </p>
              </div>

              {/* Quick suggestions */}
              <div className="mt-5 text-left max-w-lg mx-auto">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-2 font-mono">
                  सुझाई गई शास्त्रीय जिज्ञासाएँ (Suggested Questions):
                </span>
                <div className="space-y-1.5">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSubmit(prompt)}
                      className="w-full text-left text-xs text-slate-300 hover:text-white bg-slate-900/70 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 rounded-xl p-3 transition-colors cursor-pointer font-serif"
                    >
                      → {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-medium">
                    <span className="text-amber-400 mr-2 font-mono uppercase text-[10px] font-bold">जिज्ञासा (Q):</span>
                    {item.question}
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed font-serif whitespace-pre-line shadow-inner">
                    <span className="text-amber-400 mr-2 font-mono uppercase text-[10px] font-bold block mb-1">शास्त्रीय उत्तर:</span>
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          )}

          {loading && (
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-amber-300 flex items-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>काव्यशास्त्रीय प्रमाणों के आधार पर समाधान तैयार किया जा रहा है...</span>
            </div>
          )}

          {error && (
            <div className="p-3.5 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(question);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="यहाँ अपनी जिज्ञासा लिखें (उदा. क्या इस पद्य में श्लेष भी संभव है?)..."
              disabled={loading}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>पूछें</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
