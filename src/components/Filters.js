function Filters({ setFilters }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="m-filters">
      <h3 className="m-header-filter m-caveat-brush-list-header">Filters</h3>
      <div className="m-search-filter">
        <input
          type="search"
          name="search"
          className="m-inputs-filter m-caveat-brush-date-filter"
          placeholder="Search"
          onChange={handleChange}
        />
      </div>
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
      <div className="m-seen-filter m-caveat-brush-date-filter">
        <input
          type="checkbox"
          name="seen"
          className="m-checkbox-filter"
          onChange={handleChange}
        /> Seen
      </div>
      <div className="m-date-range-filter">
        <input
          type="date"
          name="startDate"
          className="m-caveat-brush-date-filter m-date-filter-left"
          onChange={handleChange}
        />{" "}
        -
        <input
          type="date"
          name="endDate"
          className="m-caveat-brush-date-filter m-date-filter-right"
          onChange={handleChange}
        />
      </div>
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
      <div className="m-apply-filter">
        <button
          className="m-apply-button-filter m-caveat-brush-date-filter"
          onClick={() =>
            setFilters({
              search: "",
              rating: "all",
              seen: false,
              startDate: "",
              endDate: "",
              mode: "all",
            })
          }
        >
          Reset
        </button>
      </div>
      <div className="m-footer-icon">
        <div className="m-icon-huge m-koala"></div>
      </div>
    </div>
  );
}

export default Filters;
