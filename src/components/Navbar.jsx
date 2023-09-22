import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../utils/instance';

const url = 'http://localhost:5000/auth/google';

const Navbar = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery(
    ['users', 'status'],
    ({ signal }) =>
      instance
        .get('/api/current_user', {
          withCredentials: true,
          signal,
        })
        .then((res) => res.data),
    {}
  );

  const logoutQuery = useQuery(
    ['users', 'logout'],
    ({ signal }) =>
      instance
        .get('/api/logout', {
          withCredentials: true,
          signal,
        })
        .then((res) => res.data),
    {
      enabled: false,
      onSuccess: () => {
        queryClient.invalidateQueries(['users', 'status']);
      },
    }
  );

  const handleLogin = () => {
    const api_url = import.meta.env.VITE_BACKEND_URL;
    const url =
      import.meta.env.MODE === 'development'
        ? 'http://localhost:5000/auth/google'
        : `${api_url}/auth/google`;

    window.open(url, '_self');
  };

  const handleLogout = () => {
    logoutQuery.refetch();
  };

  let content;
  if (usersQuery.isLoading) {
    content = <p></p>;
  } else if (usersQuery.data === '') {
    content = (
      <button
        onClick={handleLogin}
        href={url}
        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base cursor-pointer"
      >
        <svg
          className="h-5 w-5 shrink-0"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
            fill="#4285F4"
          />
          <path
            d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
            fill="#34A853"
          />
          <path
            d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
            fill="#FBBC05"
          />
          <path
            d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
            fill="#EA4335"
          />
        </svg>
        Login with Google
      </button>
    );
  } else {
    content = (
      <button
        onClick={handleLogout}
        className="  rounded-lg border border-red-300 bg-white px-8 py-3 text-center text-sm font-semibold text-red-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base cursor-pointer"
      >
        Logout
      </button>
    );
  }

  return (
    <div>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
              aria-label="logo"
            >
              <svg
                width="95"
                height="94"
                viewBox="0 0 95 94"
                className="h-auto w-6 text-indigo-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
              </svg>
              Light Blog
            </a>

            <nav className="hidden gap-12 lg:flex">
              <Link to="/" className="text-lg font-semibold text-indigo-500">
                Home
              </Link>
              <Link
                to="/blogs/new"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Create Blog
              </Link>
              <a
                href="#"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                About
              </a>
            </nav>

            {content}
          </header>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
