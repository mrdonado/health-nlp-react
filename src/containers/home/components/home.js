import React from 'react';
import './home.css';

export default class Home extends React.Component {

  componentDidMount() {
    this.setState({ section: 1 });
    window.addEventListener('scroll',
      this.scrollHandler.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll',
      this.scrollHandler.bind(this)
    );
  }

  scrollHandler(e) {
    let s1 = document.getElementById('section-1').offsetTop,
      s2 = document.getElementById('section-2').offsetTop,
      s3 = document.getElementById('section-3').offsetTop,
      s4 = document.getElementById('section-4').offsetTop,
      offset = e.srcElement.body.scrollTop + window.innerHeight / 2,
      sections = [s4, s3, s2, s1];
    sections.some((s, idx) => {
      if (offset > s) {
        this.setState({ section: sections.length - idx });
        return true;
      }
      return false;
    })

  }

  render() {
    return <div id="home-content">
      <section id="section-1" className={this.state &&
        this.state.section === 1 ? 'active' : ''}>
        <p className="p1 p-right">
          Lifescope is an <br /><strong>Artificial Intelligence</strong> algorithm that finds <strong>solutions</strong> to healthcare <strong>problems</strong>.
      </p>
      </section>
      <section id="section-2" className={this.state &&
        this.state.section === 2 ? 'active' : ''}>
        <p className="p2 p-left">
          It's constantly <strong>monitoring</strong> social media feeds to find <strong>treatments</strong> for diseases.
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
          The <strong>algorithm</strong> analyzes not only the content, but also <strong>the sender</strong> of the message to exclude not health-related sources.
      </p>
      </section>
    </div>
  }
}