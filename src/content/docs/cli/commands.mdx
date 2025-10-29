---
title: Commands
description: Complete reference for Algebras CLI commands
---

The Algebras CLI provides several commands to manage your localization workflow. This reference covers all available commands and their options.

## Command Overview

| Command | Description |
|---------|-------------|
| `init` | Initialize or regenerate configuration |
| `add` | Add languages to your project |
| `remove` | Remove languages from your project |
| `translate` | Translate source files to target languages |
| `update` | Update existing translations |
| `status` | Show project status and configuration |
| `configure` | Configure CLI settings |
| `ci` | CI-friendly command for automated workflows |

## init

Initialize or regenerate your Algebras configuration.

### Usage

```bash
algebras init [options]
```

### Options

- `--force` - Force regeneration of configuration file

### Examples

```bash
# Initialize new project
algebras init

# Regenerate existing configuration
algebras init --force
```

### What it does

- Creates `.algebras.config` file
- Detects source files in your project
- Sets up default configuration
- Prompts for language selection

## add

Add languages to your project configuration.

### Usage

```bash
algebras add <language1> [language2] [language3] ...
```

### Examples

```bash
# Add single language
algebras add es

# Add multiple languages
algebras add es fr de

# Add language with region
algebras add pt_BR zh_CN
```

### Supported Language Codes

Common language codes include:
- `es` - Spanish
- `fr` - French
- `de` - German
- `pt_BR` - Brazilian Portuguese
- `zh_CN` - Simplified Chinese
- `ja` - Japanese
- `ko` - Korean
- `ru` - Russian
- `ar` - Arabic

## remove

Remove languages from your project configuration.

### Usage

```bash
algebras remove <language1> [language2] [language3] ...
```

### Examples

```bash
# Remove single language
algebras remove es

# Remove multiple languages
algebras remove es fr
```

## translate

Translate source files to target languages.

### Usage

```bash
algebras translate [options]
```

### Options

- `--only-missing` - Only translate missing keys
- `--ui-safe` - Ensure translations don't exceed original text length
- `--batch-size <number>` - Number of translations per batch (default: 20)
- `--max-parallel-batches <number>` - Maximum parallel batches (default: 5)
- `--glossary-id <id>` - Use specific glossary for translation
- `--prompt-file <file>` - Use custom prompt from file
- `--prompt <text>` - Use custom prompt text

### Examples

```bash
# Basic translation
algebras translate

# UI-safe translation
algebras translate --ui-safe

# Use custom batch size
algebras translate --batch-size 10

# Use glossary
algebras translate --glossary-id glossary-123

# Custom prompt
algebras translate --prompt "Translate to {target_language} maintaining a professional tone"

# Only missing translations
algebras translate --only-missing
```

## update

Update existing translations based on source file changes.

### Usage

```bash
algebras update [options]
```

### Options

Same as `translate` command.

### Examples

```bash
# Update all translations
algebras update

# UI-safe update
algebras update --ui-safe

# Update with custom settings
algebras update --batch-size 15 --max-parallel-batches 2
```

## status

Show project status and configuration information.

### Usage

```bash
algebras status
```

### Output

Shows:
- Configured languages
- Source files detected
- API configuration
- Recent translation history
- Configuration validation status

### Example Output

```
Algebras CLI Status
==================

Languages: en, es, fr, de
Source Files: 3 files detected
API Provider: algebras-ai
Model: gpt-4

Configuration: ✓ Valid
Last Translation: 2025-01-12 14:30:00
```

## configure

Configure CLI settings and defaults.

### Usage

```bash
algebras configure [options]
```

### Options

- `--batch-size <number>` - Set default batch size
- `--max-parallel-batches <number>` - Set default max parallel batches
- `--prompt <text>` - Set default prompt
- `--normalize-strings <true|false>` - Enable/disable string normalization

### Examples

```bash
# Set batch size
algebras configure --batch-size 15

# Set multiple options
algebras configure --batch-size 10 --max-parallel-batches 3

# Set default prompt
algebras configure --prompt "Translate to {target_language} maintaining a professional tone"

# Enable string normalization
algebras configure --normalize-strings true
```

## ci

CI-friendly command for automated workflows.

### Usage

```bash
algebras ci [options]
```

### Options

Same as `translate` command, plus:
- `--fail-on-error` - Exit with error code on translation failures
- `--quiet` - Suppress non-essential output

### Examples

```bash
# CI translation with error handling
algebras ci --fail-on-error --quiet

# CI update with custom settings
algebras ci --only-missing --ui-safe --fail-on-error
```

## Global Options

All commands support these global options:

- `--help` - Show help message
- `--version` - Show version information
- `--verbose` - Enable verbose output
- `--config <file>` - Use custom config file

### Examples

```bash
# Show help for translate command
algebras translate --help

# Use custom config file
algebras translate --config custom-config.yaml

# Verbose output
algebras translate --verbose
```

## Environment Variables

The CLI respects these environment variables:

- `ALGEBRAS_API_KEY` - Your API key (required)
- `ALGEBRAS_BASE_URL` - Custom API base URL
- `ALGEBRAS_BATCH_SIZE` - Default batch size
- `ALGEBRAS_MAX_PARALLEL_BATCHES` - Default max parallel batches

## Command Workflow Examples

### Basic Translation Workflow

```bash
# 1. Initialize project
algebras init

# 2. Add languages
algebras add es fr de

# 3. Translate files
algebras translate

# 4. Check status
algebras status
```

### Advanced Workflow with Custom Settings

```bash
# 1. Configure defaults
algebras configure --batch-size 10 --max-parallel-batches 2

# 2. Translate with UI-safe mode
algebras translate --ui-safe --glossary-id tech-terms

# 3. Update only missing translations
algebras update --only-missing
```

### CI/CD Integration

```bash
# In your CI pipeline
algebras ci --only-missing --fail-on-error --quiet
```

## Troubleshooting Commands

### Check Configuration

```bash
algebras status
```

### Validate Setup

```bash
algebras init --force
algebras status
```

### Test Translation

```bash
algebras translate --verbose
```

## Next Steps

- **[Advanced Features](/cli/advanced/)** - Explore glossaries, batch processing, and Git integration
- **[Troubleshooting](/cli/troubleshooting/)** - Common issues and solutions
- **[Configuration](/cli/configuration/)** - Detailed configuration options
