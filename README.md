# DocGen 🚀

> An intelligent, AI-powered code documentation generator that transforms your codebase into comprehensive, professional documentation with just a few clicks.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-blue?style=for-the-badge&logo=vercel)](https://doc-generator-k91h.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/PrajwalK44/doc-generator)

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Live Application](#-live-application)
- [Technology Stack](#-technology-stack)
- [Features](#-features)
- [Setup & Installation](#-setup--installation)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Team](#-team)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

## 🎯 Project Overview

DocGen AI revolutionizes the way developers approach code documentation. By leveraging advanced AI language models, it automatically analyzes your codebase and generates:

- **Comprehensive Documentation**: Detailed explanations of code functionality and purpose
- **Intelligent Inline Comments**: Context-aware comments that enhance code readability
- **Professional README Files**: Well-structured project documentation following best practices
- **Interactive Previews**: Real-time markdown editing and preview capabilities

### Problem Statement
Many developers struggle with creating and maintaining up-to-date documentation, leading to poor code maintainability and reduced team productivity. DocGen AI solves this by automating the documentation process while maintaining high quality and relevance.

### Solution
Our AI-powered platform analyzes code structure, understands context, and generates human-readable documentation that evolves with your codebase.

## 🌐 Live Application

**🔗 [Access DocGen](https://doc-generator-k91h.vercel.app)**

Try our live demo with sample repositories or upload your own projects to experience the power of AI-driven documentation generation.

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | UI Framework | 18.2+ |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | Type Safety | 4.9+ |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Styling | 3.3+ |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | Build Tool | 4.4+ |

### Backend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white) | API Framework | 0.104+ |
| ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) | Backend Language | 3.8+ |
| ![Mistral AI](https://img.shields.io/badge/Mistral_AI-FF6B35?style=flat&logo=ai&logoColor=white) | LLM Integration | Latest |
| ![Uvicorn](https://img.shields.io/badge/Uvicorn-0C4B33?style=flat&logo=gunicorn&logoColor=white) | ASGI Server | 0.23+ |
| ![Langgraph](https://img.shields.io/badge/LangGraph-0.4.9-green?style=flat-square) | Agentic Workflow | 0.4.9 |
### Development & Deployment
| Tool | Purpose |
|------|---------|
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | Frontend Deployment |
| ![Render](https://img.shields.io/badge/Render-%46E3B7?style=flat&logo=render&logoColor=white) | Backend Deployment |

## ✨ Features

### 🤖 AI-Powered Documentation
- **Smart Code Analysis**: Advanced parsing and understanding of code structure
- **Context-Aware Generation**: Documentation that understands your code's purpose and flow
- **Multi-Language Support**: Works with Python, JavaScript, TypeScript, Java, and more

### 📝 Documentation Types
- **README Generation**: Professional project documentation with proper formatting
- **Inline Comments**: Intelligent code commenting for better readability
- **API Documentation**: Automatic endpoint documentation for web APIs
- **Code Summaries**: High-level overviews of complex codebases

### 🔧 Input Flexibility
- **GitHub Integration**: Direct repository analysis via GitHub URLs
- **File Upload**: Support for ZIP archives and individual files
- **Batch Processing**: Handle multiple files and directories simultaneously

### 🎨 User Experience
- **Interactive 3D UI**: Modern interface with engaging visual elements
- **Real-time Preview**: Live markdown editing and preview
- **Customizable Output**: Multiple documentation styles and formats
- **Export Options**: Download as ZIP, copy to clipboard, or direct integration

### ⚡ Performance & Reliability
- **Fast Processing**: Optimized algorithms for quick documentation generation
- **Scalable Architecture**: Handles projects of any size
- **Error Handling**: Robust error management and user feedback
- **Secure Processing**: Safe handling of code with privacy protection

## 🚀 Setup & Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16.0 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)
- **Git** - [Download here](https://git-scm.com/)

### Installation

#### 1. Clone and Setup Backend

```bash
# Clone the repository
git clone https://github.com/yourusername/docgen-ai.git

# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 2. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend/docGen

# Install dependencies
npm install
```

#### 3. Environment Configuration

Create a `.env` file in the backend directory:

```bash
# Required Configuration
MISTRAL_API_KEY=your_mistral_api_key_here
GROQ_API_KEY=your_groq_api_key_here

#### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend/docGen
npm start
```

#### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📖 Usage Guide

### Basic Workflow

1. **🔗 Input Source**
   - Paste a GitHub repository URL, or
   - Upload a ZIP file containing your project

2. **🤖 Generate Documentation**
   - Click "Generate Documentation"
   - AI analyzes your code structure
   - Documentation is generated automatically

3. **👀 Review Results**
   - Use the interactive preview to review generated content
   - Make edits directly in the markdown editor
   - Real-time preview updates as you type

4. **📥 Export Documentation**
   - Download as ZIP file
   - Copy markdown to clipboard
   - Integrate directly into your repository


## 📚 API Documentation

### Core Endpoints

#### Generate Documentation
```http
POST /generate
Content-Type: application/json

{
  "repo_url": "https://github.com/username/repository",
  "preferences": {
    "style": "detailed",
    "include_comments": true,
    "output_format": "markdown"
  }
}
```


#### Generate and Download
```http
POST /api/v1/generate-and-download
Content-Type: application/json

{
  "repo_url": "https://github.com/username/repository",
  "preferences": {
    "style": "standard",
    "include_readme": true,
    "add_inline_comments": true
  }
}
```
## 📸 Screenshots

### Landing Page
![Landing Page](https://github.com/user-attachments/assets/168a024a-1640-4969-a893-f3c741e10e8a)
*Modern, interactive landing page with 3D elements and clear call-to-action*

### Documentation Generation Interface
![Generation Interface](https://github.com/user-attachments/assets/b85026d6-aa05-455e-b4c4-d75fc31b075f)
*Intuitive interface for inputting repositories and configuring generation options*

### Live Preview & Editor
![Markdown Editor](https://github.com/user-attachments/assets/b3bc76d3-0a59-4684-9a65-79354815f930)
![Markdown Preview](https://github.com/user-attachments/assets/84b4cec7-9acd-4b10-b629-fdcbf054d468)
*Real-time markdown preview with editing capabilities*


## 👥 Team

### Core Contributors

<table>
  <tr>
    <td align="center">
      <sub><b>Prathamesh Joshi</b></sub><br />
      <sub>Project Lead & Backend</sub><br />
      <a href="https://github.com/PrathameshJoshi123">🔗 GitHub</a>
    </td>
    <td align="center">
      <sub><b>Prajwal Kulkarni</b></sub><br />
      <sub>Frontend & UI/UX</sub><br />
      <a href="https://github.com/PrajwalK44">🔗 GitHub</a>
    </td>
  </tr>
</table>

### Individual Contributions

#### 👨‍💻 Prathamesh Joshi - Project Lead & Backend Developer
- **Architecture Design**: Designed the overall system architecture and API structure
- **Backend Development**: Implemented FastAPI server and core business logic
- **AI Integration**: Integrated Mistral AI and developed prompt engineering strategies
- **DevOps**: Set up CI/CD pipelines and deployment infrastructure
- **Code Review**: Maintained code quality standards and conducted peer reviews

#### 🎨 Prajwal Kulkarni - Frontend Developer & UI/UX Designer
- **Frontend Architecture**: Built the React application with TypeScript and modern tooling
- **UI/UX Design**: Created the modern, interactive user interface with 3D elements
- **Component Development**: Developed reusable React components and hooks
- **Responsive Design**: Ensured mobile-first responsive design implementation
- **User Experience**: Conducted user testing and iterative design improvements

## 🚀 Future Improvements

### Phase 1: Advanced AI Enhancements
**🤖 Intelligent Code Analysis & Automation**
- **Automatic Code Refactoring**: Integrate AI-powered suggestions for code optimization, performance improvements, and best practice adherence
- **Context-Aware Documentation**: Generate comprehensive docstrings, README files, and technical documentation that understands project context and dependencies
- **Smart Code Summaries**: Provide intelligent summaries for entire codebases, functions, and complex logic flows

### Phase 2: Code Quality & Security
**🔒 Comprehensive Code Assessment**
- **Static Analysis Integration**: Implement advanced static analysis tools to detect potential vulnerabilities, code smells, and security issues automatically
- **Security-Focused Auditing**: Add specialized security scanning with detailed vulnerability reports and remediation suggestions
- **Code Quality Metrics**: Generate comprehensive quality scores with actionable improvement recommendations

### Phase 3: Visualization Improvements
**📊 Enhanced Code Understanding**
- **Interactive Architecture Diagrams**: Generate dynamic system architecture diagrams, dependency trees, and data flow visualizations
- **Function-Level Call Graphs**: Create detailed function interaction maps and execution flow diagrams
- **Embedded Interactive Elements**: Add clickable, explorable diagrams directly within documentation and code reviews

### Phase 4: Developer Collaboration
**👥 Team-Centric Features**
- **Collaborative Documentation**: Enable real-time collaborative editing with commenting and feedback systems for generated documentation
- **GitHub Integration Enhancement**: Deep integration with GitHub for automated PR comments, inline code annotations, and review workflows
- **Team Knowledge Sharing**: Create shared repositories of code insights, patterns, and organizational best practices

### Phase 5: Automation & Integration
**⚙️ Seamless Workflow Integration**
- **CI/CD Pipeline Integration**: Automate documentation updates through GitHub Actions, GitLab CI, and other popular CI/CD platforms
- **Auto-Generated Technical Documentation**: Create comprehensive wikis, API documentation, and README files automatically from analyzed codebases
- **Cross-Platform Integration**: Support for multiple version control systems, project management tools, and development environments

### Advanced Features Pipeline
**🔮 Next-Generation Capabilities**
- **Multi-Language Code Analysis**: Expand support beyond current languages to include emerging technologies and frameworks
- **AI-Powered Code Suggestions**: Provide intelligent code completion and optimization suggestions based on project patterns
- **Custom Integration APIs**: Allow teams to build custom workflows and integrations tailored to their specific development processes
- **Performance Analytics**: Track code quality improvements over time with detailed metrics and trend analysis
- **Enterprise Security Features**: Add advanced authentication, audit logging, and compliance reporting for enterprise environments

This roadmap focuses on transforming the platform from a documentation tool into a comprehensive AI-powered development assistant that enhances every aspect of the software development lifecycle.


## 🤝 Contributing
We welcome contributions from developers of all skill levels! Here's how you can help make DocGen AI even better.

### Ways to Contribute

- 🐛 **Report Bugs**: Found an issue? Let us know!
- ✨ **Suggest Features**: Have ideas for improvements?
- 📖 **Improve Documentation**: Help make our docs clearer
- 🧪 **Write Tests**: Help us maintain quality
- 💻 **Submit Code**: Fix bugs or implement features

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow our coding standards
4. **Add tests**: Ensure your changes are well-tested
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes

<div align="center">

**⭐ Star us on GitHub if DocGen AI helps you create better documentation! ⭐**

Made with ❤️ by Team ByteBlazers


</div>
