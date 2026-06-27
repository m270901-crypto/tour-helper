const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || `Ошибка запроса: ${response.status}`);
  }
  return response.json();
}

export function fetchFlight(flightNumber) {
  return request(`/api/flight/${encodeURIComponent(flightNumber)}`);
}

export function fetchRegions() {
  return request("/api/regions");
}

export function fetchRegionDetail(regionId) {
  return request(`/api/regions/${encodeURIComponent(regionId)}`);
}
