---
title: Java
description: Sample code for using the Algebras API in Java
---

import CodeTabs from '../../components/CodeTabs.tsx';

## Get Supported Languages

<CodeTabs tabs={[
  {
    label: 'Java',
    language: 'java',
    code: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class AlgebrasAPI {
    private static final String BASE_URL = "https://platform.algebras.ai/api/v1";
    private final HttpClient client;
    private final ObjectMapper objectMapper;
    private final String apiKey;

    public AlgebrasAPI(String apiKey) {
        this.apiKey = apiKey;
        this.client = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    public static class Language {
        @JsonProperty("language")
        public String language;
        
        @JsonProperty("name")
        public String name;
    }

    public static class LanguagesResponse {
        @JsonProperty("status")
        public String status;
        
        @JsonProperty("timestamp")
        public String timestamp;
        
        @JsonProperty("data")
        public List<Language> data;
    }

    public List<Language> getLanguages() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/translation/languages"))
            .header("X-Api-Key", apiKey)
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());

        LanguagesResponse result = objectMapper.readValue(response.body(), 
            LanguagesResponse.class);
        return result.data;
    }

    public static void main(String[] args) {
        try {
            AlgebrasAPI api = new AlgebrasAPI("your_api_key_here");
            List<Language> languages = api.getLanguages();
            System.out.println("Supported languages: " + languages);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
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
    label: 'Java',
    language: 'java',
    code: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AlgebrasAPI {
    private static final String BASE_URL = "https://platform.algebras.ai/api/v1";
    private final HttpClient client;
    private final ObjectMapper objectMapper;
    private final String apiKey;

    public AlgebrasAPI(String apiKey) {
        this.apiKey = apiKey;
        this.client = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    public static class TranslationRequest {
        @JsonProperty("sourceLanguage")
        public String sourceLanguage;
        
        @JsonProperty("targetLanguage")
        public String targetLanguage;
        
        @JsonProperty("text")
        public String text;
    }

    public static class TranslationResponse {
        @JsonProperty("status")
        public String status;
        
        @JsonProperty("timestamp")
        public String timestamp;
        
        @JsonProperty("data")
        public String data;
    }

    public String translateText(String text, String targetLanguage, String sourceLanguage) 
            throws IOException, InterruptedException {
        TranslationRequest requestBody = new TranslationRequest();
        requestBody.sourceLanguage = sourceLanguage;
        requestBody.targetLanguage = targetLanguage;
        requestBody.text = text;

        String jsonBody = objectMapper.writeValueAsString(requestBody);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/translation/translate"))
            .header("X-Api-Key", apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());

        TranslationResponse result = objectMapper.readValue(response.body(), 
            TranslationResponse.class);
        return result.data;
    }

    public static void main(String[] args) {
        try {
            AlgebrasAPI api = new AlgebrasAPI("your_api_key_here");
            String translation = api.translateText("Hello, world!", "de", "auto");
            System.out.println("Translation: " + translation);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
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
    label: 'Java',
    language: 'java',
    code: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Arrays;

public class AlgebrasAPI {
    private static final String BASE_URL = "https://platform.algebras.ai/api/v1";
    private final HttpClient client;
    private final ObjectMapper objectMapper;
    private final String apiKey;

    public AlgebrasAPI(String apiKey) {
        this.apiKey = apiKey;
        this.client = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    public static class BatchTranslationRequest {
        @JsonProperty("sourceLanguage")
        public String sourceLanguage;
        
        @JsonProperty("targetLanguage")
        public String targetLanguage;
        
        @JsonProperty("texts")
        public List<String> texts;
    }

    public static class BatchTranslationItem {
        @JsonProperty("index")
        public int index;
        
        @JsonProperty("content")
        public String content;
        
        @JsonProperty("warning")
        public String warning;
        
        @JsonProperty("error")
        public String error;
    }

    public static class BatchTranslationResponse {
        @JsonProperty("status")
        public String status;
        
        @JsonProperty("timestamp")
        public String timestamp;
        
        @JsonProperty("data")
        public BatchTranslationData data;
    }

    public static class BatchTranslationData {
        @JsonProperty("translations")
        public List<BatchTranslationItem> translations;
        
        @JsonProperty("batch_summary")
        public BatchSummary batchSummary;
    }

    public static class BatchSummary {
        @JsonProperty("total")
        public int total;
        
        @JsonProperty("successful")
        public int successful;
        
        @JsonProperty("failed")
        public int failed;
    }

    public BatchTranslationResponse batchTranslate(List<String> texts, String targetLanguage, String sourceLanguage) 
            throws IOException, InterruptedException {
        BatchTranslationRequest requestBody = new BatchTranslationRequest();
        requestBody.sourceLanguage = sourceLanguage;
        requestBody.targetLanguage = targetLanguage;
        requestBody.texts = texts;

        String jsonBody = objectMapper.writeValueAsString(requestBody);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/translation/batch-translate"))
            .header("X-Api-Key", apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());

        return objectMapper.readValue(response.body(), BatchTranslationResponse.class);
    }

    public static void main(String[] args) {
        try {
            AlgebrasAPI api = new AlgebrasAPI("your_api_key_here");
            List<String> texts = Arrays.asList("Hello", "Goodbye", "Thank you");
            BatchTranslationResponse result = api.batchTranslate(texts, "es", "auto");
            
            System.out.println("Batch translation results:");
            for (BatchTranslationItem translation : result.data.translations) {
                String original = texts.get(translation.index);
                System.out.println(original + " → " + translation.content);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
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
    label: 'Java',
    language: 'java',
    code: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Arrays;

public class AlgebrasAPI {
    private static final String BASE_URL = "https://platform.algebras.ai/api/v1";
    private final HttpClient client;
    private final ObjectMapper objectMapper;
    private final String apiKey;

    public AlgebrasAPI(String apiKey) {
        if (apiKey == null || apiKey.isEmpty()) {
            apiKey = System.getenv("ALGEBRAS_API_KEY");
        }
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalArgumentException("API key is required. Set ALGEBRAS_API_KEY environment variable or pass apiKey parameter.");
        }
        
        this.apiKey = apiKey;
        this.client = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    // Language and response classes
    public static class Language {
        @JsonProperty("language")
        public String language;
        
        @JsonProperty("name")
        public String name;
    }

    public static class TranslationRequest {
        @JsonProperty("sourceLanguage")
        public String sourceLanguage;
        
        @JsonProperty("targetLanguage")
        public String targetLanguage;
        
        @JsonProperty("text")
        public String text;
    }

    public static class TranslationResponse {
        @JsonProperty("status")
        public String status;
        
        @JsonProperty("timestamp")
        public String timestamp;
        
        @JsonProperty("data")
        public String data;
    }

    public static class BatchTranslationRequest {
        @JsonProperty("sourceLanguage")
        public String sourceLanguage;
        
        @JsonProperty("targetLanguage")
        public String targetLanguage;
        
        @JsonProperty("texts")
        public List<String> texts;
    }

    public static class BatchTranslationItem {
        @JsonProperty("index")
        public int index;
        
        @JsonProperty("content")
        public String content;
    }

    public static class BatchTranslationResponse {
        @JsonProperty("status")
        public String status;
        
        @JsonProperty("timestamp")
        public String timestamp;
        
        @JsonProperty("data")
        public BatchTranslationData data;
    }

    public static class BatchTranslationData {
        @JsonProperty("translations")
        public List<BatchTranslationItem> translations;
    }

    // API methods
    public List<Language> getLanguages() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/translation/languages"))
            .header("X-Api-Key", apiKey)
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());

        var result = objectMapper.readValue(response.body(), 
            new com.fasterxml.jackson.core.type.TypeReference<com.fasterxml.jackson.databind.JsonNode>() {});
        
        return objectMapper.convertValue(result.get("data"), 
            new com.fasterxml.jackson.core.type.TypeReference<List<Language>>() {});
    }

    public String translateText(String text, String targetLanguage, String sourceLanguage) 
            throws IOException, InterruptedException {
        TranslationRequest requestBody = new TranslationRequest();
        requestBody.sourceLanguage = sourceLanguage;
        requestBody.targetLanguage = targetLanguage;
        requestBody.text = text;

        String jsonBody = objectMapper.writeValueAsString(requestBody);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/translation/translate"))
            .header("X-Api-Key", apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());

        TranslationResponse result = objectMapper.readValue(response.body(), 
            TranslationResponse.class);
        return result.data;
    }

    public BatchTranslationResponse batchTranslate(List<String> texts, String targetLanguage, String sourceLanguage) 
            throws IOException, InterruptedException {
        BatchTranslationRequest requestBody = new BatchTranslationRequest();
        requestBody.sourceLanguage = sourceLanguage;
        requestBody.targetLanguage = targetLanguage;
        requestBody.texts = texts;

        String jsonBody = objectMapper.writeValueAsString(requestBody);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/translation/batch-translate"))
            .header("X-Api-Key", apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());

        return objectMapper.readValue(response.body(), BatchTranslationResponse.class);
    }

    public static void main(String[] args) {
        try {
            AlgebrasAPI api = new AlgebrasAPI("");
            
            // Get supported languages
            List<Language> languages = api.getLanguages();
            System.out.println("Supported languages:");
            for (int i = 0; i < Math.min(5, languages.size()); i++) {
                Language lang = languages.get(i);
                System.out.println("  " + lang.language + ": " + lang.name);
            }
            
            // Translate single text
            System.out.println("\\nSingle translation:");
            String translation = api.translateText("Hello, world!", "es", "auto");
            System.out.println("English: Hello, world!");
            System.out.println("Spanish: " + translation);
            
            // Batch translation
            System.out.println("\\nBatch translation:");
            List<String> texts = Arrays.asList("Good morning", "How are you?", "See you later");
            BatchTranslationResponse result = api.batchTranslate(texts, "fr", "auto");
            
            for (BatchTranslationItem translationItem : result.data.translations) {
                String original = texts.get(translationItem.index);
                System.out.println("  " + original + " → " + translationItem.content);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`
  }
]} />
