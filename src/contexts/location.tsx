import Geolocation from '@react-native-community/geolocation';
import React, {createContext, useEffect, useState} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import {Region} from 'react-native-maps';

interface LocationContextData {
  region: Region | undefined;
}
const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData,
);

export const LocationProvider: React.FC = ({children}) => {
  const [region, setRegion] = useState<Region>();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getUserLocation();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
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
    requestCameraPermission();
  }, []);

  return (
    <LocationContext.Provider value={{region}}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
