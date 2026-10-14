import React from 'react';
import { 
  GraduationCap, 
  Mail, 
  Globe, 
  BookOpen, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { OutputLanguage } from '../types/kavya';
import { I18N_STRINGS } from '../utils/i18n';

interface DeveloperProfileViewProps {
  language?: OutputLanguage;
}

export const DeveloperProfileView: React.FC<DeveloperProfileViewProps> = ({ language = 'sa' }) => {
  const t = I18N_STRINGS[language] || I18N_STRINGS.sa;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Hero Profile Card */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent p-6 sm:p-10 backdrop-blur-sm relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          {/* Avatar / Emblem */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-700 via-amber-500 to-amber-300 p-1 shadow-xl shadow-amber-500/20">
              <div className="w-full h-full rounded-2xl bg-[#1E1B4B] dark:bg-[#0B0F19] flex items-center justify-center text-amber-300 font-serif font-bold text-4xl border border-amber-400/40">
                अ
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-amber-600 text-white shadow-md">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.devBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-amber-100 tracking-tight">
              Amit Kumar AKS
            </h1>

            {/* University & Degree Description */}
            <div className="space-y-1.5 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-800 dark:text-amber-300 font-medium">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>{t.devDegree}</span>
              </div>
              <div className="text-stone-600 dark:text-slate-400 text-sm">
                <strong>{t.devUniversity}</strong>
              </div>
            </div>

            {/* Contact & Portfolio Action Buttons - "Check Portfolio" as requested */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
              <a
                href="https://alphatyping.com/amitkumaraks/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 text-sm font-bold shadow-md transition-all transform active:scale-95"
              >
                <Globe className="w-4 h-4" />
                <span>{t.btnPortfolio}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="mailto:amitkumargvgm@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-800 dark:text-amber-200 border border-stone-200 dark:border-slate-700 text-sm font-medium shadow-sm transition-all"
              >
                <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>amitkumargvgm@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Project & Academic Background */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Vision Card */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">
            {t.devVisionTitle}
          </h2>
          <p className="text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
            {t.devVisionDesc}
          </p>
          <div className="text-xs text-stone-500 dark:text-slate-400 border-t border-stone-100 dark:border-slate-800 pt-3">
            {language === 'sa' 
              ? 'स्वतन्त्र-संस्कृत-शोध-परियोजना — शास्त्रीय-परम्परायाः आधारेण साक्ष्य-सम्मतं विश्लेषणम्।'
              : language === 'hi'
              ? 'स्वतन्त्र शोध परियोजना — शास्त्रीय सम्प्रदायों के नियमों का आदर करते हुए साक्ष्य-सम्मत निष्पक्ष प्रस्तुति।'
              : 'Independent scholarly initiative honoring classical aesthetic treatises with objective rigor.'}
          </div>
        </div>

        {/* Technical & Shastric Rigor */}
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">
            {t.devRigorTitle}
          </h2>
          <p className="text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
            {t.devRigorDesc}
          </p>
          <div className="text-xs text-stone-500 dark:text-slate-400 border-t border-stone-100 dark:border-slate-800 pt-3">
            {language === 'sa'
              ? 'अप्रत्यक्षाः अनुमानाः ‘सम्भाव्यम्’ इति रूपेण उद्घोषिताः।'
              : language === 'hi'
              ? 'अप्रत्यक्ष अनुमानों को \'सम्भावित\' (Plausible) के रूप में चिन्हित किया जाता है।'
              : 'Subjective interpretations are explicitly labelled as plausible rather than dogmatic.'}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions: How does it work? Where do results come from? */}
      <div className="p-6 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">
            {t.faqTitle}
          </h2>
        </div>

        <div className="space-y-4 text-sm text-stone-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <h3 className="font-bold text-stone-900 dark:text-amber-200 mb-1">
              {t.faq1Q}
            </h3>
            <p className="text-stone-600 dark:text-slate-300 text-xs sm:text-sm">
              {t.faq1A}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <h3 className="font-bold text-stone-900 dark:text-amber-200 mb-1">
              {t.faq2Q}
            </h3>
            <p className="text-stone-600 dark:text-slate-300 text-xs sm:text-sm">
              {t.faq2A}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <h3 className="font-bold text-stone-900 dark:text-amber-200 mb-1">
              {t.faq3Q}
            </h3>
            <p className="text-stone-600 dark:text-slate-300 text-xs sm:text-sm">
              {t.faq3A}
            </p>
          </div>
        </div>
      </div>

      {/* Dedicated Clean Footer Note for this last page only */}
      <div className="text-center pt-6 space-y-2 border-t border-stone-200 dark:border-slate-800 text-xs text-stone-500 dark:text-slate-400">
        <div className="flex items-center justify-center gap-1 font-serif text-sm text-stone-800 dark:text-amber-200">
          <span>KāvyaLens — Sanskrit Literary Intelligence Platform</span>
        </div>
        <p>
          {t.footerNote}
        </p>
        <p className="text-[11px] text-stone-400">
          सम्पर्कः / Email: <a href="mailto:amitkumargvgm@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">amitkumargvgm@gmail.com</a> | पोर्टफोलियो: <a href="https://alphatyping.com/amitkumaraks/" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">alphatyping.com/amitkumaraks/</a>
        </p>
      </div>
    </div>
  );
};
