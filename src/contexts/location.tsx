import Geolocation from '@react-native-community/geolocation';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Coordinate, Region } from 'react-native-maps';

interface LocationContextData {
    region: Region | undefined;
    destination: Coordinate | null;

    selectDestination: (latitude: number, long: number) => void;
}
const LocationContext = createContext<LocationContextData>(
    {} as LocationContextData,
);

export const LocationProvider: React.FC = ({ children }) => {
    const [region, setRegion] = useState<Region>();
    const [destination, setDestination] = useState<Coordinate | null>(null);

    const getUserLocation = () => {
        Geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134,
                });
            },
            (error) => {
                Alert.alert('Error', JSON.stringify(error));
            },
            {
                timeout: 5000,
                maximumAge: 1000,
            },
        );
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const selectDestination = (latitude: number, long: number) => {
        setDestination([latitude, long]);
    };

    return (
        <LocationContext.Provider
            value={{ region, destination, selectDestination }}>
            {children}
        </LocationContext.Provider>
    );
};

export default LocationContext;
