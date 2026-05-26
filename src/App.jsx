import { useState, useEffect, useRef } from "react";
import {
  Search,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Cpu,
  Layers,
  Heart,
  Compass,
  X,
  ChevronRight,
  ArrowRight,
  Code,
  Lock,
  Menu
} from "lucide-react";
import PROMPTS, { CATEGORIES } from "./data/prompts";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTool, setSelectedTool] = useState("All");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [likedPrompts, setLikedPrompts] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sections references for smooth scrolling
  const heroRef = useRef(null);
  const trendingRef = useRef(null);
  const categoriesRef = useRef(null);
  const exploreRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollTo = (elementRef) => {
    setIsMobileMenuOpen(false);
    elementRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLike = (id) => {
    setLikedPrompts((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter logic
  const filteredPrompts = PROMPTS.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.promptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
    const matchesTool =
      selectedTool === "All" || prompt.tool.toLowerCase().includes(selectedTool.toLowerCase());
    return matchesSearch && matchesCategory && matchesTool;
  });

  const tools = ["All", "Midjourney", "Flux", "Leonardo", "ChatGPT"];

  return (
    <div className="relative min-h-screen bg-dark-950 selection:bg-sage-600/30 selection:text-sage-100 overflow-x-hidden">
      
      {/* Cinematic Ambient Spotlights */}
      <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] glow-teal rounded-full pointer-events-none opacity-40 animate-pulse-slow"></div>
      <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] glow-peach rounded-full pointer-events-none opacity-20"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[70vw] h-[70vw] glow-sky rounded-full pointer-events-none opacity-15"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] glow-teal rounded-full pointer-events-none opacity-25 animate-pulse-slow"></div>

      {/* Floating Header / Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl glass rounded-full py-3.5 px-6 md:px-8 flex items-center justify-between z-50 transition-all duration-300 hover:border-sage-300/20 shadow-2xl">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sage-500 via-teal-500 to-peach-400 p-[1.5px] shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-md bg-dark-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-peach-300 animate-pulse" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-sage-100 to-peach-100 bg-clip-text text-transparent">
            DreamLens
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-sage-300">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => scrollTo(trendingRef)} className="hover:text-white transition-colors">Trending</button>
          <button onClick={() => scrollTo(categoriesRef)} className="hover:text-white transition-colors">Categories</button>
          <button onClick={() => scrollTo(exploreRef)} className="hover:text-white transition-colors">Explore</button>
          <button onClick={() => scrollTo(pricingRef)} className="hover:text-white transition-colors">Pricing</button>
        </div>

        {/* Desktop Call to Action */}
        <div className="hidden md:block">
          <button 
            onClick={() => scrollTo(exploreRef)}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold text-white rounded-full group bg-gradient-to-br from-sage-400 via-teal-500 to-peach-400 group-hover:from-sage-400 group-hover:via-teal-500 group-hover:to-peach-400 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-teal-800"
          >
            <span className="relative px-4.5 py-2 transition-all ease-in duration-75 bg-dark-950 rounded-full group-hover:bg-opacity-0">
              Browse Prompts
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-sage-300 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Dropdown Panel */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 glass rounded-3xl mt-2 py-6 px-6 flex flex-col gap-4 shadow-2xl border border-sage-300/10 md:hidden animate-fade-in">
            <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsMobileMenuOpen(false); }} className="text-left text-sage-300 hover:text-white py-2 border-b border-white/5">Home</button>
            <button onClick={() => scrollTo(trendingRef)} className="text-left text-sage-300 hover:text-white py-2 border-b border-white/5">Trending</button>
            <button onClick={() => scrollTo(categoriesRef)} className="text-left text-sage-300 hover:text-white py-2 border-b border-white/5">Categories</button>
            <button onClick={() => scrollTo(exploreRef)} className="text-left text-sage-300 hover:text-white py-2 border-b border-white/5">Explore</button>
            <button onClick={() => scrollTo(pricingRef)} className="text-left text-sage-300 hover:text-white py-2 border-b border-white/5">Pricing</button>
            <button onClick={() => scrollTo(exploreRef)} className="w-full text-center py-3 bg-gradient-to-r from-sage-500 to-teal-600 text-white rounded-full font-semibold mt-2">
              Browse Library
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Decorative ambient ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg aspect-square bg-gradient-to-tr from-sage-500/10 to-peach-400/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-sage-300/10 text-sage-300 text-xs font-medium mb-8 animate-float shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-peach-300" />
          <span>Curated Premium AI Art Prompts</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 bg-gradient-to-b from-white via-sage-100 to-sage-400 bg-clip-text text-transparent max-w-4xl">
          Turn Ideas Into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-peach-300 via-teal-300 to-sky-300 bg-clip-text text-transparent">Cinematic AI Art</span>
        </h1>

        <p className="text-sage-300/80 text-base sm:text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
          Unlock high-fidelity visual aesthetics. DreamLens is a curated directory of professional, production-tested prompts designed for Midjourney, Flux, and DALL-E.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
          <button
            onClick={() => scrollTo(exploreRef)}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sage-500 via-teal-600 to-peach-400 text-dark-950 font-bold rounded-full shadow-lg shadow-teal-500/10 hover:shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            Explore Prompts
          </button>
          <button
            onClick={() => scrollTo(trendingRef)}
            className="w-full sm:w-auto px-8 py-3.5 glass hover:bg-white/5 border border-sage-300/10 text-sage-200 font-semibold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            Trending Styles
          </button>
        </div>
      </section>

      {/* Trending Prompt Showcase (Horizontal Slider) */}
      <section ref={trendingRef} className="py-16 md:py-24 border-y border-white/5 bg-dark-900/40 relative">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-peach-300">
              <Cpu className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">Hot Collections</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Trending Prompts</h2>
          </div>
          <p className="text-sage-400 text-sm max-w-md leading-relaxed font-light">
            These recipes are currently generating the highest community engagement and aesthetic accuracy.
          </p>
        </div>

        {/* Scroll Container */}
        <div className="overflow-x-auto no-scrollbar pb-8 px-6 flex gap-6 snap-x">
          {PROMPTS.slice(0, 5).map((prompt) => (
            <div
              key={prompt.id}
              onClick={() => setSelectedPrompt(prompt)}
              className="flex-shrink-0 w-[290px] sm:w-[380px] glass rounded-2xl overflow-hidden group cursor-pointer snap-start transition-all duration-300 border border-white/5 hover:border-sage-400/20 shadow-2xl relative"
            >
              {/* Thumbnail Container */}
              <div className="h-44 sm:h-52 w-full overflow-hidden relative">
                <img
                  src={prompt.image}
                  alt={prompt.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-peach-200 px-2 py-0.5 rounded-full">
                  {prompt.tool}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-sage-400 mb-1">{prompt.category}</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-peach-200 transition-colors">
                    {prompt.title}
                  </h3>
                  <p className="text-sage-300/70 text-xs line-clamp-2 leading-relaxed mb-4">
                    {prompt.promptText}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] text-sage-500 font-mono">by @{prompt.author}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(prompt.id, prompt.promptText);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sage-800/50 hover:bg-sage-700 text-[10px] font-semibold text-sage-100 rounded-md transition-all duration-200 border border-white/5 active:scale-95"
                  >
                    {copiedId === prompt.id ? (
                      <>
                        <Check className="w-3 h-3 text-peach-300" />
                        <span className="text-peach-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid Section */}
      <section ref={categoriesRef} className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center items-center gap-2 mb-2 text-teal-400">
            <Layers className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-semibold">Visual Taxonomy</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Aesthetic Categories</h2>
          <p className="text-sage-400 text-sm md:text-base font-light">
            Filter by styles calibrated for dramatic cinematic outcomes. Jump into specific render configurations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                setSelectedCategory(selectedCategory === cat.name ? null : cat.name);
                scrollTo(exploreRef);
              }}
              className={`group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transition-all duration-500 border ${
                selectedCategory === cat.name
                  ? "border-peach-300 shadow-[0_0_20px_rgba(255,120,83,0.2)] scale-[1.02]"
                  : "border-white/5 hover:border-sage-400/20"
              }`}
            >
              {/* Background Thumbnail */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent group-hover:via-dark-950/40 transition-all duration-300"></div>

              {/* Text Meta */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <span className="text-lg mb-1">{cat.emoji}</span>
                <h3 className="text-sm font-bold text-white mb-0.5 tracking-tight group-hover:text-peach-200 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-sage-400 font-mono font-light">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Explore Prompt Library (Filter/Search & List) */}
      <section ref={exploreRef} className="py-16 md:py-24 border-t border-white/5 bg-dark-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 text-peach-300">
                <Compass className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">Explore Database</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Prompt Repository</h2>
            </div>

            {/* Filter Reset Button */}
            {(selectedCategory || searchQuery || selectedTool !== "All") && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                  setSelectedTool("All");
                }}
                className="self-start text-xs text-peach-300 hover:text-peach-200 transition-colors py-1 border-b border-peach-300/30"
              >
                Clear active filters
              </button>
            )}
          </div>

          {/* Search and Filters Strip */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between glass p-4 rounded-2xl mb-8 border border-white/5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
              <input
                type="text"
                placeholder="Search prompt, style, engine, parameters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-950/70 border border-white/5 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-sage-500 focus:outline-none focus:border-sage-400 transition-all font-light"
              />
            </div>

            {/* Tool Filter Selector */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {tools.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTool(t)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 border ${
                    selectedTool === t
                      ? "bg-gradient-to-r from-sage-500 to-teal-600 text-white border-transparent"
                      : "bg-dark-950/50 text-sage-400 border-white/5 hover:border-sage-300/10 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Status Tag */}
          {selectedCategory && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs text-sage-400">Filtering Category:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-300/10 border border-peach-300/20 text-peach-300 text-xs">
                {selectedCategory}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-white"
                  onClick={() => setSelectedCategory(null)}
                />
              </span>
            </div>
          )}

          {/* Prompt Cards Grid */}
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  onClick={() => setSelectedPrompt(prompt)}
                  className="group glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border border-white/5 hover:border-sage-400/20 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Image */}
                    <div className="h-48 w-full overflow-hidden relative">
                      <img
                        src={prompt.image}
                        alt={prompt.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-peach-200 px-2.5 py-1 rounded-full">
                        {prompt.tool}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="text-xs text-sage-500 mb-1 font-mono">{prompt.category}</div>
                      <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-peach-200 transition-colors">
                        {prompt.title}
                      </h3>
                      <p className="text-sage-300/80 text-xs leading-relaxed line-clamp-3 bg-dark-950/40 p-3 rounded-lg border border-white/5 font-mono mb-4">
                        {prompt.promptText}
                      </p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="px-5 pb-5 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-sage-500 font-mono">by @{prompt.author}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(prompt.id);
                        }}
                        className={`p-2 rounded-lg border border-white/5 transition-all duration-200 active:scale-90 ${
                          likedPrompts[prompt.id]
                            ? "bg-peach-300/10 text-peach-300 border-peach-300/20"
                            : "bg-sage-800/20 text-sage-400 hover:text-white"
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5" fill={likedPrompts[prompt.id] ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(prompt.id, prompt.promptText);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-sage-500/20 to-teal-600/20 hover:from-sage-500 hover:hover:to-teal-600 text-xs font-semibold text-sage-100 hover:text-white rounded-lg border border-white/5 active:scale-95 transition-all duration-200"
                      >
                        {copiedId === prompt.id ? (
                          <>
                            <Check className="w-3 h-3 text-peach-300" />
                            <span className="text-peach-300 text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass rounded-2xl border border-white/5 max-w-xl mx-auto">
              <Sparkles className="w-8 h-8 text-sage-600 mx-auto mb-3" />
              <p className="text-sage-300 text-lg font-semibold mb-1">No prompts matched your search</p>
              <p className="text-sage-500 text-sm">Try typing broad concepts like "anime", "light", or changing filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center items-center gap-2 mb-2 text-peach-300">
            <Lock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-semibold">SaaS Options</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Premium Membership</h2>
          <p className="text-sage-400 text-sm font-light">
            Unlock the ultimate high-fidelity parameters. Copy full negative prompts, seeds, and get early style presets.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Free */}
          <div className="glass rounded-3xl p-8 border border-white/5 flex flex-col justify-between hover:border-sage-500/10 transition-all duration-300">
            <div>
              <span className="text-xs text-sage-400 uppercase tracking-wider font-semibold">Hobbyist</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Explorer</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-sage-500 text-sm ml-2">/ lifetime</span>
              </div>
              <ul className="space-y-3.5 text-sage-300 text-sm mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> Copy standard prompts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> Basic category filters</li>
                <li className="flex items-center gap-2 text-sage-600"><X className="w-4 h-4" /> Advanced parameters (Seeds)</li>
                <li className="flex items-center gap-2 text-sage-600"><X className="w-4 h-4" /> Early access styles</li>
              </ul>
            </div>
            <button onClick={() => scrollTo(exploreRef)} className="w-full py-3 bg-sage-800/40 hover:bg-sage-800/80 border border-white/5 rounded-xl text-sm font-semibold transition-all duration-300">
              Browse Free Prompts
            </button>
          </div>

          {/* Card 2: Pro (Featured) */}
          <div className="glass rounded-3xl p-8 border-2 border-peach-400/40 bg-gradient-to-b from-dark-900/60 to-dark-950/80 flex flex-col justify-between hover:border-peach-300 transition-all duration-300 shadow-2xl relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-peach-400 to-peach-600 text-dark-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div>
              <span className="text-xs text-peach-300 uppercase tracking-wider font-semibold">Artist</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Studio Pro</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold">$9</span>
                <span className="text-sage-500 text-sm ml-2">/ month</span>
              </div>
              <ul className="space-y-3.5 text-sage-200 text-sm mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> Copy 10,000+ curated prompts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> Pro engine parameters (Seeds)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> High-fidelity negative structures</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> Early access style drops</li>
              </ul>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-peach-400 via-peach-500 to-peach-600 text-dark-950 font-bold rounded-xl text-sm transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-peach-500/10">
              Get Started Pro
            </button>
          </div>

          {/* Card 3: Agency */}
          <div className="glass rounded-3xl p-8 border border-white/5 flex flex-col justify-between hover:border-sage-500/10 transition-all duration-300">
            <div>
              <span className="text-xs text-sage-400 uppercase tracking-wider font-semibold">Developer</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Enterprise</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold">$24</span>
                <span className="text-sage-500 text-sm ml-2">/ month</span>
              </div>
              <ul className="space-y-3.5 text-sage-300 text-sm mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> Everything in Studio Pro</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> REST API prompt database access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> Unlimited prompt generation assistance</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-peach-300" /> Custom branding overlays</li>
              </ul>
            </div>
            <button className="w-full py-3 bg-sage-800/40 hover:bg-sage-800/80 border border-white/5 rounded-xl text-sm font-semibold transition-all duration-300">
              Contact Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-dark-950 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10 md:items-center">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sage-500 to-peach-400 p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full rounded-md bg-dark-900 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-peach-300" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-sage-100 bg-clip-text text-transparent">
                DreamLens
              </span>
            </div>
            <p className="text-sage-400 text-xs max-w-sm leading-relaxed font-light">
              Premium visual curation and high-fidelity text vectors for professional developers, designers, and creative directors.
            </p>
          </div>

          <div className="flex gap-8 text-xs text-sage-400">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between text-[10px] text-sage-500">
          <span>&copy; {new Date().getFullYear()} DreamLens Prompt Library. All rights reserved.</span>
          <span className="mt-1 sm:mt-0 font-light">Engineered for cinematic fidelity.</span>
        </div>
      </footer>

      {/* Prompt Detail / Copy Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-6 animate-fade-in">
          <div className="glass max-w-2xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative flex flex-col md:flex-row aspect-auto">
            {/* Visual Side */}
            <div className="w-full md:w-1/2 h-56 md:h-auto overflow-hidden relative">
              <img
                src={selectedPrompt.image}
                alt={selectedPrompt.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-dark-950/20 md:to-dark-950"></div>
              <div className="absolute top-4 left-4 bg-dark-950/80 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full text-[10px] font-semibold text-peach-300">
                {selectedPrompt.tool}
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-dark-900/90">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPrompt(null)}
                className="absolute top-4 right-4 p-2 bg-dark-950/80 border border-white/10 text-sage-400 hover:text-white rounded-full transition-all duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-[10px] text-sage-500 font-mono tracking-wider uppercase">
                  {selectedPrompt.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">
                  {selectedPrompt.title}
                </h3>
                <p className="text-sage-400 text-xs leading-relaxed mb-6 font-light">
                  {selectedPrompt.description}
                </p>

                {/* Prompt box */}
                <div className="relative bg-dark-950/80 border border-white/5 rounded-xl p-4 mb-6">
                  <div className="text-[10px] text-sage-500 font-mono uppercase tracking-wider mb-2">Prompt String</div>
                  <p className="text-xs text-white font-mono leading-relaxed line-clamp-4 select-all pr-8">
                    {selectedPrompt.promptText}
                  </p>
                  <button
                    onClick={() => handleCopy(selectedPrompt.id, selectedPrompt.promptText)}
                    className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 text-sage-300 hover:text-white transition-all duration-200 active:scale-95"
                  >
                    {copiedId === selectedPrompt.id ? (
                      <Check className="w-3.5 h-3.5 text-peach-300" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Technical Parameters */}
                <div className="grid grid-cols-2 gap-3 mb-6 bg-white/5 p-3.5 rounded-xl border border-white/5">
                  {Object.entries(selectedPrompt.parameters).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-[9px] text-sage-500 font-mono uppercase tracking-widest">{key}</span>
                      <span className="text-xs font-semibold text-sage-100">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal footer action */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-sage-500 font-mono font-light">Curated by</span>
                  <span className="text-xs font-semibold text-peach-300">@{selectedPrompt.author}</span>
                </div>
                <button
                  onClick={() => handleCopy(selectedPrompt.id, selectedPrompt.promptText)}
                  className="px-5 py-2.5 bg-gradient-to-r from-sage-500 to-teal-600 hover:from-sage-400 hover:to-teal-500 text-xs font-bold text-white rounded-xl shadow-lg transition-all duration-200 active:scale-95"
                >
                  {copiedId === selectedPrompt.id ? "Prompt Copied!" : "Copy Full Prompt"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
