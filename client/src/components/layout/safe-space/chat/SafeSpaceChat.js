import React from 'react';

import './SafeSpaceChat.css';

import MiniNav from '../../../elements/mini-nav/MiniNav';
import wordartSwag from '../../../../resources/img/wordart/wordart.png';
import wordartInternet from '../../../../resources/img/wordart/internet.png';
import wordartAnnees2000 from '../../../../resources/img/wordart/annees2000.png';
import Emoji from 'a11y-react-emoji';

const SafeSpaceChat = () => {
  return (
    <div id="safe-space-chat">
      <MiniNav />
      <h2 className="neon">
        Rejoins le safe space <br />
        d'Electronic Tales
      </h2>
      <p id="connect">
        Nous avons créé un{' '}
        <a
          href="https://join.slack.com/t/electronictales/shared_invite/zt-kox8itw1-tveUHRe8QSTtjs0Bb172BA"
          target="_blank"
        >
          Slack
        </a>{' '}
        pour permettre aux membres de notre communauté de... <br />
        <br />
        Pour le bien-être de tous·tes, nous te demandons de suivre deux grands principes :
      </p>
      <ul>
        <li>
          <h4>
            <Emoji symbol="😎" label="pseudonym" />
            &nbsp;Utilise un pseudo
          </h4>
          Laissons de côté les vrais noms, lieux de travail et noms d'entrprises – retrouvons le{' '}
          <img src={wordartSwag} alt="le mot swag en wordart" id="swag" /> de
          <img src={wordartInternet} alt="le mot internet en wordart" id="internet" /> du début des{' '}
          <img
            src={wordartAnnees2000}
            alt="les mots 'années 2000' en wordart"
            id="swag"
            id="annees-2000"
          />{' '}
          et libérons la parole.
        </li>
        <li>
          <h4>
            <Emoji symbol="🤗" label="respect" />
            &nbsp;N'oublie jamais le respect
          </h4>
          Pas de racisme, de sexisme, d'homophobie, de transphobie, de body shaming et tous autres{' '}
          <i>-&nbsp;ismes</i>, <i>-&nbsp;ing</i> et <i>-&nbsp;phobies</i> susceptibles de mettre
          quelqu'un mal à l'aise. Cela demande beaucoup d'énergie et de courage pour parler, même
          anonymement dans un recoin éloigné d'internet, donc on sera intransigeant·e·s sur la
          question.
        </li>
      </ul>
      <a
        href="https://join.slack.com/t/electronictales/shared_invite/zt-kox8itw1-tveUHRe8QSTtjs0Bb172BA"
        target="_blank"
        className="basic-button"
      >
        Rejoindre le Slack
      </a>
    </div>
  );
};

export default SafeSpaceChat;
