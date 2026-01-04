import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Malayalam translation dictionary
const malayalamTranslations = {
  // Common
  'VouchSafe': 'VouchSafe',
  'VOUCHSAFE': 'VOUCHSAFE',
  
  // Auth & Login
  'Welcome Back!': 'തിരികെ സ്വാഗതം!',
  'Sign in to access your dashboard and continue building trust.': 'നിങ്ങളുടെ ഡാഷ്‌ബോർഡ് ആക്‌സസ് ചെയ്യാനും വിശ്വാസം കെട്ടിപ്പടുക്കുന്നത് തുടരാനും സൈൻ ഇൻ ചെയ്യുക.',
  'Email': 'ഇമെയിൽ',
  'Enter your email': 'നിങ്ങളുടെ ഇമെയിൽ നൽകുക',
  'Password': 'പാസ്‌വേഡ്',
  'Enter your password': 'നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക',
  'Forgot Password?': 'പാസ്‌വേഡ് മറന്നോ?',
  'Sign In': 'സൈൻ ഇൻ',
  "Don't have an Account?": 'അക്കൗണ്ട് ഇല്ലേ?',
  'Sign Up': 'സൈൻ അപ്പ്',
  'Already have an Account?': 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?',
  
  // Register
  'Create Account': 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
  'Join VouchSafe and start building your trust score today.': 'VouchSafe-ൽ ചേരുകയും ഇന്ന് നിങ്ങളുടെ ട്രസ്റ്റ് സ്കോർ നിർമ്മിക്കാൻ തുടങ്ങുകയും ചെയ്യുക.',
  'Name': 'പേര്',
  'Enter your full name': 'നിങ്ങളുടെ മുഴുവൻ പേര് നൽകുക',
  'Phone': 'ഫോൺ',
  'Enter your phone number': 'നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക',
  'I am an': 'ഞാൻ ഒരു',
  'Employee': 'ജീവനക്കാരൻ',
  'Employer': 'തൊഴിലുടമ',
  'Work Designation': 'ജോലി പദവി',
  'e.g., Plumber, Tailor, Electrician': 'ഉദാ., പ്ലംബർ, തയ്യൽക്കാരൻ, ഇലക്ട്രീഷ്യൻ',
  
  // Marketing
  'Build Trust Through Verified Work': 'സാക്ഷ്യപ്പെടുത്തിയ ജോലിയിലൂടെ വിശ്വാസം കെട്ടിപ്പടുക്കുക',
  'VouchSafe has completely transformed how I connect with employers. The Trust Score system ensures my hard work is recognized and valued.': 'തൊഴിലുടമകളുമായി ഞാൻ ബന്ധപ്പെടുന്ന രീതി VouchSafe പൂർണ്ണമായും മാറ്റിമറിച്ചു. എന്റെ കഠിനാധ്വാനം അംഗീകരിക്കപ്പെടുകയും വിലമതിക്കപ്പെടുകയും ചെയ്യുന്നുവെന്ന് ട്രസ്റ്റ് സ്കോർ സംവിധാനം ഉറപ്പാക്കുന്നു.',
  'Professional Plumber': 'പ്രൊഫഷണൽ പ്ലംബർ',
  'Employees': 'ജീവനക്കാർ',
  'Jobs': 'ജോലികൾ',
  'Satisfaction': 'സംതൃപ്തി',
  'Join thousands building trust': 'വിശ്വാസം കെട്ടിപ്പടുക്കുന്ന ആയിരക്കണക്കിന് ആളുകളിൽ ചേരുക',
  'Get matched with skilled professionals': 'വൈദഗ്ധ്യമുള്ള പ്രൊഫഷണലുകളുമായി പൊരുത്തപ്പെടുക',
  'Track verified work history': 'സാക്ഷ്യപ്പെടുത്തിയ ജോലി ചരിത്രം ട്രാക്ക് ചെയ്യുക',
  
  // Dashboard Common
  'Welcome back': 'തിരികെ സ്വാഗതം',
  'Welcome to dashboard': 'ഡാഷ്‌ബോർഡിലേക്ക് സ്വാഗതം',
  'Main Menu': 'പ്രധാന മെനു',
  'Home': 'ഹോം',
  'Dashboard': 'ഡാഷ്‌ബോർഡ്',
  'Search': 'തിരയുക',
  'Settings': 'ക്രമീകരണങ്ങൾ',
  'Log out': 'പുറത്തുകടക്കുക',
  'Logout': 'പുറത്തുകടക്കുക',
  
  // Employee Dashboard
  'Designation': 'പദവി',
  'Jobs Done': 'പൂർത്തിയാക്കിയ ജോലികൾ',
  'Active Jobs': 'സജീവ ജോലികൾ',
  'Trust Score': 'വിശ്വാസ സ്കോർ',
  'Your rating': 'നിങ്ങളുടെ റേറ്റിംഗ്',
  'Total completed': 'മൊത്തം പൂർത്തിയായത്',
  'In progress': 'പുരോഗമിക്കുന്നു',
  'Recent Job Requests': 'സമീപകാല ജോലി അഭ്യർത്ഥനകൾ',
  'See all': 'എല്ലാം കാണുക',
  'Account Deactivated': 'അക്കൗണ്ട് നിർജ്ജീവമാക്കി',
  'Your account is currently deactivated. Your trust score': 'നിങ്ങളുടെ അക്കൗണ്ട് നിലവിൽ നിർജ്ജീവമാക്കിയിരിക്കുന്നു. നിങ്ങളുടെ ട്രസ്റ്റ് സ്കോർ',
  'is preserved. Reactivate anytime to start receiving job requests.': 'സംരക്ഷിച്ചിരിക്കുന്നു. ജോലി അഭ്യർത്ഥനകൾ സ്വീകരിക്കാൻ എപ്പോൾ വേണമെങ്കിലും വീണ്ടും സജീവമാക്കുക.',
  'Reactivate Account': 'അക്കൗണ്ട് വീണ്ടും സജീവമാക്കുക',
  'Take a Break - Deactivate Account': 'ഒരു ഇടവേള എടുക്കുക - അക്കൗണ്ട് നിർജ്ജീവമാക്കുക',
  'Incoming Job Requests': 'ഇൻകമിംഗ് ജോലി അഭ്യർത്ഥനകൾ',
  'No job requests yet': 'ഇതുവരെ ജോലി അഭ്യർത്ഥനകൾ ഇല്ല',
  'Employer details hidden until accepted': 'സ്വീകരിക്കുന്നത് വരെ തൊഴിലുടമ വിശദാംശങ്ങൾ മറച്ചിരിക്കുന്നു',
  'Employer': 'തൊഴിലുടമ',
  'Accept': 'സ്വീകരിക്കുക',
  'Reject': 'നിരസിക്കുക',
  'Job in progress': 'ജോലി പുരോഗമിക്കുന്നു',
  'Job completed': 'ജോലി പൂർത്തിയായി',
  
  // Employer Dashboard
  'Total Jobs': 'മൊത്തം ജോലികൾ',
  'All requests': 'എല്ലാ അഭ്യർത്ഥനകൾ',
  'Pending': 'തീർപ്പാക്കാത്തത്',
  'Pending Requests': 'തീർപ്പാക്കാത്ത അഭ്യർത്ഥനകൾ',
  'Awaiting response': 'മറുപടി കാത്തിരിക്കുന്നു',
  'Active': 'സജീവം',
  'Completed': 'പൂർത്തിയായി',
  'Completed Jobs': 'പൂർത്തിയാക്കിയ ജോലികൾ',
  'Jobs finished': 'ജോലികൾ പൂർത്തിയായി',
  'Search Employees': 'ജീവനക്കാരെ തിരയുക',
  'Job Requests': 'ജോലി അഭ്യർത്ഥനകൾ',
  'My Job Requests': 'എന്റെ ജോലി അഭ്യർത്ഥനകൾ',
  'No jobs yet': 'ഇതുവരെ ജോലികൾ ഇല്ല',
  'Start searching for employees': 'ജീവനക്കാരെ തിരയാൻ തുടങ്ങുക',
  'Employee details hidden until accepted': 'സ്വീകരിക്കുന്നത് വരെ ജീവനക്കാരുടെ വിശദാംശങ്ങൾ മറച്ചിരിക്കുന്നു',
  'Complete': 'പൂർത്തിയാക്കുക',
  'Mark Complete': 'പൂർത്തിയായതായി അടയാളപ്പെടുത്തുക',
  'Vouch': 'ശുപാർശ',
  
  // Status
  'REQUESTED': 'അഭ്യർത്ഥിച്ചു',
  'ACCEPTED': 'സ്വീകരിച്ചു',
  'COMPLETED': 'പൂർത്തിയായി',
  'REJECTED': 'നിരസിച്ചു',
  
  // Search Page
  'Find Trusted Employees': 'വിശ്വസനീയമായ ജീവനക്കാരെ കണ്ടെത്തുക',
  'Find trusted professionals by designation': 'പദവി അനുസരിച്ച് വിശ്വസനീയ പ്രൊഫഷണലുകളെ കണ്ടെത്തുക',
  'Search by designation': 'പദവി അനുസരിച്ച് തിരയുക',
  'Back to Dashboard': 'ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക',
  'employees found': 'ജീവനക്കാരെ കണ്ടെത്തി',
  'No employees found for': 'ജീവനക്കാരെ കണ്ടെത്തിയില്ല',
  'Try a different designation': 'മറ്റൊരു പദവി ഉപയോഗിച്ച് തിരയാൻ ശ്രമിക്കുക',
  'Vouches': 'ശുപാർശകൾ',
  'Send Request': 'അഭ്യർത്ഥന അയയ്ക്കുക',
  'Send Job Request': 'ജോലി അഭ്യർത്ഥന അയയ്ക്കുക',
  'Jobs Completed': 'പൂർത്തിയാക്കിയ ജോലികൾ',
  
  // Employee Profile
  'Employee Profile': 'ജീവനക്കാരന്റെ പ്രൊഫൈൽ',
  'Skills': 'കഴിവുകൾ',
  'No skills listed': 'കഴിവുകൾ പട്ടികപ്പെടുത്തിയിട്ടില്ല',
  'No vouches yet': 'ഇതുവരെ ശുപാർശകൾ ഇല്ല',
  'Service': 'സേവനം',
  'Loading...': 'ലോഡ് ചെയ്യുന്നു...',
  
  // Vouch Modal
  'Rate this employee': 'ഈ ജീവനക്കാരനെ റേറ്റ് ചെയ്യുക',
  'Rate this Employee': 'ഈ ജീവനക്കാരനെ റേറ്റ് ചെയ്യുക',
  'Select rating (1-5 stars)': 'റേറ്റിംഗ് തിരഞ്ഞെടുക്കുക (1-5 നക്ഷത്രങ്ങൾ)',
  'Rating': 'റേറ്റിംഗ്',
  'Comment (Optional)': 'അഭിപ്രായം (ഓപ്ഷണൽ)',
  'Optional comment': 'ഓപ്ഷണൽ അഭിപ്രായം',
  'Share your experience...': 'നിങ്ങളുടെ അനുഭവം പങ്കിടുക...',
  'Submit': 'സമർപ്പിക്കുക',
  'Cancel': 'റദ്ദാക്കുക',
  
  // Deactivate Modal
  'Deactivate Account': 'അക്കൗണ്ട് നിർജ്ജീവമാക്കുക',
  'Taking a break? No problem! Your account will be hidden from employers, but your trust score': 'ഇടവേള എടുക്കുകയാണോ? കുഴപ്പമില്ല! നിങ്ങളുടെ അക്കൗണ്ട് തൊഴിലുടമകളിൽ നിന്ന് മറയ്ക്കും, പക്ഷേ നിങ്ങളുടെ ട്രസ്റ്റ് സ്കോർ',
  'will be preserved.': 'സംരക്ഷിക്കപ്പെടും.',
  'Benefits:': 'ആനുകൂല്യങ്ങൾ:',
  "Your trust score won't decay during deactivation": 'നിർജ്ജീവമാക്കൽ സമയത്ത് നിങ്ങളുടെ ട്രസ്റ്റ് സ്കോർ ക്ഷയിക്കില്ല',
  'You can reactivate anytime': 'നിങ്ങൾക്ക് എപ്പോൾ വേണമെങ്കിലും വീണ്ടും സജീവമാക്കാം',
  'All your history is preserved': 'നിങ്ങളുടെ എല്ലാ ചരിത്രവും സംരക്ഷിച്ചിരിക്കുന്നു',
  'Deactivate': 'നിർജ്ജീവമാക്കുക',
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  // Synchronous translation using static dictionary
  const tSync = (text) => {
    if (!text || language === 'en') return text;
    return malayalamTranslations[text] || text;
  };

  // Preload is instant with static translations
  const preloadTranslations = async (texts) => {
    // No-op for static translations, but kept for compatibility
    return Promise.resolve();
  };

  const clearCache = () => {
    // No-op for static translations
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      toggleLanguage, 
      tSync,
      preloadTranslations,
      clearCache,
      isTranslating: false
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
