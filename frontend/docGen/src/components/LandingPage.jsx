import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import HyperspeedSection from "./HyperSpeedsection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import Footer from "./Footer";
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

  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = () => setIsMenuOpen(false);
      const handleScroll = () => setIsMenuOpen(false);

      document.addEventListener("click", handleClickOutside);
      window.addEventListener("scroll", handleScroll);

      return () => {
        document.removeEventListener("click", handleClickOutside);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        handleNavigate={handleNavigate}
      />

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <main className="w-full  ">
        <FadeInSection>
          <div>
            <HeroSection handleNavigate={handleNavigate} />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div >
            <HyperspeedSection />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
            <FeaturesSection />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
            <HowItWorksSection />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
            <TestimonialsSection />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
            <CTASection handleNavigate={handleNavigate} />
          </div>
        </FadeInSection>

        <FadeInSection>
          <Footer />
        </FadeInSection>
      </main>
    </div>
  );
};

export default LandingPage;
