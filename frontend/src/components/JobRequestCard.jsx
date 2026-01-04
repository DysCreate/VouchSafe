import React from 'react';

function JobRequestCard({ job, onAccept, onReject, onComplete, onVouch }) {
  const isAccepted = job.status === 'ACCEPTED';
  const isCompleted = job.status === 'COMPLETED';
  const isPending = job.status === 'REQUESTED';

  const getStatusBadge = () => {
    if (isCompleted) return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Completed</span>;
    if (isAccepted) return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Accepted</span>;
    if (isPending) return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Pending</span>;
    return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">{job.status}</span>;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <h4 className="font-bold text-lg text-gray-900">{job.service}</h4>
        {getStatusBadge()}
      </div>
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
      <div className="mt-4 flex gap-3">
        {isPending && onAccept && (
          <button
            onClick={() => onAccept(job._id)}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow hover:shadow-md"
          >
            Accept Job
          </button>
        )}
        {isPending && onReject && (
          <button
            onClick={() => onReject(job._id)}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            Decline
          </button>
        )}
        {isAccepted && onComplete && (
          <button
            onClick={() => onComplete(job._id)}
            className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow hover:shadow-md"
          >
            Mark Complete
          </button>
        )}
        {isCompleted && onVouch && job.employeeId && (
          <button
            onClick={() => onVouch(job)}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow hover:shadow-md flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Vouch
          </button>
        )}
      </div>
    </div>
  );
}

export default JobRequestCard;
