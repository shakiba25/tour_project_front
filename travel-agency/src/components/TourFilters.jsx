import React from "react";
import TourFilterBox from "./TourFilterBox";

function TourFilters(props) {
  return (
    <aside className="tourlist-filters">
      <TourFilterBox {...props} />
    </aside>
  );
}

export default React.memo(TourFilters); // ✅ فقط وقتی props تغییر کنه رندر میشه
