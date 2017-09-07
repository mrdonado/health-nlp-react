import React from 'react';
import './home.css';

export default class Home extends React.Component {
  render() {
    return <div className="home-container">
      <p>
        Lifescope is an Artificial Intelligence algorithm that finds solutions to healthcare problems.
      </p>
      <p>
        It's constantly monitoring social media feeds to search treatments for diseases.
      </p>
      <p>
        It provides an accurate and real-time analysis of incoming messages in a timeline.
      </p>
      <p>
        The algorithm analyzes not only the content, but also the sender of the message to exclude not health-related sources.
      </p>
    </div>
  }
}