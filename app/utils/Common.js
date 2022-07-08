// import { StackActions, NavigationActions } from 'react-navigation';
import uuidv4 from 'uuid/v4';

export async function navigate(context, newScreen, params, force) {
  /*const currentScreen = context.props.navigation.state.routeName;
  context.props.navigation.dispatch(DrawerActions.closeDrawer());
  if (currentScreen !== newScreen || force) {
    const navigation = { routeName: newScreen, params: params != null ? params : {} }
    if (force) {
      navigation['key'] = uuidv4();
    }

    context.props.navigation.navigate(navigation);
  }*/
}

export async function popToTop(context) {
  /*context.props.navigation.dispatch(DrawerActions.closeDrawer());
  if (context.props.navigation.state.routeName !== 'Home') {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    });
    context.props.navigation.dispatch(resetAction);
    context.props.navigation.dispatch(DrawerActions.closeDrawer());
  }*/
}

export async function goBack(context) {
  /*context.props.navigation.dispatch(DrawerActions.closeDrawer());
  context.props.navigation.goBack();*/
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