import { useEffect, useState } from "react";
import { fetchRegionDetail } from "../api/client";
import AddressLink from "./AddressLink";
import NearbyMapSearch from "./NearbyMapSearch";

const TABS = [
  { id: "emergency", label: "Контакты", icon: "🚨" },
  { id: "pharmacy", label: "Аптеки", icon: "💊" },
  { id: "shopping", label: "Шопинг", icon: "🛍️" },
  { id: "attractions", label: "Места", icon: "📸" },
  { id: "transport", label: "Транспорт", icon: "🚌" },
];

export default function RegionInfo({ countryId, regionId }) {
  const [region, setRegion] = useState(null);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("emergency");

  useEffect(() => {
    if (!countryId || !regionId) return;
    setRegion(null);
    setError(null);
    fetchRegionDetail(countryId, regionId)
      .then(setRegion)
      .catch((err) => setError(err.message));
  }, [countryId, regionId]);

  if (!regionId) return null;
  if (error) return <p className="error">{error}</p>;
  if (!region) return <p>Загрузка…</p>;

  return (
    <div className="card">
      <h2>{region.name}</h2>
      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? "tab active" : "tab"}
            onClick={() => setTab(t.id)}
          >
            <span className="tab-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "emergency" && (
        <div className="tab-content">
          <p><strong>Единый номер службы спасения:</strong> 112</p>
          {region.emergency.police_general && (
            <p><strong>Полиция:</strong> {region.emergency.police_general}</p>
          )}
          {region.emergency.police_note && <p className="note">{region.emergency.police_note}</p>}

          {region.emergency.consulate && (
            <div className="sub-block">
              <h4>Консульство</h4>
              <p>{region.emergency.consulate.name}</p>
              <AddressLink address={region.emergency.consulate.address} name={region.emergency.consulate.name} />
              {region.emergency.consulate.phone && <p>{region.emergency.consulate.phone}</p>}
              {region.emergency.consulate.hours && <p>{region.emergency.consulate.hours}</p>}
            </div>
          )}

          <div className="sub-block">
            <h4>Больницы</h4>
            {region.hospitals.map((h) => (
              <div key={h.name} className="list-item">
                <strong>{h.name}</strong>
                {h.type && <p className="muted">{h.type}</p>}
                <AddressLink address={h.address} name={h.name} />
                {h.phone && <p>{h.phone}</p>}
              </div>
            ))}
          </div>

        </div>
      )}

      {tab === "pharmacy" && (
        <div className="tab-content">
          {region.pharmacy_note && <p className="note">{region.pharmacy_note}</p>}
          <p><strong>Найти аптеку рядом:</strong></p>
          <NearbyMapSearch query="аптека" />
        </div>
      )}

      {tab === "shopping" && (
        <div className="tab-content">
          {region.malls.map((m) => (
            <div key={m.name} className="list-item">
              <strong>{m.name}</strong>
              <AddressLink address={m.address} name={m.name} />
              {m.phone && <p>{m.phone}</p>}
              {m.description && <p className="muted">{m.description}</p>}
            </div>
          ))}
        </div>
      )}

      {tab === "attractions" && (
        <div className="tab-content">
          {region.attractions.map((a) => (
            <div key={a.name} className="list-item">
              <strong>{a.name}</strong>
              {a.description && <p className="muted">{a.description}</p>}
            </div>
          ))}
        </div>
      )}

      {tab === "transport" && (
        <div className="tab-content">
          {region.transport.public && (
            <p><strong>Общественный транспорт:</strong> {region.transport.public}</p>
          )}
          {region.transport.card && (
            <p><strong>Карта/оплата:</strong> {region.transport.card}</p>
          )}
          {region.transport.apps?.length > 0 && (
            <p><strong>Приложения:</strong> {region.transport.apps.join(", ")}</p>
          )}
          {region.transport.taxi_apps?.length > 0 && (
            <p><strong>Такси:</strong> {region.transport.taxi_apps.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}
