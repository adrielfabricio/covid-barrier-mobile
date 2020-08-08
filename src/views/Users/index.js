import React, { useState } from 'react';

import { Container } from './styles';
import SearchUser from './SearchUser';
import ListUser from './ListUser';

const Users = () => {
  const [searchData, setSearchData] = useState(false);
  return (
    <Container>
      <SearchUser setData={setSearchData} />
      {searchData ? null : <ListUser />}
    </Container>
  );
};

export default Users;
