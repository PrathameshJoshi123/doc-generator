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
  ChevronDown,
  GitBranch,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Navigation from "./Navigation";
import { InputSection } from "../components/InputSection";
import { TabNavigation } from "../components/TabNavigation";
import { MarkdownEditor } from "../components/MarkdownEditor";
import { MarkdownPreview } from "../components/MarkdownPreview";
import { ProjectStructure } from "../components/ProjectStructure";
import { EmptyState } from "../components/EmptyState";
import { LoadingScreen } from "./LoadingScreen";
import axios from "axios";

const GeneratePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [inputType, setInputType] = useState("github");
  const [repoUrl, setRepoUrl] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [activeTab, setActiveTab] = useState("editor");
  const [projectStructure, setProjectStructure] = useState("");
  const [injectComments, setInjectComments] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const navigate = useNavigate();
  const [repo, setRepo] = useState("");

  const apiURL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadZip = async () => {
    try {
      const response = await fetch(`${apiURL}${downloadUrl}`, {
        method: "GET",
        headers: {
          Accept: "application/x-zip-compressed",
        },
      });

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

      if (repoUrl && !uploadedFile) {
        formData.append("input_type", "github");
        formData.append("input_data", repoUrl);
        formData.append("branch", selectedBranch);
      } else if (uploadedFile && !repoUrl) {
        formData.append("input_type", "zip");
        formData.append("zip_file", uploadedFile);
      } else {
        throw new Error(
          "Provide either a GitHub repo URL or a ZIP file, not both."
        );
      }

      const endpoint = injectComments
        ? `${apiURL}/generate-and-download`
        : `${apiURL}/generate`;

      const response = await axios.post(endpoint, formData, {
        timeout: 1200000, // 20 minutes
      });

      const result = response.data;

      if (injectComments && result.download_url) {
        setDownloadUrl(result.download_url);
      }
      setRepo(repoUrl);
      console.log("inside handleGenerateDocs", repo)
      setMarkdownContent(result.readme);
      setProjectStructure(result.visuals.folder_structure_mermaid);
      setHasGenerated(true);
      setRepoUrl("");
      setUploadedFile(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
        console.error("Request timed out after 5 minutes");
      } else {
        console.error("Error generating docs:", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        }
      }
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
    <div className="min-h-screen w-full bg-gray-900 relative overflow-hidden">
      {/* Loading Screen */}
      <LoadingScreen isVisible={isLoading} />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl animate-pulse bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl animate-pulse delay-1000 bg-gradient-to-l from-blue-500/5 to-cyan-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-2xl animate-pulse delay-500 bg-gradient-to-br from-purple-500/3 to-pink-500/3"></div>
      </div>

      {/* Navigation */}
      <Navigation
        scrollY={scrollY}
        navigate={navigate}
        currentPage="generate"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full">
        {/* Header Section */}
        <div className="w-full bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 pt-16 sm:pt-20 pb-6 sm:pb-8">
          <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-6">
            {/* Hero Section */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl shadow-cyan-500/20 animate-pulse">
                  <Github className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent px-2">
                GitHub Document Generator
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                Transform your repositories into beautiful, comprehensive
                documentation with AI-powered analysis and stunning visual
                representations.
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
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
          {hasGenerated ? (
            <div className="space-y-6 sm:space-y-8">
              {/* Tab Navigation */}
              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Tab Content */}
              <div className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                {activeTab === "editor" && (
                  <MarkdownEditor
                    markdownContent={markdownContent}
                    setMarkdownContent={setMarkdownContent}
                  />
                )}

                {activeTab === "preview" && (
                  <MarkdownPreview markdownContent={markdownContent} repo={repo} />
                )}

                {activeTab === "structure" && (
                  <ProjectStructure projectStructure={projectStructure} />
                )}
              </div>

              {/* Download Section */}
              {injectComments && (
                <div className="flex justify-center pt-6 sm:pt-8">
                  <button
                    className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm sm:text-base lg:text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 border border-cyan-400/20"
                    onClick={handleDownloadZip}
                  >
                    <Folder className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Download Full Project ZIP</span>
                    <span className="sm:hidden">Download ZIP</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
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
      <footer className="relative z-10 bg-gradient-to-t from-black to-gray-900 text-white py-12 sm:py-16 px-3 sm:px-4 lg:px-6 xl:px-8 mt-16 sm:mt-20 border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 sm:mb-12">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-6 lg:mb-0">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg shadow-cyan-500/25">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  DocGen
                </span>
                <p className="text-gray-400 text-xs sm:text-sm">
                  AI-Powered Documentation
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-gray-400 text-sm sm:text-base">
              <a
                href="#"
                className="hover:text-cyan-400 transition-colors duration-300 hover:scale-105 transform"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-cyan-400 transition-colors duration-300 hover:scale-105 transform"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-cyan-400 transition-colors duration-300 hover:scale-105 transform"
              >
                Support
              </a>
              <a
                href="#"
                className="hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800/50 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
              &copy; 2025 DocGen. All rights reserved. Built with{" "}
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
