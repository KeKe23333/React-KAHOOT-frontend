import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';

const About = () => {
  return <div>About</div>;
};

const Profile = () => {
  return <div>Profile</div>;
};

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
