import React from 'react';
import './help-window.css';

export const HelpWindow = (props) => {
  return <div id="help-window"
    onClick={props.closeWindow}
    className={props.showHelp ? 'active' : ''}>
    <p>
      Lifescope analyzes health-related feeds taking content and sender into account.
    </p>
    <p>
      As for content, incoming messages are automatically annotated using labels.</p><p><i className="solution">Green labels</i> match treatments, procedures or generic solutions to health diseases, for which <i className="problem">red labels</i> are used.
    </p>
    <p>
      On the other hand, user categories are inferred from user description texts. The algorithm identifies eleven different profiles:
    </p>
    <ul>
      <li><span className="user-tag doctor">Doctor</span>: A self-described physician</li>
      <li><span className="user-tag news-source">News Source</span>: Any kind of medical news source</li>
      <li><span className="user-tag health-initiative">Health Initiative</span>: A source related to a healthcare project or action plan</li>
      <li><span className="user-tag interested-in healthcare">Interested in healthcare</span>: Someone who expresses an interest in healthcare</li>
      <li><span className="user-tag academia">Academia</span>: A health science researcher or lecturer</li>
      <li><span className="user-tag med-business">Med Business</span>: A source related to medical products or companies</li>
      <li><span className="user-tag patient">Patient</span>: A self-described patient</li>
      <li><span className="user-tag institution">Institution</span>: Any kind of healthcare organization</li>
      <li><span className="user-tag professional">Professional/Specialist</span>: A self-described expert in some health domain</li>
      <li><span className="user-tag publishing-source">Publishing source</span>: A medical serious publication</li>
      <li><span className="user-tag generic">Generic</span>: Any other health-related sources</li>
    </ul>
  </div>;
};