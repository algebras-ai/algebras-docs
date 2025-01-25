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
    SourceLang string   `json:"source_lang"`
    TargetLang string   `json:"target_lang"`
    Text       []string `json:"text"`
}

type TranslationResponse struct {
    Translations []struct {
        Text string `json:"text"`
    } `json:"translations"`
}

type GlossaryRequest struct {
    Text string `json:"text"`
}

type GlossaryResponse struct {
    Glossary []struct {
        Term       string `json:"term"`
        Definition string `json:"definition"`
    } `json:"glossary"`
}

func NewClient(apiKey string) *Client {
    return &Client{
        BaseURL:    "https://platform.algebras.ai/api",
        APIKey:     apiKey,
        HTTPClient: &http.Client{},
    }
}

func (c *Client) GetLanguages() ([]map[string]string, error) {
    req, err := http.NewRequest("GET", fmt.Sprintf("%s/v1/languages/", c.BaseURL), nil)
    if err != nil {
        return nil, err
    }

    req.Header.Set("X-Api-Key", c.APIKey)

    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var languages []map[string]string
    if err := json.NewDecoder(resp.Body).Decode(&languages); err != nil {
        return nil, err
    }

    return languages, nil
}

func (c *Client) TranslateText(text []string, targetLang string, sourceLang string) (*TranslationResponse, error) {
    reqBody := TranslationRequest{
        SourceLang: sourceLang,
        TargetLang: targetLang,
        Text:       text,
    }

    bodyBytes, err := json.Marshal(reqBody)
    if err != nil {
        return nil, err
    }

    req, err := http.NewRequest("POST", fmt.Sprintf("%s/v1/translate/", c.BaseURL), bytes.NewBuffer(bodyBytes))
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

func (c *Client) ExtractGlossary(text string) (*GlossaryResponse, error) {
    reqBody := GlossaryRequest{
        Text: text,
    }

    bodyBytes, err := json.Marshal(reqBody)
    if err != nil {
        return nil, err
    }

    req, err := http.NewRequest("POST", fmt.Sprintf("%s/v1/glossaries/extract", c.BaseURL), bytes.NewBuffer(bodyBytes))
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

    var glossaryResp GlossaryResponse
    if err := json.NewDecoder(resp.Body).Decode(&glossaryResp); err != nil {
        return nil, err
    }

    return &glossaryResp, nil
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
    translation, err := client.TranslateText([]string{"Hello, world!"}, "de", "auto")
    if err != nil {
        panic(err)
    }
    fmt.Printf("Translation: %+v\n", translation)

    // Extract glossary
    glossary, err := client.ExtractGlossary("API is an Application Programming Interface")
    if err != nil {
        panic(err)
    }
    fmt.Printf("Glossary: %+v\n", glossary)
}
```
