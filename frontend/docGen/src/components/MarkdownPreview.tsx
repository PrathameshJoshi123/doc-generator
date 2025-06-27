import React from "react";
import { Eye, Download, ExternalLink } from "lucide-react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm' 

interface MarkdownPreviewProps {
  markdownContent: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  markdownContent,
}) => {
  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Custom components for react-markdown
  const components = {
    // Headings
    h1: ({ children, ...props }) => (
      <h1 
        className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mt-0 mb-8 flex items-start group"
        {...props}
      >
        <div className="w-3 h-10 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
        <span className="text-left">{children}</span>
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 
        className="text-2xl font-bold text-blue-300 mt-10 mb-6 flex items-start group"
        {...props}
      >
        <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
        <span className="text-left">{children}</span>
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 
        className="text-xl font-semibold text-cyan-300 mt-8 mb-4 flex items-start group"
        {...props}
      >
        <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform"></div>
        <span className="text-left">{children}</span>
      </h3>
    ),
    
    // Paragraphs
    p: ({ children, ...props }) => (
      <p className="mb-4 text-gray-200 leading-relaxed text-lg text-left" {...props}>
        {children}
      </p>
    ),
    
    // Lists
    ul: ({ children, ...props }) => (
      <ul className="my-4 space-y-3" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 space-y-3" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-gray-200 text-lg group flex items-start" {...props}>
        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-3 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
        <span className="text-left flex-1">{children}</span>
      </li>
    ),
    
    // Code
    code: ({ inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code 
            className="bg-cyan-500/20 text-cyan-200 px-2 py-1 rounded-lg text-sm border border-cyan-500/30 font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className="text-cyan-200 font-mono" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <div className="bg-gray-900/60 border border-cyan-500/20 rounded-xl p-6 my-6 font-mono text-sm backdrop-blur-sm shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            Code
          </span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
        <pre className="text-cyan-200 text-left overflow-x-auto" {...props}>
          {children}
        </pre>
      </div>
    ),
    
    // Emphasis
    strong: ({ children, ...props }) => (
      <strong 
        className="text-cyan-300 font-semibold bg-cyan-500/10 px-1 rounded"
        {...props}
      >
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="text-blue-300 italic" {...props}>
        {children}
      </em>
    ),
    
    // Links
    a: ({ children, href, ...props }) => (
      <a 
        href={href}
        className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 hover:decoration-cyan-300 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    
    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="border-l-4 border-cyan-500/50 pl-6 py-2 my-6 bg-cyan-500/5 rounded-r-lg italic text-gray-300"
        {...props}
      >
        {children}
      </blockquote>
    ),
    
    // Horizontal rule
    hr: ({ ...props }) => (
      <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" {...props} />
    ),
    
    // Images
    img: ({ src, alt, ...props }) => (
      <img 
        src={src} 
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-lg my-4"
        {...props}
      />
    )
  };

  return (
    <div className="h-[600px] bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/10 overflow-hidden">
      <div className="p-6 border-b border-cyan-500/10 bg-gray-900/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Live Preview</h3>
              <p className="text-sm text-gray-400">
                See how your documentation looks
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110"
              title="Download markdown"
            >
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110">
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-88px)] p-6 overflow-y-auto bg-gray-900/20 backdrop-blur-sm custom-scrollbar">
        <div className="e text-gray-100 text-left prose prose-invert max-w-none">
          <Markdown 
            components={components}
           
            remarkPlugins={[remarkGfm]} // for GitHub Flavored Markdown
            
          >
            {markdownContent}
          </Markdown>
        </div>
      </div>
      {/* <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style> */}
    </div>
  );
};