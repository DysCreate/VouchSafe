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

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Employer Dashboard</h1>
      <button
        onClick={() => navigate('/search-employees')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Search Employees
      </button>
      <h2 className="text-xl font-semibold mb-2">Sent Job Requests</h2>
      <div className="grid gap-4">
        {data.sent && data.sent.length > 0 ? (
          data.sent.map((job) => (
            <JobRequestCard key={job._id} job={job} onComplete={handleComplete} />
          ))
        ) : (
          <p>No sent job requests</p>
        )}
      </div>
    </div>
  );
}

export default EmployerDashboard;
