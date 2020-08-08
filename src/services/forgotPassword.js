import api from './api';

const forgotPassword = async (email) => {
  const response = await api.post('/auth/reset-password', { email });
  return response.data;
};

export default forgotPassword;
