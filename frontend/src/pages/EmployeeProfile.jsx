import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeProfile } from '../services/api';
import TrustBadge from '../components/TrustBadge';

function EmployeeProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await getEmployeeProfile(id);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [id]);

  if (!profile) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">VouchSafe</h1>
            </div>
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-3xl">
              {(profile.userId?.name || 'U')[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.userId?.name || 'Employee'}</h1>
              {profile.designation && (
                <p className="text-xl font-semibold text-teal-600 mb-3">{profile.designation}</p>
              )}
              <TrustBadge score={profile.trustScore || 0} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 pt-6 border-t">
            <div>
              <p className="text-sm text-gray-600 mb-1">Skills</p>
              <p className="text-gray-900 font-medium">{profile.skills?.join(', ') || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed Jobs</p>
              <p className="text-gray-900 font-medium">{profile.completedJobs || 0}</p>
            </div>
          </div>
        </div>

        {/* Vouches Section */}
        {profile.vouches && profile.vouches.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Vouches ({profile.vouches.length})
            </h2>
            <div className="space-y-4">
              {profile.vouches.map((vouch) => (
                <div key={vouch._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{vouch.fromUserId?.name || 'Anonymous'}</p>
                      {vouch.jobId?.service && (
                        <p className="text-sm text-gray-600">Job: {vouch.jobId.service}</p>
                      )}
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < vouch.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {vouch.comment && (
                    <p className="text-gray-700 mt-2 italic">"{vouch.comment}"</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(vouch.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeProfile;
