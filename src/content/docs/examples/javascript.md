---
title: JavaScript
description: Sample code for using the Algebras API in JavaScript
---

### Using Fetch API

```javascript
// Configuration
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://platform.algebras.ai/api/v1';

const headers = {
  'X-Api-Key': API_KEY,
  'Content-Type': 'application/json',
};

// Get supported languages
async function getLanguages() {
  try {
    const response = await fetch(`${BASE_URL}/translation/languages`, {
      headers,
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
}

// Translate text
async function translateText(text, targetLanguage, sourceLanguage = 'auto') {
  try {
    const response = await fetch(`${BASE_URL}/translation/translate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sourceLanguage,
        targetLanguage,
        text,
      }),
    });
    const data = await response.json();
    return data.data.text;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}

// Usage examples
async function main() {
  try {
    // Get languages
    const languages = await getLanguages();
    console.log('Supported languages:', languages);

    // Translate text
    const translated = await translateText('Hello, world!', 'de');
    console.log('Translated text:', translated);
  } catch (error) {
    console.error('Error in API operations:', error);
  }
}

main();
```
