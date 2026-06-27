import { useEffect, useState } from "react";
import FlightLookup from "./components/FlightLookup";
import RegionSelector from "./components/RegionSelector";
import RegionInfo from "./components/RegionInfo";
import "./App.css";

export default function App() {
  const [regionId, setRegionId] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <div className="app">
      <h1>Помощник туриста · Турция</h1>

      <FlightLookup />

      <div className="card">
        <h2>Регион</h2>
        <RegionSelector selectedId={regionId} onSelect={setRegionId} />
      </div>

      <RegionInfo regionId={regionId} />
    </div>
  );
}
