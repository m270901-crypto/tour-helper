export function mapsUrl(address, name) {
  const query = encodeURIComponent(name ? `${name}, ${address}` : address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
