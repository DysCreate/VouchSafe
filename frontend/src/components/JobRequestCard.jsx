import React from 'react';

function JobRequestCard({ job, onAccept, onReject, onComplete }) {
  const isAccepted = job.status === 'ACCEPTED';
  const isCompleted = job.status === 'COMPLETED';
  const isPending = job.status === 'REQUESTED';

  return (
    <div className="border p-4 rounded-lg shadow">
      <h4 className="font-bold">{job.service}</h4>
      <p className="text-sm text-gray-600">Status: {job.status}</p>
      {job.employerId && (
        <div className="text-sm mt-2">
          {isAccepted || isCompleted ? (
            <>
              <p>Employer: {job.employerId.name}</p>
              <p>Phone: {job.employerId.phone}</p>
              <p>Email: {job.employerId.email}</p>
            </>
          ) : (
            <p>Employer details shown after acceptance</p>
          )}
        </div>
      )}
      {job.employeeId && (
        <div className="text-sm mt-2">
          {isAccepted || isCompleted ? (
            <>
              <p>Employee: {job.employeeId.name}</p>
              <p>Phone: {job.employeeId.phone}</p>
              <p>Email: {job.employeeId.email}</p>
            </>
          ) : (
            <p>Employee details shown after acceptance</p>
          )}
        </div>
      )}
      <div className="mt-3 space-x-2">
        {isPending && onAccept && (
          <button
            onClick={() => onAccept(job._id)}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Accept
          </button>
        )}
        {isPending && onReject && (
          <button
            onClick={() => onReject(job._id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Reject
          </button>
        )}
        {isAccepted && onComplete && (
          <button
            onClick={() => onComplete(job._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
}

export default JobRequestCard;
