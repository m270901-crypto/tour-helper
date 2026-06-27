import { useEffect, useState } from "react";
import { fetchCountries } from "../api/client";

const FLAGS = {
  turkey: "🇹🇷",
  uae: "🇦🇪",
};

export default function CountrySelector({ selectedId, onSelect }) {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries()
      .then(setCountries)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="tile-grid">
      {countries.map((country) => (
        <button
          key={country.id}
          className={country.id === selectedId ? "tile active" : "tile"}
          onClick={() => onSelect(country)}
        >
          <span className="tile-icon">{FLAGS[country.id] || "🌍"}</span>
          {country.name}
        </button>
      ))}
    </div>
  );
}
