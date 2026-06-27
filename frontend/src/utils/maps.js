function detectPlatform() {
  const ua = navigator.userAgent || navigator.vendor || "";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  return "other";
}

export function mapsUrl(query) {
  const q = encodeURIComponent(query);
  const platform = detectPlatform();

  if (platform === "android") {
    // geo: triggers the device's chooser / default handler for map links
    return `geo:0,0?q=${q}`;
  }
  if (platform === "ios") {
    // opens in the user's default maps app on iOS
    return `https://maps.apple.com/?q=${q}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function mapsUrlForAddress(address, name) {
  return mapsUrl(name ? `${name}, ${address}` : address);
}
