import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Github,
  FileText,
  Loader2,
  Copy,
  Download,
  Code,
  ExternalLink,
  Search,
  Sparkles,
  Zap,
  Upload,
  Eye,
  Edit,
  Link,
  Archive,
  CheckCircle,
  ArrowRight,
  Check,
  Menu,
  X,
} from "lucide-react";

const GeneratePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [inputType, setInputType] = useState("github");
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = () => {
    navigate("/");
  };

  const handleGenerateDocs = async () => {
    if (!repoUrl && !uploadedFile) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setHasGenerated(true);
    setMarkdownContent(generateMarkdownContent());
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/zip") {
      setUploadedFile(file);
    }
  };

  const generateMarkdownContent = () => {
    return `# GitHub Document Generator

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

*Generated automatically by GitHub Document Generator*`;
  };

  const renderMarkdown = (markdown) => {
    // Simple markdown renderer for demo purposes
    return markdown.split("\n").map((line, index) => {
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-lg font-semibold text-cyan-300 mt-6 mb-3 flex items-center"
          >
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-3"></div>
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-xl font-bold text-blue-300 mt-8 mb-4 flex items-center"
          >
            <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mr-3"></div>
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mt-0 mb-6 flex items-center"
          >
            <div className="w-3 h-10 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-4"></div>
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("```")) {
        return (
          <div
            key={index}
            className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-4 my-4 font-mono text-sm text-cyan-300 backdrop-blur-sm shadow-lg"
          >
            <code>// Code block placeholder</code>
          </div>
        );
      } else if (line.includes("**") && line.includes("**")) {
        const parts = line.split("**");
        return (
          <p key={index} className="mb-3 text-gray-300 leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong
                  key={i}
                  className="text-cyan-300 font-semibold"
                >
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      } else if (line.includes("`") && line.includes("`")) {
        const parts = line.split("`");
        return (
          <p key={index} className="mb-3 text-gray-300 leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <code
                  key={i}
                  className="bg-cyan-500/20 text-cyan-200 px-2 py-1 rounded text-sm border border-cyan-500/30"
                >
                  {part}
                </code>
              ) : (
                part
              )
            )}
          </p>
        );
      } else if (line.startsWith("- ")) {
        return (
          <li
            key={index}
            className="mb-2 text-gray-300 ml-4 flex items-start"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            {line.replace("- ", "")}
          </li>
        );
      } else if (line.trim()) {
        return (
          <p key={index} className="mb-3 text-gray-300 leading-relaxed">
            {line}
          </p>
        );
      } else {
        return <br key={index} />;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-gray-900/95 backdrop-blur-lg shadow-xl shadow-cyan-500/5 border-b border-cyan-500/20"
            : "bg-gray-900/80 backdrop-blur-sm"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#"
              className="flex items-center space-x-3 group"
              aria-label="DocGen Home"
            >
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                DocGen
              </span>
            </a>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#"
                  className="text-gray-300 hover:text-cyan-400 transition-colors font-medium relative group"
                  onClick={() => navigate("/")}
                >
                  Home
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
                </a>
                <a
                  href="#"
                  className="text-cyan-400 font-medium relative"
                  onClick={() => navigate("/generate")}
                >
                  Generate
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                </a>
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="bg-gray-900/95 border-t border-cyan-500/20 shadow-lg backdrop-blur-lg">
              <div className="px-4 pt-2 pb-3 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-all duration-300"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/");
                  }}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-cyan-400 bg-cyan-500/10 rounded-md"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/generate");
                  }}
                >
                  Generate
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for nav */}
      <div className="h-16" />

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl animate-pulse bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl animate-pulse delay-1000 bg-gradient-to-l from-blue-500/10 to-cyan-500/10"></div>
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-2xl animate-pulse delay-500 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 backdrop-blur-lg border-b bg-gray-900/30 border-cyan-500/20 px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg shadow-lg shadow-cyan-500/25">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  GitHub Document Generator
                </h1>
                <p className="text-sm flex items-center space-x-1 text-gray-300">
                  <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                  <span>
                    Generate beautiful documentation from your repositories
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-lg transition-all duration-300 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg transition-all duration-300 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Input Type Selector */}
          <div className="mt-6 flex items-center space-x-4 mb-4">
            <button
              onClick={() => setInputType("github")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                inputType === "github"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:shadow-lg hover:shadow-cyan-500/10"
              }`}
            >
              <Link className="w-4 h-4" />
              <span>GitHub Repository</span>
              {inputType === "github" && <CheckCircle className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setInputType("zip")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                inputType === "zip"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:shadow-lg hover:shadow-cyan-500/10"
              }`}
            >
              <Archive className="w-4 h-4" />
              <span>ZIP File Upload</span>
              {inputType === "zip" && <CheckCircle className="w-4 h-4" />}
            </button>
          </div>

          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              {inputType === "github" ? (
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full px-4 py-3 backdrop-blur-sm border bg-white/10 border-cyan-500/30 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 hover:border-cyan-400/50"
                />
              ) : (
                <div className="relative w-full px-4 py-3 backdrop-blur-sm border bg-white/10 border-cyan-500/30 rounded-lg transition-all duration-300 hover:border-cyan-400/50">
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className={uploadedFile ? "text-white" : "text-gray-400"}>
                      {uploadedFile
                        ? uploadedFile.name
                        : "Click to upload ZIP file"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleGenerateDocs}
              disabled={(!repoUrl && !uploadedFile) || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[140px] transition-all duration-300 transform hover:scale-105 group"
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
        {hasGenerated ? (
          <div className="flex h-[calc(100vh-180px)] relative z-10">
            {/* Markdown Editor Panel */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b flex items-center justify-between backdrop-blur-sm bg-gray-900/30 border-cyan-500/20">
                <div className="flex items-center space-x-2">
                  <Edit className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-white">
                    Markdown Editor
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-1 rounded transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-900/20 backdrop-blur-sm">
                <textarea
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                  className="w-full h-full resize-none outline-none font-mono text-sm leading-relaxed bg-transparent text-gray-100 placeholder-gray-400"
                  placeholder="Enter your markdown content here..."
                />
              </div>
            </div>

            {/* Live Preview Panel */}
            {showPreview && (
              <div className="flex-1 flex flex-col border-l border-cyan-500/20">
                <div className="p-4 border-b flex items-center justify-between backdrop-blur-sm bg-gray-900/30 border-cyan-500/20">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">
                      Live Preview
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto bg-gray-900/20 backdrop-blur-sm">
                  <div className="prose prose-sm max-w-none">
                    {renderMarkdown(markdownContent)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-180px)] relative z-10">
            <div className="text-center">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-8 rounded-full mb-6 mx-auto w-fit backdrop-blur-sm border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                <FileText className="w-16 h-16 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Ready to Generate Documentation
              </h2>
              <p className="text-lg mb-2 text-gray-300">
                {inputType === "github"
                  ? "Enter a GitHub repository URL above"
                  : "Upload a ZIP file containing your project"}
              </p>
              <p className="text-gray-400">
                Click "Generate Docs" to create beautiful markdown documentation
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 mt-20 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg shadow-lg shadow-cyan-500/25">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">DocGen</span>
            </div>
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 DocGen. All rights reserved. Built with ❤️ for
              developers who value great documentation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeneratePage;