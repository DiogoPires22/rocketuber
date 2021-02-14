import styled from 'styled-components/native';
import LocationSearchInput from '../../components/LocationSearchInput';
import MapBox from '../../components/Mapbox';

export const Container = styled.View`
  flex: 1;
`;

export const Map = styled(MapBox)`
  flex: 1;
`;

export const SearchInput = styled(LocationSearchInput)`
  /* flex: 1;
  position: absolute;
  top: 300px;
  background-color: red; */
`;
