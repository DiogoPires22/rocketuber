import Geolocation from '@react-native-community/geolocation';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Region } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';
export interface Destination {
    latitude: number;
    longitude: number;
    title: string;
}
export interface Base extends Region {
    title: string;
}
interface LocationContextData {
    base: Base | undefined;
    destination: Destination | null;

    selectDestination: (
        title: string,
        latitude: number,
        longitude: number,
    ) => void;
}
const LocationContext = createContext<LocationContextData>(
    {} as LocationContextData,
);

export const LocationProvider: React.FC = ({ children }) => {
    const [base, setBase] = useState<Base>();
    const [destination, setDestination] = useState<Destination | null>(null);

    useEffect(() => {
        Geocoder.init(Config.GOOGLE_API_KEY);
    }, []);

    const getUserLocation = () => {
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const translate = await Geocoder.from({ latitude, longitude });
                const title =
                    translate.results[0].formatted_address.split(',')[0] || '';
                setBase({
                    title,
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

    const selectDestination = (
        title: string,
        latitude: number,
        longitude: number,
    ) => {
        setDestination({ title, latitude, longitude });
    };

    return (
        <LocationContext.Provider
            value={{ base, destination, selectDestination }}>
            {children}
        </LocationContext.Provider>
    );
};

export default LocationContext;
