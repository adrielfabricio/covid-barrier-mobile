import api from './api';

const showUser = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

export default showUser;
