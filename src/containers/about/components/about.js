import React from 'react';
import './about.css';

const About = (props) => (
  <div id="about-content">
    <p>
      Lifescope is an Artificial Intelligence software that <strong>finds solutions to health diseases</strong> in digital sources, such as social networks or news feeds. It consists of a live stream of text messages, and a Natural Language Processing algorithm that extracts health problems and solutions, and provides semantic labels to categorize the message sender profile. In other words, it finds out <strong>what the message says and who says it</strong>, providing an accurate and real-time analysis on massive health data.
    </p>
    <p>
      This is an open source software project. It aims to provide the latest information on healthcare, and helps in clarifying it by <strong>making the sender explicit </strong>and discarding unknown sources.
    </p>
    <p>
      We believe that Lifescope will offer <strong>great research opportunities to anyone interested in healthcare information</strong>. We are concerned with the challenging issues posed by the New Media Age, where information flow surpasses the human ability to digest new data - consider, for example, how many talks, conferences or health discoveries are being posted now, at any second. That’s where Lifescope comes in.
    </p>
    <p>
      Currently, the project is on development. After this first stage, <strong>we have completed the backend, frontend and analytics modules</strong> of the streaming panel that you can see in this web. We are working on <strong>a new module to make queries</strong> and <strong>display graphs</strong> on the dataset we are gathering. In the meantime, you can see an example of some raw data files here.
    </p>
    <p>
      Please, <strong>do not take the information provided here as medical advice</strong>. On the other hand, although we are constantly fine-tuning the algorithm, you may find errors in some analysis outputs - for example, a word like “hospital” wrongly annotated as a treatment. Every artificial intelligence software is prone to errors, as they never substitute humans. In any case, the <strong>current performance score is around 80%</strong>.
    </p>
    <p>
      Comments and suggestions are welcome. Contact us at <a href="mailto:info@lifescope-project.com">info@lifescope-project.com</a>
    </p>
    <h2>On the authors</h2>
    <p>
      <a href="https://github.com/JuanFF">Juan Fernández Fernández</a> holds a PhD in Natural Language Processing. He works in Analytics and Information Extraction systems based on insights into the properties of human language, specially Semantics and Cognition. He suffers from an autoimmune condition called alopecia areata, for which there is currently no effective treatment. He works in this project to make a contribution to research on hard to treat diseases.
    </p>
    <p>
      <a href="http://www.jdonado.com/">F. Javier R. Donado</a> holds a M.Eng. in Telecommunication and has been developing software professionally since 2010. He currently works as a software development team lead in Stuttgart (Germany). Javier has a wide experience in the development of modern web applications and is always looking for new challenges and interesting projects. He loves Open Source, VIM, functional programming and triple chocolate cookies.
    </p>
    <footer></footer>
  </div>
);

export default About;