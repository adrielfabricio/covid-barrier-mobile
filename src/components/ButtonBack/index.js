import React from 'react';
import { Button, Icon } from 'react-native-elements';

import { Container, ButtonContainerStyle } from './styles';
const ButtonBack = ({ navigation, bottom }) => {
  return (
    <Container
      style={[
        bottom ? { bottom: 20 } : { top: 30 },
        { alignSelf: 'flex-start' },
      ]}>
      <Button
        buttonStyle={{ backgroundColor: 'white' }}
        onPress={() => navigation.goBack()}
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
