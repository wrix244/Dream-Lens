import { useState, useRef, useEffect } from "react";
import FILTERS from "./data/filters";
import FONTS from "./data/fonts";
import Header from "./components/Header";
import FiltersSidebar from "./components/FiltersSidebar";
import FontsSidebar from "./components/FontsSidebar";
import ImageCompare from "./components/ImageCompare";
import Footer from "./components/Footer";
import { renderToCanvas } from "./utils/renderUtils";
import "./styles/globals.css";

const SAMPLE_PATH = "/sample.jpg";

export default function App() {
  const [srcImg, setSrcImg] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [activeFont, setActiveFont] = useState(FONTS[0]);
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 900px)").matches;
    }
    return false;
  });
  const [activeMobileTab, setActiveMobileTab] = useState("filters");

  const origRef = useRef(null);
  const filtRef = useRef(null);
  const sliderWrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setSrcImg(img);
    img.onerror = () => setSrcImg(null);
    img.src = SAMPLE_PATH;
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const displayImg = userImg || srcImg;

  useEffect(() => {
    if (!displayImg) return;

    const width = displayImg.naturalWidth || displayImg.width;
    const height = displayImg.naturalHeight || displayImg.height;

    const originalCanvas = origRef.current;
    if (originalCanvas) {
      originalCanvas.width = width;
      originalCanvas.height = height;
      originalCanvas.getContext("2d").drawImage(displayImg, 0, 0, width, height);
    }

    const timeout = window.setTimeout(() => {
      renderToCanvas(filtRef.current, displayImg, activeFilter, width, height, activeFont);
      setRendering(false);
    }, 40);

    return () => window.clearTimeout(timeout);
  }, [displayImg, activeFilter, activeFont]);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setRendering(true);
    const img = new Image();
    img.onload = () => setUserImg(img);
    img.src = URL.createObjectURL(file);
  };

  const handleFilterSelect = (filter) => {
    setRendering(true);
    setActiveFilter(filter);
  };

  const handleFontSelect = (font) => {
    setRendering(true);
    setActiveFont(font);
  };

  const getSliderPct = (event) => {
    const wrap = sliderWrapRef.current;
    if (!wrap) return sliderPos;
    const rect = wrap.getBoundingClientRect();
    const touch = (event.touches && event.touches[0]) || (event.changedTouches && event.changedTouches[0]);
    const clientX = touch ? touch.clientX : event.clientX;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  };

  const download = () => {
    const canvas = filtRef.current;
    if (!canvas) return;
    const anchor = document.createElement("a");
    anchor.download = `dreamlens-${activeFilter.id}.jpg`;
    anchor.href = canvas.toDataURL("image/jpeg", 0.9);
    anchor.click();
  };

  return (
    <div className="app-container">
      <Header displayImg={displayImg} onExport={download} inputRef={inputRef} onUploadClick={() => inputRef.current?.click()} onFileSelect={handleFile} />

      <div className="main-workspace">
        {!isMobile && (
          <FiltersSidebar filters={FILTERS} displayImg={displayImg} activeFilter={activeFilter} onFilterSelect={handleFilterSelect} isMobile={false} />
        )}

        <ImageCompare
          displayImg={displayImg}
          activeFilter={activeFilter}
          activeFont={activeFont}
          rendering={rendering}
          origRef={origRef}
          filtRef={filtRef}
          sliderWrapRef={sliderWrapRef}
          sliderPos={sliderPos}
          setSliderPos={setSliderPos}
          dragging={dragging}
          setDragging={setDragging}
          getSliderPct={getSliderPct}
          onReset={() => {
            setRendering(true);
            setUserImg(null);
          }}
          onDownload={download}
          dragOver={dragOver}
          setDragOver={setDragOver}
          onFileSelect={handleFile}
          onUploadClick={() => inputRef.current?.click()}
        />

        {!isMobile && (
          <FontsSidebar fonts={FONTS} activeFont={activeFont} onFontSelect={handleFontSelect} isMobile={false} />
        )}
      </div>

      {isMobile && (
        <div className="mobile-bottom-panel">
          <div className="mobile-tabs">
            <button
              className={`mobile-tab-btn ${activeMobileTab === "filters" ? "active" : ""}`}
              onClick={() => setActiveMobileTab("filters")}
            >
              🌸 Filters
            </button>
            <button
              className={`mobile-tab-btn ${activeMobileTab === "fonts" ? "active" : ""}`}
              onClick={() => setActiveMobileTab("fonts")}
            >
              ✍️ Typography
            </button>
          </div>
          <div className="mobile-tab-content">
            {activeMobileTab === "filters" ? (
              <FiltersSidebar filters={FILTERS} displayImg={displayImg} activeFilter={activeFilter} onFilterSelect={handleFilterSelect} isMobile={true} />
            ) : (
              <FontsSidebar fonts={FONTS} activeFont={activeFont} onFontSelect={handleFontSelect} isMobile={true} />
            )}
          </div>
        </div>
      )}

      <Footer filters={FILTERS} onFilterSelect={handleFilterSelect} />
    </div>
  );
}
