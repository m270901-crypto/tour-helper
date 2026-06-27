import { mapsUrlForAddress } from "../utils/maps";

export default function AddressLink({ address, name }) {
  if (!address) return null;
  return (
    <div className="address-block">
      <p className="address-text">📍 {address}</p>
      <a
        href={mapsUrlForAddress(address, name)}
        target="_blank"
        rel="noopener noreferrer"
        className="map-btn"
      >
        Открыть на карте
      </a>
    </div>
  );
}
