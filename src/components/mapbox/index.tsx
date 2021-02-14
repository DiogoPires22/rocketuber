import MapView, { Marker } from 'react-native-maps';
import React, { useRef, Fragment, useState } from 'react';
import {
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall,
    Map,
} from './styles';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';
import { Base, Destination } from '../../contexts/location';
import { getPixelSize } from '../../utils';
import { marker } from '../../assets/marker.png';

interface MapBoxProps {
    base: Base | undefined;
    destination: Destination | null;
}

const MapBox: React.FC<MapBoxProps> = (props) => {
    const { base, destination } = props;

    const [duration, setDuration] = useState<Number | null>(null);

    const mapView = useRef<MapView>(null);

    return (
        <Map
            region={base}
            showsMyLocationButton={true}
            showsUserLocation={true}
            ref={mapView}
            loadingEnabled>
            {destination && (
                <Fragment>
                    <MapViewDirections
                        apikey={Config.GOOGLE_API_KEY}
                        origin={{
                            latitude: base!.latitude,
                            longitude: base!.longitude,
                        }}
                        destination={{
                            latitude: destination!.latitude,
                            longitude: destination!.longitude,
                        }}
                        onReady={(result) => {
                            setDuration(result.duration);
                            mapView.current?.fitToCoordinates(
                                result.coordinates,
                                {
                                    edgePadding: {
                                        top: getPixelSize(50),
                                        right: getPixelSize(50),
                                        bottom: getPixelSize(50),
                                        left: getPixelSize(50),
                                    },
                                },
                            );
                        }}
                        strokeColor={'black'}
                        strokeWidth={5}
                    />
                    <Marker
                        coordinate={{
                            latitude: destination?.latitude,
                            longitude: destination?.longitude,
                        }}
                        image={marker}
                        anchor={{ x: 0, y: 0 }}>
                        <LocationBox>
                            <LocationText>{destination.title}</LocationText>
                        </LocationBox>
                    </Marker>
                    <Marker coordinate={base!} anchor={{ x: 0, y: 0 }}>
                        <LocationBox>
                            <LocationTimeBox>
                                <LocationTimeText>{duration}</LocationTimeText>
                                {/* {duration ?? (

                                )} */}
                                <LocationTimeTextSmall>
                                    MIN
                                </LocationTimeTextSmall>
                            </LocationTimeBox>
                            <LocationText>{base?.title}</LocationText>
                        </LocationBox>
                    </Marker>
                </Fragment>
            )}
        </Map>
    );
};

export default MapBox;
