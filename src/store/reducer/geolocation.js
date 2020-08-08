const INITIAL_STATE = {
  latitude: null,
  longitude: null,
  radius: null,
};

function geolocation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_GEOLOCATION':
      return {
        ...state,
        ...action.geolocation,
      };
    default:
      return state;
  }
}

export default geolocation;
