import api from './api';

const updateUser = async (
  id,
  active,
  email,
  email_confirmation,
  name,
  cpf,
  cnh,
  date_birth,
) => {
  const response = await api.put(`/admin/users/${id}`, {
    active,
    email,
    email_confirmation,
    name,
    cpf,
    cnh,
    date_birth,
  });
  return response.data;
};

export default updateUser;
