import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ section: 1 });
    this.scrollEventListener = this.scrollHandler.bind(this);
    window.addEventListener('scroll',
      this.scrollEventListener
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll',
      this.scrollEventListener
    );
  }

  scrollHandler(e) {
    let s1 = document.getElementById('section-1').offsetTop,
      s2 = document.getElementById('section-2').offsetTop,
      s3 = document.getElementById('section-3').offsetTop,
      s4 = document.getElementById('section-4').offsetTop,
      s5 = document.getElementById('section-5').offsetTop,
      scrollTop = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0,
      offset = scrollTop + window.innerHeight / 2,
      sections = [s5, s4, s3, s2, s1];
    sections.some((s, idx) => {
      if (offset > s) {
        this.setState({ section: sections.length - idx });
        return true;
      }
      return false;
    });
  }

  render() {
    return <div id="home-content" className="main-content">
      <a className="corner-ribbon"
        target="_blank" rel="noopener noreferrer"
        href="http://insights.lifescope-project.com/">Visit our Blog!
        </a>
      <div className={'background slide-' + ((this.state && this.state.section) || '1')}></div>
      <section id="section-1" className={this.state &&
        this.state.section === 1 ? 'active' : ''}>
        <p className="p1 p-right">
          <span className="smaller">
            Lifescope is an</span><br />
          <strong>Artificial Intelligence </strong>
          <span className="smaller">
            software that finds </span><strong>solutions</strong> to healthcare <strong>problems</strong>.
      </p>
      </section>
      <section id="section-2" className={this.state &&
        this.state.section === 2 ? 'active' : ''}>
        <p className="p2 p-left">
          It's constantly <strong>monitoring<br /></strong>
          <span className="smaller">
            social media feeds to find <strong>treatments</strong> for diseases</span>.
      </p>
      </section>
      <section id="section-3" className={this.state &&
        this.state.section === 3 ? 'active' : ''}>
        <p className="p3 p-right">
          It provides an accurate and <strong>real-time analysis </strong>of incoming messages in a <strong>timeline</strong>.
      </p>
      </section>
      <section id="section-4" className={this.state &&
        this.state.section === 4 ? 'active' : ''}>
        <p className="p4 p-left">
          The <strong>algorithm</strong> <span className="smaller">analyzes not only the content, but also</span><br /><strong>the sender</strong> <span className="smaller">of the message to exclude not health-related sources</span>.
      </p>
      </section>
      <section id="section-5"
        className={this.state &&
          this.state.section === 5 ? 'active' : ''}        >
        <p className="go-to-timeline">       <Link to="/timeline">
          Go to the <strong>timeline</strong>
        </Link>
        </p>
        {/* <a rel="noopener noreferrer" href="http://insights.lifescope-project.com">
          <p className="go-to-blog"><strong>Lifescope</strong> Insights</p>
        </a> */}
      </section>
      <div id="img-loader">
        <div className="l-1"></div>
        <div className="l-2"></div>
        <div className="l-3"></div>
        <div className="l-4"></div>
        <div className="l-5"></div>
      </div>
    </div>
  }
}