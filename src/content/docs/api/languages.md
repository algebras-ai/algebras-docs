---
title: Supported Languages
description: API endpoints for retrieving supported languages
---

## Get Supported Languages

Retrieve a list of all supported languages for translation.

**Endpoint:** `GET /v1/languages/`

### Response

**Success Response (200)**

Returns an array of language information objects:

```json
[
  {
    "language": "string",
    "name": "string"
  }
]
```

Each language object contains:
- `language`: Language code
- `name`: Human-readable language name

**Error Response (422)**

Validation error response structure:
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
curl -X GET "https://api.example.com/v1/languages/" \
     -H "X-Api-Key: your_api_key_here"
```
