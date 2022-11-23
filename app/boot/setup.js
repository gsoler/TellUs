import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStack from './loginStack';
import MainStack from './mainStack';
import { switchLanguage, loadLocaleData, readLastLanguage } from '../locales/I18n';
import { Views } from '../utils/Views';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/fonts/config.json';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function Setup() {
  const [isLocaleLoaded, setLocaleLoaded] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    FontAwesome: require('../assets/fonts/Font-Awesome.ttf')
  });

  useEffect(() => {
    loadAppConfig(setLocaleLoaded, setLoggedIn);
    if (fontsLoaded && isLocaleLoaded) {
      SplashScreen.hideAsync();
    }
  })

  if (!fontsLoaded || !isLocaleLoaded) {
    return <View />
  } else {
    return <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? Views.MAIN_STACK : Views.LOGIN_STACK}
        screenListeners={(navigation) => AsyncStorage.setItem('currentScreen', JSON.stringify(navigation.route))}
        screenOptions={{
          mode: 'modal',
          headerMode: 'none',
          presentation: 'transparentModal',
          transitionConfig: ({ scene }) => ({
            screenInterpolator: screenProps => {
              return {}
            }
          })
        }}>
        <Stack.Screen name={Views.LOGIN_STACK} component={LoginStack} />
        <Stack.Screen name={Views.MAIN_STACK} component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  }
}

function renderIcon(name) {
  const FontAwesomeIcon = createIconSetFromFontello(fontelloConfig);
  return ({ color, size }) => (
    <FontAwesomeIcon name={name} color={color} size={size} />
  );
}

async function loadAppConfig(setLocaleLoaded, setLoggedIn) {
  await loadLocale(setLocaleLoaded);
  loadUserSession(setLoggedIn);
}

async function loadLocale(setLocaleLoaded) {
  const defaultLocale = 'en-US';
  let localeRegion = Localization.locale;
  let locale = localeRegion;
  const appLocales = ['en-US', 'es-ES'];

  if (!appLocales.includes(locale)) {
    locale = defaultLocale;
  }

  loadLocaleData({
    'en-US': require('../locales/en-US.json'),
    'es-ES': require('../locales/es-ES.json')
  })

  readLastLanguage().then((lastLanguage) => {
    if (lastLanguage === null || !appLocales.includes(lastLanguage)) {
      switchLanguage(locale, this);
    } else {
      switchLanguage(lastLanguage, this);
    }
    setLocaleLoaded(true);
  });
}

loadUserSession = async (setLoggedIn) => {
  const user = await AsyncStorage.getItem('user');

  if (user !== undefined && user !== null && JSON.parse(user).email !== undefined && JSON.parse(user).email !== '') {
    setLoggedIn(true);
  } else {
    setLoggedIn(false);
  }
};