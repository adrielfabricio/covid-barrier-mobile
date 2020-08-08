import React, { useState, useEffect } from 'react';
import { Text, Avatar, ListItem, Icon } from 'react-native-elements';

import { useSelector, useDispatch } from 'react-redux';

import { Container } from './styles';

import me from '../../services/me';
import { convertDate } from '../../helpers';
const colorIcons = '#ed1b23ff';

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  function addUser(user) {
    dispatch({ type: 'ADD_USER', user });
  }
  function logout() {
    dispatch({ type: 'LOGOUT' });
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        let user = await me();
        addUser({
          ...user.person,
          email: user.email,
          roles: user.roles,
          permission: user.permission,
          id: user.id,
          created_at: user.created_at,
        });
      } catch (error) {}
    };
    if (!user.name) {
      getUser();
    }
  }, [user]);

  return (
    <Container>
      <Text h4 style={{ color: '#404040', marginBottom: 10, marginLeft: 20 }}>
        Meus dados
      </Text>
      <ListItem
        leftAvatar={
          <Avatar
            size="medium"
            icon={{ name: 'user', type: 'font-awesome', color: colorIcons }}
          />
        }
        title={user.name ? user.name : 'Nome não encontrado'}
        subtitle={user.cpf ? user.cpf : 'CPF não encontrado'}
      />

      <ListItem
        containerStyle={{ marginVertical: 40 }}
        title={'Alterar informações'}
        chevron={{ color: 'gray', size: 20 }}
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <ListItem
        leftAvatar={
          <Avatar
            size="medium"
            icon={{
              name: 'birthday-cake',
              type: 'font-awesome',
              color: colorIcons,
            }}
          />
        }
        title={
          user.date_birth
            ? user.date_birth
            : 'Data de nascimento não encontrada'
        }
        bottomDivider
      />
      <ListItem
        leftAvatar={
          <Avatar
            size="medium"
            icon={{ name: 'id-card', type: 'font-awesome', color: colorIcons }}
          />
        }
        title={user.cnh ? user.cnh : 'CNH não encontrada'}
      />
      <ListItem
        title={
          user.created_at
            ? `Usuário criado em: ${convertDate(user.created_at)}`
            : 'CNH não encontrada'
        }
      />
      <ListItem
        containerStyle={{ marginTop: 20 }}
        leftAvatar={
          <Avatar
            size="medium"
            icon={{
              size: 35,
              name: 'power-settings-new',
              type: 'material',
              color: colorIcons,
            }}
          />
        }
        title={'Sair'}
        onPress={() => logout()}
      />
    </Container>
  );
};

export default Profile;
