import ProjectsPage from './projects/ProjectsPage';
import './App.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router';
import HomePage from './home/HomePage';
import ProjectPage from './projects/ProjectPage';
import ProjectCreate from './projects/ProjectCreate';
import Login from './auth/Login';
import Register from './auth/Register';
import { useEffect, useState } from 'react';
import { authService } from './auth/services/auth.service';

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

  const logoutAndClear = async () => {
    try {
      await authService.logout();
      setCurrentUser(undefined);
    } catch (error) {
      alert('There was an error trying log out. Please try again.');
      throw new Error(
        'There was an error trying log out. Please try again.'
      );
    }
  };
  
  return (
    <BrowserRouter>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        {currentUser ? (
        <><NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          Projects
        </NavLink>
        <NavLink to="/new" className="button rounded">
          New Project
        </NavLink>
        <NavLink to="/login" className="button rounded" onClick={logoutAndClear}>
            Log out
        </NavLink></>) : (
        <><NavLink to="/login" className="button rounded">
          Log in
        </NavLink>
        <NavLink to="/register" className="button rounded">
          Sign in
        </NavLink></>)}        
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/new" element={<ProjectCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
