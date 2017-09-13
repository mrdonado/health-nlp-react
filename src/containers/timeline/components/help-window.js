import React from 'react';

export const HelpWindow = (props) => {
  return <div id="help-window"
    onClick={props.closeWindow}
    className={props.showHelp ? 'active' : ''}>
    <h3>User Tags</h3>
    <ul>
      <li><span className="user-tag news-source">News Source</span></li>
      <li><span className="user-tag doctor">Doctor</span></li>
      <li><span className="user-tag generic">Generic</span></li>
      <li><span className="user-tag health-initiative">Health Initiative</span></li>
      <li><span className="user-tag interested-in healthcare">Interested in healthcare</span></li>
      <li><span className="user-tag professional">Professional</span></li>
      <li><span className="user-tag academia">Academia</span></li>
      <li><span className="user-tag med-business">Med Business</span></li>
      <li><span className="user-tag institution">Institution</span></li>
      <li><span className="user-tag healthcare-initiative">Healthcare Initiative</span></li>
    </ul>
  </div>;
};