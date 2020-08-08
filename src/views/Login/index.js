import React, { useState, useEffect } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import login from '../../services/login';
import { Container, Logo, Input, Footer } from './styles';

const Login = ({ navigation }) => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('serra.henrique1@gmail.com');
  const [password, setPassword] = useState('henrique123');
  const dispatch = useDispatch();

  const setAuth = (refresh_token, token, type) => {
    dispatch({ type: 'ADD_AUTH', auth: { refresh_token, token, type } });
  };

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        setLoading(true);

        let { data: response } = await login(email, password);
        setAuth(response.refreshToken, response.token, response.type);
        console.log(response);

        setSubmit(false);
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'AgentTab' }],
        });
      } catch (e) {
        console.log(e);
        alert('Credenciais inválidas');
        setSubmit(false);
        setLoading(false);
      }
    };

    if (submit === true) handleSubmit();
  }, [submit]);

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
        onPress={() => setSubmit(true)}
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
        loading={loading}
        loadingProps={{ size: 10 }}
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
