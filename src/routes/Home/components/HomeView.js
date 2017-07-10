import React from 'react';
import './HomeView.scss';

const items = [
  {
    message: 'Some message with a problem and a solution',
    analysis: {
      problem: 'a problem',
      solution: 'a solution'
    }
  },
  {
    message: 'Some other message with a problem and a solution',
    analysis: {
      problem: 'a problem',
      solution: 'a solution'
    }
  }];

export const HomeView = () => (
  <div id='analysis-section'>
    {
      items.map((item, idx) => {
        return <ul key={idx.toString()} className='analysis-list'>
          {item.message}
        </ul>
      })
    }
  </div>
);

export default HomeView;
