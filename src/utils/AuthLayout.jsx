import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const AuthLayout = () => {
  const usersQuery = useUserData();

  console.log(usersQuery);
  if (usersQuery.isLoading) return <p>Loading...</p>;

  if (!usersQuery.data)
    return (
      <>
        {' '}
        <Navigate to="/" state={{ message: 'Please login first ' }} />
      </>
    );
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
