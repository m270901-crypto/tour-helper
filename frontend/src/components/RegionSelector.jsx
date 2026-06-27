import { useEffect, useState } from "react";
import { fetchRegions } from "../api/client";

export default function RegionSelector({ countryId, selectedId, onSelect }) {
  const [regions, setRegions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryId) return;
    setRegions([]);
    fetchRegions(countryId)
      .then(setRegions)
      .catch((err) => setError(err.message));
  }, [countryId]);

  if (!countryId) return null;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="tile-grid">
      {regions.map((region) => (
        <button
          key={region.id}
          className={region.id === selectedId ? "tile active" : "tile"}
          onClick={() => onSelect(region.id)}
        >
          <span className="tile-icon">📍</span>
          {region.name}
        </button>
      ))}
    </div>
  );
}
