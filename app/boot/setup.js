/* import AppLoading from 'expo-app-loading';
import * as Localization from 'expo-localization';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { switchLanguage, loadLocaleData, readLastLanguage } from 'muba-i18n';
import { useFonts } from 'expo-font';
import Home from '../views/Home';
import Settings from '../views/Settings';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/fonts/config.json'; */

import { Text, View } from 'react-native';

/* SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator(); */

export default function Setup() {
  /* const [isLocaleLoaded, setLocaleLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    PoppinsBold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    FontAwesome: require('../assets/fonts/Font-Awesome.ttf')
  });

  const statusBarHeight = Platform.OS === 'android'
    ? StatusBar.currentHeight || (Platform.Version < 23 ? 25 : 24)
    : 0;

  useEffect(() => {
    loadAppConfig(setLocaleLoaded);
  })

  if (!fontsLoaded || !isLocaleLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' screenOptions={{ unmountOnBlur: true, headerShown: false, tabBarItemStyle: { padding: 8 }, tabBarStyle: { height: 60 } }} sceneContainerStyle={{ marginTop: statusBarHeight }}>
          <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: renderIcon('th-list') }} />
          <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: renderIcon('cog') }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } */
  return <View>
  <Text>Open up App.js to start working on your app!</Text>
</View>
}

function renderIcon(name) {
  const FontAwesomeIcon = createIconSetFromFontello(fontelloConfig);
  return ({ color, size }) => (
    <FontAwesomeIcon name={name} color={color} size={size} />
  );
}

async function loadAppConfig(setLocaleLoaded) {
  await loadLocale(setLocaleLoaded);
  SplashScreen.hideAsync();
}

async function loadLocale(setLocaleLoaded) {
  const defaultLocale = 'en';
  let localeRegion = Localization.locale;
  let locale = localeRegion.substring(0, 2);
  const appLocales = ['en'];

  if (!appLocales.includes(locale)) {
    locale = defaultLocale;
  }

  loadLocaleData({
    en: require('../locales/en.json')
  })

  readLastLanguage().then((lastLanguage) => {
    if (lastLanguage === null) {
      switchLanguage(locale.substring(0, 2), this);
    } else {
      switchLanguage(lastLanguage, this);
    }
    setLocaleLoaded(true);
  });
}