import api from './api';

const checkpoint = async (
  latitude,
  longitude,
  license_plate,
  amount_people,
  estimed_time,
  reason_visit,
  city_origin,
  uf_state_origin,
  state_origin,
  aproved,
  justification,
) => {
  const response = await api.post('/admin/checkpoint', {
    geolocation: {
      latitude,
      longitude,
    },
    license_plate,
    amount_people,
    estimed_time,
    reason_visit,
    origin_visit: {
      city_origin,
      uf_state_origin,
      state_origin,
    },
    aproved,
    justification,
  });

  return response;
};

export default checkpoint;
