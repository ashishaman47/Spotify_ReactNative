import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import PlayerWidget from './components/PlayerWidget/index'

// AWS amplify import configuration
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

// importing AppContext 
import {AppContext} from './AppContext'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // currently playing song will be saved in App component thats how we make it global
  const [songId, setSongId] = useState<string|null>(null);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContext.Provider value={
        {  songId,
          setSongId: (id: string) => setSongId(id),
        }}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
          <PlayerWidget />
        </AppContext.Provider>
      </SafeAreaProvider>
    );
  }
}

// PlayerWidget --> is displayed here because it should be visible from any screen.
// It won't recieve a song --> it will fetch itself.