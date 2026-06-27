import { useEffect, useState } from "react";
import FlightLookup from "./components/FlightLookup";
import CountrySelector from "./components/CountrySelector";
import RegionSelector from "./components/RegionSelector";
import RegionInfo from "./components/RegionInfo";
import CurrencyRates from "./components/CurrencyRates";
import NewsList from "./components/NewsList";
import "./App.css";

export default function App() {
  const [country, setCountry] = useState(null);
  const [regionId, setRegionId] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  function handleSelectCountry(selected) {
    setCountry(selected);
    setRegionId(null);
  }

  return (
    <div className="app">
      <h1>Помощник туриста</h1>

      <FlightLookup />

      <div className="card">
        <h2>Страна</h2>
        <CountrySelector selectedId={country?.id} onSelect={handleSelectCountry} />
      </div>

      {country && (
        <CurrencyRates currency={country.currency} currencyLabel={country.currency_label} />
      )}

      {country && <NewsList countryId={country.id} />}

      {country && (
        <div className="card">
          <h2>Регион</h2>
          <RegionSelector countryId={country.id} selectedId={regionId} onSelect={setRegionId} />
        </div>
      )}

      <RegionInfo countryId={country?.id} regionId={regionId} />
    </div>
  );
}
