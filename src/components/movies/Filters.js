import { useState } from "react";

function Filters({ setFilters }) {
  const [seenState, setSeenState] = useState("all"); // "all", "seen", "unseen"

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? value : value,
    }));
  };

  const toggleSeen = () => {
    const newState = seenState === "all" ? "seen" : seenState === "seen" ? "unseen" : "all";
    setSeenState(newState);
    setFilters((prev) => ({ ...prev, seen: newState }));
  };

  return (
    <div className="m-filters">
      <h3 className="m-header-filter m-caveat-brush-list-header">Filters</h3>
      
      {/* Search Filter */}
      <div className="m-search-filter">
        <input
          type="search"
          name="search"
          className="m-inputs-filter m-caveat-brush-date-filter"
          placeholder="Search"
          onChange={handleChange}
        />
      </div>

      {/* Rating Filter */}
      <div className="m-stars-filter">
        <select
          name="rating"
          className="m-inputs-filter m-caveat-brush-date-filter"
          onChange={handleChange}
        >
          <option value="all">All</option>
          {[5, 4, 3, 2, 1].map((stars) => (
            <option className="m-icon-tiny m-star" key={stars} value={stars}>
              {"⭐".repeat(stars)}
            </option>
          ))}
        </select>
      </div>

      {/* Seen Filter (Switch de 3 posiciones) */}
      <div className="m-seen-filter m-caveat-brush-date-filter">
        <span>Seen:</span>
        <div className={`m-switch state-${seenState}`} onClick={toggleSeen}>
          <div className="m-slider"></div>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="m-date-range-filter">
        <input
          type="date"
          name="startDate"
          className="m-caveat-brush-date-filter m-date-filter-left"
          onChange={handleChange}
        />
        -
        <input
          type="date"
          name="endDate"
          className="m-caveat-brush-date-filter m-date-filter-right"
          onChange={handleChange}
        />
      </div>

      {/* Mode Filter */}
      <div className="m-mode-filter">
        <select
          name="mode"
          className="m-inputs-filter m-caveat-brush-date-filter"
          onChange={handleChange}
        >
          <option value="all">All</option>
          <option value="tg">Together 💑</option>
          <option value="tp">Teleparty 🔴</option>
          <option value="cn">Cinema 🎬</option>
        </select>
      </div>

      {/* Reset Button */}
      <div className="m-apply-filter">
        <button
          className="m-apply-button-filter m-caveat-brush-date-filter"
          onClick={() => {
            setFilters({
              search: "",
              rating: "all",
              seen: "all",
              startDate: "",
              endDate: "",
              mode: "all",
            });
            setSeenState("all");
          }}
        >
          Reset
        </button>
      </div>

      {/* Koala Footer Icon */}
      <div className="m-footer-icon">
        <div className="m-icon-huge m-koala"></div>
      </div>
    </div>
  );
}

export default Filters;
