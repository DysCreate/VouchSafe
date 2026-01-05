import React, { useState, useEffect } from 'react';
import { getEmployeeDashboard, acceptJob, rejectJob, completeJob, updateEmployeeProfile } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import JobRequestCard from '../components/JobRequestCard';
import TrustBadge from '../components/TrustBadge';
import CommunityHeroBadge from '../components/CommunityHeroBadge';
import axios from 'axios';

function EmployeeDashboard() {
  const [data, setData] = useState(null);
  const [disasterState, setDisasterState] = useState(null);
  const [volunteerLoading, setVolunteerLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ designation: '', hourlyWage: '' });
  const { language, tSync, preloadTranslations } = useLanguage();

  useEffect(() => { 
    fetchDashboard();
    fetchDisasterState();
  }, []);

  useEffect(() => {
    const texts = [
      'VouchSafe', 'Main Menu', 'Home', 'Dashboard', 'Account Management', 'Settings', 'Log out',
      'Welcome back', 'Welcome to dashboard', 'Designation', 'Jobs Done', 'Active Jobs', 'Trust Score',
      'Your rating', 'Total completed', 'In progress', 'Recent Job Requests', 'See all',
      'No job requests yet', 'Employer details hidden until accepted', 'Employer', 'Accept', 'Reject',
      'Job in progress', 'Job completed', 'REQUESTED', 'ACCEPTED', 'COMPLETED', 'REJECTED'
    ];
    preloadTranslations(texts);
  }, [language]);

  const fetchDashboard = async () => {
    try {
      const res = await getEmployeeDashboard();
      console.log('Dashboard data:', res.data);
      console.log('Incoming jobs:', res.data.incoming);
      setData(res.data);
      if (res.data.profile) {
        setProfileForm({
          designation: res.data.profile.designation || '',
          hourlyWage: res.data.profile.hourlyWage || ''
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDisasterState = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/admin/disaster-state', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDisasterState(response.data.data);
    } catch (err) {
      console.error('Failed to fetch disaster state:', err);
    }
  };

  const handleVolunteerAsHero = async () => {
    setVolunteerLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/employees/community-hero/volunteer', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('You have successfully volunteered as a Community Hero!');
      fetchDashboard();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to volunteer as Community Hero');
    } finally {
      setVolunteerLoading(false);
    }
  };

  const handleWithdrawFromHero = async () => {
    setVolunteerLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/employees/community-hero/withdraw', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('You have withdrawn from Community Hero status.');
      fetchDashboard();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to withdraw from Community Hero');
    } finally {
      setVolunteerLoading(false);
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

  const handleSaveProfile = async () => {
    try {
      await updateEmployeeProfile({
        designation: profileForm.designation,
        hourlyWage: profileForm.hourlyWage ? Number(profileForm.hourlyWage) : null
      });
      setEditMode(false);
      fetchDashboard();
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile');
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
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{tSync('VOUCHSAFE')}</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{tSync('Main Menu')}</p>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-medium">{tSync('Home')}</span>
              </a>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{tSync('Account Management')}</p>
            <nav className="space-y-1">
              <div className="px-3 py-2 text-gray-600 text-sm">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{tSync('Profile')}</span>
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
            <span className="text-sm font-medium">{tSync('Log out')}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Disaster Alert Banner */}
          {disasterState?.isCommunityHeroActive && (
            <div className="mb-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🚨</span>
                    <h3 className="text-xl font-bold">Disaster Alert: Community Hero Mode Active</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-4">
                    A community emergency is in effect. Volunteer to help during this critical time.
                  </p>
                  
                  {data?.profile?.isCommunityHero ? (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🛡️</span>
                        <div>
                          <p className="font-semibold">You are a Community Hero!</p>
                          <p className="text-xs opacity-80">
                            Volunteered on {new Date(data.profile.communityHeroSince).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleWithdrawFromHero}
                        disabled={volunteerLoading}
                        className="ml-auto px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 font-semibold"
                      >
                        {volunteerLoading ? 'Processing...' : 'Withdraw from Community Hero'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleVolunteerAsHero}
                      disabled={volunteerLoading}
                      className="px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 font-bold shadow-md"
                    >
                      {volunteerLoading ? 'Processing...' : '🛡️ Volunteer as Community Hero'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">{tSync('Welcome back')}</h2>
            <p className="text-gray-500">{tSync('Welcome to dashboard')}</p>
          </div>

          {/* Stats Cards */}
          {data.profile && (
            <>
              {/* Profile Edit Section */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{tSync('Profile Settings')}</h3>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                    >
                      {tSync('Edit Profile')}
                    </button>
                  )}
                </div>
                
                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tSync('Designation')}
                      </label>
                      <input
                        type="text"
                        placeholder={tSync('e.g., Plumber, Tailor, Electrician')}
                        value={profileForm.designation}
                        onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tSync('Hourly Wage')} (₹)
                      </label>
                      <input
                        type="number"
                        placeholder={tSync('Enter hourly rate')}
                        value={profileForm.hourlyWage}
                        onChange={(e) => setProfileForm({ ...profileForm, hourlyWage: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">{tSync('Visible to employers during search')}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition font-semibold"
                      >
                        {tSync('Save Changes')}
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(false);
                          setProfileForm({
                            designation: data.profile.designation || '',
                            hourlyWage: data.profile.hourlyWage || ''
                          });
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                      >
                        {tSync('Cancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{tSync('Designation')}</p>
                      <p className="text-lg font-semibold text-gray-900">{data.profile.designation || 'Not Set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{tSync('Hourly Wage')}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {data.profile.hourlyWage ? `₹${data.profile.hourlyWage}/hr` : 'Not Set'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700">{tSync('Designation')}</p>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{data.profile.designation || 'Not Set'}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700">{tSync('Jobs Done')}</p>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{data.profile.completedJobs || 0}</p>
                  <p className="text-xs text-gray-600">{tSync('Total completed')}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700">{tSync('Active Jobs')}</p>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{data.incoming?.filter(j => j.status === 'ACCEPTED').length || 0}</p>
                  <p className="text-xs text-gray-600">{tSync('In progress')}</p>
                </div>

                <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-5 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-medium">{tSync('Trust Score')}</p>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold mb-1">{data.profile.trustScore || 0}</p>
                  <p className="text-xs opacity-90">{tSync('Your rating')}</p>
                </div>
              </div>
            </>
          )}

          {/* Job Requests */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">{tSync('Recent Job Requests')}</h3>
              <button className="text-sm text-gray-500 hover:text-gray-700">{tSync('See all')}</button>
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
                  <p className="text-gray-500">{tSync('No job requests yet')}</p>
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
