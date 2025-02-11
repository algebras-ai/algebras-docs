---
title: Python
description: Sample code for using the Algebras API in Python
---

### Using Requests

```python
import requests
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

    def translate_text(self, text: str, target_language: str, source_language: str = "auto") -> str:
        """Translate text to target language."""
        response = requests.post(
            f"{self.base_url}/translation/translate-text",
            headers=self.headers,
            json={
                "sourceLanguage": source_language,
                "targetLanguage": target_language,
                "text": text
            }
        )
        response.raise_for_status()
        return response.json()["data"]["text"]

# Usage example
def main():
    api = AlgebrasAPI("your_api_key_here")

    # Get supported languages
    languages = api.get_languages()
    print("Supported languages:", languages)

    # Translate text
    translation = api.translate_text("Hello, world!", target_language="de")
    print("Translated text:", translation)

if __name__ == "__main__":
    main()
```
