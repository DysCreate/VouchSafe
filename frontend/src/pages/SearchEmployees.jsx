import React, { useState } from 'react';
import { searchEmployees, sendJobRequest } from '../services/api';
import EmployeeCard from '../components/EmployeeCard';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

function SearchEmployees() {
  const { tSync } = useLanguage();
  const [designation, setDesignation] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await searchEmployees({ designation });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendRequest = async (employeeId) => {
    const service = prompt('Enter service description:');
    if (!service) return;
    try {
      await sendJobRequest({ employeeId, service });
      alert('Job request sent!');
    } catch (err) {
      alert('Error sending request');
    }
  };

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
            <h1 className="text-xl font-bold text-gray-900">{tSync('VouchSafe').toUpperCase()}</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{tSync('Main Menu')}</p>
            <nav className="space-y-1">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg w-full text-left transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-medium">{tSync('Dashboard')}</span>
              </button>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium">{tSync('Search Employees')}</span>
              </a>
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">{tSync('Search Employees')}</h2>
            <p className="text-gray-500">{tSync('Find trusted professionals by designation')}</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={tSync('e.g., Plumber, Tailor, Electrician')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
              >
                {tSync('Search')}
              </button>
            </div>
          </div>

          {results.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{results.length}</span> {tSync('employees found')}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((emp) => (
              <EmployeeCard key={emp._id} employee={emp} onSendRequest={handleSendRequest} />
            ))}
          </div>

          {results.length === 0 && designation && (
            <div className="text-center py-16">
              <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-500 text-lg">{tSync('No employees found for')} "{designation}"</p>
              <p className="text-gray-400 text-sm mt-2">{tSync('Try a different designation')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchEmployees;
