import React, { useState, useEffect, useRef } from 'react';
import { Text, Icon, Divider } from 'react-native-elements';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { dateLess10 } from '../../helpers';
import { Container, Header, FormView, Input, ButtonElements } from './styles';

import showUser from '../../services/showUser';
import updateUser from '../../services/updateUser';

import ButtonBack from '../../components/ButtonBack';
import LoadingIcon from '../../components/LoadingIcon';

import { cpf as cpf_validator } from 'cpf-cnpj-validator';

const UpdateUser = ({ navigation, route }) => {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [active, setActive] = useState(false);
  const [activeChange, setActiveChange] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [email_confirmation, setEmailConfirmation] = useState('');
  const [cpf, setCpf] = useState('');
  const [date_birth, setDateBirth] = useState('');
  const [cnh, setCnh] = useState('');
  const [originalData, setOriginalData] = useState({});

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const refDatePicker = useRef(null);

  const { id } = route.params;

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
  const attOriginalData = (data) => {
    if (data.active !== undefined) setActive(data.active);
    if (data.email) setEmail(data.email);
    if (data.person.name) setName(data.person.name);
    if (data.person.cpf) setCpf(data.person.cpf);
    if (data.person.date_birth) setDateBirth(data.person.date_birth);
    if (data.person.cnh) setCnh(data.person.cnh);
    setEmailConfirmation('');
    setOriginalData(data);
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await showUser(id);
        attOriginalData(response);
      } catch (error) {}
    };
    getUser();
  }, [id]);

  useEffect(() => {
    const invertActive = async (justActive = false) => {
      try {
        let response;
        if (justActive) {
          setLoadingActive(true);
          response = await updateUser(id, !active);
          setActive(!active);
        } else {
          setLoading(true);
          if (cpf) {
            // Remove characters especiais
            let valid_cpf = cpf_validator.strip(cpf);

            // Valida o cpf
            if (!cpf_validator.isValid(valid_cpf)) {
              throw {
                code: true,
                message: 'CPF inválido!',
              };
            }
          }
          if (originalData.email === email) {
            response = await updateUser(
              id,
              active,
              null,
              null,
              name ? name : null,
              cpf ? cpf : null,
              cnh ? cnh : null,
              date_birth ? date_birth : null,
            );
            alert('Usuário atualizado');
          } else {
            if (email_confirmation) {
              if (email_confirmation !== email) {
                throw {
                  code: true,
                  message: 'E-mails não coincidem',
                };
              }
              response = await updateUser(
                id,
                active,
                email ? email : null,
                email_confirmation ? email_confirmation : null,
                name ? name : null,
                cpf ? cpf : null,
                cnh ? cnh : null,
                date_birth ? date_birth : null,
              );
              alert('Usuário atualizado');
            } else {
              throw {
                code: true,
                message: 'É necessário confirmar o e-mail',
              };
            }
          }
        }
        attOriginalData(response);

        setLoadingActive(false);
        setLoading(false);

        setActiveChange(false);
        setSubmit(false);
      } catch (error) {
        if (error.code) {
          alert(error.message);
        } else {
          alert('Erro ao atualizar');
        }
        setLoading(false);
        setLoadingActive(false);
        setActiveChange(false);
        setSubmit(false);
      }
    };
    if (activeChange) invertActive(activeChange);
    else if (submit) invertActive();
  }, [activeChange, submit]);

  return originalData?.email ? (
    <Container>
      <Header>
        <Text h4>Alterar Usuário</Text>
      </Header>
      <FormView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Text style={{ fontSize: 18, marginRight: 10 }}>Status:</Text>
          <Icon
            name="circle"
            type="font-awesome"
            color={active ? 'green' : 'red'}
          />
          <Text style={{ marginLeft: 5, marginRight: 15 }}>
            {active ? 'Ativado' : 'Desativado'}
          </Text>
          <ButtonElements
            title={!active ? 'Ativar' : 'Desativar'}
            onPress={() => setActiveChange(true)}
            loading={loadingActive}
            width={100}
            backgroundColor={!active ? 'green' : 'red'}
          />
        </View>
        <Divider
          style={{
            marginBottom: '2%',
            backgroundColor: '#bebebe45',
            width: '90%',
            height: '.25%',
          }}
        />
        <Input
          placeholder="Adicionar nome completo"
          autoCapitalize="words"
          autoCorrect={false}
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <Input
          placeholder="Novo e-mail"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <Input
          placeholder="Confirmar novo e-mail"
          autoCapitalize="none"
          autoCorrect={false}
          value={email_confirmation}
          onChangeText={(value) => setEmailConfirmation(value)}
        />
        <Input
          placeholder="Adicionar CPF"
          autoCapitalize="none"
          autoCorrect={false}
          value={cpf}
          onChangeText={(value) => setCpf(value)}
        />
        <Input
          placeholder={'Adicionar data de nascimento'}
          keyboard={true}
          value={`${date_birth}`}
          onFocus={showDatepicker}
          ref={refDatePicker}
        />
        <Input
          placeholder={'Adicionar CNH'}
          keyboard={true}
          value={cnh}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => setCnh(value)}
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
        <ButtonElements
          title="Alterar"
          onPress={() => setSubmit(true)}
          loading={loading}
          userRefresh
          width={200}
        />
      </FormView>
      <ButtonBack navigation={navigation} userRefresh bottom />
    </Container>
  ) : (
    <Container style={{ marginTop: 50 }}>
      <LoadingIcon />
    </Container>
  );
};

export default UpdateUser;
