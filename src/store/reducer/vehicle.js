const INITIAL_STATE = {
  license_plate: null,
  amount_people: null,
  estimed_time: null,
  reason_visit: null,
  origin_visit: {
    city_origin: null,
    uf_state_origin: 'BA',
    state_origin: 'Bahia',
  },
};

function vehicle(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_VEHICLE':
      return {
        ...state,
        origin_visit: { ...state.origin_visit },
        ...action.vehicle,
      };
    default:
      return state;
  }
}

export default vehicle;
