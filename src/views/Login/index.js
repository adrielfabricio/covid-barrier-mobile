import React, { useState, useEffect } from 'react';
import { Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-elements';

import { Container, Logo, Input, Footer } from './styles';

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
      <Button
        title="ENTRAR"
        containerStyle={{ width: '90%', marginBottom: '2%' }}
        buttonStyle={{ backgroundColor: '#b31b23ff' }}
      />
      <Divider
        style={{
          marginBottom: '2%',
          backgroundColor: '#bebebe45',
          width: '90%',
          height: '.25%',
        }}
      />
      <Button
        title="Criar nova conta"
        titleStyle={{ color: '#000000' }}
        containerStyle={{
          width: '90%',
          marginBottom: '2%',
        }}
        buttonStyle={{
          backgroundColor: 'transparent',
        }}
      />
      <Footer>
        <TouchableHighlight>
          <Text>Esqueceu a senha? Clique aqui</Text>
        </TouchableHighlight>
      </Footer>
    </Container>
  );
};

export default Login;
