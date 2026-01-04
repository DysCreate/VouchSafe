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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">VOUCHSAFE</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Main Menu</p>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Account</p>
            <nav className="space-y-1">
              <div className="px-3 py-2 text-gray-600 text-sm">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Profile</span>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 w-full rounded-lg hover:bg-gray-100 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h2>
            <p className="text-gray-500">Welcome to dashboard</p>
          </div>

          {/* Stats Cards */}
          {data.profile && (
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium text-gray-700">Designation</p>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{data.profile.designation || 'Not Set'}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium text-gray-700">Jobs Done</p>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{data.profile.completedJobs || 0}</p>
                <p className="text-xs text-gray-600">Total completed</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium text-gray-700">Active Jobs</p>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{data.incoming?.filter(j => j.status === 'ACCEPTED').length || 0}</p>
                <p className="text-xs text-gray-600">In progress</p>
              </div>

              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-5 text-white">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-medium">Trust Score</p>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-3xl font-bold mb-1">{data.profile.trustScore || 0}</p>
                <p className="text-xs opacity-90">Your rating</p>
              </div>
            </div>
          )}

          {/* Job Requests */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Job Requests</h3>
              <button className="text-sm text-gray-500 hover:text-gray-700">See all</button>
            </div>
            <div className="space-y-3">
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
    </div>
  );
}

export default EmployeeDashboard;
