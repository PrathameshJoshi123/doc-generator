# DocGen 🚀

> An intelligent, AI-powered code documentation generator that transforms your codebase into comprehensive, professional documentation with just a few clicks.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-blue?style=for-the-badge&logo=vercel)](https://doc-generator-k91h.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/PrajwalK44/doc-generator)

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Live Application](#-live-application)
- [Technology Stack](#-technology-stack)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Setup & Installation](#-setup--installation)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Team](#-team)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

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

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=DocGen+AI+Landing+Page)
*Modern, interactive landing page with 3D elements and clear call-to-action*

### Documentation Generation Interface
![Generation Interface](https://via.placeholder.com/800x400/2563eb/ffffff?text=Generation+Interface)
*Intuitive interface for inputting repositories and configuring generation options*

### Live Preview & Editor
![Preview Editor](https://via.placeholder.com/800x400/059669/ffffff?text=Live+Preview+Editor)
*Real-time markdown preview with editing capabilities*

### Generated Documentation Example
![Documentation Output](https://via.placeholder.com/800x400/7c3aed/ffffff?text=Generated+Documentation)
*Professional documentation output with proper formatting and structure*

### Mobile Responsive Design
![Mobile View](https://via.placeholder.com/400x600/dc2626/ffffff?text=Mobile+Responsive)
*Fully responsive design optimized for mobile devices*

### Input Options Interface
![Input Options](https://via.placeholder.com/800x400/f59e0b/ffffff?text=Input+Options)
*Multiple input methods including GitHub URL and file upload*

### AI Processing Status
![Processing Status](https://via.placeholder.com/800x400/10b981/ffffff?text=AI+Processing+Status)
*Real-time status updates during documentation generation*

### Export & Download Options
![Export Options](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Export+Options)
*Various export formats and sharing options for generated documentation*

## 🚀 Setup & Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16.0 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)
- **Git** - [Download here](https://git-scm.com/)

### Quick Start (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/docgen-ai.git
cd docgen-ai

# Run the automated setup script
chmod +x setup.sh
./setup.sh
```

### Manual Installation

#### 1. Clone and Setup Backend

```bash
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

# Optional: Install additional development tools
npm install -g @types/node
```

#### 3. Environment Configuration

Create a `.env` file in the backend directory:

```bash
# Required Configuration
MISTRAL_API_KEY=your_mistral_api_key_here
ENVIRONMENT=development

# Optional Configuration
LLM_MODEL=mistral-large-latest
MAX_FILE_SIZE_MB=50
TEMP_DIR=./temp
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Database (if using)
DATABASE_URL=sqlite:///./docgen.db

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

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

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Docker Installation (Alternative)

```bash
# Clone repository
git clone https://github.com/yourusername/docgen-ai.git
cd docgen-ai

# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:3000
```

### Troubleshooting Installation

<details>
<summary>Common Installation Issues</summary>

**Node.js Version Issues:**
```bash
# Check Node.js version
node --version

# If version is too old, use nvm to install latest
nvm install node
nvm use node
```

**Python Virtual Environment Issues:**
```bash
# If venv creation fails, try
python3 -m venv venv
# or
virtualenv venv
```

**Port Already in Use:**
```bash
# Find process using port 8000
lsof -i :8000
# Kill the process
kill -9 <PID>
```

**Missing API Key:**
- Ensure you have a valid Mistral AI API key
- Sign up at [Mistral AI](https://mistral.ai/) if you don't have one
- Add the key to your `.env` file

</details>

## 📖 Usage Guide

### Basic Workflow

1. **🔗 Input Source**
   - Paste a GitHub repository URL, or
   - Upload a ZIP file containing your project

2. **⚙️ Configure Options**
   - Select documentation style (Minimal/Standard/Detailed)
   - Choose comment level (None/Basic/Comprehensive)
   - Set output preferences

3. **🤖 Generate Documentation**
   - Click "Generate Documentation"
   - AI analyzes your code structure
   - Documentation is generated automatically

4. **👀 Review Results**
   - Use the interactive preview to review generated content
   - Make edits directly in the markdown editor
   - Real-time preview updates as you type

5. **📥 Export Documentation**
   - Download as ZIP file
   - Copy markdown to clipboard
   - Integrate directly into your repository

### Advanced Features

#### Custom Prompts
Create custom documentation styles by modifying prompt templates:

```python
custom_prompt = {
    "style": "technical",
    "focus": "architecture",
    "include_examples": True,
    "target_audience": "senior_developers"
}
```

#### Batch Processing
Process multiple repositories at once:

```bash
curl -X POST "http://localhost:8000/batch-generate" \
  -H "Content-Type: application/json" \
  -d '{
    "repositories": [
      "https://github.com/user/repo1",
      "https://github.com/user/repo2"
    ],
    "preferences": {...}
  }'
```

## 📚 API Documentation

### Core Endpoints

#### Generate Documentation
```http
POST /api/v1/generate
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

**Response:**
```json
{
  "success": true,
  "documentation": "# Generated Documentation\n...",
  "metadata": {
    "files_processed": 42,
    "generation_time": "5.2s",
    "model_used": "mistral-large-latest"
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

**Response:**
```json
{
  "download_url": "/api/v1/download-zip/abc123def456",
  "status": "completed",
  "expires_at": "2024-01-15T10:30:00Z"
}
```

### Authentication (Optional)

For extended usage, API key authentication is available:

```http
Authorization: Bearer YOUR_API_KEY
```

### Rate Limits

| Tier | Requests/Hour | Max File Size |
|------|---------------|---------------|
| Free | 10 | 10MB |
| Pro | 100 | 100MB |
| Enterprise | Unlimited | 1GB |

## 👥 Team

### Core Contributors

<table>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/100x100/4f46e5/ffffff?text=JD" width="100px;" alt="John Doe"/><br />
      <sub><b>John Doe</b></sub><br />
      <sub>Project Lead & Backend</sub><br />
      <a href="https://github.com/johndoe">🔗 GitHub</a>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100x100/059669/ffffff?text=JS" width="100px;" alt="Jane Smith"/><br />
      <sub><b>Jane Smith</b></sub><br />
      <sub>Frontend & UI/UX</sub><br />
      <a href="https://github.com/janesmith">🔗 GitHub</a>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100x100/dc2626/ffffff?text=MJ" width="100px;" alt="Mike Johnson"/><br />
      <sub><b>Mike Johnson</b></sub><br />
      <sub>AI/ML Integration</sub><br />
      <a href="https://github.com/mikejohnson">🔗 GitHub</a>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100x100/7c3aed/ffffff?text=SB" width="100px;" alt="Sarah Brown"/><br />
      <sub><b>Sarah Brown</b></sub><br />
      <sub>DevOps & Testing</sub><br />
      <a href="https://github.com/sarahbrown">🔗 GitHub</a>
    </td>
  </tr>
</table>

### Individual Contributions

#### 👨‍💻 John Doe - Project Lead & Backend Developer
- **Architecture Design**: Designed the overall system architecture and API structure
- **Backend Development**: Implemented FastAPI server, database models, and core business logic
- **AI Integration**: Integrated Mistral AI and developed prompt engineering strategies
- **DevOps**: Set up CI/CD pipelines and deployment infrastructure
- **Code Review**: Maintained code quality standards and conducted peer reviews

#### 🎨 Jane Smith - Frontend Developer & UI/UX Designer
- **Frontend Architecture**: Built the React application with TypeScript and modern tooling
- **UI/UX Design**: Created the modern, interactive user interface with 3D elements
- **Component Development**: Developed reusable React components and hooks
- **Responsive Design**: Ensured mobile-first responsive design implementation
- **User Experience**: Conducted user testing and iterative design improvements

#### 🤖 Mike Johnson - AI/ML Engineer
- **LLM Integration**: Implemented and optimized language model integrations
- **Prompt Engineering**: Developed sophisticated prompts for high-quality documentation generation
- **Model Performance**: Optimized AI model performance and response quality
- **Code Analysis**: Built intelligent code parsing and analysis algorithms
- **Research & Development**: Explored new AI techniques and model improvements

#### ⚙️ Sarah Brown - DevOps Engineer & QA Lead
- **Infrastructure**: Set up cloud infrastructure and containerization with Docker
- **Testing Strategy**: Developed comprehensive testing suite (unit, integration, e2e)
- **Monitoring**: Implemented logging, monitoring, and error tracking systems
- **Security**: Established security best practices and vulnerability assessments
- **Documentation**: Created technical documentation and deployment guides

### Acknowledgments

Special thanks to:
- **Mistral AI** for providing excellent language model APIs
- **Open Source Community** for the amazing tools and libraries
- **Beta Testers** who provided valuable feedback during development
- **Contributors** who submitted bug reports and feature requests

## 🗺️ Roadmap

### Phase 1: Foundation (Completed ✅)
- [x] Core documentation generation functionality
- [x] GitHub repository integration
- [x] Basic web interface
- [x] Mistral AI integration
- [x] File upload capabilities

### Phase 2: Enhancement (In Progress 🚧)
- [x] Interactive 3D UI components
- [x] Real-time markdown preview
- [x] Improved code analysis
- [ ] User authentication system
- [ ] Advanced customization options
- [ ] Performance optimizations

### Phase 3: Advanced Features (Q2 2024 📅)
- [ ] **Multi-LLM Support**: Integration with OpenAI GPT-4, Anthropic Claude, and Google Bard
- [ ] **IDE Integrations**: VS Code, IntelliJ IDEA, and Sublime Text extensions
- [ ] **Advanced Code Analysis**: Dependency mapping, code complexity analysis
- [ ] **Team Collaboration**: Shared workspaces, review workflows, version control
- [ ] **Custom Templates**: User-defined documentation templates and styles
- [ ] **API Rate Limiting**: Tiered access with usage analytics

### Phase 4: Enterprise Features (Q3 2024 📅)
- [ ] **Self-Hosted Solutions**: On-premises deployment options
- [ ] **Enterprise Security**: SSO, RBAC, audit logging
- [ ] **Advanced Analytics**: Usage insights, code quality metrics
- [ ] **Bulk Processing**: Large-scale repository processing
- [ ] **Integration APIs**: Webhook support, third-party integrations
- [ ] **White-Label Solutions**: Customizable branding options

### Phase 5: Innovation (Q4 2024 📅)
- [ ] **AI-Powered Code Review**: Automated code review with suggestions
- [ ] **Documentation Maintenance**: Auto-update docs when code changes
- [ ] **Multi-Language Support**: Support for 20+ programming languages
- [ ] **Visual Documentation**: Automatic diagram generation (flowcharts, UML)
- [ ] **Voice Interface**: Voice-powered documentation generation
- [ ] **Mobile Applications**: Native iOS and Android apps

### Long-term Vision (2025+)
- **AI Code Assistant**: Complete development workflow automation
- **Educational Platform**: Interactive coding tutorials from documentation
- **Open Source Ecosystem**: Plugin marketplace and community contributions
- **Research & Development**: Academic partnerships for cutting-edge AI research

### Community Requested Features
Vote on upcoming features in our [GitHub Discussions](https://github.com/yourusername/docgen-ai/discussions):

1. **JetBrains IDEs Integration** (89 votes) 🔥
2. **Docker Container Documentation** (67 votes)
3. **API Schema Generation** (54 votes)
4. **Confluence Integration** (43 votes)
5. **Slack Bot Integration** (38 votes)

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

### Development Guidelines

- **Code Style**: We use Black for Python and Prettier for JavaScript/TypeScript
- **Testing**: Maintain >90% test coverage
- **Documentation**: Update docs for any API changes
- **Commit Messages**: Use conventional commit format

### Recognition

Contributors are recognized in our:
- 📋 [Contributors List](CONTRIBUTORS.md)
- 🏆 Monthly contributor highlights
- 🎁 Special swag for significant contributions

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ Liability and warranty not provided

## 📞 Support & Contact

### Getting Help

- 📖 **Documentation**: Check our [comprehensive docs](https://docs.docgen-ai.com)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/docgen-ai/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/docgen-ai/discussions)
- 📧 **Email**: support@docgen-ai.com
- 💬 **Discord**: [Join our community](https://discord.gg/docgen-ai)

### Professional Support

For enterprise clients, we offer:
- Priority support with SLA guarantees
- Custom feature development
- On-site training and consultation
- Dedicated account management

Contact us at enterprise@docgen-ai.com for more information.

---

<div align="center">

**⭐ Star us on GitHub if DocGen AI helps you create better documentation! ⭐**

Made with ❤️ by the DocGen AI team

[Website](https://docgen-ai.com) • [Documentation](https://docs.docgen-ai.com) • [Blog](https://blog.docgen-ai.com) • [Twitter](https://twitter.com/docgenai)

</div>
