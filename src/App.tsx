import React from 'react';
import { LocationProvider } from './contexts/location';
import HomePage from './pages/home';

const App: React.FC = () => {
  return (
    <LocationProvider>
      <HomePage />
    </LocationProvider>
  );
};

export default App;
