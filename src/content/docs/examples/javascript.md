---
title: JavaScript
description: Sample code for using the Algebras API in JavaScript
---

import CodeTabs from '../../components/CodeTabs.tsx';

## Get Supported Languages

<CodeTabs tabs={[
  {
    label: 'JavaScript',
    language: 'javascript',
    code: `// Configuration
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://platform.algebras.ai/api/v1';

const headers = {
  'X-Api-Key': API_KEY,
  'Content-Type': 'application/json',
};

// Get supported languages
async function getLanguages() {
  try {
    const response = await fetch(\`\${BASE_URL}/translation/languages\`, {
      headers,
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
}

// Usage example
async function main() {
  try {
    const languages = await getLanguages();
    console.log('Supported languages:', languages);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`
  },
  {
    label: 'cURL',
    language: 'bash',
    code: `curl -X GET "https://platform.algebras.ai/api/v1/translation/languages" \\
     -H "X-Api-Key: your_api_key_here"`
  }
]} />

## Translate Single Text

<CodeTabs tabs={[
  {
    label: 'JavaScript',
    language: 'javascript',
    code: `// Configuration
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://platform.algebras.ai/api/v1';

const headers = {
  'X-Api-Key': API_KEY,
  'Content-Type': 'application/json',
};

// Translate text
async function translateText(text, targetLanguage, sourceLanguage = 'auto') {
  try {
    const response = await fetch(\`\${BASE_URL}/translation/translate\`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sourceLanguage,
        targetLanguage,
        text,
      }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}

// Usage example
async function main() {
  try {
    const translated = await translateText('Hello, world!', 'de');
    console.log('Translated text:', translated);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`
  },
  {
    label: 'cURL',
    language: 'bash',
    code: `curl -X POST "https://platform.algebras.ai/api/v1/translation/translate" \\
     -H "X-Api-Key: your_api_key_here" \\
     -H "Content-Type: application/json" \\
     -d '{
       "sourceLanguage": "auto",
       "targetLanguage": "de",
       "text": "Hello, World!"
     }'`
  }
]} />

## Batch Translation

<CodeTabs tabs={[
  {
    label: 'JavaScript',
    language: 'javascript',
    code: `// Configuration
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://platform.algebras.ai/api/v1';

const headers = {
  'X-Api-Key': API_KEY,
  'Content-Type': 'application/json',
};

// Batch translate multiple texts
async function batchTranslate(texts, targetLanguage, sourceLanguage = 'auto') {
  try {
    const response = await fetch(\`\${BASE_URL}/translation/batch-translate\`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sourceLanguage,
        targetLanguage,
        texts,
      }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error batch translating:', error);
    throw error;
  }
}

// Usage example
async function main() {
  try {
    const texts = ['Hello', 'Goodbye', 'Thank you'];
    const result = await batchTranslate(texts, 'es');
    
    console.log('Batch translation results:');
    result.translations.forEach(translation => {
      const original = texts[translation.index];
      console.log(\`\${original} → \${translation.content}\`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`
  },
  {
    label: 'cURL',
    language: 'bash',
    code: `curl -X POST "https://platform.algebras.ai/api/v1/translation/batch-translate" \\
     -H "X-Api-Key: your_api_key_here" \\
     -H "Content-Type: application/json" \\
     -d '{
       "sourceLanguage": "auto",
       "targetLanguage": "es",
       "texts": ["Hello", "Goodbye", "Thank you"]
     }'`
  }
]} />

## Error Handling

<CodeTabs tabs={[
  {
    label: 'JavaScript',
    language: 'javascript',
    code: `// Configuration
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://platform.algebras.ai/api/v1';

const headers = {
  'X-Api-Key': API_KEY,
  'Content-Type': 'application/json',
};

// Translate text with comprehensive error handling
async function translateTextSafe(text, targetLanguage, sourceLanguage = 'auto') {
  try {
    const response = await fetch(\`\${BASE_URL}/translation/translate\`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sourceLanguage,
        targetLanguage,
        text,
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data.data };
    } else if (response.status === 401) {
      return { success: false, error: 'Invalid API key' };
    } else if (response.status === 402) {
      return { success: false, error: 'Quota exceeded' };
    } else if (response.status === 400) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: \`Bad request: \${errorData.error?.message || 'Unknown error'}\` 
      };
    } else {
      return { 
        success: false, 
        error: \`HTTP \${response.status}: \${response.statusText}\` 
      };
    }
  } catch (error) {
    return { success: false, error: \`Network error: \${error.message}\` };
  }
}

// Usage example with error handling
async function main() {
  const result = await translateTextSafe('Hello, world!', 'de');
  
  if (result.success) {
    console.log('Translation successful:', result.data);
  } else {
    console.log('Translation failed:', result.error);
  }
}

main();`
  }
]} />

## Complete Example

<CodeTabs tabs={[
  {
    label: 'JavaScript',
    language: 'javascript',
    code: `// Configuration
const API_KEY = process.env.ALGEBRAS_API_KEY || 'your_api_key_here';
const BASE_URL = 'https://platform.algebras.ai/api/v1';

if (!API_KEY || API_KEY === 'your_api_key_here') {
  throw new Error('API key is required. Set ALGEBRAS_API_KEY environment variable.');
}

const headers = {
  'X-Api-Key': API_KEY,
  'Content-Type': 'application/json',
};

class AlgebrasAPI {
  async getLanguages() {
    try {
      const response = await fetch(\`\${BASE_URL}/translation/languages\`, { headers });
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching languages:', error);
      throw error;
    }
  }

  async translateText(text, targetLanguage, sourceLanguage = 'auto') {
    try {
      const response = await fetch(\`\${BASE_URL}/translation/translate\`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ sourceLanguage, targetLanguage, text }),
      });
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error translating text:', error);
      throw error;
    }
  }

  async batchTranslate(texts, targetLanguage, sourceLanguage = 'auto') {
    try {
      const response = await fetch(\`\${BASE_URL}/translation/batch-translate\`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ sourceLanguage, targetLanguage, texts }),
      });
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error batch translating:', error);
      throw error;
    }
  }
}

// Usage example
async function main() {
  try {
    const api = new AlgebrasAPI();
    
    // Get supported languages
    const languages = await api.getLanguages();
    console.log('Supported languages:');
    languages.slice(0, 5).forEach(lang => {
      console.log(\`  \${lang.language}: \${lang.name}\`);
    });
    
    // Translate single text
    console.log('\\nSingle translation:');
    const translation = await api.translateText('Hello, world!', 'es');
    console.log('English: Hello, world!');
    console.log(\`Spanish: \${translation}\`);
    
    // Batch translation
    console.log('\\nBatch translation:');
    const texts = ['Good morning', 'How are you?', 'See you later'];
    const result = await api.batchTranslate(texts, 'fr');
    
    result.translations.forEach(translation => {
      const original = texts[translation.index];
      console.log(\`  \${original} → \${translation.content}\`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`
  }
]} />
