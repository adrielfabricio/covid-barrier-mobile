import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';

import { Container, Logo, Input } from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Logo source={require('../../assets/logo.png')} resizeMode="contain" />
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={(value) => setEmail(value)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={(value) => setPassword(value)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <Button title="ENTRAR" containerStyle={{ width: '90%' }} />
    </Container>
  );
};

export default Login;
