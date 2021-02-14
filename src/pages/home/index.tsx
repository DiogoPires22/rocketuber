import React, { useContext } from 'react';
import LocationSearchInput from '../../components/LocationSearchInput';
import LocationContext from '../../contexts/location';

import { Container, Map } from './styles';

const HomePage: React.FC = () => {
    const { base, destination, selectDestination } = useContext(
        LocationContext,
    );

    return (
        <Container>
            <Map base={base} destination={destination} />
            <LocationSearchInput onSelected={selectDestination} />
        </Container>
    );
};

export default HomePage;
