import api from './api';

const getUsers = async (
  page = 1,
  limit = 10,
  name = '',
  way = '',
  order = 'active',
) => {
  const response = await api.get(
    `/admin/users?page=${page}&limit=${limit}&name=${name}&way=${way}&order=${order}`,
  );
  return response.data;
};

export default getUsers;
