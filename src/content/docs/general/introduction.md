---
title: Algebras API Documentation
description: API reference and documentation for the Algebras API
---

Welcome to the Algebras API documentation. This API provides translation services with secure authentication.

## Authentication

All API endpoints require authentication using an API key. Include your API key in the `X-Api-Key` header with all requests.

```http
X-Api-Key: your_api_key_here
```

```bash
# Get API health status
curl -X GET "https://platform.algebras.ai/api/v1/health" \
     -H "X-Api-Key: your_api_key_here"
```

## Available Endpoints

### Health Check

**Endpoint:** `GET /health`

Checks the API's health status.

**Response Example:**

```json
{
  "status": "ok",
  "timestamp": "2025-01-12T22:31:48.856Z",
  "data": {
    "health": "up",
    "version": "1.0.0"
  }
}
```

### Language Support

**Endpoint:** `GET /translation/languages`

Retrieves the list of supported languages.

**Response Example:**

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

```bash
# Get list of supported languages
curl -X GET "https://platform.algebras.ai/api/v1/translation/languages" \
     -H "X-Api-Key: your_api_key_here"
```

### Translation

**Endpoint:** `POST /translation/translate-text`

Translates the given text to the target language.

**Request Body:**

```json
{
  "sourceLanguage": "auto",
  "targetLanguage": "de",
  "text": "Hello, World!"
}
```

**Response Example:**

```json
{
  "status": "ok",
  "timestamp": "2025-01-12T22:31:48.856Z",
  "data": {
    "text": "Hallo, Welt!"
  }
}
```

```bash
# Translate text from English to German
curl -X POST "https://platform.algebras.ai/api/v1/translation/translate-text" \
     -H "X-Api-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
       "sourceLanguage": "auto",
       "targetLanguage": "de",
       "text": "Hello, World!"
     }'
```

## Error Handling

The API uses standard HTTP status codes and provides detailed error messages when validation fails.

### Common Errors

- **400 Bad Request**: Invalid input parameters.
- **401 Unauthorized**: Missing or invalid API key.
- **422 Validation Error**: Request validation failed.

**Example 400 Error Response:**

```json
{
  "status": "error",
  "timestamp": "2025-01-12T22:31:48.856Z",
  "error": {
    "message": "Invalid source language code."
  }
}
```

For detailed information about each endpoint and feature, please refer to the specific documentation sections.
