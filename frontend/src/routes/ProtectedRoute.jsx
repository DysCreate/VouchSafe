import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  
  if (!token) return <Navigate to="/login" replace />;
  
  if (role && userRole !== role) {
    // Redirect to the correct dashboard based on user's actual role
    if (userRole === 'EMPLOYER') return <Navigate to="/employer-dashboard" replace />;
    if (userRole === 'EMPLOYEE') return <Navigate to="/employee-dashboard" replace />;
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default ProtectedRoute;
