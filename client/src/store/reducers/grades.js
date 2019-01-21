const initialState = [];

const getGrades = (state = initialState, action) => {
  console.log('[INSIDE getGrades reducer]');

  switch (action.type) {
    case 'TEST':
      console.log('[INSIDE TEST]');
      return 'TEST';
    case 'HANDLE_CHANGE':
      console.log(action.payload);
      return 'HANDLE_CHANGE';
    default:
      return state;
  }
};

export default getGrades;
