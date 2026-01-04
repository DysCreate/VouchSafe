import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function LanguageToggle() {
  const { language, toggleLanguage, isTranslating } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      disabled={isTranslating}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      title={language === 'en' ? 'Switch to Malayalam' : 'Switch to English'}
    >
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span className="font-medium text-gray-700">
        {isTranslating ? '...' : (language === 'en' ? 'മലയാളം' : 'English')}
      </span>
    </button>
  );
}

export default LanguageToggle;
