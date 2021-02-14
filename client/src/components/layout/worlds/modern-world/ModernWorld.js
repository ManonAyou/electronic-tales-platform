import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Fade from 'react-reveal/Fade';

import './ModernWorld.css';

import { getAllArticlesInfos } from '../../../../redux/actions/article';
import { WORLDS } from '../../../../dictionnary/worlds';
import SwipeDoor from '../../../elements/swipe/swipe-door/SwipeDoor';
import AllArticlesofTheWorld from '../../../elements/article/all-articles/AllArticlesofTheWorld';
import CardsHub from '../../../elements/cards-hub/CardsHub';
import Lab from '../../../elements/lab/Lab';

const ModernWorld = ({ articles, getAllArticlesInfos }) => {
  useEffect(() => {
    getAllArticlesInfos(WORLDS.MODERN_WORLD);
  }, []);

  return (
    <Fade duration={1500}>
      <div id="modern-world" className="world-page container">
        <div className="line-title-wrapper world-title-wrapper">
          <h2 className="world-title neon flicker">Modern World</h2>
        </div>
        <Lab
          text="Retrouve ici des contenus d'Electronic Tales à venir. Pour participer à leur création, clique dessus&nbsp;: tu seras emmené·e vers le canal Slack dédié au sujet."
          cards={[
            {
              title: 'Le mur des salaires des devs juniors : partageons les vrais chiffres !',
              slug: '',
              thumbnail: process.env.PUBLIC_URL + '/img/articles/salaries.jpg',
            },
            {
              title: "Bouton SOS syndrome de l'imposteur : un outil d'urgence pour se sentir mieux",
              slug: '',
              thumbnail: process.env.PUBLIC_URL + '/img/articles/sos.jpg',
            },
            {
              title:
                'Le tamagotchi des devs : tracke tes progrès et compare-les à ceux des autres en toute bienveillance',
              slug: '',
              thumbnail: process.env.PUBLIC_URL + '/img/articles/tamagotchi.jpg',
            },
          ]}
        />
        <div className="image-card">
          <SwipeDoor link="/modern-world/too-late-to-ask" />
        </div>
        <AllArticlesofTheWorld articles={articles} />
      </div>
    </Fade>
  );
};

ModernWorld.propTypes = {
  articles: PropTypes.array.isRequired,
  getAllArticlesInfos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.article.allArticles,
});

export default connect(mapStateToProps, { getAllArticlesInfos })(ModernWorld);
