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
      Incoming messages are automatically annotated using labels.</p><p><i className="solution">Green labels</i> match treatments, therapies, management or any supportive action on diseases, for which <i className="problem">red labels</i> are used.
    </p>
    <p>
      Source and user categories are automatically inferred. Feeds come from Twitter, PubMed and ClinicalTrials sources. 13 different profiles are identified.
    </p>
    <ul>
      <li><span className="user-tag doctor">Doctor</span>: A self-described physician</li>
      <li><span className="user-tag news-source">News source</span>: Any kind of medical news source</li>
      <li><span className="user-tag health-initiative">Healthcare initiative</span>: A source related to a healthcare project or action plan</li>
      <li><span className="user-tag interested-in healthcare">Interested in healthcare</span>: Someone who expresses an interest in healthcare</li>
      <li><span className="user-tag academia">Academia</span>: A health science researcher or lecturer</li>
      <li><span className="user-tag med-business">Med Business</span>: A source related to medical products or companies</li>
      <li><span className="user-tag institution">Institution</span>: Any kind of healthcare formal organization</li>
      <li><span className="user-tag professional">Professional</span>: A self-described expert in some health domain</li>
      <li><span className="user-tag publishing-source">Publishing source</span>: A medical serious publication</li>
      <li><span className="user-tag generic">Generic</span>: Any other health-related sources</li>
      <li><span className="user-tag association">Association</span>: Any kind of organization related to healthcare</li>
      <li><span className="user-tag pubmed-tag">PubMed</span>: Links to journals' paper titles and abstracts stored in PubMed, a free medical database</li>
      <li><span className="user-tag clinicaltrials-tag">ClinicalTrials.gov</span>: Links to information on clinical studies stored in ClinicalTrials.gov, a free medical database on medical clinical studies</li>
    </ul>
  </div>;
};