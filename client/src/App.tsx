import React from 'react';
import './App.css';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './pages/Login';
import Game from './pages/Game';
import { useAuthContext } from './contexts/AuthContextProvider';

function App() {
  const { authState } = useAuthContext();

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        {authState.isAuthenticated && <Route path='/play' element={<Game />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
