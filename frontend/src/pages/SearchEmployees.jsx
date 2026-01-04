import React, { useState } from 'react';
import { searchEmployees, sendJobRequest } from '../services/api';
import EmployeeCard from '../components/EmployeeCard';

function SearchEmployees() {
  const [skill, setSkill] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await searchEmployees({ skill });
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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Search Employees</h1>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Skill (e.g., plumber)"
          className="border px-3 py-2 rounded w-64"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((emp) => (
          <EmployeeCard key={emp._id} employee={emp} onSendRequest={handleSendRequest} />
        ))}
      </div>
    </div>
  );
}

export default SearchEmployees;
