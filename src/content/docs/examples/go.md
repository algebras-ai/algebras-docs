---
title: Go
description: Sample code for using the Algebras API in Go
---

import CodeTabs from '../../components/CodeTabs.tsx';

## Get Supported Languages

<CodeTabs tabs={[
  {
    label: 'Go',
    language: 'go',
    code: `package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type Language struct {
    Language string \`json:"language"\`
    Name     string \`json:"name"\`
}

type LanguagesResponse struct {
    Status    string     \`json:"status"\`
    Timestamp string     \`json:"timestamp"\`
    Data      []Language \`json:"data"\`
}

func getLanguages(apiKey string) ([]Language, error) {
    client := &http.Client{}
    req, err := http.NewRequest("GET", "https://platform.algebras.ai/api/v1/translation/languages", nil)
    if err != nil {
        return nil, err
    }
    req.Header.Set("X-Api-Key", apiKey)

    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }

    var result LanguagesResponse
    if err := json.Unmarshal(body, &result); err != nil {
        return nil, err
    }

    return result.Data, nil
}

func main() {
    languages, err := getLanguages("your_api_key_here")
    if err != nil {
        panic(err)
    }
    fmt.Printf("Supported languages: %+v\\n", languages)
}`
  },
  {
    label: 'cURL',
    language: 'bash',
    code: `curl -X GET "https://platform.algebras.ai/api/v1/translation/languages" \\
     -H "X-Api-Key: your_api_key_here"`
  }
]} />

## Translate Single Text

