import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Container, ButtonContainerStyle } from './styles';
import { useDispatch } from 'react-redux';

const ButtonBack = ({ bottom, position, userRefresh }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setRefreshUser = () => {
    dispatch({ type: 'LIST_USER_REFRESH' });
  };
  return (
    <Container
      style={[
        bottom ? { bottom: 20 } : { top: 30 },
        { alignSelf: 'flex-start' },
        position ? { position: 'relative' } : null,
      ]}>
      <Button
        buttonStyle={{ backgroundColor: 'white' }}
        onPress={() => {
          navigation.goBack();
          if (userRefresh) setRefreshUser();
        }}
        icon={
          <Icon name="arrow-left" type="font-awesome" size={11} color="red" />
        }
        containerStyle={ButtonContainerStyle}
        type="outline"
        iconRight
        // loading={loading}
        // loadingProps={{ size: 10 }}
      />
    </Container>
  );
};

export default ButtonBack;
