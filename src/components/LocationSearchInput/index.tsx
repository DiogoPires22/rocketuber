import React from 'react';
import { Platform } from 'react-native';
import {
    GooglePlaceData,
    GooglePlaceDetail,
    GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';

import Config from 'react-native-config';

interface LocationSearchInputProps {
    onSelected: (lat: number, long: number) => void;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
    onSelected,
}) => {
    const onPress = (
        data: GooglePlaceData,
        detail: GooglePlaceDetail | null,
    ) => {
        if (detail) {
            onSelected(
                detail.geometry.location.lat,
                detail.geometry.location.lng,
            );
        }
    };
    return (
        <GooglePlacesAutocomplete
            placeholder="Onde ir?"
            query={{
                key: Config.GOOGLE_API_KEY,
                language: 'pt',
            }}
            textInputProps={{
                autoCapitalize: 'none',
                autoCorrect: false,
            }}
            fetchDetails
            onPress={onPress}
            enablePoweredByContainer={false}
            styles={{
                container: {
                    position: 'absolute',
                    top: Platform.select({ ios: 60, android: 40 }),
                    width: '100%',
                },
                textInputContainer: {
                    flex: 1,
                },
                textInput: {
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                    marginHorizontal: 16,
                },
            }}
        />
    );
};

export default LocationSearchInput;
