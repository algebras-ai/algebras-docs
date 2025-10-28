---
title: Configuration
description: Configure Algebras CLI for your project
---

The Algebras CLI uses a `.algebras.config` file to manage your project settings. This file defines which languages to translate, where your source files are located, and how translations should be generated.

## Initial Setup

### Create Configuration File

Run this command in your project root:

```bash
algebras init
```

This creates a `.algebras.config` file with default settings.

### Force Regenerate Configuration

To regenerate your configuration with the latest format:

```bash
algebras init --force
```

## Configuration File Structure

The `.algebras.config` file uses YAML format and contains several sections:

```yaml
languages:
  - en
  - es
  - fr
  - de

source_files:
  "src/locales/en/common.json":
    destination_path: "src/locales/%algebras_locale_code%/common.json"
  "public/locales/en/translation.json":
    destination_path: "public/locales/%algebras_locale_code%/translation.json"

api:
  provider: algebras-ai
  model: gpt-4
```

## Configuration Sections

### Languages

Define which languages your application should support:

```yaml
languages:
  - en      # English (source)
  - es      # Spanish
  - fr      # French
  - de      # German
  - pt_BR   # Brazilian Portuguese
  - ja      # Japanese
```

### Source Files

Map your source files to destination patterns using the `%algebras_locale_code%` placeholder:

```yaml
source_files:
  "src/locales/en/common.json":
    destination_path: "src/locales/%algebras_locale_code%/common.json"
  "public/locales/en/translation.json":
    destination_path: "public/locales/%algebras_locale_code%/translation.json"
  "locale/en/LC_MESSAGES/django.po":
    destination_path: "locale/%algebras_locale_code%/LC_MESSAGES/django.po"
```

The `%algebras_locale_code%` placeholder is replaced with the actual locale code (e.g., `en`, `fr`, `es`, `pt_BR`).

### API Configuration

Configure your translation provider:

```yaml
api:
  provider: algebras-ai  # Default provider
  model: gpt-4          # Model to use
```

## Framework-Specific Examples

### Next.js/React (next-i18next)

```yaml
languages:
  - en
  - es
  - fr

source_files:
  "public/locales/en/common.json":
    destination_path: "public/locales/%algebras_locale_code%/common.json"
  "public/locales/en/translation.json":
    destination_path: "public/locales/%algebras_locale_code%/translation.json"
```

### Django (gettext)

```yaml
languages:
  - en
  - es
  - fr

source_files:
  "locale/en/LC_MESSAGES/django.po":
    destination_path: "locale/%algebras_locale_code%/LC_MESSAGES/django.po"
```

### Android (values directories)

```yaml
languages:
  - en
  - es
  - fr

source_files:
  "app/src/main/res/values/strings.xml":
    destination_path: "app/src/main/res/values-%algebras_locale_code%/strings.xml"
```

### iOS (strings files)

```yaml
languages:
  - en
  - es
  - fr

source_files:
  "ios/App/en.lproj/Localizable.strings":
    destination_path: "ios/App/%algebras_locale_code%.lproj/Localizable.strings"
```

### HTML Files

```yaml
languages:
  - en
  - es
  - fr

source_files:
  "html_files/index.html":
    destination_path: "html_files/index.%algebras_locale_code%.html"
```

## Environment Variables

Configure the CLI using environment variables:

### Required Variables

```bash
export ALGEBRAS_API_KEY=your_api_key_here
```

### Optional Variables

```bash
export ALGEBRAS_BASE_URL=https://platform.algebras.ai
export ALGEBRAS_BATCH_SIZE=20
export ALGEBRAS_MAX_PARALLEL_BATCHES=5
```

## Advanced Configuration

### Batch Processing Settings

```yaml
api:
  provider: algebras-ai
  model: gpt-4
  batch_size: 10
  max_parallel_batches: 3
```

### String Normalization

Control how strings are processed before translation:

```yaml
api:
  provider: algebras-ai
  model: gpt-4
  normalize_strings: true  # Remove escaped characters like \'
```

## Configuration Commands

### Add Languages

```bash
algebras add es fr de
```

### Remove Languages

```bash
algebras remove es
```

### Configure Settings

```bash
algebras configure --batch-size 10 --max-parallel-batches 3
```

### Check Configuration

```bash
algebras status
```

## Migration from path_rules

If you're upgrading from the previous `path_rules` system:

### Old Format (Deprecated)

```yaml
path_rules:
  - "public/locales/**/*.json"
  - "!**/node_modules/**"
```

### New Format

```yaml
source_files:
  "public/locales/en/common.json":
    destination_path: "public/locales/%algebras_locale_code%/common.json"
  "public/locales/en/translation.json":
    destination_path: "public/locales/%algebras_locale_code%/translation.json"
```

### Migration Steps

1. Run `algebras init --force` to regenerate configuration
2. Review and adjust the generated `source_files` mappings
3. Remove any `path_rules` entries from your configuration

## Troubleshooting Configuration

### "No Algebras configuration found"

**Solution:** Run `algebras init` in your project directory.

### "Language 'xx' is not configured"

**Solution:** Add the language: `algebras add xx`

### "No source files found"

**Solutions:**
1. Configure source files in `.algebras.config`
2. Run `algebras init --force` to regenerate configuration
3. Check file paths are correct and files exist

### Configuration Validation Errors

**Solutions:**
1. Check YAML syntax
2. Verify file paths exist
3. Ensure language codes are valid
4. Run `algebras status` to validate configuration

## Next Steps

- **[CLI Commands](/cli/commands/)** - Learn all available commands
- **[Advanced Features](/cli/advanced/)** - Explore glossaries, batch processing, and more
- **[Troubleshooting](/cli/troubleshooting/)** - Common issues and solutions
