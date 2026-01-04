import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import TrustBadge from './TrustBadge';
import CommunityHeroBadge from './CommunityHeroBadge';

function EmployeeCard({ employee, onSendRequest }) {
  const { tSync } = useLanguage();
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all p-6 hover:border-teal-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{employee.userId?.name || 'Unknown'}</h3>
          {employee.designation && (
            <p className="text-md font-semibold text-teal-600 mt-1">{employee.designation}</p>
          )}
          {employee.isCommunityHero && (
            <div className="mt-2">
              <CommunityHeroBadge since={employee.communityHeroSince} size="small" />
            </div>
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
          {employee.completedJobs || 0} {tSync('Jobs Completed')}
        </p>
        {employee.vouchCount > 0 && (
          <p className="text-sm text-yellow-600 flex items-center gap-2 font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {employee.vouchCount} {tSync('Vouches')}
          </p>
        )}
      </div>
      
      <div className="mb-4">
        <TrustBadge score={employee.trustScore || 0} />
      </div>
      
      <button
        onClick={() => onSendRequest(employee.userId._id)}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow hover:shadow-md"
      >
        {tSync('Send Request')}
      </button>
    </div>
  );
}

export default EmployeeCard;
