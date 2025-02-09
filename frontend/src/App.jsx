import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const Loading = lazy(() => import('./components/Loading/Loading'));
const UsersList = lazy(() => import('./pages/UserListPage/UserListPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <nav>
          <Link to="/register">Регистрация</Link> | <Link to="/login">Вход</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/" element={<HomePage />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
