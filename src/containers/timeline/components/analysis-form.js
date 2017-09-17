import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './analysis-form.css';


const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 10) {
    errors.username = 'Must be at least 10 characters';
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>;

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const AnalysisForm = props => {
  const { handleSubmit, pristine, reset, submitting, onClose, opened } = props
  return <div id="form-mask"
    className={opened ? 'active' : ''}>
    <div id="analysis-form">
      <h2
        onClick={onClose}
      >Test The Analyzer</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <Field
            name="username"
            type="text"
            component={renderField}
            label="Username"
          />
        </div>

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
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
        <div className="send-button"
          onClick={() => {
            const data = {
              source: 'web',
              user_name: 'Some userName',
              user_description: 'Some user description',
              message: 'Some message with a problem and a solution'
            };
            fetch('http://localhost:3005/analysis',
              {
                method: 'POST',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }).then((response) => {
                return response.json();
              }).then((data) => {
                console.log(data);
              });
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
};

export default reduxForm({
  form: 'analysisForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn // <--- warning function given to redux-form
})(AnalysisForm)