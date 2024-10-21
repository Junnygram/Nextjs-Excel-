import React from 'react';

const NotAuthenticated = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Access Denied
        </h2>
        <p className="mt-4 text-center text-gray-600">
          You need to be logged in to fill this form Please log in to continue.
        </p>
        {/* <div className="mt-6 flex justify-center">
          <a
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Log In
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default NotAuthenticated;
