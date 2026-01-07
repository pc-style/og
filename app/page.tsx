"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Image,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Link,
  Upload,
  FileText,
  Code,
  Gamepad2,
  Cpu,
  Globe,
  Zap,
  Shield,
  Clock,
  Terminal,
  Sparkles,
  Monitor,
  Box,
  Layers,
  Calculator,
} from "lucide-react";

const iconOptions = [
  { name: "link", icon: Link, label: "Link" },
  { name: "upload", icon: Upload, label: "Upload" },
  { name: "file", icon: FileText, label: "File" },
  { name: "code", icon: Code, label: "Code" },
  { name: "gamepad", icon: Gamepad2, label: "Game" },
  { name: "cpu", icon: Cpu, label: "CPU" },
  { name: "globe", icon: Globe, label: "Globe" },
  { name: "zap", icon: Zap, label: "Zap" },
  { name: "shield", icon: Shield, label: "Shield" },
  { name: "clock", icon: Clock, label: "Clock" },
  { name: "terminal", icon: Terminal, label: "Terminal" },
  { name: "sparkles", icon: Sparkles, label: "Sparkles" },
  { name: "monitor", icon: Monitor, label: "Monitor" },
  { name: "box", icon: Box, label: "Box" },
  { name: "layers", icon: Layers, label: "Layers" },
  { name: "calculator", icon: Calculator, label: "Calc" },
];

const themeOptions = [
  { name: "magenta", color: "#ff00ff", label: "Magenta" },
  { name: "cyan", color: "#00ffff", label: "Cyan" },
];

export default function Home() {
  const [title, setTitle] = useState("LINK SHORTENER");
  const [subtitle, setSubtitle] = useState("s.pcstyle.dev");
  const [selectedIcon, setSelectedIcon] = useState("link");
  const [selectedTheme, setSelectedTheme] = useState("magenta");
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const generateUrl = useCallback(() => {
    const params = new URLSearchParams({
      title,
      subtitle,
      icon: selectedIcon,
      theme: selectedTheme,
    });
    return `/api/og?${params.toString()}`;
  }, [title, subtitle, selectedIcon, selectedTheme]);

  const fullUrl = `https://og.pcstyle.dev${generateUrl()}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const refreshPreview = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-[#ff00ff]/20 bg-black/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-[#ff00ff] flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_#ff00ff66]">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase group-hover:text-[#ff00ff] transition-colors">
                og<span className="text-[#ff00ff]/40">.pcstyle.dev</span>
              </h1>
              <p className="text-xs text-gray-600 uppercase tracking-[0.3em]">
                OG_IMAGE_GENERATOR
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SYSTEM_ONLINE
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  TITLE
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 bg-black border border-[#ff00ff]/30 rounded-lg text-white placeholder-gray-600 outline-none focus:border-[#ff00ff] focus:shadow-[0_0_20px_#ff00ff44] transition-all"
                  placeholder="Enter title..."
                />
              </div>

              {/* Subtitle Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  SUBTITLE
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full p-4 bg-black border border-[#ff00ff]/30 rounded-lg text-white placeholder-gray-600 outline-none focus:border-[#ff00ff] focus:shadow-[0_0_20px_#ff00ff44] transition-all"
                  placeholder="Enter subtitle..."
                />
              </div>

              {/* Icon Selector */}
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  ICON
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {iconOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = selectedIcon === option.name;
                    return (
                      <button
                        key={option.name}
                        onClick={() => setSelectedIcon(option.name)}
                        className={`p-3 border rounded-lg transition-all ${isSelected
                            ? "border-[#ff00ff] bg-[#ff00ff]/10 text-[#ff00ff] shadow-[0_0_15px_#ff00ff44]"
                            : "border-gray-800 text-gray-600 hover:border-gray-600 hover:text-gray-400"
                          }`}
                        title={option.label}
                      >
                        <IconComponent className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme Selector */}
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  THEME
                </label>
                <div className="flex gap-3">
                  {themeOptions.map((option) => {
                    const isSelected = selectedTheme === option.name;
                    return (
                      <button
                        key={option.name}
                        onClick={() => setSelectedTheme(option.name)}
                        className={`flex items-center gap-3 px-4 py-3 border rounded-lg transition-all ${isSelected
                            ? "border-current bg-opacity-10"
                            : "border-gray-800 hover:border-gray-600"
                          }`}
                        style={{
                          borderColor: isSelected ? option.color : undefined,
                          backgroundColor: isSelected
                            ? `${option.color}11`
                            : undefined,
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: option.color,
                            boxShadow: isSelected
                              ? `0 0 10px ${option.color}`
                              : undefined,
                          }}
                        />
                        <span
                          style={{ color: isSelected ? option.color : "#888" }}
                          className="text-sm uppercase tracking-wider"
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* URL Output */}
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  API_URL
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 p-4 bg-black/50 border border-[#ff00ff]/20 rounded-lg text-xs text-gray-400 overflow-x-auto whitespace-nowrap">
                    {fullUrl}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 border rounded-lg transition-all ${copied
                        ? "border-green-500 bg-green-500/10 text-green-400"
                        : "border-[#ff00ff]/30 text-[#ff00ff] hover:bg-[#ff00ff]/10"
                      }`}
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-500 uppercase tracking-wider">
                PREVIEW
              </label>
              <div className="flex gap-2">
                <button
                  onClick={refreshPreview}
                  className="p-2 text-gray-600 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                  title="Refresh preview"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <a
                  href={generateUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative aspect-[1200/630] border border-[#ff00ff]/20 rounded-lg overflow-hidden bg-black">
              <img
                key={key}
                src={generateUrl()}
                alt="OG Image Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-gray-600 text-center">
              1200 × 630px • PNG • Edge-cached
            </p>
          </motion.div>
        </div>

        {/* Usage Examples */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-20 space-y-6"
        >
          <h2 className="text-xs text-gray-500 uppercase tracking-[0.3em]">
            USAGE_EXAMPLES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/50 border border-[#ff00ff]/10 rounded-lg">
              <p className="text-xs text-[#ff00ff] uppercase tracking-wider mb-2">
                NEXT.JS METADATA
              </p>
              <pre className="text-xs text-gray-400 overflow-x-auto">
                {`export const metadata = {
  openGraph: {
    images: ['${fullUrl}'],
  },
};`}
              </pre>
            </div>

            <div className="p-4 bg-black/50 border border-[#ff00ff]/10 rounded-lg">
              <p className="text-xs text-[#ff00ff] uppercase tracking-wider mb-2">
                HTML META TAG
              </p>
              <pre className="text-xs text-gray-400 overflow-x-auto">
                {`<meta property="og:image" 
  content="${fullUrl}" />`}
              </pre>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#ff00ff]/10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] text-[#ff00ff] font-black uppercase tracking-[0.5em] opacity-30">
              © 2025 pcstyle.dev
            </p>
            <span className="text-[10px] text-gray-800 uppercase tracking-widest">
              PROTOCOL: OG-777-ALPHA
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
