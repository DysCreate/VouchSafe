import React from 'react';
import TrustBadge from './TrustBadge';

function EmployeeCard({ employee, onSendRequest }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all p-6 hover:border-teal-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{employee.userId?.name || 'Unknown'}</h3>
          {employee.designation && (
            <p className="text-md font-semibold text-teal-600 mt-1">{employee.designation}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-lg">
          {(employee.userId?.name || 'U')[0].toUpperCase()}
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        {employee.skills && employee.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {employee.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {employee.completedJobs || 0} Jobs Completed
        </p>
      </div>
      
      <div className="mb-4">
        <TrustBadge score={employee.trustScore || 0} />
      </div>
      
      <button
        onClick={() => onSendRequest(employee.userId._id)}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow hover:shadow-md"
      >
        Send Job Request
      </button>
    </div>
  );
}

export default EmployeeCard;
