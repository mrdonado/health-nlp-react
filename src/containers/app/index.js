import React from 'react';
import NavLink from './components/nav-link';
import { Route } from 'react-router-dom';
import Home from '../home';
import About from '../about/components/about';
import './app.css';


const App = () => (
  <div>
    <nav>
      <NavLink to="/">
        Timeline 
      </NavLink>
      <NavLink to="/about-us">
        About
      </NavLink>
    </nav>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
);

export default App;