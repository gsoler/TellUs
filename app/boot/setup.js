import * as Localization from 'expo-localization';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { switchLanguage, loadLocaleData, readLastLanguage } from '../locales/I18n';
import Home from '../views/Home';
import Settings from '../views/Settings';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/fonts/config.json';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

export default function Setup() {
  const [isLocaleLoaded, setLocaleLoaded] = useState(false);

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
    if (fontsLoaded && isLocaleLoaded) {
      SplashScreen.hideAsync();
    }
  })

  if (!fontsLoaded || !isLocaleLoaded) {
    return <View />
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' screenOptions={{ unmountOnBlur: true, headerShown: false, tabBarItemStyle: { padding: 8 }, tabBarStyle: { height: 60 } }} sceneContainerStyle={{ marginTop: statusBarHeight }}>
          <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: renderIcon('th-list') }} />
          <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: renderIcon('cog') }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

function renderIcon(name) {
  const FontAwesomeIcon = createIconSetFromFontello(fontelloConfig);
  return ({ color, size }) => (
    <FontAwesomeIcon name={name} color={color} size={size} />
  );
}

async function loadAppConfig(setLocaleLoaded) {
  await loadLocale(setLocaleLoaded);
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