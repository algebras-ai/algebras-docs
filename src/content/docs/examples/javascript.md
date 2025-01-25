---
title: JavaScript
description: Sample code for using the Algebras API in JavaScript
---

### Using Fetch API

```javascript
// Configuration
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://platform.algebras.ai/api';

const headers = {
  'X-Api-Key': API_KEY,
  'Content-Type': 'application/json',
};

// Get supported languages
async function getLanguages() {
  try {
    const response = await fetch(`${BASE_URL}/v1/languages/`, {
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
}

// Translate text
async function translateText(text, targetLang, sourceLang = 'auto') {
  try {
    const response = await fetch(`${BASE_URL}/v1/translate/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source_lang: sourceLang,
        target_lang: targetLang,
        text: [text],
      }),
    });
    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}

// Extract glossary terms
async function extractGlossary(text) {
  try {
    const response = await fetch(`${BASE_URL}/v1/glossaries/extract`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return data.glossary;
  } catch (error) {
    console.error('Error extracting glossary:', error);
    throw error;
  }
}

// Usage examples
async function main() {
  // Get languages
  const languages = await getLanguages();
  console.log('Supported languages:', languages);

  // Translate text
  const translated = await translateText('Hello, world!', 'de');
  console.log('Translated text:', translated);

  // Extract glossary
  const glossary = await extractGlossary('API is an Application Programming Interface');
  console.log('Extracted terms:', glossary);
}
```

### Using Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://platform.algebras.ai/api"',
  headers: {
    'X-Api-Key': 'your_api_key_here',
    'Content-Type': 'application/json',
  },
});

// Get supported languages
const getLanguages = () => api.get('/v1/languages/');

// Translate text
const translateText = (text, targetLang, sourceLang = 'auto') =>
  api.post('/v1/translate/', {
    source_lang: sourceLang,
    target_lang: targetLang,
    text: [text],
  });

// Extract glossary terms
const extractGlossary = (text) => api.post('/v1/glossaries/extract', { text });
```
