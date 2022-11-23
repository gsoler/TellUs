import 'react-native-gesture-handler';
import React from 'react';
import { commonStyles } from './app/styles/commonStyles';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Setup from './app/boot/setup';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './app/reducers';
import 'react-native-get-random-values';

const store = configureStore(reducers);

export default function App() {

  return (
    <Provider store={store}>
      <View style={[commonStyles.flex1, commonStyles.marginTopBar]}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
        />
        <Setup />
      </View>
    </Provider>
  );
}
