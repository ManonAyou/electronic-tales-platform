import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

import ScrollToTop from './components/helpers/ScrollToTop';
import Navbar from './components/elements/navbar/Navbar';
import Routes from './components/routes/Routes';
import Home from './components/layout/home/Home';
import SecondaryNavbar from './components/elements/navbar/secondary-navbar/SecondaryNavbar';
import NotYet from './components/layout/not-yet/NotYet';

const App = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 768px)',
  });

  return (
    <Provider store={store}>
      {isDesktopOrLaptop ? (
        <NotYet />
      ) : (
        <Router>
          <SecondaryNavbar />
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Routes} />
          </Switch>
          <Navbar />
        </Router>
      )}
    </Provider>
  );
};

export default App;
