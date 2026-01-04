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

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
      {data.profile && (
        <div className="mb-6">
          <TrustBadge score={data.profile.trustScore || 0} />
          <p className="text-sm text-gray-700 mt-2">Completed Jobs: {data.profile.completedJobs || 0}</p>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">Incoming Job Requests</h2>
      <div className="grid gap-4">
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
          <p>No job requests</p>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
