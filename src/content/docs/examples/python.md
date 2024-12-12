---
title: Python
description: Sample code for using the Algebras API in Python
---

### Using Requests

```python
import requests
from typing import List, Optional

class AlgebrasAPI:
    def __init__(self, api_key: str, base_url: str = "https://api.algebras.ai"):
        self.base_url = base_url
        self.headers = {
            "X-Api-Key": api_key,
            "Content-Type": "application/json"
        }

    def get_languages(self):
        """Get list of supported languages."""
        response = requests.get(
            f"{self.base_url}/v1/languages/",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()

    def translate_text(
        self,
        text: List[str],
        target_lang: str,
        source_lang: str = "auto"
    ) -> List[str]:
        """Translate text to target language."""
        response = requests.post(
            f"{self.base_url}/v1/translate/",
            headers=self.headers,
            json={
                "source_lang": source_lang,
                "target_lang": target_lang,
                "text": text
            }
        )
        response.raise_for_status()
        return response.json()["translations"]

    def extract_glossary(self, text: str):
        """Extract glossary terms from text."""
        response = requests.post(
            f"{self.base_url}/v1/glossaries/extract",
            headers=self.headers,
            json={"text": text}
        )
        response.raise_for_status()
        return response.json()["glossary"]

# Usage example
def main():
    api = AlgebrasAPI("your_api_key_here")
    
    # Get supported languages
    languages = api.get_languages()
    print("Supported languages:", languages)
    
    # Translate text
    translations = api.translate_text(
        ["Hello, world!"],
        target_lang="de"
    )
    print("Translated text:", translations)
    
    # Extract glossary
    glossary = api.extract_glossary(
        "API is an Application Programming Interface"
    )
    print("Extracted terms:", glossary)

if __name__ == "__main__":
    main()
```

### Using AIOHTTP (Async)

```python
import aiohttp
import asyncio
from typing import List

class AsyncAlgebrasAPI:
    def __init__(self, api_key: str, base_url: str = "https://api.algebras.ai"):
        self.base_url = base_url
        self.headers = {
            "X-Api-Key": api_key,
            "Content-Type": "application/json"
        }

    async def get_languages(self):
        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.base_url}/v1/languages/",
                headers=self.headers
            ) as response:
                response.raise_for_status()
                return await response.json()

    async def translate_text(
        self,
        text: List[str],
        target_lang: str,
        source_lang: str = "auto"
    ):
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.base_url}/v1/translate/",
                headers=self.headers,
                json={
                    "source_lang": source_lang,
                    "target_lang": target_lang,
                    "text": text
                }
            ) as response:
                response.raise_for_status()
                data = await response.json()
                return data["translations"]

    async def extract_glossary(self, text: str):
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.base_url}/v1/glossaries/extract",
                headers=self.headers,
                json={"text": text}
            ) as response:
                response.raise_for_status()
                data = await response.json()
                return data["glossary"]
```