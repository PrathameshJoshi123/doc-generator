import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Orb from "../reactBits/Orb";
import SpotlightCard from "../reactBits/SpotlightCard";
import {
  Github,
  FileText,
  Zap,
  Shield,
  Code,
  Star,
  ArrowRight,
  Check,
  Menu,
  X,
  Link,
  Sparkles,
  BookOpen,
  Download,
  Eye,
  Users,
  Clock,
  Layers,
  Moon,
  Sun,
} from "lucide-react";
import BlurText from "../reactBits/BlurText";
import Hyperspeed from "../reactBits/Hyperspeed";
import FadeInSection from "./FadeInSection";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/generate");
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const features = [
    {
      icon: <Link className="w-6 h-6" />,
      title: "Simple URL Input",
      description:
        "Just paste any public GitHub repository URL and our AI will analyze it instantly.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Smart Documentation",
      description:
        "AI-powered analysis generates comprehensive, structured documentation from your codebase.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Live Preview",
      description:
        "See your code and generated documentation side-by-side with real-time updates.",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Ready",
      description:
        "Download beautiful markdown files ready for your README, wiki, or documentation site.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      content:
        "This tool saved me hours of documentation work. The AI understands code structure perfectly.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9512b2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead",
      content:
        "The side-by-side view makes it so easy to review and refine the generated documentation.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Emily Johnson",
      role: "Open Source Maintainer",
      content:
        "Perfect for open source projects. My contributors finally understand the codebase!",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const howItWorksSteps = [
    {
      icon: <Link className="w-8 h-8 text-cyan-400" />,
      title: "Enter Repository URL",
      description:
        "Paste the GitHub repository URL or upload a ZIP file of your project.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "Generate Documentation",
      description:
        "Click the Generate Docs button to analyze your code and create documentation.",
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-400" />,
      title: "Review & Preview",
      description:
        "View the generated markdown, live preview, and project structure instantly.",
    },
    {
      icon: <Download className="w-8 h-8 text-green-400" />,
      title: "Export & Download",
      description:
        "Export your documentation or download the enhanced project as a ZIP file.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
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
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                DocGen
              </span>
            </a>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  How it Works
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  Testimonials
                </a>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                  onClick={handleNavigate}
                >
                  Try Now
                </button>
              </div>
              <button
                onClick={() => setDarkMode((d) => !d)}
                className="ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                )}
              </button>
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                  className="text-gray-700 dark:text-gray-200"
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
            <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="px-4 pt-2 pb-3 space-y-1">
                <a
                  href="#features"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How it Works
                </a>
                <a
                  href="#testimonials"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </a>
                <button
                  className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md mt-2 hover:bg-blue-700 transition-colors"
                  onClick={handleNavigate}
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <FadeInSection>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8 inline-flex items-center space-x-2 bg-blue-100 dark:bg-gray-800 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-yellow-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-yellow-200">
                AI-Powered Documentation Generator
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              Transform GitHub Code into
              <br />
              <span>
                <BlurText
                  text="Beautiful Documentation!"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="justify-center text-blue-600 dark:text-blue-400"
                />
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-3 max-w-3xl mx-auto leading-relaxed">
              Simply paste a GitHub repository URL and watch as our AI creates
              comprehensive, professional documentation. View code and docs
              side-by-side, then export as markdown.
            </p>
            <div
              className="flex flex-col items-center justify-center mb-8 md:flex-row md:justify-center md:gap-16"
              style={{ width: "100%" }}
            >
              <div
                style={{ width: 320, height: 320 }}
                className="relative mt-0 flex-shrink-0 flex items-center justify-center"
              >
                <Orb
                  hoverIntensity={0.5}
                  rotateOnHover={true}
                  hue={0}
                  forceHoverState={false}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-blue-600 rounded-full p-4 shadow-lg flex items-center justify-center">
                    <FileText className="w-20 h-20 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center mt-8 md:mt-0">
                <button
                  className="group relative bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-lg w-64 overflow-hidden"
                  onClick={handleNavigate}
                >
                  <div className="w-full absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-100"></div>
                    <div className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-300"></div>
                    <div className="absolute bottom-3 left-12 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-500"></div>
                    <div className="absolute bottom-2 right-4 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-700"></div>
                  </div>
                  <div className="relative flex items-center space-x-3 z-10">
                    <Github className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    <span className="group-hover:tracking-wide transition-all duration-300">
                      Generate Documentation
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </button>

                <button className="px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-64">
                  View Demo
                </button>
              </div>
            </div>
            {/* Demo URL Example */}

            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-3 font-medium">
                  Try with this example repository:
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-700 dark:text-gray-200 border dark:border-gray-700">
                  https://github.com/username/awesome-project
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { number: "10K+", label: "Repositories Processed" },
                { number: "500+", label: "Happy Developers" },
                { number: "50K+", label: "Docs Generated" },
                { number: "99%", label: "Accuracy Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
      <FadeInSection>
        {/* Hyperspeed Visual Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Lightning Fast Processing
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Experience the speed of AI-powered code analysis and
                documentation generation
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-2xl">
              <div
                className="w-full h-80 md:h-96 lg:h-[400px] relative"
                style={{ minHeight: "320px" }}
              >
                <Hyperspeed
                  effectOptions={{
                    onSpeedUp: () => {},
                    onSlowDown: () => {},
                    distortion: "turbulentDistortion",
                    length: 400,
                    roadWidth: 10,
                    islandWidth: 2,
                    lanesPerRoad: 4,
                    fov: 90,
                    fovSpeedUp: 150,
                    speedUp: 2,
                    carLightsFade: 0.4,
                    totalSideLightSticks: 20,
                    lightPairsPerRoadWay: 40,
                    shoulderLinesWidthPercentage: 0.05,
                    brokenLinesWidthPercentage: 0.1,
                    brokenLinesLengthPercentage: 0.5,
                    lightStickWidth: [0.12, 0.5],
                    lightStickHeight: [1.3, 1.7],
                    movingAwaySpeed: [60, 80],
                    movingCloserSpeed: [-120, -160],
                    carLightsLength: [400 * 0.03, 400 * 0.2],
                    carLightsRadius: [0.05, 0.14],
                    carWidthPercentage: [0.3, 0.5],
                    carShiftX: [-0.8, 0.8],
                    carFloorSeparation: [0, 5],
                    colors: {
                      roadColor: 0x080808,
                      islandColor: 0x0a0a0a,
                      background: 0x000000,
                      shoulderLines: 0xffffff,
                      brokenLines: 0xffffff,
                      leftCars: [0x3b82f6, 0x1d4ed8, 0x1e40af],
                      rightCars: [0x06b6d4, 0x0891b2, 0x0e7490],
                      sticks: 0x06b6d4,
                    },
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center z-10">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                      Process Any Repository
                    </h3>
                    <p className="text-lg md:text-xl text-cyan-200 max-w-2xl mx-auto px-4 drop-shadow-lg">
                      From small scripts to enterprise codebases
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none"></div>
              </div>
            </div>

            {/* Additional stats or info below the hyperspeed effect */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  &lt;30s
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Average processing time
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  1M+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Lines of code analyzed
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  50+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Programming languages supported
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
      <FadeInSection>
        {/* Features Section */}
        <section
          id="features"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Powerful Features for Better Documentation
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to create professional documentation from
                any GitHub repository
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <SpotlightCard
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-400 group"
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
      <FadeInSection>
        {/* How it Works Section */}
        <section
          id="how-it-works"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/40 dark:to-gray-800"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-900/60 via-blue-900/40 to-gray-900/80 rounded-3xl shadow-2xl border border-cyan-500/20 p-10">
              <h2 className="text-3xl font-extrabold text-white mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                How it works
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                {howItWorksSteps.map((step, idx) => (
                  <div
                    key={step.title}
                    className="flex flex-col items-center text-center group transition-transform duration-300 hover:scale-105"
                  >
                    <div className="relative mb-4">
                      <div className="absolute -top-3 -left-3 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-cyan-500/20 z-10">
                        <span className="text-xl font-bold text-white">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="bg-gray-900/80 border border-cyan-500/20 rounded-full p-5 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-cyan-200 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
      <FadeInSection>
        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Trusted by Developers Worldwide
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See what developers are saying about DocGen
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <SpotlightCard
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
      <FadeInSection>
        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Create Amazing Documentation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of developers who are creating professional
              documentation with just a GitHub URL. Start for free today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                className="group bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg"
                onClick={handleNavigate}
              >
                <Github className="w-5 h-5" />
                <span>Start Generating</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>No account required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Export ready</span>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
      <FadeInSection>
        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">DocGen</span>
              </div>

              <div className="flex space-x-8 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>
                &copy; 2025 DocGen. All rights reserved. Built with ❤️ for
                developers who value great documentation.
              </p>
            </div>
          </div>
        </footer>
      </FadeInSection>
    </div>
  );
};

export default LandingPage;
