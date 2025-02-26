import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { UserListPage } from './pages/UserListPage';

const Loading = lazy(() => import('./components/Loading/Loading'));

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
