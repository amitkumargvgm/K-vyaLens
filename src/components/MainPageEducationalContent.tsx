import React from 'react';
import { 
  ArrowRight, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { AppView } from './Header';
import { OutputLanguage } from '../types/kavya';

interface MainPageEducationalContentProps {
  onNavigate: (view: AppView) => void;
  language?: OutputLanguage;
}

export const MainPageEducationalContent: React.FC<MainPageEducationalContentProps> = ({ 
  onNavigate,
  language = 'sa'
}) => {
  return (
    <div className="space-y-8 pt-6 border-t border-stone-200 dark:border-slate-800">

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>
            {language === 'sa'
              ? 'काव्य-स्वाध्यायः शास्त्रीया मार्गदर्शिका च'
              : language === 'hi'
              ? 'काव्य-स्वाध्याय एवं शास्त्रीय मार्गदर्शिका'
              : 'Kāvya Study Guide & Classical Methodology'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-amber-100">
          {language === 'sa'
            ? 'संस्कृत-श्लोकस्य अर्थं सौन्दर्यं च कथम् अवगन्तव्यम्?'
            : language === 'hi'
            ? 'संस्कृत श्लोक का अर्थ एवं सौन्दर्य कैसे समझें?'
            : 'How to Decipher Sanskrit Verses & Classical Poetics?'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-400 font-serif">
          {language === 'sa'
            ? 'काव्यशास्त्राचार्यैः प्रतिपादिताः पद्य-विश्लेषणस्य पञ्च अनिवार्य-सोपानाः'
            : language === 'hi'
            ? 'काव्यशास्त्र के आचार्यों द्वारा प्रतिपादित पद्य-विश्लेषण के पाँच अनिवार्य सोपान'
            : 'The 5 Essential Pedagogical Steps of Sanskrit Verse Interpretation'}
        </p>
      </div>

      {/* 5 Steps of Shloka Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Step 1 */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#111726] shadow-sm hover:border-amber-500/40 transition-all space-y-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
            ०१
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
            {language === 'sa' ? 'पदच्छेदः सन्धि-विग्रहश्च' : 'पदच्छेद एवं सन्धि-विग्रह'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
            {language === 'sa'
              ? 'श्लोके संसक्तानां पदानां सन्धि-नियमानुसारेण पृथक्करणम्। यावत् सामासिक-सन्धियुक्तानि पदानि न भिद्यन्ते, तावत् मूलार्थ-ज्ञानम् असम्भवम्।'
              : 'श्लोक में जुड़े हुए शब्दों को सन्धि-नियमों के अनुसार अलग करना। जब तक समस्त पदों का विग्रह नहीं होगा, तब तक मूल अर्थ समझना सम्भव नहीं है।'}
          </p>
          <button
            onClick={() => onNavigate('tools')}
            className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline pt-1 border-t border-stone-100 dark:border-slate-800 cursor-pointer"
          >
            <span>{language === 'sa' ? 'सन्धि-विग्रह-उपकरणं पश्यतु' : 'सन्धि-विच्छेद टूल का प्रयोग करें'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#111726] shadow-sm hover:border-amber-500/40 transition-all space-y-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
            ०२
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
            {language === 'sa' ? 'पदपरिचयः (नाम-धातु-विभक्तिः)' : 'पदपरिचय एवं व्याकरण'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
            {language === 'sa'
              ? 'प्रत्येकं पदस्य प्रातिपदिकं, लिङ्गं, विभक्तिं, वचनं च ज्ञातव्यम्। तिङन्त-क्रियापदानां धातुः, लकारः, पुरुषः च अवगन्तव्यः।'
              : 'प्रत्येक शब्द की मूल प्रकृति (धातु/प्रातिपदिक), लिङ्ग, विभक्ति और वचन की पहचान। क्रियापद के लकार और पुरुष को समझना।'}
          </p>
          <button
            onClick={() => onNavigate('tools')}
            className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline pt-1 border-t border-stone-100 dark:border-slate-800 cursor-pointer"
          >
            <span>{language === 'sa' ? 'विभक्ति-सारणीं पश्यतु' : 'सुप्-तिङ् विभक्ति सारणी देखें'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Step 3 */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#111726] shadow-sm hover:border-amber-500/40 transition-all space-y-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
            ०३
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
            {language === 'sa' ? 'अन्वय-क्रमः (दण्डान्वयः खण्डान्वयश्च)' : 'अन्वय रचना (वाक्य क्रम)'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
            {language === 'sa'
              ? 'पद्ये छन्दो-बद्धत्वात् शब्दाः इतस्ततः प्रयुक्ताः भवन्ति। कर्ता-कर्म-क्रिया-सम्बन्ध-क्रमेण गद्यवद् वाक्य-रचना अन्वयः कथ्यते।'
              : 'पद्य में छन्द के कारण शब्द इधर-उधर बिखरे होते हैं। उन्हें कर्ता, कर्म, विशेषण और क्रिया के स्वाभाविक गद्य क्रम में सजाना अन्वय कहलाता है।'}
          </p>
          <button
            onClick={() => onNavigate('tools')}
            className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline pt-1 border-t border-stone-100 dark:border-slate-800 cursor-pointer"
          >
            <span>{language === 'sa' ? 'अन्वय-मार्गदर्शिकां पश्यतु' : 'अन्वय मार्गदर्शिका देखें'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Step 4 */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#111726] shadow-sm hover:border-amber-500/40 transition-all space-y-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
            ०४
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
            {language === 'sa' ? 'रस-भाव-विभाव-विमर्शः' : 'रस एवं भाव निष्पत्ति'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
            {language === 'sa'
              ? 'भरतमुनेः रससूत्रम् — "विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः"। श्लोकस्य आलम्बन-उद्दीपन-विभावानाम् अवगमनेन रस-साक्षात्कारः भवति।'
              : 'भरतमुनि के अनुसार विभाव, अनुभाव और व्यभिचारी भावों के संयोग से रस की निष्पत्ति होती है। श्लोक के आन्तरिक भाव को ग्रहण करना।'}
          </p>
          <button
            onClick={() => onNavigate('prosody_shastra')}
            className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline pt-1 border-t border-stone-100 dark:border-slate-800 cursor-pointer"
          >
            <span>{language === 'sa' ? 'रस-काव्यशास्त्रकोषं पश्यतु' : 'रस एवं काव्यशास्त्र कोष'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Step 5 */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#111726] shadow-sm hover:border-amber-500/40 transition-all space-y-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
            ०५
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
            {language === 'sa' ? 'छन्दः-अलङ्कार-परीक्षाम्' : 'छन्द एवं अलङ्कार परीक्षण'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
            {language === 'sa'
              ? 'पद्यस्य लयः कस्मिन् वृत्ते (अनुष्टुप्, इन्द्रवज्रा, वसन्ततिलकादिषु) निबद्धः, तथा च उपमा-रूपकादयः के अलङ्काराः प्रयुक्ताः इति अन्वेषणम्।'
              : 'पद्य की लय किस वृत्त (जैसे अनुष्टुप्, इन्द्रवज्रा, वसन्ततिलका, शार्दूलविक्रीडित) में आबद्ध है, तथा उसमें उपमा, रूपक आदि कौन-से अलङ्कार हैं।'}
          </p>
          <button
            onClick={() => onNavigate('chhanda')}
            className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline pt-1 border-t border-stone-100 dark:border-slate-800 cursor-pointer"
          >
            <span>{language === 'sa' ? '३८+ वृत्तानां प्रत्यक्ष-घटाना' : '३८+ छन्दों की प्रत्यक्ष घटाना देखें'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Reference Box */}
        <div className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent shadow-sm space-y-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
            ✦
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
            {language === 'sa' ? 'स्मरण-सूत्रम् (गणाष्टकम्)' : 'त्वरित मार्गदर्शक एवं सूत्र'}
          </h3>
          <p className="text-xs text-stone-700 dark:text-slate-300 leading-relaxed">
            "यमाता राजभानसलगा" — यह आठ गणों (य, म, त, र, ज, भ, न, स) तथा लघु-गुरु (ल, ग) को याद रखने का सर्वमान्य प्राचीन सूत्र है।
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200">
              य मा ता रा ज भा न स ल गं
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
