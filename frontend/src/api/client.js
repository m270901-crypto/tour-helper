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

export function fetchCountries() {
  return request("/api/countries");
}

export function fetchRegions(countryId) {
  return request(`/api/countries/${encodeURIComponent(countryId)}/regions`);
}

export function fetchRegionDetail(countryId, regionId) {
  return request(
    `/api/countries/${encodeURIComponent(countryId)}/regions/${encodeURIComponent(regionId)}`
  );
}

export function fetchNews(countryId) {
  return request(`/api/news/${encodeURIComponent(countryId)}`);
}
