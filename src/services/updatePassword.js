import api from './api';

const updatePassword = async (password, password_confirmation) => {
  const response = await api.put('/user/me/update-password', {
    password,
    password_confirmation,
  });
  return response.data;
};

export default updatePassword;
