import React from 'react';
import NavLink from './components/nav-link';
import { Route, Link } from 'react-router-dom';
import Timeline from '../timeline';
import Home from '../home';
import Stats from '../stats';
import About from '../about/components/about';
import './app.css';

export default class App extends React.Component {

  componentDidMount = () => {
    this.setState({ sideMenuActive: '' });
  };


  render() {

    const navLinks = <div>
      <Link to="/">
        <span className="logo">
          lifescope</span>
      </Link>

      <NavLink to="/stats">Stats</NavLink>
      <NavLink to="/timeline">Timeline</NavLink>
      {/* <a target="_blank" className="nav-link"
        rel="noopener noreferrer"
        href="http://insights.lifescope-project.com">Insights</a> */}
      <NavLink to="/about-us">Insights</NavLink>
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
        <Route exact path="/stats" component={Stats} />
        <Route exact path="/timeline" component={Timeline} />
        <Route exact path="/about-us" component={About} />
      </main>
    </div >;
  }
}