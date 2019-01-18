/* eslint-disable */
import React from 'react';
import './about.css';
import juanPhoto from '../../../assets/images/juan-photo.png';
import javiPhoto from '../../../assets/images/javi-photo.jpg';
import lifescopeInsightsPhoto from '../../../assets/images/lifescope-insights.jpg';

export default class About extends React.Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
  }

  render() {
    return <div id='about-content'>
      <h2>About lifescope</h2>
      <p>
        Lifescope is an Artificial Intelligence software that <strong>finds treatments for health diseases</strong> in digital sources, such as social networks, news feeds or medical databases. It consists of a live stream of text messages, and a Natural Language Processing algorithm that extracts mentions to health diseases and treatments, and provides semantic labels to categorize the message sender profile. In other words, it finds out <strong>what the message says and who says it</strong>, providing an accurate and real-time analysis on massive health data.
      </p>
      <p>
        This is an <a target='_blank' rel='noopener noreferrer' href='https://github.com/fjrd84/health-nlp-analysis'> open source</a> software project. It aims to provide the latest information on healthcare, and helps in clarifying it by making the sender explicit and discarding unknown sources.
      </p>
      <p>
        We believe that Lifescope will offer great <strong>research opportunities</strong> to anyone interested in healthcare information. We are concerned with the challenging issues posed by the New Media Age, where information flow surpasses the human ability to digest new data - consider, for example, how many talks, conferences or health discoveries are being posted now, at any second.
      </p>
      <p>
        This project is <strong>on development</strong>. We have finished the backend and text analysis modules of the streaming panel that you can see in this web. Contact us at <a href='mailto:info@lifescope-project.com' > info@lifescope-project.com</a > if you wish to access the data we are gathering from May 2018.
      </p>

      <p>
        <img className='right-photo' alt='Lifescope Insights' src={lifescopeInsightsPhoto} />
        Visit <a target='_blank' rel='noopener noreferrer' href='http://insights.lifescope-project.com'>this page</a> to get detailed information about the data sources and confidence of the algorithm. You can also find detailed technical documentation about the backend architecture in <a target='_blank' rel='noopener noreferrer' href='https://blog.jdonado.com/lifescope-project/'>JDonado's Readme</a>.
      </p>
      <p>
        Please, <strong>do not take the information provided here as medical advice</strong>.
      </p>
      <h2>On the authors</h2>
      <p className='author-info'>
        <img className='right-photo' alt='Juan Fernández' src={juanPhoto} />
        <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/juanff/'>Juan Fernández Fernández</a> holds a PhD in Natural Language Processing. He works in Information Extraction and Dialogue systems based on insights into the properties of human language, specially Semantics and Cognition. He suffers from an autoimmune condition called alopecia areata, for which there is currently no effective treatment. He works in this project to make a contribution to research on hard to treat diseases.
      </p>
      <p className='author-info'>
        <img className='left-photo' alt='F. Javier R. Donado' src={javiPhoto} />
        <a target='_blank' rel='noopener noreferrer' href='http://www.jdonado.com/'>F. Javier R. Donado</a> holds a M.Eng. in Telecom and has been
developing software professionally since 2010. He currently works as a software development team lead in Stuttgart (Germany).
        Javier has a wide experience in the development of modern web applications and is always looking for new challenges and interesting projects. He loves Open Source, VIM, functional programming and triple chocolate cookies.
      </p>
      <footer />
    </div>;
  }
}