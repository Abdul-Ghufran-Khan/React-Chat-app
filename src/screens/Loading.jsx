import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {

  const Navigate = useNavigate()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const UserId = await localStorage.getItem('userid')
    setTimeout(() => {
      if (UserId != null) {
        Navigate("/home")
      } else {
        Navigate("/login")
      }
    }, 2000);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="loader rounded-full border-t-4 border-b-4 border-blue-500 h-10 w-10 mb-4 animate-spin"></div>
      <h2 className="text-2xl font-semibold text-gray-700 animate-pulse">Loading...</h2>
      <p className="text-gray-500">Please wait while we load the content.</p>
    </div>
  );
};

export default Loading;
