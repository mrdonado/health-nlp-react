import React from 'react';

const UrlToA = (props) => {
  let regex = /(https?:\/\/)/;
  let div = props.text.replace(/[\n\r\s\t]/g, ' ');
  let match = div.match(regex);
  if (match) {
    let from = div.indexOf(match[0]);
    let to = div.indexOf(' ', from);
    to = to > -1 ? to : div.length;
    let url = div.substring(from, to);
    div = [div.substring(0, from),
    <a key={url} target="blank" href={url}>{url}</a>];
    if (to < props.text.length) {
      div.push(' ' + props.text.substring(to + 1));
    }
  }
  return <i>{div}</i>;
};

export default UrlToA;