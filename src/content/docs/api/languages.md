---
title: Languages
description: API endpoints for retrieving supported languages
---

## Get Supported Languages

Retrieve a list of all supported languages for translation.

**Endpoint:** `GET /translation/languages`

### Response

**Success Response (200)**

Returns an object containing the list of supported languages:

```json
{
  "status": "ok",
  "timestamp": "2025-01-12T22:31:48.856Z",
  "data": [
    {
      "language": "en",
      "name": "English"
    },
    {
      "language": "de",
      "name": "German"
    }
  ]
}
```

Each language object contains:

- `language`: Language code
- `name`: Human-readable language name

**Error Response (400)**

Invalid request error structure:

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
curl -X GET "https://platform.algebras.ai/api/v1/translation/languages" \
     -H "X-Api-Key: your_api_key_here"
```
