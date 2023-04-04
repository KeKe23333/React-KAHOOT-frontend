import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/sign';

const Manager = () => {
  return <div>Manager</div>;
};

const Profile = () => {
  return <div>Profile</div>;
};

function App () {
  const [token, setToken] = React.useState(null);
  console.log('token is: ' + token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onSuccess={setToken} />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
