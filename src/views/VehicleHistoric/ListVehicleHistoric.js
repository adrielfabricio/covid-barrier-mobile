import React from 'react';
import { ListItem, Icon, Text } from 'react-native-elements';
import { FlatList, View, TouchableHighlight } from 'react-native';

import { convertDate } from '../../helpers/';

const ListVehicleHistoric = ({ data }) => {
  return (
    <FlatList
      data={data.checkpoints}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => {
        return (
          <ListItem
            title={`Périodo: ${convertDate(item.created_at)} até ${
              item.estimed_time
            }`}
            subtitle={`Justificativa: ${
              item.justification ? item.justification : 'Sem justificativa'
            }`}
            bottomDivider
          />
        );
      }}
    />
  );
};

export default ListVehicleHistoric;
