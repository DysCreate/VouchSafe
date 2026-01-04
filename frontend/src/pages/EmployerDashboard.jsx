import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployerDashboard, completeJob, createVouch } from '../services/api';
import JobRequestCard from '../components/JobRequestCard';

function EmployerDashboard() {
  const [data, setData] = useState(null);
  const [vouchModal, setVouchModal] = useState(null);
  const [vouchForm, setVouchForm] = useState({ rating: 5, comment: '' });
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

  const handleVouchClick = (job) => {
    setVouchModal(job);
    setVouchForm({ rating: 5, comment: '' });
  };

  const handleVouchSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVouch({
        toEmployeeId: vouchModal.employeeId._id,
        jobId: vouchModal._id,
        rating: Number(vouchForm.rating),
        comment: vouchForm.comment
      });
      alert('Vouch submitted successfully!');
      setVouchModal(null);
      fetchDashboard();
    } catch (err) {
      alert('Error submitting vouch');
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

  const completedJobs = data.sent?.filter(j => j.status === 'COMPLETED').length || 0;
  const pendingJobs = data.sent?.filter(j => j.status === 'REQUESTED').length || 0;
  const activeJobs = data.sent?.filter(j => j.status === 'ACCEPTED').length || 0;

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
              <button
                onClick={() => navigate('/search-employees')}
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg w-full text-left transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium">Search Employees</span>
              </button>
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
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">Total Jobs</p>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{data.sent?.length || 0}</p>
              <p className="text-xs text-gray-600">All requests</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">Pending</p>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{pendingJobs}</p>
              <p className="text-xs text-gray-600">Awaiting response</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">Active</p>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{activeJobs}</p>
              <p className="text-xs text-gray-600">In progress</p>
            </div>

            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-5 text-white">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium">Completed</p>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-3xl font-bold mb-1">{completedJobs}</p>
              <p className="text-xs opacity-90">Jobs finished</p>
            </div>
          </div>

          {/* Job Requests */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Job Requests</h3>
              <button className="text-sm text-gray-500 hover:text-gray-700">See all</button>
            </div>
            <div className="space-y-3">
              {data.sent && data.sent.length > 0 ? (
                data.sent.map((job) => (
                  <JobRequestCard key={job._id} job={job} onComplete={handleComplete} onVouch={handleVouchClick} />
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

      {/* Vouch Modal */}
      {vouchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vouch for {vouchModal.employeeId?.name}</h3>
            <form onSubmit={handleVouchSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setVouchForm({ ...vouchForm, rating: star })}
                      className="text-3xl focus:outline-none transition-transform hover:scale-110"
                    >
                      {star <= vouchForm.rating ? (
                        <span className="text-yellow-400">★</span>
                      ) : (
                        <span className="text-gray-300">★</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment (Optional)</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  rows="4"
                  placeholder="Share your experience working with this employee..."
                  value={vouchForm.comment}
                  onChange={(e) => setVouchForm({ ...vouchForm, comment: e.target.value })}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setVouchModal(null)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Submit Vouch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;
