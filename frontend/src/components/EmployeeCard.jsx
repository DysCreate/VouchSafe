import React from 'react';
import TrustBadge from './TrustBadge';

function EmployeeCard({ employee, onSendRequest }) {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold">{employee.userId?.name || 'Unknown'}</h3>
      <p className="text-sm text-gray-600">Skills: {employee.skills?.join(', ') || 'N/A'}</p>
      <p className="text-sm text-gray-600">Completed Jobs: {employee.completedJobs || 0}</p>
      <div className="mt-2">
        <TrustBadge score={employee.trustScore || 0} />
      </div>
      <button
        onClick={() => onSendRequest(employee.userId._id)}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Job Request
      </button>
    </div>
  );
}

export default EmployeeCard;
