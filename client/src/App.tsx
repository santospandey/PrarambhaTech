import React from 'react';
import Header from './components/Header';
import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Notfound from './pages/Notfound';
import Project from './pages/Project';
import ProjectsPage from './pages/ProjectsPage';


const client = new ApolloClient({
  uri: 'http://localhost:5100/_graphql',
  cache: new InMemoryCache(),
});

function App() {
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
