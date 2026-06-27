import { mapsUrl } from "../utils/maps";

export default function AddressLink({ address, name }) {
  if (!address) return null;
  return (
    <p>
      <a href={mapsUrl(address, name)} target="_blank" rel="noopener noreferrer" className="address-link">
        📍 {address}
      </a>
    </p>
  );
}
