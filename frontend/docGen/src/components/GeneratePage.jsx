import React, { useState } from 'react'
import {
  Github,
  FileText,
  Loader2,
  Copy,
  Download,
  Folder,
  Code,
  ExternalLink,
  Search,
  Sparkles,
  Zap,
} from 'lucide-react'

const GeneratePage = () => {
  const [repoUrl, setRepoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState('README.md')
  const [hasGenerated, setHasGenerated] = useState(false)

  const handleGenerateDocs = async () => {
    if (!repoUrl) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setHasGenerated(true)
  }

  const fileTree = [
    { name: 'README.md', type: 'file', icon: FileText },
    { name: 'src/', type: 'folder', icon: Folder },
    { name: 'components/', type: 'folder', icon: Folder },
    { name: 'utils/', type: 'folder', icon: Folder },
    { name: 'package.json', type: 'file', icon: Code },
    { name: 'App.tsx', type: 'file', icon: Code },
    { name: 'index.ts', type: 'file', icon: Code },
  ]

  const placeholderCode = `import React, { useState, useEffect } from 'react';
import { Github, FileText, Loader2 } from 'lucide-react';

interface DocumentGeneratorProps {
  repoUrl: string;
  onGenerate: () => void;
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ 
  repoUrl, 
  onGenerate 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [documentation, setDocumentation] = useState('');

  useEffect(() => {
    if (repoUrl) {
      generateDocumentation();
    }
  }, [repoUrl]);

  const generateDocumentation = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to generate docs
      const response = await fetch('/api/generate-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl })
      });
      
      const result = await response.json();
      setDocumentation(result.documentation);
    } catch (error) {
      console.error('Error generating documentation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Document Generator
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Generating documentation...</span>
        </div>
      ) : (
        <div className="prose max-w-none">
          {documentation || 'No documentation generated yet.'}
        </div>
      )}
    </div>
  );
};

export default DocumentGenerator;`

  const placeholderDocs = `# GitHub Document Generator

## Overview

This tool automatically generates comprehensive documentation from GitHub repositories by analyzing code structure, comments, and README files.

## Features

### 🚀 **Automatic Documentation Generation**
- Parses repository structure and generates organized documentation
- Extracts comments and docstrings from code files
- Creates API documentation from function signatures
- Generates table of contents automatically

### 📝 **Markdown Output**
- Clean, readable markdown format
- Proper heading hierarchy
- Code syntax highlighting
- Inline code examples

### 🔧 **Customizable Options**
- Select specific files or directories to document
- Choose documentation style and format
- Include or exclude private functions
- Custom templates support

## Usage

1. **Enter Repository URL**: Paste the GitHub repository URL in the input field
2. **Generate Documentation**: Click the "Generate Docs" button
3. **Review & Export**: View the generated documentation and export as needed

## Code Structure Analysis

The generator analyzes:
- **Functions and Methods**: Extracts signatures, parameters, and return types
- **Classes and Interfaces**: Documents properties and methods
- **Constants and Variables**: Includes type information and descriptions
- **Dependencies**: Lists external packages and their purposes

## Example Output

\`\`\`typescript
/**
 * Calculates the fibonacci sequence up to n terms
 * @param n - Number of terms to calculate
 * @returns Array of fibonacci numbers
 */
function fibonacci(n: number): number[] {
  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result;
}
\`\`\`

## Best Practices

- **Clear Function Names**: Use descriptive names for better documentation
- **Add Comments**: Include JSDoc comments for comprehensive documentation
- **Type Annotations**: Use TypeScript for better type documentation
- **README Files**: Maintain updated README files in each directory

## Technical Details

The documentation generator uses:
- **AST Parsing**: Analyzes code structure using Abstract Syntax Trees
- **Natural Language Processing**: Extracts meaningful information from comments
- **Template Engine**: Applies consistent formatting and styling
- **GitHub API**: Fetches repository metadata and file contents

## Supported Languages

- JavaScript/TypeScript
- Python
- Java
- C#
- Go
- Rust
- And many more...

---

*Generated automatically by GitHub Document Generator*`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-lg border-b border-white/10 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                GitHub Document Generator
              </h1>
              <p className="text-sm text-gray-300 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <span>
                  Generate beautiful documentation from your repositories
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>
          <button
            onClick={handleGenerateDocs}
            disabled={!repoUrl || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[140px] transition-all duration-300 transform hover:scale-105 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Generate Docs</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)] relative z-10">
        {/* Left Sidebar - File Tree */}
        <div className="w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 overflow-y-auto">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
              <Folder className="w-4 h-4 text-purple-400" />
              <span>Repository Files</span>
            </h3>
            {hasGenerated ? (
              <div className="space-y-1">
                {fileTree.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedFile(item.name)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg transition-all duration-300 hover:bg-white/10 ${
                        selectedFile === item.name
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.name}</span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Folder className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  Generate docs to see files
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Code Panel */}
          <div className="flex-1 bg-black/30 backdrop-blur-sm border-r border-white/10 overflow-y-auto">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">
                  {hasGenerated ? selectedFile : 'Code'}
                </span>
              </div>
              <button className="p-1 hover:bg-white/10 rounded transition-all duration-300 text-gray-300 hover:text-white">
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              {hasGenerated ? (
                <pre className="text-sm leading-relaxed overflow-x-auto text-gray-100">
                  <code className="language-typescript">{placeholderCode}</code>
                </pre>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-full mb-4 mx-auto w-fit">
                      <Code className="w-12 h-12 text-purple-400" />
                    </div>
                    <p className="text-gray-300 mb-2 font-medium">
                      No repository loaded
                    </p>
                    <p className="text-sm text-gray-400">
                      Enter a GitHub URL and generate docs to view code
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documentation Panel */}
          <div className="flex-1 bg-white/5 backdrop-blur-sm overflow-y-auto">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-medium text-white">
                  Documentation
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-white/10 rounded transition-all duration-300 text-gray-300 hover:text-white">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-white/10 rounded transition-all duration-300 text-gray-300 hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {hasGenerated ? (
                <div className="prose prose-sm max-w-none prose-invert">
                  <div className="text-gray-200 leading-relaxed">
                    {placeholderDocs.split('\n').map((line, index) => {
                      if (line.startsWith('### ')) {
                        return (
                          <h3
                            key={index}
                            className="text-lg font-semibold text-purple-300 mt-6 mb-3"
                          >
                            {line.replace('### ', '')}
                          </h3>
                        )
                      } else if (line.startsWith('## ')) {
                        return (
                          <h2
                            key={index}
                            className="text-xl font-bold text-pink-300 mt-8 mb-4"
                          >
                            {line.replace('## ', '')}
                          </h2>
                        )
                      } else if (line.startsWith('# ')) {
                        return (
                          <h1
                            key={index}
                            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-0 mb-6"
                          >
                            {line.replace('# ', '')}
                          </h1>
                        )
                      } else if (line.startsWith('```')) {
                        return (
                          <div
                            key={index}
                            className="bg-black/30 border border-white/10 rounded-lg p-4 my-4 font-mono text-sm text-cyan-300"
                          ></div>
                        )
                      } else if (line.includes('**') && line.includes('**')) {
                        const parts = line.split('**')
                        return (
                          <p key={index} className="mb-3">
                            {parts.map((part, i) =>
                              i % 2 === 1 ? (
                                <strong
                                  key={i}
                                  className="text-purple-300 font-semibold"
                                >
                                  {part}
                                </strong>
                              ) : (
                                part
                              )
                            )}
                          </p>
                        )
                      } else if (line.includes('`') && line.includes('`')) {
                        const parts = line.split('`')
                        return (
                          <p key={index} className="mb-3">
                            {parts.map((part, i) =>
                              i % 2 === 1 ? (
                                <code
                                  key={i}
                                  className="bg-purple-500/20 text-purple-200 px-1 py-0.5 rounded text-sm"
                                >
                                  {part}
                                </code>
                              ) : (
                                part
                              )
                            )}
                          </p>
                        )
                      } else if (line.trim()) {
                        return (
                          <p key={index} className="mb-3 text-gray-300">
                            {line}
                          </p>
                        )
                      } else {
                        return <br key={index} />
                      }
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-full mb-4 mx-auto w-fit">
                      <FileText className="w-12 h-12 text-pink-400" />
                    </div>
                    <p className="text-gray-300 mb-2 font-medium">
                      No documentation generated
                    </p>
                    <p className="text-sm text-gray-400">
                      Generate docs to see the documentation preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneratePage
