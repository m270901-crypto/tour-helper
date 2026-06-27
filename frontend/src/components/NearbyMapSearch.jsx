import { mapsUrl } from "../utils/maps";

export default function NearbyMapSearch({ query }) {
  return (
    <a href={mapsUrl(query)} target="_blank" rel="noopener noreferrer" className="map-btn">
      Открыть на карте
    </a>
  );
}
