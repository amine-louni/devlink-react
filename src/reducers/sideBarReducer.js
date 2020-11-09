const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return !state;

    default:
      return state;
  }
};
