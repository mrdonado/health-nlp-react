import React from 'react';

const UrlToA = (props) => {
  let regex = /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?/;
  let match = props.text.match(regex);
  let div = props.text;
  if (match) {
    div = div.split(match[0].split(' ')[0]).map((t,idx) => {
      if (t === "") {
        return <a key={match[0] + idx} href={match[0]}>{match[0]}</a>;
      }
      return t;
    });
  }
  return <i>{div}</i>;
};

export default UrlToA;