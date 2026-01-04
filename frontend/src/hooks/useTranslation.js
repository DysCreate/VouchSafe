import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = (texts = []) => {
  const { language, tSync, preloadTranslations } = useLanguage();
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'en') {
        const englishMap = {};
        texts.forEach(text => {
          englishMap[text] = text;
        });
        setTranslations(englishMap);
        return;
      }

      setLoading(true);
      await preloadTranslations(texts);
      
      const translationMap = {};
      texts.forEach(text => {
        translationMap[text] = tSync(text);
      });
      setTranslations(translationMap);
      setLoading(false);
    };

    if (texts.length > 0) {
      loadTranslations();
    }
  }, [language, texts.join(',')]);

  return { translations, loading, t: tSync };
};
