import React, { useState, useEffect, useRef } from "react";
import { FolderTree, Download, Search, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ProjectStructureProps {
  projectStructure: string;
}

export const ProjectStructure: React.FC<ProjectStructureProps> = ({
  projectStructure = `graph TD
    A[Root Directory] --> B[src/]
    A --> C[public/]
    A --> D[package.json]
    B --> E[components/]
    B --> F[pages/]
    B --> G[utils/]
    E --> H[Header.tsx]
    E --> I[Footer.tsx]
    F --> J[Home.tsx]
    F --> K[About.tsx]`,
}) => {
  const [svgContent, setSvgContent] = useState("");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectStructure && typeof window !== "undefined") {
      // Check if mermaid is already loaded
      if (window.mermaid) {
        renderMermaid();
      } else {
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
            renderMermaid();
          }
        };
        document.head.appendChild(script);
      }
    }
  }, [projectStructure]);

  const renderMermaid = () => {
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
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 7));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.7));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.3), 3));
  };

  return (
    <div className="h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-cyan-500/10 overflow-hidden">
      <div className="p-3 sm:p-4 lg:p-6 border-b border-cyan-500/10 bg-gray-900/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
              <FolderTree className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white truncate">
                Project Structure
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                Visual representation of your project
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
              <button 
                onClick={handleZoomOut}
                className="p-1.5 sm:p-2 rounded-md transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="text-xs text-gray-400 px-2 min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button 
                onClick={handleZoomIn}
                className="p-1.5 sm:p-2 rounded-md transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={handleReset}
                className="p-1.5 sm:p-2 rounded-md transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
           
          </div>
        </div>
      </div>
      <div 
        ref={containerRef}
        className="h-[calc(100%-60px)] sm:h-[calc(100%-80px)] lg:h-[calc(100%-88px)] p-3 sm:p-4 lg:p-6 overflow-hidden bg-gray-900/20 backdrop-blur-sm relative"
        onWheel={handleWheel}
      >
        {projectStructure ? (
          <div
            ref={svgRef}
            className={`w-full h-full flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: svgContent }} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <FolderTree className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
              <p className="text-base sm:text-lg">No project structure available</p>
              <p className="text-xs sm:text-sm">Generate documentation to see structure</p>
            </div>
          </div>
        )}
        
        {/* Instructions overlay */}
        <div className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-300">
          {/* <p className="mb-1">• Scroll to zoom</p> */}
          <p className="mb-1">• Click and drag to pan</p>
          <p>• Use controls to zoom/reset</p>
        </div>
      </div>
    </div>
  );
};