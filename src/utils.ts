import { PixelRatio, Platform } from 'react-native';

export function getPixelSize(pixels: number): number {
    return (
        Platform.select({
            ios: pixels,
            android: PixelRatio.getPixelSizeForLayoutSize(pixels),
        }) || pixels
    );
}
