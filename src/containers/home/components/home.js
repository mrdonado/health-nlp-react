import React from 'react';
import './home.css';

export default class Home extends React.Component {
  render() {
    return <div id="home-content">
      <section>
        <p className="p1">
          Lifescope is an <br /><strong>Artificial Intelligence</strong> algorithm that finds <strong>solutions</strong> to healthcare <strong>problems</strong>.
      </p>
      </section>
      <section>
        <p className="p2">
          It's constantly <strong>monitoring</strong> social media feeds to search <strong>treatments</strong> for diseases.
      </p>
      </section>
      <section>
        <p className="p3">
          It provides an accurate and <strong>real-time analysis </strong>of incoming messages in a <strong>timeline</strong>.
      </p>
      </section>
      <section>
        <p className="p4">
          The <strong>algorithm</strong> analyzes not only the content, but also <strong>the sender</strong> of the message to exclude not health-related sources.
      </p>
      </section>
    </div>
  }
}