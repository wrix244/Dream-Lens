import FilterThumb from "./FilterThumb";

export default function FiltersSidebar({ filters, displayImg, activeFilter, onFilterSelect, isMobile }) {
  return (
    <aside className={isMobile ? "mobile-filters-bar" : "desktop-filters-sidebar"}>
      {!isMobile && <div className="sidebar-title">FILTERS</div>}
      <div className={isMobile ? "mobile-filters-list" : "desktop-filters-list"}>
        {filters.map((filter) => (
          <FilterThumb
            key={filter.id}
            filter={filter}
            srcImg={displayImg}
            size={isMobile ? 64 : 80}
            selected={activeFilter.id === filter.id}
            onClick={() => onFilterSelect(filter)}
          />
        ))}
      </div>
    </aside>
  );
}
