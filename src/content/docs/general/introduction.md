---
title: Algebras API Documentation
description: API reference and documentation for the Algebras API
---

Welcome to the Algebras API documentation. This API provides translation and glossary services with secure authentication.

## Authentication

All API endpoints require authentication using an API key. Include your API key in the `X-Api-Key` header with all requests.

```http
X-Api-Key: your_api_key_here
```

```bash
# Get list of supported languages
curl -X GET "https://platform.algebras.ai/api/v1/languages/" \
     -H "X-Api-Key: your_api_key_here"
```

## Available Endpoints

The API provides the following main endpoints:

1. [Language Support](/api/languages) - Get information about supported languages
2. [Translation](/api/translation) - Translate text between languages
3. [Glossary Extraction](/api/glossary) - Extract terms and definitions from text

## Error Handling

The API uses standard HTTP status codes and provides detailed error messages when validation fails. Common error responses include:

- `422 Validation Error` - Request validation failed
- Validation errors include detailed information about the location and nature of the error

For detailed information about each endpoint and feature, please refer to the specific documentation sections.
