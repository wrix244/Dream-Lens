export default function Header({ displayImg, onExport, inputRef, onUploadClick, onFileSelect }) {
  return (
    <header className="app-header">
      <div>
        <div className="app-logo">
          dream<span style={{ color: "#5dbb63", fontStyle: "italic", fontWeight: 600 }}>lens</span>
          <span className="app-logo-badge">
            NATURE
          </span>
        </div>
        <div className="app-subtitle">
          CINEMATIC FILM FILTERS FOR NATURE PHOTOS
        </div>
      </div>

      <div className="app-header-actions">
        {displayImg && (
          <button className="btn-primary" onClick={onExport}>
            ↓ Export JPG
          </button>
        )}
        <button className="btn-ghost" onClick={onUploadClick}>
          ↑ Upload Photo
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => onFileSelect(e.target.files?.[0])}
        />
      </div>
    </header>
  );
}
