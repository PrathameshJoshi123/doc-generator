import React, { useState, useEffect } from "react";
import { FolderTree, Download, Search } from "lucide-react";

interface ProjectStructureProps {
  projectStructure: string;
}

export const ProjectStructure: React.FC<ProjectStructureProps> = ({
  projectStructure,
}) => {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    if (projectStructure && typeof window !== "undefined") {
      // Initialize mermaid
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js";
      script.onload = () => {
        if (window.mermaid) {
          window.mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            themeVariables: {
              primaryColor: "#06B6D4",
              primaryTextColor: "#FFFFFF",
              primaryBorderColor: "#0891B2",
              lineColor: "#6B7280",
              secondaryColor: "#10B981",
              tertiaryColor: "#8B5CF6",
              background: "#1F2937",
              mainBkg: "#374151",
              secondBkg: "#4B5563",
              tertiaryBkg: "#6B7280",
            },
          });

          const id = `mermaid-${Date.now()}`;
          window.mermaid
            .render(id, projectStructure)
            .then((result) => {
              setSvgContent(result.svg);
            })
            .catch((error) => {
              console.error("Mermaid rendering error:", error);
              setSvgContent(
                '<div class="text-red-400 text-center p-8">Error rendering diagram</div>'
              );
            });
        }
      };
      document.head.appendChild(script);
    }
  }, [projectStructure]);

  return (
    <div className="h-[600px] bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/10 overflow-hidden">
      <div className="p-6 border-b border-cyan-500/10 bg-gray-900/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg">
              <FolderTree className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Project Structure
              </h3>
              <p className="text-sm text-gray-400">
                Visual representation of your project
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-88px)] p-6 overflow-auto bg-gray-900/20 backdrop-blur-sm">
        {projectStructure ? (
          <div
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <FolderTree className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No project structure available</p>
              <p className="text-sm">Generate documentation to see structure</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};