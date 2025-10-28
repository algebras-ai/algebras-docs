---
title: Ruby
description: Sample code for using the Algebras API in Ruby
---

import CodeTabs from '../../components/CodeTabs.tsx';

## Get Supported Languages

<CodeTabs tabs={[
  {
    label: 'Ruby',
    language: 'ruby',
    code: `require 'net/http'
require 'json'
require 'uri'

class AlgebrasAPI
  BASE_URL = 'https://platform.algebras.ai/api/v1'
  
  def initialize(api_key)
    @api_key = api_key
  end
  
  def get_languages
    uri = URI("#{BASE_URL}/translation/languages")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Get.new(uri)
    request['X-Api-Key'] = @api_key
    
    response = http.request(request)
    
    if response.code != '200'
      raise "HTTP Error: #{response.code}"
    end
    
    data = JSON.parse(response.body)
    data['data']
  end
end

# Usage example
begin
  api = AlgebrasAPI.new('your_api_key_here')
  languages = api.get_languages
  puts "Supported languages: #{languages}"
rescue => e
  puts "Error: #{e.message}"
end`
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
    label: 'Ruby',
    language: 'ruby',
    code: `require 'net/http'
require 'json'
require 'uri'

class AlgebrasAPI
  BASE_URL = 'https://platform.algebras.ai/api/v1'
  
  def initialize(api_key)
    @api_key = api_key
  end
  
  def translate_text(text, target_language, source_language = 'auto')
    uri = URI("#{BASE_URL}/translation/translate")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Post.new(uri)
    request['X-Api-Key'] = @api_key
    request['Content-Type'] = 'application/json'
    
    data = {
      sourceLanguage: source_language,
      targetLanguage: target_language,
      text: text
    }
    
    request.body = data.to_json
    
    response = http.request(request)
    
    if response.code != '200'
      raise "HTTP Error: #{response.code}"
    end
    
    result = JSON.parse(response.body)
    result['data']
  end
end

# Usage example
begin
  api = AlgebrasAPI.new('your_api_key_here')
  translation = api.translate_text('Hello, world!', 'de')
  puts "Translation: #{translation}"
rescue => e
  puts "Error: #{e.message}"
end`
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
    label: 'Ruby',
    language: 'ruby',
    code: `require 'net/http'
require 'json'
require 'uri'

class AlgebrasAPI
  BASE_URL = 'https://platform.algebras.ai/api/v1'
  
  def initialize(api_key)
    @api_key = api_key
  end
  
  def batch_translate(texts, target_language, source_language = 'auto')
    uri = URI("#{BASE_URL}/translation/batch-translate")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Post.new(uri)
    request['X-Api-Key'] = @api_key
    request['Content-Type'] = 'application/json'
    
    data = {
      sourceLanguage: source_language,
      targetLanguage: target_language,
      texts: texts
    }
    
    request.body = data.to_json
    
    response = http.request(request)
    
    if response.code != '200'
      raise "HTTP Error: #{response.code}"
    end
    
    result = JSON.parse(response.body)
    result['data']
  end
end

# Usage example
begin
  api = AlgebrasAPI.new('your_api_key_here')
  texts = ['Hello', 'Goodbye', 'Thank you']
  result = api.batch_translate(texts, 'es')
  
  puts "Batch translation results:"
  result['translations'].each do |translation|
    original = texts[translation['index']]
    puts "#{original} → #{translation['content']}"
  end
rescue => e
  puts "Error: #{e.message}"
end`
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
    label: 'Ruby',
    language: 'ruby',
    code: `require 'net/http'
require 'json'
require 'uri'

class AlgebrasAPI
  BASE_URL = 'https://platform.algebras.ai/api/v1'
  
  def initialize(api_key = nil)
    @api_key = api_key || ENV['ALGEBRAS_API_KEY']
    
    if @api_key.nil? || @api_key.empty?
      raise ArgumentError, 'API key is required. Set ALGEBRAS_API_KEY environment variable or pass api_key parameter.'
    end
  end
  
  def get_languages
    uri = URI("#{BASE_URL}/translation/languages")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Get.new(uri)
    request['X-Api-Key'] = @api_key
    
    response = http.request(request)
    
    if response.code != '200'
      raise "HTTP Error: #{response.code}"
    end
    
    data = JSON.parse(response.body)
    data['data']
  end
  
  def translate_text(text, target_language, source_language = 'auto')
    uri = URI("#{BASE_URL}/translation/translate")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Post.new(uri)
    request['X-Api-Key'] = @api_key
    request['Content-Type'] = 'application/json'
    
    data = {
      sourceLanguage: source_language,
      targetLanguage: target_language,
      text: text
    }
    
    request.body = data.to_json
    
    response = http.request(request)
    
    if response.code != '200'
      raise "HTTP Error: #{response.code}"
    end
    
    result = JSON.parse(response.body)
    result['data']
  end
  
  def batch_translate(texts, target_language, source_language = 'auto')
    uri = URI("#{BASE_URL}/translation/batch-translate")
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = Net::HTTP::Post.new(uri)
    request['X-Api-Key'] = @api_key
    request['Content-Type'] = 'application/json'
    
    data = {
      sourceLanguage: source_language,
      targetLanguage: target_language,
      texts: texts
    }
    
    request.body = data.to_json
    
    response = http.request(request)
    
    if response.code != '200'
      raise "HTTP Error: #{response.code}"
    end
    
    result = JSON.parse(response.body)
    result['data']
  end
end

# Usage example
begin
  api = AlgebrasAPI.new
  
  # Get supported languages
  languages = api.get_languages
  puts "Supported languages:"
  languages.first(5).each do |lang|
    puts "  #{lang['language']}: #{lang['name']}"
  end
  
  # Translate single text
  puts "\\nSingle translation:"
  translation = api.translate_text('Hello, world!', 'es')
  puts "English: Hello, world!"
  puts "Spanish: #{translation}"
  
  # Batch translation
  puts "\\nBatch translation:"
  texts = ['Good morning', 'How are you?', 'See you later']
  result = api.batch_translate(texts, 'fr')
  
  result['translations'].each do |translation|
    original = texts[translation['index']]
    puts "  #{original} → #{translation['content']}"
  end
  
rescue => e
  puts "Error: #{e.message}"
end`
  }
]} />
