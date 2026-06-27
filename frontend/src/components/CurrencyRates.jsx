import { useEffect, useState } from "react";

const CURRENCIES = [
  { code: "RUB", label: "₽ Рубль" },
  { code: "USD", label: "$ Доллар США" },
  { code: "EUR", label: "€ Евро" },
  { code: "KZT", label: "₸ Тенге" },
];

export default function CurrencyRates({ currency, currencyLabel }) {
  const [selected, setSelected] = useState("RUB");
  const [amount, setAmount] = useState("1");
  const [rate, setRate] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currency) return;
    setLoading(true);
    setError(null);
    setRate(null);

    fetch(`https://open.er-api.com/v6/latest/${selected}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.result !== "success") throw new Error("Не удалось получить курс");
        setRate(data.rates[currency]);
        setUpdatedAt(data.time_last_update_utc);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selected, currency]);

  const numericAmount = parseFloat(amount.replace(",", ".")) || 0;
  const converted = rate != null ? numericAmount * rate : null;

  return (
    <div className="card">
      <h2>Курс валюты</h2>
      <div className="currency-row">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="currency-input"
        />
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="currency-select"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="muted">Загрузка курса…</p>}
      {error && <p className="error">{error}</p>}
      {converted != null && (
        <p className="rate-value">
          {numericAmount} {selected} = {converted.toFixed(2)} {currency} ({currencyLabel})
        </p>
      )}
      {updatedAt && <p className="muted small">Обновлено: {updatedAt}</p>}
    </div>
  );
}
