import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployerDashboard, completeJob } from '../services/api';
import JobRequestCard from '../components/JobRequestCard';

function EmployerDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchDashboard(); }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getEmployerDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Employer Dashboard</h2>
            <p className="text-gray-600">Find trusted employees and manage job requests</p>
          </div>
          <button
            onClick={() => navigate('/search-employees')}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Employees
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sent Job Requests</h3>
          <div className="space-y-4">
            {data.sent && data.sent.length > 0 ? (
              data.sent.map((job) => (
                <JobRequestCard key={job._id} job={job} onComplete={handleComplete} />
              ))
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 mb-4">No job requests sent yet</p>
                <button
                  onClick={() => navigate('/search-employees')}
                  className="text-teal-600 hover:text-teal-700 font-semibold"
                >
                  Start searching for employees
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;
