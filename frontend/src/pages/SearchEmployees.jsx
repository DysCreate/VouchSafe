import React, { useState } from 'react';
import { searchEmployees, sendJobRequest } from '../services/api';
import EmployeeCard from '../components/EmployeeCard';

function SearchEmployees() {
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
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Employees</h2>
          <p className="text-gray-600">Find trusted professionals by designation, ranked by Trust Score</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by designation (e.g., Plumber, Tailor, Electrician)"
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
              Search
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{results.length}</span> employee{results.length !== 1 ? 's' : ''} found
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
            <p className="text-gray-500 text-lg">No employees found for "{designation}"</p>
            <p className="text-gray-400 text-sm mt-2">Try a different designation</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchEmployees;
