import React, { useContext } from 'react';
import LocationContext from '../../contexts/location';

import { Container, Map } from './styles';

const HomePage: React.FC = () => {
  const { region } = useContext(LocationContext);

  return (
    <Container>
      <Map initialConfig={region} />
    </Container>
  );
};

export default HomePage;
