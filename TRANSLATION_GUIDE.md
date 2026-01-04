# VouchSafe Translation Guide

## LibreTranslate Integration

VouchSafe now supports **Malayalam (മലയാളം)** translation using the LibreTranslate API - a free, open-source machine translation service.

## Features

✅ **Real-time Translation**: All UI text is translated on-demand  
✅ **Smart Caching**: Translations are cached in localStorage to improve performance  
✅ **Seamless Switching**: Toggle between English and Malayalam with one click  
✅ **No API Key Required**: Uses free LibreTranslate public endpoint  
✅ **Offline Fallback**: Original English text shown if translation fails  

## How It Works

### 1. Language Context (`LanguageContext.jsx`)
- Manages language state (English/Malayalam)
- Provides `tSync()` function for synchronous translations
- Provides `preloadTranslations()` for batch translation
- Caches translations in localStorage for performance

### 2. Language Toggle Button
- Located in top-right corner of all pages
- Shows "മലയാളം" when English is active
- Shows "English" when Malayalam is active
- Visual loading indicator during translation

### 3. Translation Flow
```
User clicks toggle → Language changes to 'ml'
→ Page calls preloadTranslations() with static texts
→ LibreTranslate API translates all texts in batch
→ Results cached in localStorage
→ UI updates with Malayalam text
```

## Usage in Components

### Basic Translation
```jsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { tSync } = useLanguage();
  
  return <h1>{tSync('Welcome')}</h1>;
}
```

### Preload Translations
```jsx
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';

function MyComponent() {
  const { language, tSync, preloadTranslations } = useLanguage();
  
  useEffect(() => {
    // Load translations for this page
    const texts = ['Welcome', 'Hello', 'Goodbye'];
    preloadTranslations(texts);
  }, [language]);
  
  return (
    <div>
      <h1>{tSync('Welcome')}</h1>
      <p>{tSync('Hello')}</p>
    </div>
  );
}
```

## API Details

### LibreTranslate Endpoint
- **URL**: `https://libretranslate.de/translate`
- **Method**: POST
- **Free**: No API key required
- **Rate Limit**: Reasonable limits for personal use

### Request Format
```json
{
  "q": "Welcome Back",
  "source": "en",
  "target": "ml",
  "format": "text"
}
```

### Response Format
```json
{
  "translatedText": "തിരികെ സ്വാഗതം"
}
```

## Translated Pages

The following pages have full Malayalam translation support:

- ✅ Login Page
- ✅ Register Page  
- ✅ Employee Dashboard
- ✅ Employer Dashboard
- ✅ Search Employees
- ✅ Employee Profile
- ✅ All Components (EmployeeCard, TrustBadge, JobRequestCard, etc.)

## Performance Optimization

### Caching Strategy
- Translations cached with format: `"ml:English Text": "Malayalam Translation"`
- Cache persists across sessions in localStorage
- Cache automatically loads on app startup

### Batch Translation
- Multiple texts translated in parallel using `Promise.all()`
- Reduces API calls and improves loading speed

### Clear Cache
```javascript
const { clearCache } = useLanguage();
clearCache(); // Clears all cached translations
```

## Alternative: Self-Hosted LibreTranslate

For production apps, consider hosting your own LibreTranslate instance:

```bash
# Using Docker
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate

# Update API endpoint in LanguageContext.jsx
const response = await fetch('http://localhost:5000/translate', {
  // ... rest of the code
});
```

## Supported Languages

LibreTranslate supports 100+ languages. To add more languages:

1. Update `LanguageContext.jsx`:
```javascript
const [language, setLanguage] = useState('en');
// Add more language options: 'hi', 'ta', 'kn', etc.
```

2. Update `LanguageToggle.jsx` to show language selector

## Troubleshooting

### Translation Not Working
- Check browser console for API errors
- Verify internet connection
- Clear translation cache and retry

### Slow Performance
- Preload common translations on page load
- Increase cache size
- Consider self-hosted LibreTranslate instance

### Rate Limiting
- LibreTranslate.de may have rate limits
- Self-host LibreTranslate for unlimited usage
- Implement request throttling if needed

## Future Enhancements

- [ ] Add more languages (Hindi, Tamil, Telugu, Kannada)
- [ ] Voice input/output in Malayalam
- [ ] RTL (Right-to-Left) support for Arabic/Urdu
- [ ] Translation quality feedback
- [ ] Professional translations for critical UI elements

## Resources

- [LibreTranslate](https://libretranslate.com/) - Official website
- [LibreTranslate GitHub](https://github.com/LibreTranslate/LibreTranslate)
- [API Documentation](https://libretranslate.com/docs)

---

**Note**: LibreTranslate uses machine translation. For production apps with critical content, consider professional human translation for important UI elements.
