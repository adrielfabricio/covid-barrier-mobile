import React from 'react';
import { SearchBar } from 'react-native-elements';

const red = '#ed1b23ff';
const gray = 'gray';

const SearchUser = ({}) => {
  return (
    <SearchBar
      placeholder="Pesquise por um usuário"
      placeholderTextColor={gray}
      // onChangeText={(value) => setSearch(value)}
      // value={search}
      lightTheme
      round
      showCancel
      // showLoading={loading}
      searchIcon={{ color: gray }}
      onClear={() => {
        setPage(1);
        setTotalPage(0);
      }}
      containerStyle={{
        backgroundColor: 'transparent',
      }}
      inputStyle={{ color: 'black' }}
    />
  );
};

export default SearchUser;
