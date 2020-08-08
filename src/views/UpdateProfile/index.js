import React from 'react';
import { Text } from 'react-native-elements';

import { Container } from './styles';

const UpdateProfile = () => {
  return (
    <Container>
      <Text h4 style={{ color: '#404040', marginBottom: 10, marginLeft: 20 }}>
        Atualizar dados
      </Text>
    </Container>
  );
};

export default UpdateProfile;
