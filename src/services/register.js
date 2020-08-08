import api from './api';

const register = async (
  email,
  password,
  password_confirmation,
  name,
  cpf,
  date_birth,
) => {
  const response = await api.post('/auth/register', {
    email,
    password,
    password_confirmation,
    name,
    cpf,
    date_birth,
  });
  return response.data;
};

export default register;
