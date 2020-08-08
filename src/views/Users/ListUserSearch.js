import React from 'react';
import { ListItem, Icon, Text } from 'react-native-elements';
import { FlatList, View, TouchableHighlight } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ListUserSearch = ({ data, nextPage }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.2}
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

export default ListUserSearch;
