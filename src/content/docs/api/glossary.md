---
title: Glossary Extraction
description: API endpoints for extracting glossary terms from text
---

## Extract Terms and Definitions

Extract glossary terms and their definitions from provided text.

**Endpoint:** `POST /v1/glossaries/extract`

### Request Body

```json
{
  "text": "string"
}
```

Parameters:
- `text`: Input text to extract glossary terms from (max 10000 characters)

Example:
```json
{
  "text": "Algorithm is a systematic set of steps or rules designed to accomplish a specific task or solve a particular problem."
}
```

### Response

**Success Response (200)**

```json
{
  "glossary": [
    {
      "term": "string",
      "definition": "string"
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
curl -X POST "https://api.example.com/v1/glossaries/extract" \
     -H "X-Api-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
           "text": "Algorithm is a systematic set of steps or rules designed to accomplish a specific task or solve a particular problem."
         }'
```