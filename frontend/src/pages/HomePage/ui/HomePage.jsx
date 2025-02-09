import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <h1>Главная страница</h1>
      {user ? <p>Добро пожаловать, {user.name}!</p> : <p>Вы не авторизованы.</p>}
    </div>
  );
};

export default HomePage;