<CodeTabs tabs={[
  {
    label: 'Go',
    language: 'go',
    code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type TranslationRequest struct {
    SourceLanguage string \`json:"sourceLanguage"\`
    TargetLanguage string \`json:"targetLanguage"\`
    Text          string \`json:"text"\`
}

type TranslationResponse struct {
    Status    string \`json:"status"\`
    Timestamp string \`json:"timestamp"\`
    Data      string \`json:"data"\`
}

func translateText(apiKey, text, targetLanguage, sourceLanguage string) (string, error) {
    client := &http.Client{}
    
    reqBody := TranslationRequest{
        SourceLanguage: sourceLanguage,
        TargetLanguage: targetLanguage,
        Text:          text,
    }

    bodyBytes, err := json.Marshal(reqBody)
    if err != nil {
        return "", err
    }

    req, err := http.NewRequest("POST", "https://platform.algebras.ai/api/v1/translation/translate", bytes.NewBuffer(bodyBytes))
    if err != nil {
        return "", err
    }
    req.Header.Set("X-Api-Key", apiKey)
    req.Header.Set("Content-Type", "application/json")

    resp, err := client.Do(req)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return "", err
    }

    var translationResp TranslationResponse
    if err := json.Unmarshal(body, &translationResp); err != nil {
        return "", err
    }

    return translationResp.Data, nil
}

func main() {
    translation, err := translateText("your_api_key_here", "Hello, world!", "de", "auto")
    if err != nil {
        panic(err)
    }
    fmt.Printf("Translation: %s\\n", translation)
}`
  },
  {
    label: 'cURL',
    language: 'bash',
    code: `curl -X POST "https://platform.algebras.ai/api/v1/translation/translate" \\
     -H "X-Api-Key: your_api_key_here" \\
     -H "Content-Type: application/json" \\
     -d '{
       "sourceLanguage": "auto",
       "targetLanguage": "de",
       "text": "Hello, World!"
     }'`
  }
]} />

## Batch Translation

<CodeTabs tabs={[
  {
    label: 'Go',
    language: 'go',
    code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type BatchTranslationRequest struct {
    SourceLanguage string   \`json:"sourceLanguage"\`
    TargetLanguage string   \`json:"targetLanguage"\`
    Texts          []string \`json:"texts"\`
}

type BatchTranslationItem struct {
    Index   int    \`json:"index"\`
    Content string \`json:"content"\`
    Warning string \`json:"warning,omitempty"\`
    Error   string \`json:"error,omitempty"\`
}

type BatchTranslationResponse struct {
    Status    string \`json:"status"\`
    Timestamp string \`json:"timestamp"\`
    Data      struct {
        Translations []BatchTranslationItem \`json:"translations"\`
        BatchSummary struct {
            Total      int \`json:"total"\`
            Successful int \`json:"successful"\`
            Failed     int \`json:"failed"\`
        } \`json:"batch_summary"\`
    } \`json:"data"\`
}

func batchTranslate(apiKey string, texts []string, targetLanguage, sourceLanguage string) (*BatchTranslationResponse, error) {
    client := &http.Client{}
    
    reqBody := BatchTranslationRequest{
        SourceLanguage: sourceLanguage,
        TargetLanguage: targetLanguage,
        Texts:          texts,
    }

    bodyBytes, err := json.Marshal(reqBody)
    if err != nil {
        return nil, err
    }

    req, err := http.NewRequest("POST", "https://platform.algebras.ai/api/v1/translation/batch-translate", bytes.NewBuffer(bodyBytes))
    if err != nil {
        return nil, err
    }
    req.Header.Set("X-Api-Key", apiKey)
    req.Header.Set("Content-Type", "application/json")

    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }

    var batchResp BatchTranslationResponse
    if err := json.Unmarshal(body, &batchResp); err != nil {
        return nil, err
    }

    return &batchResp, nil
}

func main() {
    texts := []string{"Hello", "Goodbye", "Thank you"}
    result, err := batchTranslate("your_api_key_here", texts, "es", "auto")
    if err != nil {
        panic(err)
    }

    fmt.Println("Batch translation results:")
    for _, translation := range result.Data.Translations {
        original := texts[translation.Index]
        fmt.Printf("%s → %s\\n", original, translation.Content)
    }
}`
  },
  {
    label: 'cURL',
    language: 'bash',
    code: `curl -X POST "https://platform.algebras.ai/api/v1/translation/batch-translate" \\
     -H "X-Api-Key: your_api_key_here" \\
     -H "Content-Type: application/json" \\
     -d '{
       "sourceLanguage": "auto",
       "targetLanguage": "es",
       "texts": ["Hello", "Goodbye", "Thank you"]
     }'`
  }
]} />

## Complete Example

<CodeTabs tabs={[
  {
    label: 'Go',
    language: 'go',
    code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "os"
)

type Language struct {
    Language string \`json:"language"\`
    Name     string \`json:"name"\`
}

type TranslationRequest struct {
    SourceLanguage string \`json:"sourceLanguage"\`
    TargetLanguage string \`json:"targetLanguage"\`
    Text          string \`json:"text"\`
}

type TranslationResponse struct {
    Status    string \`json:"status"\`
    Timestamp string \`json:"timestamp"\`
    Data      string \`json:"data"\`
}

type BatchTranslationRequest struct {
    SourceLanguage string   \`json:"sourceLanguage"\`
    TargetLanguage string   \`json:"targetLanguage"\`
    Texts          []string \`json:"texts"\`
}

type BatchTranslationItem struct {
    Index   int    \`json:"index"\`
    Content string \`json:"content"\`
}

type BatchTranslationResponse struct {
    Status    string \`json:"status"\`
    Timestamp string \`json:"timestamp"\`
    Data      struct {
        Translations []BatchTranslationItem \`json:"translations"\`
    } \`json:"data"\`
}

type AlgebrasAPI struct {
    BaseURL string
    APIKey  string
    Client  *http.Client
}

func NewAlgebrasAPI(apiKey string) *AlgebrasAPI {
    if apiKey == "" {
        apiKey = os.Getenv("ALGEBRAS_API_KEY")
    }
    if apiKey == "" {
        panic("API key is required. Set ALGEBRAS_API_KEY environment variable or pass apiKey parameter.")
    }

    return &AlgebrasAPI{
        BaseURL: "https://platform.algebras.ai/api/v1",
        APIKey:  apiKey,
        Client:  &http.Client{},
    }
}

func (api *AlgebrasAPI) GetLanguages() ([]Language, error) {
    req, err := http.NewRequest("GET", fmt.Sprintf("%s/translation/languages", api.BaseURL), nil)
    if err != nil {
        return nil, err
    }
    req.Header.Set("X-Api-Key", api.APIKey)

    resp, err := api.Client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }

    var result struct {
        Status    string     \`json:"status"\`
        Timestamp string     \`json:"timestamp"\`
        Data      []Language \`json:"data"\`
    }
    if err := json.Unmarshal(body, &result); err != nil {
        return nil, err
    }

    return result.Data, nil
}

func (api *AlgebrasAPI) TranslateText(text, targetLanguage, sourceLanguage string) (string, error) {
    reqBody := TranslationRequest{
        SourceLanguage: sourceLanguage,
        TargetLanguage: targetLanguage,
        Text:          text,
    }

    bodyBytes, err := json.Marshal(reqBody)
    if err != nil {
        return "", err
    }

    req, err := http.NewRequest("POST", fmt.Sprintf("%s/translation/translate", api.BaseURL), bytes.NewBuffer(bodyBytes))
    if err != nil {
        return "", err
    }
    req.Header.Set("X-Api-Key", api.APIKey)
    req.Header.Set("Content-Type", "application/json")

    resp, err := api.Client.Do(req)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return "", err
    }

    var translationResp TranslationResponse
    if err := json.Unmarshal(body, &translationResp); err != nil {
        return "", err
    }

    return translationResp.Data, nil
}

func (api *AlgebrasAPI) BatchTranslate(texts []string, targetLanguage, sourceLanguage string) (*BatchTranslationResponse, error) {
    reqBody := BatchTranslationRequest{
        SourceLanguage: sourceLanguage,
        TargetLanguage: targetLanguage,
        Texts:          texts,
    }

    bodyBytes, err := json.Marshal(reqBody)
    if err != nil {
        return nil, err
    }

    req, err := http.NewRequest("POST", fmt.Sprintf("%s/translation/batch-translate", api.BaseURL), bytes.NewBuffer(bodyBytes))
    if err != nil {
        return nil, err
    }
    req.Header.Set("X-Api-Key", api.APIKey)
    req.Header.Set("Content-Type", "application/json")

    resp, err := api.Client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }

    var batchResp BatchTranslationResponse
    if err := json.Unmarshal(body, &batchResp); err != nil {
        return nil, err
    }

    return &batchResp, nil
}

func main() {
    api := NewAlgebrasAPI("")

    // Get supported languages
    languages, err := api.GetLanguages()
    if err != nil {
        panic(err)
    }
    fmt.Println("Supported languages:")
    for i, lang := range languages {
        if i >= 5 {
            break
        }
        fmt.Printf("  %s: %s\\n", lang.Language, lang.Name)
    }

    // Translate single text
    fmt.Println("\\nSingle translation:")
    translation, err := api.TranslateText("Hello, world!", "es", "auto")
    if err != nil {
        panic(err)
    }
    fmt.Println("English: Hello, world!")
    fmt.Printf("Spanish: %s\\n", translation)

    // Batch translation
    fmt.Println("\\nBatch translation:")
    texts := []string{"Good morning", "How are you?", "See you later"}
    result, err := api.BatchTranslate(texts, "fr", "auto")
    if err != nil {
        panic(err)
    }

    for _, translation := range result.Data.Translations {
        original := texts[translation.Index]
        fmt.Printf("  %s → %s\\n", original, translation.Content)
    }
}`
  }
]} />
