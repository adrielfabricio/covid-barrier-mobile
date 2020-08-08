import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';

import { Container, TitleContainer, Title, Input } from './styles';

import ButtonBack from '../../components/ButtonBack';
import forgotPassword from '../../services/forgotPassword';

const Forgot = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    let mounted = true;
    const handleSubmit = async () => {
      try {
        if (mounted) {
          if (email.length < 1) {
            alert('O e-mail obrigatório');
            return;
          }
          setLoading(true);
          const response = await forgotPassword(email);
          setLoading(false);
          navigation.goBack();
        }
        alert(
          'E-mail de recuperação enviado com sucesso. Verique sua caixa de entrada!',
        );
        setSubmit(false);
      } catch (error) {
        if (mounted) {
          console.log(error);
          setLoading(false);
          alert('Email ou senha inválido');
        }
        setSubmit(false);
      }
      if (mounted) setSubmit(false);
    };
    if (submit === true) handleSubmit();
    return () => (mounted = false);
  }, [submit]);

  return (
    <Container>
      <TitleContainer>
        <Title>Digite seu e-mail para recuperação da senha</Title>
      </TitleContainer>
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={(value) => setEmail(value)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button
        buttonStyle={{
          width: 120,
          alignSelf: 'center',
          backgroundColor: '#ed1b23ff',
        }}
        loading={loading}
        loadingProps={{ color: 'white' }}
        onPress={() => setSubmit(true)}
        title="Enviar"
        containerStyle={{ width: '90%' }}
      />
      <ButtonBack navigation={navigation} bottom />
    </Container>
  );
};

export default Forgot;
