---
title: Translation
description: API endpoints for text translation
---

## Translate Text

Translate text between supported languages.

**Endpoint:** `POST /translation/translate-text`

### Request Body

```json
{
  "sourceLanguage": "auto",
  "targetLanguage": "de",
  "text": "Hello, World!"
}
```

Parameters:

- `sourceLanguage`: Source language code (use "auto" for automatic detection)
- `targetLanguage`: Target language code
- `text`: Text to translate (single string input)

### Response

**Success Response (200)**

```json
{
  "status": "ok",
  "timestamp": "2025-01-12T22:31:48.856Z",
  "data": {
    "text": "Hallo, Welt!"
  }
}
```

**Error Response (400)**

```json
{
  "status": "error",
  "timestamp": "2025-01-12T22:31:48.856Z",
  "error": {
    "message": "Invalid request parameters."
  }
}
```

### Example Request

```bash
curl -X POST "https://platform.algebras.ai/api/v1/translation/translate-text" \
     -H "X-Api-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
           "sourceLanguage": "auto",
           "targetLanguage": "de",
           "text": "Hello, World!"
         }'
```
