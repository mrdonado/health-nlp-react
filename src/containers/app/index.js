import React from 'react';
import NavLink from './components/nav-link';
import { Route } from 'react-router-dom';
import Home from '../home';
import About from '../about/components/about';
import './app.css';

export default class App extends React.Component {

  componentDidMount = () => {
    this.setState({ sideMenuActive: '' });
  };

  render() {
    const navLinks = <div>
      <span className="logo">
        lifescope</span>
      <NavLink to="/">T/L</NavLink>
      <NavLink to="/about-us">About</NavLink>
    </div>;

    return <div>
      <div id="side-menu"
        onClick={() => {
          this.setState({ sideMenuActive: '' });
        }}
        className={this.state && this.state.sideMenuActive}>

        {navLinks}
      </div>
      <div id="side-menu-mask"
        onClick={() => {
          this.setState({ sideMenuActive: '' });
        }}
        className={this.state && this.state.sideMenuActive}>
      </div>
      <nav>
        <div id="burger-menu"
          onClick={() => {
            this.setState({ sideMenuActive: 'active' });
          }}>
          ≡
      </div>
        <div className="nav-content-wrapper">
          {navLinks}
        </div>
      </nav>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/about-us" component={About} />
      </main>
    </div>;
  }
}