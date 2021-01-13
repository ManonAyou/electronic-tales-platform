import React from 'react';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import './FormWrapper.css';

import GoBackButton from '../../../buttons/go-back/GoBackButton';

import { ReactComponent as GoBack } from '../../../../../resources/img/icons/left-arrow.svg';

const Add = ({ children, isVisible, tellVisibilityChange }) => {
  // const history = useHistory();

  return (
    <div id="form-wrapper">
      <Animated
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft"
        animationInDelay={200}
        animationInDuration={600}
        animationOutDelay={300}
        isVisible={isVisible}
        className="flex-start"
      >
        <div
          id="actions-container"
          onClick={() => {
            tellVisibilityChange(false);
          }}
        >
          <GoBackButton timeOut={600} />
        </div>
      </Animated>
      <Animated
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft"
        animationInDuration={600}
        animationInDelay={0}
        isVisible={isVisible}
        className="flex"
      >
        {children}
      </Animated>
    </div>
  );
};

Add.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  tellVisibilityChange: PropTypes.func,
};

export default Add;
