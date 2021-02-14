import {
  GET_TOO_LATE_TO_ASKS,
  REMOVE_TOO_LATE_TO_ASK,
  TOO_LATE_TO_ASK_ERROR,
  SET_HAS_ALREADY_BEEN_LOADED,
  SUGGEST_A_TOO_LATE_TO_ASK,
} from './types';
import api from '../../utils/urls/api';

export const getTooLateToAsks = (world) => async (dispatch) => {
  try {
    const res = await api.get(`/toolatetoasks/${world}`);
    dispatch({
      type: GET_TOO_LATE_TO_ASKS,
      payload: res.data,
      world: world,
    });
  } catch (error) {
    console.log(error);
  }
};

// A helper actions that prevents reloading TLTA cards every time user comes back to the world
export const setHasAlreadyBeenLoaded = (TooLateToAskOfAWorld) => (dispatch) => {
  dispatch({
    type: SET_HAS_ALREADY_BEEN_LOADED,
    payload: TooLateToAskOfAWorld,
  });
};

// Remove a question fromm all the questions list when user discards a TLTA card
export const removeATooLateToAsk = (questionToRemove) => (dispatch) => {
  dispatch({
    type: REMOVE_TOO_LATE_TO_ASK,
    payload: questionToRemove,
  });
};

export const suggestTLTA = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/suggestions/too-late-to-asks', formData);
    if (res.status === 200) {
      dispatch({
        type: SUGGEST_A_TOO_LATE_TO_ASK,
        payload: res.data,
      });
      return 'success';
    }
  } catch (error) {
    console.error('The error is ' + error.response.status);
    return error.response.status;
  }
};
