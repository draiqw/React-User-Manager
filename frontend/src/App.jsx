import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
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
          <Route path="/users" element={<UserListPage />} />
          <Route path="/" element={<HomePage />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
