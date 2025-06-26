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
  FolderTree,
  File,
  Folder,
} from "lucide-react";
import { Navigation } from "./Navigation";
import { InputSection } from "./InputSection";
import {TabNavigation} from "./TabNavigation"
import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownPreview } from "./MarkdownPreview";
import { ProjectStructure } from "./ProjectStructure";
import { EmptyState } from "./EmptyState";

const GeneratePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [inputType, setInputType] = useState("github");
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [activeTab, setActiveTab] = useState("editor");
  const [projectStructure, setProjectStructure] = useState("");
  const [injectComments, setInjectComments] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadZip = async () => {
    try {
      const response = await fetch(
        `https://doc-generator-e1sk1j5xl-prajwal-kulkarnis-projects.vercel.app${downloadUrl}`,
        {
          method: "GET",
          headers: {
            Accept: "application/x-zip-compressed",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "your-file.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download ZIP:", error);
    }
  };

  const handleGenerateDocs = async () => {
    if (!repoUrl && !uploadedFile) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (repoUrl) {
        formData.append("input_type", "github");
        formData.append("input_data", repoUrl);
      }
      if (uploadedFile) {
        formData.append("input_type", "zip");
        formData.append("zip_file", uploadedFile);
      }
      
      let response;
      let result;
      
      if (!injectComments) {
        response = await fetch(
          "https://doc-generator-e1sk1j5xl-prajwal-kulkarnis-projects.vercel.app/generate",
          {
            method: "POST",
            body: formData,
          }
        );
        result = await response.json();
      } else {
        response = await fetch(
          "https://doc-generator-e1sk1j5xl-prajwal-kulkarnis-projects.vercel.app/generate-and-download",
          {
            method: "POST",
            body: formData,
          }
        );
        result = await response.json();
        setDownloadUrl(result.download_url);
      }

      if (!response.ok) {
        throw new Error("Failed to generate docs");
      }

      setMarkdownContent(result.readme);
      setProjectStructure(result.visuals.folder_structure_mermaid);
      setHasGenerated(true);
    } catch (error) {
      console.error("Error generating docs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/x-zip-compressed") {
      setUploadedFile(file);
    }
  };

  const tabs = [
    { id: "editor", label: "Markdown Editor", icon: Edit },
    { id: "preview", label: "Live Preview", icon: Eye },
    { id: "structure", label: "Project Structure", icon: FolderTree },
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl animate-pulse bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl animate-pulse delay-1000 bg-gradient-to-l from-blue-500/5 to-cyan-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-2xl animate-pulse delay-500 bg-gradient-to-br from-purple-500/3 to-pink-500/3"></div>
      </div>

      {/* Navigation */}
      <Navigation scrollY={scrollY} navigate={navigate} currentPage="generate" />

      {/* Main Content */}
      <div className="relative z-10 w-full">
        {/* Header Section */}
        <div className="w-full bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-2xl shadow-2xl shadow-cyan-500/20 animate-pulse">
                  <Github className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                GitHub Document Generator
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your repositories into beautiful, comprehensive documentation with AI-powered analysis and stunning visual representations.
              </p>
            </div>

            {/* Input Section */}
            <InputSection
              inputType={inputType}
              setInputType={setInputType}
              repoUrl={repoUrl}
              setRepoUrl={setRepoUrl}
              uploadedFile={uploadedFile}
              handleFileUpload={handleFileUpload}
              injectComments={injectComments}
              setInjectComments={setInjectComments}
              handleGenerateDocs={handleGenerateDocs}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {hasGenerated ? (
            <div className="space-y-8">
              {/* Tab Navigation */}
              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Tab Content */}
              <div className="min-h-[600px]">
                {activeTab === "editor" && (
                  <MarkdownEditor
                    markdownContent={markdownContent}
                    setMarkdownContent={setMarkdownContent}
                  />
                )}

                {activeTab === "preview" && (
                  <MarkdownPreview markdownContent={markdownContent} />
                )}

                {activeTab === "structure" && (
                  <ProjectStructure projectStructure={projectStructure} />
                )}
              </div>

              {/* Download Section */}
              {injectComments && (
                <div className="flex justify-center pt-8">
                  <button
                    className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 border border-cyan-400/20"
                    onClick={handleDownloadZip}
                  >
                    <Folder className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Download Full Project ZIP
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <EmptyState inputType={inputType} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-t from-black to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 mt-20 border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center space-x-4 mb-8 md:mb-0">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl shadow-lg shadow-cyan-500/25">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  DocGen
                </span>
                <p className="text-gray-400 text-sm">
                  AI-Powered Documentation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-8 text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:scale-105 transform">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:scale-105 transform">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:scale-105 transform">
                Support
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800/50 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2024 DocGen. All rights reserved. Built with{" "}
              <span className="text-red-400 animate-pulse">❤️</span> for
              developers who value great documentation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeneratePage;