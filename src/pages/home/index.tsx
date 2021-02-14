import React, { useContext } from 'react';
import LocationSearchInput from '../../components/LocationSearchInput';
import LocationContext from '../../contexts/location';

import { Container, Map } from './styles';

const HomePage: React.FC = () => {
    const { region, destination, selectDestination } = useContext(
        LocationContext,
    );

    return (
        <Container>
            <Map initialConfig={region} destination={destination} />
            <LocationSearchInput onSelected={selectDestination} />
        </Container>
    );
};

export default HomePage;
