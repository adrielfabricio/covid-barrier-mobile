import React from 'react';

import { Container } from './styles';
import SearchUser from './SearchUser';
import ListUser from './ListUser';

const Users = ({ navigation, route }) => {
  return (
    <Container>
      <SearchUser />
      <ListUser route />
    </Container>
  );
};

export default Users;
