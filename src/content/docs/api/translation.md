---
title: Translation
description: API endpoints for text translation
---
## Translate Text

Translate text between supported languages.

**Endpoint:** `POST /v1/translate/`

### Request Body

```json
{
  "source_lang": "auto",
  "target_lang": "de",
  "text": ["Hello, World!"]
}
```

Parameters:
- `source_lang`: Source language code (use "auto" for automatic detection)
- `target_lang`: Target language code
- `text`: Array of strings to translate (max 1000 items)

### Response

**Success Response (200)**

```json
{
  "translations": [
    {
      "text": "string"
    }
  ]
}
```

**Error Response (422)**

```json
{
  "detail": [
    {
      "loc": ["string"],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Example Request

```bash
curl -X POST "https://api.example.com/v1/translate/" \
     -H "X-Api-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
           "source_lang": "auto",
           "target_lang": "de",
           "text": ["Hello, World!"]
         }'
```
