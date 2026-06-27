import { useEffect, useState } from "react";
import { fetchRegions } from "../api/client";

export default function RegionSelector({ selectedId, onSelect }) {
  const [regions, setRegions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegions()
      .then(setRegions)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="region-selector">
      {regions.map((region) => (
        <button
          key={region.id}
          className={region.id === selectedId ? "region-btn active" : "region-btn"}
          onClick={() => onSelect(region.id)}
        >
          {region.name}
        </button>
      ))}
    </div>
  );
}
