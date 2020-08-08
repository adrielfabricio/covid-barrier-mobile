const INITIAL_STATE = {
  refresh: false,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LIST_USER_REFRESH':
      return { ...state, refresh: !state.refresh };
    default:
      return state;
  }
}

export default user;
