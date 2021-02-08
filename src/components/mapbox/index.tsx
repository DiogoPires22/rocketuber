import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {Map} from './styles';

interface Coords {
  latitude: number;
  longitude: number;
}

const MapBox: React.FC = () => {
  const [coords, setCoords] = useState<Coords>({} as Coords);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setCoords({latitude: latitude, longitude: longitude} as Coords);
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  }, []);

  return (
    <Map
      region={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  );
};

export default MapBox;
