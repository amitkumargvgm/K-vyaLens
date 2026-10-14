import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Feather, 
  BookOpen, 
  Music, 
  Wrench, 
  User, 
  Globe
} from 'lucide-react';
import { OutputLanguage } from '../types/kavya';
import { I18N_STRINGS } from '../utils/i18n';

export type AppView = 
  | 'workbench' 
  | 'chhanda' 
  | 'prosody_shastra' 
  | 'tools' 
  | 'developer';

interface HeaderProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  language: OutputLanguage;
  onLanguageChange: (lang: OutputLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  isDarkMode,
  onToggleTheme,
  language,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = I18N_STRINGS[language] || I18N_STRINGS.sa;

  const navItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'workbench', label: t.navWorkbench, icon: Feather },
    { id: 'chhanda', label: t.navChhanda, icon: Music, badge: '३८+ वृत्त' },
    { id: 'prosody_shastra', label: t.navProsody, icon: BookOpen },
    { id: 'tools', label: t.navTools, icon: Wrench },
    { id: 'developer', label: t.navDeveloper, icon: User }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-[#090D16]/95 border-b border-stone-200 dark:border-slate-800 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => { onNavigate('workbench'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-md shadow-amber-600/10 border border-amber-500/30 group-hover:border-amber-400 transition-all flex items-center justify-center bg-gradient-to-br from-amber-600 to-amber-900">
              <img 
                src="/logo.svg" 
                alt="KāvyaLens Logo" 
                className="w-full h-full object-cover p-0.5 group-hover:scale-105 transition-transform" 
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-amber-100 tracking-tight">
                  KāvyaLens
                </span>
                <span className="font-sanskrit text-xs px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-medium">
                  काव्यलेन्स
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-slate-400 tracking-tight hidden sm:block">
                {t.brandSubtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 relative ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-200 font-semibold border border-amber-500/30 shadow-sm'
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-600/20 text-amber-700 dark:text-amber-300 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Global Language Switcher + Light / Dark Theme Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Global Language Selector (Available on all screens) */}
            <div className="flex items-center bg-stone-100 dark:bg-slate-900 p-0.5 sm:p-1 rounded-xl border border-stone-200 dark:border-slate-800">
              <Globe className="w-3.5 h-3.5 text-stone-400 ml-1.5 mr-0.5 hidden sm:inline" />
              {(['sa', 'hi', 'en'] as OutputLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    language === lang
                      ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm font-semibold'
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                  }`}
                  title={lang === 'sa' ? 'संस्कृतम्' : lang === 'hi' ? 'हिन्दी' : 'English'}
                >
                  {lang === 'sa' ? 'संस्कृतम्' : lang === 'hi' ? 'हिन्दी' : 'EN'}
                </button>
              ))}
            </div>

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={isDarkMode ? t.themeLight : t.themeDark}
              aria-label="Toggle theme"
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-100 dark:bg-slate-900 text-stone-700 dark:text-amber-300 hover:border-amber-400 hover:bg-stone-200 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 text-xs font-medium shadow-sm cursor-pointer select-none"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline">{t.themeLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-stone-700" />
                  <span className="hidden sm:inline">{t.themeDark}</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-100 dark:bg-slate-900 text-stone-700 dark:text-slate-200 hover:bg-stone-200 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-lg px-4 py-3 space-y-1.5 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-800 dark:text-amber-200 font-semibold border border-amber-500/30'
                    : 'text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
