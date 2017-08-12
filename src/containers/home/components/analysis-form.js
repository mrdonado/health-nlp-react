import React from 'react';
import './analysis-form.css';

export default class AnalysisForm extends React.Component {
  render() {
    return <div>
      <button className="close-button"
        alt="Close"
        onClick={() => {
          //closeForm()
        }}>&nbsp;</button>
      <div id="analysis-form">
        <h2>Test The Analyzer</h2>
        <form>
          <div className="row">
            <label htmlFor="user-name">User Name:</label>
            <input type="text"
              name="user-name"
              id="user-name"></input>
          </div>
          <div className="row">
            <label htmlFor="user-description">User Description:</label>
            <input type="text"
              id="user-description"
              name="user-description">
            </input>
          </div>
          <label className="message"
            htmlFor="message">Message</label>
          <textarea id="message"
            name="message"
            rows="4">
          </textarea>
          <div className="send-button"
            onClick={() => {
              // sendNewJob()
            }
            }>Send</div>
        </form >
        <div className="info">
          <p>
            Here you can try out the analyzer by sending a new message to the analysis engine. When the analysis is ready, your message
      will appear on the top of the messages list, along with the analysis results.
      </p>
          <p> The whole process might take between some seconds and some minutes. Please, be patient.
      </p>
        </div>
      </div>
    </div>;
  }
}