import React, { useState, useEffect } from 'react';
import './CodeTabs.css';

interface CodeTab {
  label: string;
  language: string;
  code: string;
}

interface CodeTabsProps {
  tabs: CodeTab[];
  defaultLanguage?: string;
}

const CodeTabs: React.FC<CodeTabsProps> = ({ tabs, defaultLanguage = 'python' }) => {
  const [activeTab, setActiveTab] = useState(defaultLanguage);
  const [copied, setCopied] = useState<string | null>(null);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('algebras-preferred-language');
    if (savedLanguage && tabs.find(tab => tab.language === savedLanguage)) {
      setActiveTab(savedLanguage);
    }
  }, [tabs]);

  // Save language preference
  const handleTabChange = (language: string) => {
    setActiveTab(language);
    localStorage.setItem('algebras-preferred-language', language);
  };

  // Copy code to clipboard
  const copyToClipboard = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(language);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const activeTabData = tabs.find(tab => tab.language === activeTab);

  return (
    <div className="code-tabs-container">
      <div className="code-tabs-header">
        <div className="code-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab.language}
              className={`code-tab ${activeTab === tab.language ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.language)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTabData && (
          <button
            className="copy-button"
            onClick={() => copyToClipboard(activeTabData.code, activeTabData.language)}
            title="Copy code"
          >
            {copied === activeTabData.language ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
            )}
          </button>
        )}
      </div>
      <div className="code-tabs-content">
        <pre className="code-block">
          <code className={`language-${activeTabData?.language}`}>
            {activeTabData?.code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeTabs;
