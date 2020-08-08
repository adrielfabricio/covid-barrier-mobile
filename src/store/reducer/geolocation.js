const INITIAL_STATE = {
  geolocation: {
    latitude: null,
    longitude: null,
    radius: null,
  },
};

function geolocation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_GEOLOCATION':
      return {
        ...state,
        geolocation: { ...state.geolocation, ...action.geolocation },
      };
    default:
      return state;
  }
}

export default geolocation;
