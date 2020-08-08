const INITIAL_STATE = {
  auth: {
    token: null,
    refresh_token: null,
    type: 'bearer',
  },
  user: {
    email: null,
    name: null,
    cpf: null,
    date_birth: null,
    id: null,
    roles: [],
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, user: { ...state.user, ...action.user } };
    case 'ADD_ROLE_PERMISSION':
      return { ...state, ...action.rolePermission };
    case 'ADD_AUTH':
      return { ...state, auth: { ...state.auth, ...action.auth } };
    case 'LOGOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default user;
