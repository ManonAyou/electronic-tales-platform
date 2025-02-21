import React from 'react';
import { Fragment } from 'react';
import CardsHub from '../../cards-hub/CardsHub';

const AllArticlesOfTheWorld = ({ articles }) => {
  const deduceCategoriesFromArticles = (articles) => {
    if (articles.length !== 0) {
      let categories = groupBy(articles, 'category');
      const componentsToReturn = [];
      for (let i = 0; i < Object.keys(categories).length; i++) {
        const categoryName = Object.keys(categories)[i];
        const categoryArticles = categories[Object.keys(categories)[i]];
        componentsToReturn.push(
          <CardsHub key={i} categoryName={categoryName} categoryArticles={categoryArticles} />
        );
      }
      return componentsToReturn;
    }
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#grouping_objects_by_a_property
  const groupBy = (articles, category) => {
    return articles.reduce(function (acc, obj) {
      let key = obj[category];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  return <Fragment>{deduceCategoriesFromArticles(articles)}</Fragment>;
};

export default AllArticlesOfTheWorld;
