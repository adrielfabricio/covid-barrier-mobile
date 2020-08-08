import api from './api';

const me = async () => {
  const response = await api.get('/user/me');
  return response.data;
};

export default me;
