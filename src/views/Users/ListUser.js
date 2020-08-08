import React, { useState, useEffect } from 'react';
import { ListItem, Icon, Text } from 'react-native-elements';
import { FlatList, View, TouchableHighlight } from 'react-native';

import LoadingIcon from '../../components/LoadingIcon';
import getUsers from '../../services/getUsers';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const ListUser = () => {
  const [users, setUsers] = useState([]);
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

      let response = await getUsers(pageNumber === 0 ? 1 : pageNumber, limit);

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
    loadPage(0, true);
  }, []);
  useEffect(() => {
    loadPage(0, true);
  }, [refresh]);

  const refreshList = async () => {
    setRefreshing(true);
    setLoading(false);
    await loadPage(1, true);
    setLoading(false);
    setRefreshing(false);
  };
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={async () => await loadPage()}
      onEndReachedThreshold={0.2}
      onRefresh={refreshList}
      refreshing={refreshing}
      ListFooterComponent={loading && <LoadingIcon />}
      renderItem={({ item, index }) => {
        return (
          <ListItem
            title={item.person.name ? item.person.name : 'Nome não encontrado'}
            subtitle={item.email ? item.email : 'E-mail não encontrado'}
            bottomDivider
            onPress={() => {
              navigation.navigate('UpdateUser', { id: item.id });
            }}
            rightElement={
              <TouchableHighlight>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginRight: 10 }}>
                    {item.active ? 'Ativado' : 'Desativado'}
                  </Text>
                  <Icon
                    name="circle"
                    type="font-awesome"
                    color={item.active ? 'green' : 'red'}
                  />
                </View>
              </TouchableHighlight>
            }
          />
        );
      }}
    />
  );
};

export default ListUser;
