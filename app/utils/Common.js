import { CommonActions, StackActions } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';

export async function navigate(navigation, newScreen, params, force) {
  const currentRouteIndex = navigation.getState()?.index;
  const currentScreen = navigation.getState()?.routes[currentRouteIndex].name;
  if (currentScreen !== newScreen || force) {
    const navigationParams = { name: newScreen, params: params != null ? params : {} }
    if (force) {
      result['key'] = uuidv4();
    }

    navigation.dispatch(CommonActions.navigate(navigationParams));
  }
}

export async function popToTop(navigation) {
  const currentRouteIndex = navigation.getState()?.index;
  const currentScreen = navigation.getState()?.routes[currentRouteIndex].name;
  if (currentScreen !== Views.HOME) {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        { name: Views.HOME }
      ],
    });
    navigation.dispatch(resetAction);
  }
}

export async function replace(navigation, newScreen, params) {
  const currentRouteIndex = navigation.getState()?.index;
  const currentScreen = navigation.getState()?.routes[currentRouteIndex].name;
  if (currentScreen !== newScreen) {
    const navigationParams = { name: newScreen, params: params != null ? params : {} }
    navigation.dispatch(StackActions.replace(navigationParams.name, navigationParams.params));
  }
}

export async function goBack(navigation) {
  navigation.goBack();
}

export const Device = {
  IOS: 'ios',
  ANDROID: 'android'
}

export const Fonts = {
  Title: 'PoppinsBold',
  Subtitle: 'PoppinsSemiBold',
  Highlighted: 'PoppinsMedium',
  Button: 'PoppinsBold',
  Input: null,
  Text: null,
  Note: null,
  Description: null
}