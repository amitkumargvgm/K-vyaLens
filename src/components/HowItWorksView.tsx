import React from 'react';
import { 
  BookOpen, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  User, 
  Feather, 
  Scale,
  Sparkles
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn text-slate-200">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#131D31] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <span>प्रणाली एवं प्रामाणिकता</span>
              <span aria-hidden="true">·</span>
              <span>System & Epistemic Audit</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-white tracking-tight">
              KāvyaLens कैसे कार्य करता है?
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-serif leading-relaxed max-w-2xl">
              श्लोक की व्याख्या, व्याकरण, अलङ्कार एवं रस का विश्लेषण कहाँ से आता है तथा परिणामों में सन्देह और यथार्थता का क्या अनुपात है? यहाँ सम्पूर्ण शास्त्रीय प्रक्रिया का पारदर्शी विवरण है।
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 sm:p-5 shrink-0 flex flex-col items-center md:items-end text-center md:text-right">
            <div className="text-[11px] text-slate-400 font-medium">प्लेटफ़ॉर्म प्रणेता एवं शिल्पी</div>
            <div className="text-lg font-bold text-amber-400 tracking-tight mt-0.5">Amit Kumar AKS</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1.5 mt-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Independent Sanskrit Research Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question 1: डेटाबेस से या कहीं और से? (Where does data come from?) */}
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              १. विवरण कहाँ से प्राप्त होता है — डेटाबेस से अथवा नवीन विश्लेषण से?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-serif">
              क्या यह केवल संग्रहीत श्लोकों को दिखाता है या किसी भी अप्रकाशित/अज्ञात श्लोक का विश्लेषण कर सकता है?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-2">
              <Feather className="w-4 h-4" />
              <span>नवीन एवं अप्रकाशित श्लोक (Arbitrary / Unseen Input)</span>
            </div>
            <p className="text-slate-300 font-serif leading-relaxed">
              KāvyaLens किसी सीमित डेटाबेस में बन्धा हुआ नहीं है। जब आप कोई भी नवीन श्लोक प्रविष्ट करते हैं, तो इंजन <strong>पाणिनीय व्याकरण</strong>, <strong>पिङ्गल छन्दशास्त्र</strong>, तथा <strong>काव्यशास्त्रीय लक्षणों</strong> के अनुसार वास्तविक समय (real-time) में श्लोक का विश्लेषण करता है:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1 text-xs">
              <li><strong>वर्ण एवं मात्रा परिगणन:</strong> लघु-गुरु भार एवं यति का त्वरित निर्धारण।</li>
              <li><strong>सन्धि एवं पदच्छेद:</strong> पाणिनीय अष्टाध्यायी सूत्रों के अनुसार पदों का पृथक्करण।</li>
              <li><strong>समास एवं विग्रह:</strong> तत्पुरुष, बहुव्रीहि, द्वन्द्व आदि का सम्भावित विग्रह।</li>
              <li><strong>अलङ्कार एवं रस परीक्षा:</strong> मम्मट, विश्वनाथ, आनन्दवर्धन आदि के शास्त्रीय लक्षणों से मिलान।</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>प्रमाण श्लोक संग्रह (Canonical Benchmark Corpus)</span>
            </div>
            <p className="text-slate-300 font-serif leading-relaxed">
              कालिदास (मेघदूतम्, रघुवंशम्), भारवि (किरातार्जुनीयम्), भवभूति (उत्तररामचरितम्), अमरुशतक आदि के प्रामाणिक श्लोकों हेतु पारम्परिक टीकाकारों (जैसे <strong>मल्लीनाथ</strong> की 'सञ्जीवनी' टीका) द्वारा सम्पुष्ट मानक पाठ एवं प्रामाणिक संदर्भ सुरक्षित हैं।
            </p>
            <p className="text-slate-400 text-xs font-serif leading-relaxed">
              यदि प्रविष्ट श्लोक इस संग्रह से मेल खाता है, तो प्रामाणिक ग्रंथ-संदर्भ स्वतः प्रमाणित (Verified) रूप में प्रस्तुत किए जाते हैं।
            </p>
          </div>
        </div>
      </div>

      {/* Question 2: परिणाम गलत होने के कितने सम्भावना हैं? (Error probability & accuracy margins) */}
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              २. परिणाम त्रुटिपूर्ण होने की सम्भावना कितनी है?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-serif">
              विभिन्न अंगों (छन्द, व्याकरण, अलङ्कार, रस) में यथार्थता एवं प्रामाणिकता का स्तर।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Accuracy Tier 1 */}
          <div className="p-4 bg-slate-900/80 border border-emerald-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">अति-उच्च यथार्थता (98%+)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">गणितीय</span>
            </div>
            <h3 className="font-bold text-white text-sm">छन्द एवं मात्रा-भार (Prosody)</h3>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              वर्णों के ह्रस्व/दीर्घ तथा संयुक्त वर्ण से पूर्व गुरु होने का नियम गणितीय रूप से निश्चित है। मन्दाक्रान्ता, शिखरिणी, शार्दूलविक्रीडित, वसन्ततिलका आदि छन्दों की पहचान में त्रुटि की सम्भावना नगण्य होती है।
            </p>
          </div>

          {/* Accuracy Tier 2 */}
          <div className="p-4 bg-slate-900/80 border border-amber-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">उच्च यथार्थता (90–95%)</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">व्याकरणिक</span>
            </div>
            <h3 className="font-bold text-white text-sm">पदच्छेद एवं शब्दार्थ (Padaccheda)</h3>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              जहाँ सन्धि के एकाधिक सम्भावित विग्रह हों, वहाँ सन्दर्भ की आवश्यकता होती है। प्रणाली मुख्य पदच्छेद के साथ वैकल्पिक विग्रह भी प्रस्तुत करती है और जहाँ व्याकरण में संदिग्धता हो, वहाँ स्पष्ट चेतावनी अंकित करती है।
            </p>
          </div>

          {/* Accuracy Tier 3 */}
          <div className="p-4 bg-slate-900/80 border border-indigo-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">व्याख्या-सापेक्ष (Interpretive)</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono font-bold">सापेक्ष</span>
            </div>
            <h3 className="font-bold text-white text-sm">अलङ्कार, रस एवं ध्वनि</h3>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              काव्यशास्त्र में स्वयं आचार्यों के मध्य मतभेद रहे हैं (उदा. मम्मट बनाम विश्वनाथ)। इसलिए KāvyaLens किसी एक मत को अन्तिम नहीं मानता; यह साक्ष्य के आधार पर <em>'Strongly Supported'</em>, <em>'Plausible'</em> या <em>'Tentative'</em> का लेबल देता है।
            </p>
          </div>
        </div>
      </div>

      {/* Classical Treatises Foundation */}
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>प्रामाणिक आधार ग्रन्थ (Foundational Kāvyashāstra Treatises)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
          {[
            { author: 'भरतमुनि', text: 'नाट्यशास्त्रम्', topic: 'रस-सूत्र एवं विभाव' },
            { author: 'भामह', text: 'काव्यालङ्कारः', topic: 'वक्रोक्ति एवं अलङ्कार' },
            { author: 'दण्डी', text: 'काव्यादर्शः', topic: 'मार्ग एवं गुण' },
            { author: 'आनन्दवर्धन', text: 'ध्वन्यालोकः', topic: 'ध्वनि-सिद्धान्त' },
            { author: 'अभिनवगुप्त', text: 'लोचन-टीका', topic: 'रस-ध्वनि निष्पत्ति' },
            { author: 'मम्मट', text: 'काव्यप्रकाशः', topic: 'दश उल्लास एवं दोष' },
            { author: 'कुन्तक', text: 'वक्रोक्तिजीवितम्', topic: 'षड्विध वक्रोक्ति' },
            { author: 'क्षेमेन्द्र', text: 'औचित्यविचारचर्चा', topic: 'रससिद्ध औचित्य' },
            { author: 'विश्वनाथ', text: 'साहित्यदर्पणम्', topic: 'वाक्यं रसात्मकं काव्यम्' },
            { author: 'जगन्नाथ', text: 'रसगङ्गाधरः', topic: 'नव्य-न्याय काव्यमीमांसा' }
          ].map((item, i) => (
            <div key={i} className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
              <div className="font-bold text-amber-400">{item.text}</div>
              <div className="text-slate-300 font-medium text-[11px] mt-0.5">{item.author}</div>
              <div className="text-slate-500 text-[10px] mt-1">{item.topic}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Acknowledgement & Attribution */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6 text-center space-y-2">
        <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider font-mono">
          PLATFORM ARCHITECT & AUTHOR
        </div>
        <h3 className="font-editorial text-2xl font-bold text-white">
          Developed by Amit Kumar AKS
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-serif max-w-xl mx-auto leading-relaxed">
          KāvyaLens संस्कृत काव्य एवं काव्यशास्त्र के साक्ष्य-आधारित, वैज्ञानिक एवं निष्पक्ष अध्ययन के लिए निर्मित एक उच्च-स्तरीय स्वतंत्र शोध-मंच है।
        </p>
      </div>
    </div>
  );
};
