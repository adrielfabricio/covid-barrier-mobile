import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import getUsers from '../../services/getUsers';
import ListUserSearch from './ListUserSearch';
import { useSelector } from 'react-redux';

const gray = 'gray';

const SearchUser = ({ setData }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(0);
  const navigation = useNavigation();
  const refresh = useSelector((state) => state.manageUser.refresh);

  const loadPage = async (pageNumber = page, shouldRefresh = false) => {
    if (totalpage && pageNumber > totalpage) return;
    try {
      setLoading(true);

      let limit = 10;

      let response = await getUsers(
        pageNumber === 0 ? 1 : pageNumber,
        limit,
        search,
      );

      let data = response.data;
      setTotalPage(response.pagination.lastPage);

      setUsers(shouldRefresh ? data : [...users, ...data]);

      setPage(pageNumber === 0 ? pageNumber + 2 : pageNumber + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Conexão não estabelecida');
    }
  };
  useEffect(() => {
    if (search) {
      setData(true);
      loadPage(0, true);
    } else setData(false);
  }, [search]);

  useEffect(() => {
    if (search && users.length > 0) setData(true);
    else setData(false);
  }, [users]);
  useEffect(() => {
    loadPage(0, true);
  }, [refresh]);

  return (
    <>
      <SearchBar
        placeholder="Pesquise por um usuário"
        placeholderTextColor={gray}
        onChangeText={(value) => setSearch(value)}
        value={search}
        lightTheme
        round
        showCancel
        showLoading={loading}
        searchIcon={{ color: gray }}
        onClear={() => {
          setData(false);
        }}
        containerStyle={{
          backgroundColor: 'transparent',
        }}
        inputStyle={{ color: 'black' }}
      />
      {search ? <ListUserSearch data={users} nextPage={loadPage} /> : null}
    </>
  );
};

export default SearchUser;
