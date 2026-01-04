import React, { useState, useEffect } from 'react';
import { getEmployeeDashboard, acceptJob, rejectJob, completeJob } from '../services/api';
import JobRequestCard from '../components/JobRequestCard';
import TrustBadge from '../components/TrustBadge';

function EmployeeDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getEmployeeDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptJob(id);
      fetchDashboard();
    } catch (err) {
      alert('Error accepting job');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectJob(id);
      fetchDashboard();
    } catch (err) {
      alert('Error rejecting job');
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeJob(id);
      fetchDashboard();
    } catch (err) {
      alert('Error completing job');
    }
  };

  if (!data) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard...</p>
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
              onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h2>
          <p className="text-gray-600">Manage your jobs and track your trust score</p>
        </div>

        {/* Stats Cards */}
        {data.profile && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Your Designation</span>
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">{data.profile.designation || 'Not Set'}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">Completed Jobs</span>
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">{data.profile.completedJobs || 0}</p>
            </div>

            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-teal-100 text-sm font-medium">Trust Score</span>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <p className="text-4xl font-bold">{data.profile.trustScore || 0}</p>
            </div>
          </div>
        )}

        {/* Job Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Incoming Job Requests</h3>
          <div className="space-y-4">
            {data.incoming && data.incoming.length > 0 ? (
              data.incoming.map((job) => (
                <JobRequestCard
                  key={job._id}
                  job={job}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onComplete={handleComplete}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-500">No job requests yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
