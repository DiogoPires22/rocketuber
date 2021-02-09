import {Region} from 'react-native-maps';
import React from 'react';
import {Map} from './styles';

interface MapBoxProps {
  initialConfig: Region | undefined;
}

const MapBox: React.FC<MapBoxProps> = (props) => {
  const {initialConfig} = props;
  console.log(initialConfig);
  return <Map region={initialConfig} />;
};

export default MapBox;
