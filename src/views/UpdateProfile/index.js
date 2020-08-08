import React, { useState, useEffect, useRef } from 'react';
import { Text, Button } from 'react-native-elements';

import { useSelector } from 'react-redux';

import { dateLess10 } from '../../helpers';
import { Container, FormView, Input } from './styles';
import ButtonBack from '../../components/ButtonBack';

import updateProfile from '../../services/updateProfile';
import updatePassword from '../../services/updatePassword';

const UpdateProfile = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);

  const [submitUpdate, setSubmitUpdate] = useState(false);
  const [submitUpdatePassword, setSubmitUpdatePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [email_confirmation, setEmailConfirmation] = useState(user.email);
  const [cpf, setCpf] = useState(user.cpf);
  const [cnh, setCnh] = useState(user.cnh);
  const [date_birth, setDateBirth] = useState(user.date_birth);

  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

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
    const handleSubmitUpdate = async () => {
      try {
        setLoading(true);

        let response = await updateProfile(
          email,
          email_confirmation,
          name,
          cpf,
          cnh,
          date_birth,
        );

        console.log(response);

        setSubmitUpdate(false);
        setLoading(false);
      } catch (e) {
        console.log(e);
        alert('Ops! Algo deu errado!');
        setSubmitUpdate(false);
        setLoading(false);
      }
    };

    if (submitUpdate === true) handleSubmitUpdate();
  }, [submitUpdate]);

  useEffect(() => {
    const handleSubmitUpdatePassword = async () => {
      try {
        setLoading(true);

        let response = await updatePassword(password, password_confirmation);

        console.log(response);

        setSubmitUpdatePassword(false);
        setLoading(false);
      } catch (e) {
        console.log(e);
        alert('Ops! Algo deu errado!');
        setSubmitUpdatePassword(false);
        setLoading(false);
      }
    };

    if (submitUpdatePassword === true) handleSubmitUpdatePassword();
  }, [submitUpdatePassword]);

  return (
    <Container>
      <ButtonBack navigation={navigation} position />
      <Text
        h4
        style={{
          color: '#404040',
          marginBottom: 10,
          marginLeft: 20,
          marginTop: 25,
        }}>
        Atualizar dados
      </Text>
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
          placeholder="Confirmação de E-mail"
          autoCapitalize="none"
          autoCorrect={false}
          value={email_confirmation}
          onChangeText={(value) => setEmailConfirmation(value)}
        />
        <Input
          placeholder="CPF"
          autoCapitalize="none"
          autoCorrect={false}
          value={cpf}
          onChangeText={(value) => setCpf(value)}
        />
        <Input
          placeholder="CNH"
          autoCapitalize="none"
          autoCorrect={false}
          value={cnh}
          onChangeText={(value) => setCnh(value)}
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
        <Button
          title="Atualizar dados"
          onPress={() => setSubmitUpdate(true)}
          containerStyle={{ width: '90%' }}
          buttonStyle={{ backgroundColor: '#b31b23ff' }}
          loading={loading}
          loadingProps={{ size: 10 }}
        />
      </FormView>

      <Text h4 style={{ color: '#404040', marginBottom: 10, marginLeft: 20 }}>
        Alterar senha
      </Text>
      <FormView>
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

        <Button
          title="Atualizar senha"
          onPress={() => setSubmitUpdatePassword(true)}
          containerStyle={{ width: '90%' }}
          buttonStyle={{ backgroundColor: '#b31b23ff' }}
          loading={loading}
          loadingProps={{ size: 10 }}
        />
      </FormView>
    </Container>
  );
};

export default UpdateProfile;
