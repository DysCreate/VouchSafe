import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeProfile } from '../services/api';
import TrustBadge from '../components/TrustBadge';

function EmployeeProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await getEmployeeProfile(id);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [id]);

  if (!profile) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">{profile.userId?.name || 'Employee'}</h1>
      <TrustBadge score={profile.trustScore || 0} />
      <p className="mt-4 text-gray-700">Skills: {profile.skills?.join(', ') || 'N/A'}</p>
      <p className="text-gray-700">Completed Jobs: {profile.completedJobs || 0}</p>
    </div>
  );
}

export default EmployeeProfile;
