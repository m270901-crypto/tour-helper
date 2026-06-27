import { useState } from "react";
import { fetchFlight } from "../api/client";

function formatTime(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export default function FlightLookup() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flight, setFlight] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!flightNumber.trim()) return;
    setLoading(true);
    setError(null);
    setFlight(null);
    try {
      const data = await fetchFlight(flightNumber.trim());
      setFlight(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Информация о рейсе</h2>
      <form onSubmit={handleSubmit} className="flight-form">
        <input
          type="text"
          placeholder="Например: TK1234"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Ищу…" : "Найти"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {flight && (
        <div className="flight-result">
          <div className="flight-header">
            <strong>{flight.flight_number}</strong>
            {flight.airline && <span> · {flight.airline}</span>}
            {flight.flight_status && (
              <span className={`status status-${flight.flight_status}`}>
                {flight.flight_status}
              </span>
            )}
          </div>

          <div className="flight-leg">
            <h3>Вылет</h3>
            <p>{flight.departure.name || "—"} ({flight.departure.iata || "—"})</p>
            <p>Терминал: {flight.departure.terminal || "—"}, Гейт: {flight.departure.gate || "—"}</p>
            <p>По расписанию: {formatTime(flight.departure.scheduled_time)}</p>
            {flight.departure.estimated_time && (
              <p>Прогноз: {formatTime(flight.departure.estimated_time)}</p>
            )}
            {flight.departure.delay_minutes ? (
              <p className="delay">Задержка: {flight.departure.delay_minutes} мин</p>
            ) : null}
          </div>

          <div className="flight-leg">
            <h3>Прилёт</h3>
            <p>{flight.arrival.name || "—"} ({flight.arrival.iata || "—"})</p>
            <p>Терминал: {flight.arrival.terminal || "—"}, Гейт: {flight.arrival.gate || "—"}</p>
            <p>По расписанию: {formatTime(flight.arrival.scheduled_time)}</p>
            {flight.arrival.estimated_time && (
              <p>Прогноз: {formatTime(flight.arrival.estimated_time)}</p>
            )}
            {flight.arrival.delay_minutes ? (
              <p className="delay">Задержка: {flight.arrival.delay_minutes} мин</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
