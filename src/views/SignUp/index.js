import React, { useState, useEffect, useRef } from 'react';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import { dateLess10 } from '../../helpers';
import { Container, Header, FormView, Input } from './styles';
import register from '../../services/register';
import ButtonBack from '../../components/ButtonBack';

const SignUp = () => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [cpf, setCpf] = useState('');
  const [date_birth, setDateBirth] = useState('');
  const [originCity, setOriginCity] = useState('');

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const refDatePicker = useRef(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    let day = dateLess10(currentDate.getDate());
    let month = dateLess10(currentDate.getMonth() + 1);
    let year = currentDate.getFullYear();
    let newDate = `${day}/${month}/${year}`;

    setDate(currentDate);
    setDateBirth(newDate);
    refDatePicker.current.blur();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        setLoading(true);

        let response = await register(
          email,
          password,
          password_confirmation,
          name,
          cpf,
          date_birth,
        );
        alert(response.message);

        console.log(response);

        setSubmit(false);
        setLoading(false);
      } catch (e) {
        console.log(e);
        alert('Ops! Verifique o formulário, algo não esta certo!');
        setSubmit(false);
        setLoading(false);
      }
    };

    if (submit === true) handleSubmit();
  }, [submit]);

  return (
    <Container>
      <Header>
        <Text h3>Solicitação Cadastro</Text>
      </Header>
      <FormView>
        <Input
          placeholder="Nome Completo"
          autoCapitalize="words"
          autoCorrect={false}
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          placeholder="Senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <Input
          placeholder="Confimar Senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          value={password_confirmation}
          onChangeText={(value) => setPasswordConfirmation(value)}
        />
        <Input
          placeholder="CPF"
          autoCapitalize="none"
          autoCorrect={false}
          value={cpf}
          onChangeText={(value) => setCpf(value)}
        />
        <Input
          placeholder={'Data de nascimento'}
          keyboard={true}
          value={`${date_birth}`}
          onFocus={showDatepicker}
          ref={refDatePicker}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Input
          placeholder="Cidade de Origem"
          autoCapitalize="none"
          autoCorrect={false}
          value={originCity}
          onChangeText={(value) => setOriginCity(value)}
        />
        <Button
          title="SOLICITAR CADASTRO"
          onPress={() => setSubmit(true)}
          containerStyle={{ width: '90%' }}
          buttonStyle={{ backgroundColor: '#b31b23ff' }}
          loading={loading}
          loadingProps={{ size: 10 }}
        />
      </FormView>
      <ButtonBack bottom />
    </Container>
  );
};

export default SignUp;
