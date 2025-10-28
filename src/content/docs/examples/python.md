---
title: Python
description: Sample code for using the Algebras API in Python
---

import CodeTabs from '../../components/CodeTabs.tsx';

## Get Supported Languages

<CodeTabs tabs={[
  {
    label: 'Python',
    language: 'python',
    code: `import requests
from typing import List

class AlgebrasAPI:
    def __init__(self, api_key: str, base_url: str = "https://platform.algebras.ai/api/v1"):
        self.base_url = base_url
        self.headers = {
            "X-Api-Key": api_key,
            "Content-Type": "application/json"
        }

    def get_languages(self):
        """Get list of supported languages."""
        response = requests.get(f"{self.base_url}/translation/languages", headers=self.headers)
        response.raise_for_status()
        return response.json()["data"]

# Usage example
def main():
    api = AlgebrasAPI("your_api_key_here")
    
    # Get supported languages
    languages = api.get_languages()
    print("Supported languages:", languages)

if __name__ == "__main__":
    main()`
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
    label: 'Python',
    language: 'python',
    code: `import requests
from typing import List

class AlgebrasAPI:
    def __init__(self, api_key: str, base_url: str = "https://platform.algebras.ai/api/v1"):
        self.base_url = base_url
        self.headers = {
            "X-Api-Key": api_key,
            "Content-Type": "application/json"
        }

    def translate_text(self, text: str, target_language: str, source_language: str = "auto") -> str:
        """Translate text to target language."""
        response = requests.post(
            f"{self.base_url}/translation/translate",
            headers=self.headers,
            json={
                "sourceLanguage": source_language,
                "targetLanguage": target_language,
                "text": text
            }
        )
        response.raise_for_status()
        return response.json()["data"]

# Usage example
def main():
    api = AlgebrasAPI("your_api_key_here")

    # Translate text
    translation = api.translate_text("Hello, world!", target_language="de")
    print("Translated text:", translation)

if __name__ == "__main__":
    main()`
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
    label: 'Python',
    language: 'python',
    code: `import requests
from typing import List

class AlgebrasAPI:
    def __init__(self, api_key: str, base_url: str = "https://platform.algebras.ai/api/v1"):
        self.base_url = base_url
        self.headers = {
            "X-Api-Key": api_key,
            "Content-Type": "application/json"
        }

    def batch_translate(self, texts: List[str], target_language: str, source_language: str = "auto"):
        """Translate multiple texts in a single request."""
        response = requests.post(
            f"{self.base_url}/translation/batch-translate",
            headers=self.headers,
            json={
                "sourceLanguage": source_language,
                "targetLanguage": target_language,
                "texts": texts
            }
        )
        response.raise_for_status()
        return response.json()["data"]

# Usage example
def main():
    api = AlgebrasAPI("your_api_key_here")
    
    # Batch translate multiple texts
    texts = ["Hello", "Goodbye", "Thank you"]
    result = api.batch_translate(texts, target_language="es")
    
    print("Batch translation results:")
    for translation in result["translations"]:
        print(f"Original: {texts[translation['index']]}")
        print(f"Translated: {translation['content']}")
        print("---")

if __name__ == "__main__":
    main()`
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
    label: 'Python',
    language: 'python',
    code: `import requests
from typing import List, Dict, Any

class AlgebrasAPI:
    def __init__(self, api_key: str, base_url: str = "https://platform.algebras.ai/api/v1"):
        self.base_url = base_url
        self.headers = {
            "X-Api-Key": api_key,
            "Content-Type": "application/json"
        }

    def translate_text_safe(self, text: str, target_language: str, source_language: str = "auto") -> Dict[str, Any]:
        """Translate text with comprehensive error handling."""
        try:
            response = requests.post(
                f"{self.base_url}/translation/translate",
                headers=self.headers,
                json={
                    "sourceLanguage": source_language,
                    "targetLanguage": target_language,
                    "text": text
                }
            )
            
            if response.status_code == 200:
                return {"success": True, "data": response.json()["data"]}
            elif response.status_code == 401:
                return {"success": False, "error": "Invalid API key"}
            elif response.status_code == 402:
                return {"success": False, "error": "Quota exceeded"}
            elif response.status_code == 400:
                error_data = response.json()
                return {"success": False, "error": f"Bad request: {error_data.get('error', {}).get('message', 'Unknown error')}"}
            else:
                return {"success": False, "error": f"HTTP {response.status_code}: {response.text}"}
                
        except requests.exceptions.RequestException as e:
            return {"success": False, "error": f"Network error: {str(e)}"}
        except Exception as e:
            return {"success": False, "error": f"Unexpected error: {str(e)}"}

# Usage example with error handling
def main():
    api = AlgebrasAPI("your_api_key_here")
    
    result = api.translate_text_safe("Hello, world!", target_language="de")
    
    if result["success"]:
        print("Translation successful:", result["data"])
    else:
        print("Translation failed:", result["error"])

if __name__ == "__main__":
    main()`
  }
]} />

## Complete Example

<CodeTabs tabs={[
  {
    label: 'Python',
    language: 'python',
    code: `import requests
import os
from typing import List, Dict, Any

class AlgebrasAPI:
    def __init__(self, api_key: str = None, base_url: str = "https://platform.algebras.ai/api/v1"):
        self.api_key = api_key or os.getenv("ALGEBRAS_API_KEY")
        if not self.api_key:
            raise ValueError("API key is required. Set ALGEBRAS_API_KEY environment variable or pass api_key parameter.")
        
        self.base_url = base_url
        self.headers = {
            "X-Api-Key": self.api_key,
            "Content-Type": "application/json"
        }

    def get_languages(self) -> List[Dict[str, str]]:
        """Get list of supported languages."""
        response = requests.get(f"{self.base_url}/translation/languages", headers=self.headers)
        response.raise_for_status()
        return response.json()["data"]

    def translate_text(self, text: str, target_language: str, source_language: str = "auto") -> str:
        """Translate text to target language."""
        response = requests.post(
            f"{self.base_url}/translation/translate",
            headers=self.headers,
            json={
                "sourceLanguage": source_language,
                "targetLanguage": target_language,
                "text": text
            }
        )
        response.raise_for_status()
        return response.json()["data"]

    def batch_translate(self, texts: List[str], target_language: str, source_language: str = "auto") -> Dict[str, Any]:
        """Translate multiple texts in a single request."""
        response = requests.post(
            f"{self.base_url}/translation/batch-translate",
            headers=self.headers,
            json={
                "sourceLanguage": source_language,
                "targetLanguage": target_language,
                "texts": texts
            }
        )
        response.raise_for_status()
        return response.json()["data"]

# Usage example
def main():
    try:
        # Initialize API client
        api = AlgebrasAPI()
        
        # Get supported languages
        languages = api.get_languages()
        print("Supported languages:")
        for lang in languages[:5]:  # Show first 5 languages
            print(f"  {lang['language']}: {lang['name']}")
        
        # Translate single text
        print("\\nSingle translation:")
        translation = api.translate_text("Hello, world!", target_language="es")
        print(f"English: Hello, world!")
        print(f"Spanish: {translation}")
        
        # Batch translation
        print("\\nBatch translation:")
        texts = ["Good morning", "How are you?", "See you later"]
        result = api.batch_translate(texts, target_language="fr")
        
        for translation in result["translations"]:
            original = texts[translation["index"]]
            translated = translation["content"]
            print(f"  {original} → {translated}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()`
  }
]} />
