import api from './api';

const updateProfile = async (
  email,
  email_confirmation,
  name,
  cpf,
  cnh,
  date_birth,
) => {
  const response = await api.put('/user/me/update', {
    email,
    email_confirmation,
    name,
    cpf,
    cnh,
    date_birth,
  });
  return response.data;
};

export default updateProfile;
