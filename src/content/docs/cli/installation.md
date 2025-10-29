---
title: Installation
description: Install Algebras CLI on your system
---

The Algebras CLI can be installed using pip, pipx, or other Python package managers. Choose the method that works best for your environment.

## Prerequisites

- Python 3.12 or higher
- pip (Python package installer)

## Installation Methods

### Method 1: Using pip (Recommended)

```bash
pip install algebras-cli
```

### Method 2: Using pipx (Isolated Environment)

If you prefer to install CLI tools in isolated environments:

```bash
pipx install algebras-cli
```

### Method 3: Using pip with --user flag

For user-only installation (no admin privileges required):

```bash
pip install --user algebras-cli
```

### Method 4: From Source (Development)

If you want to install the latest development version:

```bash
git clone https://github.com/algebras-ai/algebras-cli.git
cd algebras-cli
pip install -e .
```

## Verify Installation

After installation, verify that the CLI is working:

```bash
algebras --version
```

You should see output like:
```
algebras-cli version 1.0.0
```

## Platform-Specific Instructions

### Windows

1. Open Command Prompt or PowerShell
2. Run: `pip install algebras-cli`
3. Verify: `algebras --version`

### macOS

1. Open Terminal
2. Run: `pip install algebras-cli`
3. Verify: `algebras --version`

### Linux (Ubuntu/Debian)

1. Open Terminal
2. Run: `pip install algebras-cli`
3. Verify: `algebras --version`

:::note
On some Linux distributions, you may need to use `pip3` instead of `pip`.
:::

## Troubleshooting Installation

### "command not found: algebras"

**Cause:** The CLI wasn't added to your PATH.

**Solutions:**
1. **Restart your terminal** after installation
2. **Add pip user bin to PATH:**
   ```bash
   echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   ```
3. **Use full path:**
   ```bash
   python -m algebras --version
   ```

### Permission Denied Errors

**Cause:** Insufficient permissions to install packages globally.

**Solutions:**
1. **Use --user flag:**
   ```bash
   pip install --user algebras-cli
   ```
2. **Use virtual environment:**
   ```bash
   python -m venv algebras-env
   source algebras-env/bin/activate  # On Windows: algebras-env\Scripts\activate
   pip install algebras-cli
   ```

### Python Version Issues

**Cause:** Using an outdated Python version.

**Solutions:**
1. **Check Python version:**
   ```bash
   python --version
   ```
2. **Upgrade Python** to version 3.8 or higher
3. **Use specific Python version:**
   ```bash
   python3.8 -m pip install algebras-cli
   ```

## Next Steps

Once you have the CLI installed:

1. **[Configure your project](/cli/configuration/)** - Set up your `.algebras.config`
2. **[Learn the commands](/cli/commands/)** - Understand available CLI commands
3. **[Try advanced features](/cli/advanced/)** - Explore glossaries, batch processing, and more

## Uninstalling

To remove the Algebras CLI:

```bash
pip uninstall algebras-cli
```

Or if installed with pipx:

```bash
pipx uninstall algebras-cli
```
