// Converte para formato dd/mm/aaaa
export const convertDate = (date) => {
  let date_birth = new Date(date);
  let day = date_birth.getDate();
  let month = date_birth.getMonth() + 1;
  let year = date_birth.getFullYear();
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;

  return `${day}/${month}/${year}`;
};
