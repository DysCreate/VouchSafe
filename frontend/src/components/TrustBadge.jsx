import React from 'react';

function TrustBadge({ score }) {
  return (
    <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-sm">
      Trust Score: {score}
    </div>
  );
}

export default TrustBadge;
