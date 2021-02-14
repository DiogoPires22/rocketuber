import MapView, { Region, Coordinate } from 'react-native-maps';
import React, { useRef } from 'react';
import { Map } from './styles';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

interface MapBoxProps {
    initialConfig: Region | undefined;
    destination: Coordinate | null;
}

const MapBox: React.FC<MapBoxProps> = (props) => {
    const { initialConfig, destination } = props;

    const mapView = useRef<MapView>(null);

    if (destination) {
        console.log(initialConfig);
        console.log(destination);
    }
    return (
        <Map
            region={initialConfig}
            showsMyLocationButton={true}
            showsUserLocation={true}
            ref={mapView}
            loadingEnabled>
            {destination && (
                <MapViewDirections
                    apikey={Config.GOOGLE_API_KEY}
                    origin={{
                        latitude: initialConfig!.latitude,
                        longitude: initialConfig!.longitude,
                    }}
                    destination={{
                        latitude: destination![0],
                        longitude: destination![1],
                    }}
                    onReady={(result) => {
                        mapView.current?.fitToCoordinates(result.coordinates);
                    }}
                    strokeColor={'orange'}
                    strokeWidth={3}
                />
            )}
        </Map>
    );
};

export default MapBox;
