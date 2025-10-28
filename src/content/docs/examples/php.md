---
title: PHP
description: Sample code for using the Algebras API in PHP
---

import CodeTabs from '../../components/CodeTabs.tsx';

## Get Supported Languages

<CodeTabs tabs={[
  {
    label: 'PHP',
    language: 'php',
    code: `<?php

class AlgebrasAPI {
    private $baseUrl = 'https://platform.algebras.ai/api/v1';
    private $apiKey;
    
    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }
    
    public function getLanguages() {
        $url = $this->baseUrl . '/translation/languages';
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'X-Api-Key: ' . $this->apiKey
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("HTTP Error: " . $httpCode);
        }
        
        $data = json_decode($response, true);
        return $data['data'];
    }
}

// Usage example
try {
    $api = new AlgebrasAPI('your_api_key_here');
    $languages = $api->getLanguages();
    echo "Supported languages: " . json_encode($languages) . "\\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`
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
    label: 'PHP',
    language: 'php',
    code: `<?php

class AlgebrasAPI {
    private $baseUrl = 'https://platform.algebras.ai/api/v1';
    private $apiKey;
    
    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }
    
    public function translateText($text, $targetLanguage, $sourceLanguage = 'auto') {
        $url = $this->baseUrl . '/translation/translate';
        
        $data = [
            'sourceLanguage' => $sourceLanguage,
            'targetLanguage' => $targetLanguage,
            'text' => $text
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'X-Api-Key: ' . $this->apiKey,
            'Content-Type: application/json'
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("HTTP Error: " . $httpCode);
        }
        
        $result = json_decode($response, true);
        return $result['data'];
    }
}

// Usage example
try {
    $api = new AlgebrasAPI('your_api_key_here');
    $translation = $api->translateText('Hello, world!', 'de');
    echo "Translation: " . $translation . "\\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`
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
    label: 'PHP',
    language: 'php',
    code: `<?php

class AlgebrasAPI {
    private $baseUrl = 'https://platform.algebras.ai/api/v1';
    private $apiKey;
    
    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }
    
    public function batchTranslate($texts, $targetLanguage, $sourceLanguage = 'auto') {
        $url = $this->baseUrl . '/translation/batch-translate';
        
        $data = [
            'sourceLanguage' => $sourceLanguage,
            'targetLanguage' => $targetLanguage,
            'texts' => $texts
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'X-Api-Key: ' . $this->apiKey,
            'Content-Type: application/json'
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("HTTP Error: " . $httpCode);
        }
        
        $result = json_decode($response, true);
        return $result['data'];
    }
}

// Usage example
try {
    $api = new AlgebrasAPI('your_api_key_here');
    $texts = ['Hello', 'Goodbye', 'Thank you'];
    $result = $api->batchTranslate($texts, 'es');
    
    echo "Batch translation results:\\n";
    foreach ($result['translations'] as $translation) {
        $original = $texts[$translation['index']];
        echo $original . " → " . $translation['content'] . "\\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`
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
    label: 'PHP',
    language: 'php',
    code: `<?php

class AlgebrasAPI {
    private $baseUrl = 'https://platform.algebras.ai/api/v1';
    private $apiKey;
    
    public function __construct($apiKey = null) {
        if ($apiKey === null) {
            $apiKey = getenv('ALGEBRAS_API_KEY');
        }
        
        if (empty($apiKey)) {
            throw new InvalidArgumentException('API key is required. Set ALGEBRAS_API_KEY environment variable or pass apiKey parameter.');
        }
        
        $this->apiKey = $apiKey;
    }
    
    public function getLanguages() {
        $url = $this->baseUrl . '/translation/languages';
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'X-Api-Key: ' . $this->apiKey
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("HTTP Error: " . $httpCode);
        }
        
        $data = json_decode($response, true);
        return $data['data'];
    }
    
    public function translateText($text, $targetLanguage, $sourceLanguage = 'auto') {
        $url = $this->baseUrl . '/translation/translate';
        
        $data = [
            'sourceLanguage' => $sourceLanguage,
            'targetLanguage' => $targetLanguage,
            'text' => $text
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'X-Api-Key: ' . $this->apiKey,
            'Content-Type: application/json'
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("HTTP Error: " . $httpCode);
        }
        
        $result = json_decode($response, true);
        return $result['data'];
    }
    
    public function batchTranslate($texts, $targetLanguage, $sourceLanguage = 'auto') {
        $url = $this->baseUrl . '/translation/batch-translate';
        
        $data = [
            'sourceLanguage' => $sourceLanguage,
            'targetLanguage' => $targetLanguage,
            'texts' => $texts
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'X-Api-Key: ' . $this->apiKey,
            'Content-Type: application/json'
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("HTTP Error: " . $httpCode);
        }
        
        $result = json_decode($response, true);
        return $result['data'];
    }
}

// Usage example
try {
    $api = new AlgebrasAPI();
    
    // Get supported languages
    $languages = $api->getLanguages();
    echo "Supported languages:\\n";
    for ($i = 0; $i < min(5, count($languages)); $i++) {
        $lang = $languages[$i];
        echo "  " . $lang['language'] . ": " . $lang['name'] . "\\n";
    }
    
    // Translate single text
    echo "\\nSingle translation:\\n";
    $translation = $api->translateText('Hello, world!', 'es');
    echo "English: Hello, world!\\n";
    echo "Spanish: " . $translation . "\\n";
    
    // Batch translation
    echo "\\nBatch translation:\\n";
    $texts = ['Good morning', 'How are you?', 'See you later'];
    $result = $api->batchTranslate($texts, 'fr');
    
    foreach ($result['translations'] as $translation) {
        $original = $texts[$translation['index']];
        echo "  " . $original . " → " . $translation['content'] . "\\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`
  }
]} />
