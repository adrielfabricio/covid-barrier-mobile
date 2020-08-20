import api from './api';

const getVehicleHistoric = async (license_plate) => {
  const response = await api.get(`/admin/vehicles/${license_plate}`);

  return response.data;
};

export default getVehicleHistoric;
