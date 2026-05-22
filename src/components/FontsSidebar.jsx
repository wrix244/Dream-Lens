export default function FontsSidebar({ fonts, activeFont, onFontSelect, isMobile }) {
  return (
    <aside className={isMobile ? "mobile-fonts-bar" : "desktop-fonts-sidebar"}>
      {!isMobile && <div className="sidebar-title">FONTS</div>}
      <div className={isMobile ? "mobile-fonts-list" : "desktop-fonts-list"}>
        {fonts.map((font) => (
          <div
            key={font.id}
            className={`font-card${activeFont.id === font.id ? " sel" : ""}`}
            onClick={() => onFontSelect(font)}
          >
            <div style={{ ...font.style, fontSize: isMobile ? 14 : 17, color: activeFont.id === font.id ? "#5dbb63" : "rgba(255,255,255,0.75)", marginBottom: isMobile ? 2 : 4 }}>
              {font.sample}
            </div>
            <div style={{ fontFamily: "system-ui", fontSize: isMobile ? 8 : 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em" }}>
              {font.name}
            </div>
          </div>
        ))}
      </div>
      {!isMobile && (
        <div className="font-preview-box">
          <div className="preview-label">PREVIEW</div>
          <div style={{ ...activeFont.style, fontSize: 15, color: "#a8dba8", textAlign: "center" }}>
            DreamLens
          </div>
        </div>
      )}
    </aside>
  );
}
