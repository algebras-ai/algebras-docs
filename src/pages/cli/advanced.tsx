import React from 'react';
import DocLayout from '../../components/DocLayout';

const AdvancedPage: React.FC = () => {
  return (
    <DocLayout
      title="Advanced Features"
      description="Advanced features and capabilities of Algebras CLI"
    >
      <section>
        <p>The Algebras CLI offers several advanced features to optimize your localization workflow, including UI-safe translations, custom prompts, glossary management, batch processing, and Git integration.</p>
        
        <h2>UI-Safe Translations</h2>
        <p>The <code>--ui-safe</code> flag ensures that translations won't exceed the original text length, which is crucial for maintaining consistent UI layouts.</p>
        
        <h3>Usage</h3>
        <pre className="code-block">
          <code className="language-bash">{`algebras translate --ui-safe
algebras update --ui-safe`}</code>
        </pre>
        
        <h3>When to Use</h3>
        <ul>
          <li>UI strings with length constraints</li>
          <li>Button labels and navigation items</li>
          <li>Form field labels</li>
          <li>Mobile app interfaces</li>
          <li>Responsive web designs</li>
        </ul>
        
        <h3>Example</h3>
        <pre className="code-block">
          <code>{`# Original: "Submit"
# UI-Safe Translation: "Enviar" (5 chars)
# Regular Translation: "Enviar formulario" (15 chars)`}</code>
        </pre>
        
        <h2>Custom Translation Prompts</h2>
        <p>You can provide custom prompts for more specific translation requirements.</p>
        
        <h3>Using Prompt Files</h3>
        <p>Create a prompt file:</p>
        <pre className="code-block">
          <code className="language-bash">echo "Translate to {target_language} maintaining a professional tone for a business application" > custom-prompt.txt</code>
        </pre>
        <p>Use the prompt file:</p>
        <pre className="code-block">
          <code className="language-bash">algebras translate --prompt-file custom-prompt.txt</code>
        </pre>
        
        <h3>Using Inline Prompts</h3>
        <pre className="code-block">
          <code className="language-bash">algebras translate --prompt "Translate to {target_language} using casual, friendly language"</code>
        </pre>
        
        <h3>Setting Default Prompts</h3>
        <pre className="code-block">
          <code className="language-bash">algebras configure --prompt "Translate to {target_language} maintaining a professional tone"</code>
        </pre>
        
        <h3>Prompt Variables</h3>
        <p>Available variables in prompts:</p>
        <ul>
          <li><code>{'{target_language}'}</code> - Target language name</li>
          <li><code>{'{source_language}'}</code> - Source language name</li>
          <li><code>{'{context}'}</code> - Translation context (if available)</li>
        </ul>
        
        <h2>Glossary Management</h2>
        <p>Algebras CLI supports glossary management for consistent terminology across translations.</p>
        
        <h3>Creating Glossaries</h3>
        <p>Glossaries can be created through the platform or uploaded from CSV/XLSX files.</p>
        
        <h3>Using Glossaries</h3>
        <pre className="code-block">
          <code className="language-bash">algebras translate --glossary-id glossary-123</code>
        </pre>
        
        <h3>Glossary Benefits</h3>
        <ul>
          <li>Consistent terminology across translations</li>
          <li>Domain-specific vocabulary</li>
          <li>Brand name preservation</li>
          <li>Technical term accuracy</li>
        </ul>
        
        <h2>Batch Processing</h2>
        <p>Optimize translation performance with batch processing settings.</p>
        
        <h3>Adjusting Batch Size</h3>
        <pre className="code-block">
          <code className="language-bash"># Process 10 translations per batch
algebras translate --batch-size 10</code>
        </pre>
        
        <h3>Controlling Parallel Batches</h3>
        <pre className="code-block">
          <code className="language-bash"># Run maximum 3 batches in parallel
algebras translate --max-parallel-batches 3</code>
        </pre>
        
        <h3>Configuring Defaults</h3>
        <pre className="code-block">
          <code className="language-bash">algebras configure --batch-size 10 --max-parallel-batches 3</code>
        </pre>
        
        <h3>Performance Tips</h3>
        <ul>
          <li><strong>Smaller batch sizes</strong> (5-10) for better error handling</li>
          <li><strong>Larger batch sizes</strong> (20-50) for faster processing</li>
          <li><strong>Fewer parallel batches</strong> for rate limit compliance</li>
          <li><strong>More parallel batches</strong> for maximum throughput</li>
        </ul>
        
        <h2>Git Integration</h2>
        <p>Algebras CLI automatically tracks translation changes using Git.</p>
        
        <h3>Automatic Git Detection</h3>
        <p>The CLI automatically:</p>
        <ul>
          <li>Detects outdated keys by comparing modification times</li>
          <li>Validates translations against source file changes</li>
          <li>Skips unnecessary translations</li>
        </ul>
        
        <h3>Git-Friendly Commands</h3>
        <pre className="code-block">
          <code className="language-bash">{`# Skip git validation (useful for CI)
algebras translate --only-missing

# CI-friendly command
algebras ci --fail-on-error`}</code>
        </pre>
        
        <h3>Git Workflow Integration</h3>
        <pre className="code-block">
          <code className="language-bash">{`# 1. Make changes to source files
git add src/locales/en/
git commit -m "Update English strings"

# 2. Update translations
algebras update

# 3. Commit translation changes
git add src/locales/
git commit -m "Update translations"`}</code>
        </pre>
        
        <h2>String Normalization</h2>
        <p>Control how strings are processed before translation.</p>
        
        <h3>Enable String Normalization</h3>
        <pre className="code-block">
          <code className="language-bash">algebras configure --normalize-strings true</code>
        </pre>
        <p>This removes escaped characters like <code>\'</code> and normalizes whitespace.</p>
        
        <h3>Disable String Normalization</h3>
        <pre className="code-block">
          <code className="language-bash">algebras configure --normalize-strings false</code>
        </pre>
        <p>This preserves all characters exactly as they appear.</p>
        
        <h3>When to Use Each Mode</h3>
        <p><strong>Enable normalization for:</strong></p>
        <ul>
          <li>User-facing text</li>
          <li>Clean, readable translations</li>
          <li>Standard localization files</li>
        </ul>
        <p><strong>Disable normalization for:</strong></p>
        <ul>
          <li>Code strings</li>
          <li>Technical documentation</li>
          <li>Strings with special formatting</li>
        </ul>
        
        <h2>Advanced Configuration Options</h2>
        
        <h3>Custom API Settings</h3>
        <pre className="code-block">
          <code className="language-yaml">{`api:
  provider: algebras-ai
  model: gpt-4
  batch_size: 15
  max_parallel_batches: 2
  normalize_strings: true`}</code>
        </pre>
        
        <h3>Environment Variables</h3>
        <pre className="code-block">
          <code className="language-bash">{`export ALGEBRAS_BATCH_SIZE=15
export ALGEBRAS_MAX_PARALLEL_BATCHES=2
export ALGEBRAS_BASE_URL=https://custom-api.example.com`}</code>
        </pre>
        
        <h2>Workflow Optimization</h2>
        
        <h3>Incremental Updates</h3>
        <pre className="code-block">
          <code className="language-bash"># Only translate missing or outdated keys
algebras update --only-missing</code>
        </pre>
        
        <h3>Selective Translation</h3>
        <pre className="code-block">
          <code className="language-bash"># Translate specific languages
algebras translate --languages es fr</code>
        </pre>
        
        <h3>Quality Assurance</h3>
        <pre className="code-block">
          <code className="language-bash">{`# Use UI-safe mode for UI strings
algebras translate --ui-safe --glossary-id ui-terms

# Use custom prompt for technical content
algebras translate --prompt-file technical-prompt.txt`}</code>
        </pre>
        
        <h2>Performance Monitoring</h2>
        
        <h3>Verbose Output</h3>
        <pre className="code-block">
          <code className="language-bash">algebras translate --verbose</code>
        </pre>
        <p>Shows detailed progress information including:</p>
        <ul>
          <li>Batch processing status</li>
          <li>Translation timing</li>
          <li>Error details</li>
          <li>Performance metrics</li>
        </ul>
        
        <h3>Status Monitoring</h3>
        <pre className="code-block">
          <code className="language-bash">algebras status</code>
        </pre>
        <p>Shows:</p>
        <ul>
          <li>Configuration status</li>
          <li>Recent translation history</li>
          <li>Performance statistics</li>
          <li>Error counts</li>
        </ul>
        
        <h2>Integration Examples</h2>
        
        <h3>CI/CD Pipeline</h3>
        <pre className="code-block">
          <code className="language-yaml">{`# .github/workflows/translate.yml
name: Update Translations
on:
  push:
    paths: ['src/locales/en/**']

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - name: Install Algebras CLI
        run: pip install algebras-cli
      - name: Update Translations
        run: algebras ci --only-missing --fail-on-error
        env:
          ALGEBRAS_API_KEY: ${{ secrets.ALGEBRAS_API_KEY }}`}</code>
        </pre>
        
        <h3>Pre-commit Hook</h3>
        <pre className="code-block">
          <code className="language-bash">{`#!/bin/bash
# .git/hooks/pre-commit

# Check if English locale files changed
if git diff --cached --name-only | grep -q "src/locales/en/"; then
    echo "English locale files changed, updating translations..."
    algebras update --only-missing
    git add src/locales/
fi`}</code>
        </pre>
        
        <h2>Troubleshooting Advanced Features</h2>
        
        <h3>UI-Safe Issues</h3>
        <p><strong>Problem:</strong> Translations still too long</p>
        <p><strong>Solution:</strong> Check glossary terms and adjust prompt specificity</p>
        
        <h3>Batch Processing Errors</h3>
        <p><strong>Problem:</strong> Rate limit errors</p>
        <p><strong>Solution:</strong> Reduce <code>--max-parallel-batches</code> or increase <code>--batch-size</code></p>
        
        <h3>Git Integration Issues</h3>
        <p><strong>Problem:</strong> Unnecessary translations</p>
        <p><strong>Solution:</strong> Ensure source files are properly tracked in Git</p>
        
        <h3>Performance Issues</h3>
        <p><strong>Problem:</strong> Slow translations</p>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Increase <code>--batch-size</code></li>
          <li>Increase <code>--max-parallel-batches</code></li>
          <li>Use <code>--only-missing</code> for updates</li>
        </ul>
        
        <h2>Next Steps</h2>
        <ul>
          <li><strong><a href="/cli/troubleshooting/">Troubleshooting</a></strong> - Common issues and solutions</li>
          <li><strong><a href="/cli/commands/">Commands Reference</a></strong> - Complete command reference</li>
          <li><strong><a href="/cli/configuration/">Configuration</a></strong> - Detailed configuration options</li>
        </ul>
      </section>
    </DocLayout>
  );
};

export default AdvancedPage;
