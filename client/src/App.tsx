import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Notfound from './pages/Notfound';
import Project from './pages/Project';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_SERVER_URI,
    cache: new InMemoryCache(),
  });
  
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects' element={<ProjectsPage />} />
              <Route path='/project/:id' element={<Project/>} />
              <Route path='*' element={<Notfound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
