import * as actionTypes from '../constants/actionTypes';

const actionCreator = (something) => {
  console.log('[ACTION CREATOR]', something);

  return {
    type: actionTypes.TEST,
  };
};

export default actionCreator;
