import api from './api';

const cities = async (uf = 'ba') => {
  const response = await api.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.toUpperCase()}/municipios`,
  );
  return response.data;
};

export default cities;
