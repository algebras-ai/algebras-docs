---
title: Languages
description: API endpoints for retrieving supported languages
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

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

<Tabs>
<TabItem label="bash">
```bash
curl -X GET "https://platform.algebras.ai/api/v1/translation/languages" \
     -H "X-Api-Key: your_api_key_here"
```
</TabItem>
<TabItem label="python">
```python
import requests

url = "https://platform.algebras.ai/api/v1/translation/languages"
headers = {
    "X-Api-Key": "your_api_key_here"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    result = response.json()
    languages = result["data"]
    for lang in languages:
        print(f"{lang['language']}: {lang['name']}")
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```
</TabItem>
<TabItem label="nodejs">
```javascript
const url = "https://platform.algebras.ai/api/v1/translation/languages";

const response = await fetch(url, {
  method: "GET",
  headers: {
    "X-Api-Key": "your_api_key_here",
  },
});

if (response.ok) {
  const result = await response.json();
  result.data.forEach((lang) => {
    console.log(`${lang.language}: ${lang.name}`);
  });
} else {
  const error = await response.json();
  console.error("Error:", response.status, error);
}
```
</TabItem>
<TabItem label="go">
```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "https://platform.algebras.ai/api/v1/translation/languages"
    
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Set("X-Api-Key", "your_api_key_here")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    
    if resp.StatusCode == 200 {
        var result map[string]interface{}
        json.Unmarshal(body, &result)
        languages := result["data"].([]interface{})
        for _, lang := range languages {
            l := lang.(map[string]interface{})
            fmt.Printf("%v: %v\n", l["language"], l["name"])
        }
    } else {
        fmt.Printf("Error: %d\n", resp.StatusCode)
        fmt.Println(string(body))
    }
}
```
</TabItem>
</Tabs>

## Detect Language

Detect the language of the provided text.

**Endpoint:** `POST /translation/languages/detect`

### Request Body

```json
{
  "text": "Hello, World! How are you today?"
}
```

Parameters:

- `text`: Text to detect language from

### Response

**Success Response (200)**

```json
{
  "status": "ok",
  "timestamp": "2025-01-12T22:31:48.856Z",
  "data": {
    "language": "en",
    "confidence": 0.98
  }
}
```

### Example Request

<Tabs>
<TabItem label="bash">
```bash
curl -X POST "https://platform.algebras.ai/api/v1/translation/languages/detect" \
     -H "X-Api-Key: your_api_key_here" \
     -H "Content-Type: application/json" \
     -d '{
           "text": "Hello, World! How are you today?"
         }'
```
</TabItem>
<TabItem label="python">
```python
import requests

url = "https://platform.algebras.ai/api/v1/translation/languages/detect"
headers = {
    "X-Api-Key": "your_api_key_here",
    "Content-Type": "application/json"
}
data = {
    "text": "Hello, World! How are you today?"
}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 200:
    result = response.json()
    detected = result["data"]
    print(f"Detected language: {detected['language']}")
    print(f"Confidence: {detected['confidence']}")
else:
    print(f"Error: {response.status_code}")
    print(response.json())
```
</TabItem>
<TabItem label="nodejs">
```javascript
const url = "https://platform.algebras.ai/api/v1/translation/languages/detect";

const response = await fetch(url, {
  method: "POST",
  headers: {
    "X-Api-Key": "your_api_key_here",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text: "Hello, World! How are you today?",
  }),
});

if (response.ok) {
  const result = await response.json();
  console.log("Detected language:", result.data.language);
  console.log("Confidence:", result.data.confidence);
} else {
  const error = await response.json();
  console.error("Error:", response.status, error);
}
```
</TabItem>
<TabItem label="go">
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "https://platform.algebras.ai/api/v1/translation/languages/detect"
    
    payload := map[string]string{
        "text": "Hello, World! How are you today?",
    }
    
    jsonData, _ := json.Marshal(payload)
    
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("X-Api-Key", "your_api_key_here")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    
    if resp.StatusCode == 200 {
        var result map[string]interface{}
        json.Unmarshal(body, &result)
        data := result["data"].(map[string]interface{})
        fmt.Printf("Detected language: %v\n", data["language"])
        fmt.Printf("Confidence: %v\n", data["confidence"])
    } else {
        fmt.Printf("Error: %d\n", resp.StatusCode)
        fmt.Println(string(body))
    }
}
```
</TabItem>
</Tabs>
