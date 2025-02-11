---
title: Go
description: Sample code for using the Algebras API in Go
---

```go
package algebrasapi

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type Client struct {
    BaseURL    string
    APIKey     string
    HTTPClient *http.Client
}

type TranslationRequest struct {
    SourceLanguage string `json:"sourceLanguage"`
    TargetLanguage string `json:"targetLanguage"`
    Text          string `json:"text"`
}

type TranslationResponse struct {
    Status    string `json:"status"`
    Timestamp string `json:"timestamp"`
    Data      struct {
        Text string `json:"text"`
    } `json:"data"`
}

type Language struct {
    Language string `json:"language"`
    Name     string `json:"name"`
}

func NewClient(apiKey string) *Client {
    return &Client{
        BaseURL:    "https://platform.algebras.ai/api/v1",
        APIKey:     apiKey,
        HTTPClient: &http.Client{},
    }
}

func (c *Client) GetLanguages() ([]Language, error) {
    req, err := http.NewRequest("GET", fmt.Sprintf("%s/translation/languages", c.BaseURL), nil)
    if err != nil {
        return nil, err
    }
    req.Header.Set("X-Api-Key", c.APIKey)

    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var result struct {
        Status    string     `json:"status"`
        Timestamp string     `json:"timestamp"`
        Data      []Language `json:"data"`
    }
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, err
    }
    return result.Data, nil
}

func (c *Client) TranslateText(text, targetLanguage, sourceLanguage string) (*TranslationResponse, error) {
    reqBody := TranslationRequest{
        SourceLanguage: sourceLanguage,
        TargetLanguage: targetLanguage,
        Text:          text,
    }

    bodyBytes, err := json.Marshal(reqBody)
    if err != nil {
        return nil, err
    }

    req, err := http.NewRequest("POST", fmt.Sprintf("%s/translation/translate-text", c.BaseURL), bytes.NewBuffer(bodyBytes))
    if err != nil {
        return nil, err
    }
    req.Header.Set("X-Api-Key", c.APIKey)
    req.Header.Set("Content-Type", "application/json")

    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var translationResp TranslationResponse
    if err := json.NewDecoder(resp.Body).Decode(&translationResp); err != nil {
        return nil, err
    }

    return &translationResp, nil
}

// Example usage
func main() {
    client := NewClient("your_api_key_here")

    // Get languages
    languages, err := client.GetLanguages()
    if err != nil {
        panic(err)
    }
    fmt.Printf("Supported languages: %+v\n", languages)

    // Translate text
    translation, err := client.TranslateText("Hello, world!", "de", "auto")
    if err != nil {
        panic(err)
    }
    fmt.Printf("Translation: %+v\n", translation)
}
```
