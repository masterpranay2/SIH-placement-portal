import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage';
import StudentPage from './pages/StudentPage';
import DashboardPage from './pages/DashboardPage';
import Error from './components/Error';

function App() {
  
  return (
    // TODO : Add the shared routes here
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/student/*" element={<StudentPage />} />
      <Route path="/institution/*" element={<DashboardPage />} />
      <Route path="/corporate/*" element={<DashboardPage />} />
      <Route path="/government/*" element={<DashboardPage />} />
      <Route path="*" element={<Error error={404}/>} />
    </Routes>
  );
}

export default App;
