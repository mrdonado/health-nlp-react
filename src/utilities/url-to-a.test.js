import UrlToA from './url-to-a';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

describe('UrlToA utility', () => {

  const rndr = ReactDOMServer.renderToStaticMarkup;

  it('converts text to i elements with anchors where URL are present', () => {

    expect(UrlToA({
      text: 'A message without an URL'
    })).toEqual(<i>A message without an URL</i>);

    expect(rndr(
      UrlToA({
        text: 'A message with a https://www.google.de URL'
      })))
      .toEqual(rndr(
        <i>A message with a <a target="_blank" href="https://www.google.de" >https://www.google.de</a> URL</i>)
      );

      expect(rndr(
        UrlToA({
          text: 'A message with a https://www.google.de'
        })))
        .toEqual(rndr(
          <i>A message with a <a target="_blank" href="https://www.google.de" >https://www.google.de</a></i>)
        );

  });
});
