import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [disasterState, setDisasterState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const username = localStorage.getItem('adminUsername');
    const password = localStorage.getItem('adminPassword');
    if (adminToken && username && password) {
      setCredentials({ username, password });
      setIsAuthenticated(true);
      fetchDisasterState();
    }
  }, []);

  const fetchDisasterState = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/disaster-state');
      setDisasterState(response.data.data);
    } catch (err) {
      console.error('Failed to fetch disaster state:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', credentials);
      const response = await axios.post('http://localhost:4000/api/admin/login', credentials);
      console.log('Login response:', response.data);
      
      if (response.data.data && response.data.data.token) {
        localStorage.setItem('adminToken', response.data.data.token);
        localStorage.setItem('adminUsername', credentials.username);
        localStorage.setItem('adminPassword', credentials.password);
        setIsAuthenticated(true);
        await fetchDisasterState();
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  const handleEnableCommunityHero = async () => {
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await axios.post('http://localhost:4000/api/admin/community-hero/enable', credentials);
      setSuccessMessage('Community Hero mode activated successfully');
      fetchDisasterState();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enable Community Hero mode');
    } finally {
      setLoading(false);
    }
  };

  const handleDisableCommunityHero = async () => {
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await axios.post('http://localhost:4000/api/admin/community-hero/disable', credentials);
      setSuccessMessage('Community Hero mode deactivated. All hero badges have been reset.');
      fetchDisasterState();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to disable Community Hero mode');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminPassword');
    setIsAuthenticated(false);
    setDisasterState(null);
    setCredentials({ username: '', password: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 text-teal-600 hover:text-teal-800 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-blue-500 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Logout
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          {/* Community Hero Control Panel */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Community Hero Mode</h2>
            
            {disasterState && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="text-lg font-medium text-gray-700 mr-4">Current Status:</span>
                  <span className={`px-4 py-2 rounded-full font-semibold ${
                    disasterState.isCommunityHeroActive 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {disasterState.isCommunityHeroActive ? '🚨 ACTIVE' : '✓ Inactive'}
                  </span>
                </div>

                {disasterState.isCommunityHeroActive && disasterState.activatedAt && (
                  <div className="text-sm text-gray-600 mb-2">
                    Activated: {new Date(disasterState.activatedAt).toLocaleString()}
                  </div>
                )}

                {!disasterState.isCommunityHeroActive && disasterState.deactivatedAt && (
                  <div className="text-sm text-gray-600 mb-2">
                    Last Deactivated: {new Date(disasterState.deactivatedAt).toLocaleString()}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleEnableCommunityHero}
                disabled={loading || disasterState?.isCommunityHeroActive}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                🚨 Activate Community Hero Mode
              </button>

              <button
                onClick={handleDisableCommunityHero}
                disabled={loading || !disasterState?.isCommunityHeroActive}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Deactivate Community Hero Mode
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
