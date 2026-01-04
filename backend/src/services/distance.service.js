function toRad(value) { return (value * Math.PI) / 180; }

function haversine(a, b) {
  if (!a || !b) return null;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const h = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
  const d = 2 * R * Math.asin(Math.sqrt(h));
  return d; // kilometers
}

module.exports = { haversine };
