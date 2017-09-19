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

const renderTextArea = ({
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
      <textarea {...input} placeholder={label} type={type}></textarea>
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
  const { handleSubmit, /*pristine, reset,*/ submitting, onClose, opened } = props
  return <div id="form-mask"
    className={opened ? 'active' : ''}>
    <div id="analysis-form">
      <h2
        onClick={onClose}
      >Test The Analyzer</h2>

      <form onSubmit={handleSubmit}>

        <div className="row">
          <Field
            name="user_name"
            type="text"
            component={renderField}
            label="User name"
          />
        </div>

        <div className="row">
          <Field
            name="user_description"
            type="text"
            component={renderField}
            label="User description"
          />
        </div>

        <div className="row">
          <Field
            name="message"
            type="text"
            rows="4"
            component={renderTextArea}
            label="Message:"
          />
        </div>

        <button className="send-button"
          type="submit" disabled={submitting}>Send</button>
        {/* <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button> */}
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