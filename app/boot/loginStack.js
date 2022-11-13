import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Views } from '../utils/Views';
import Login from '../views/Login';
import Register from '../views/Register';

const Stack = createNativeStackNavigator();

function LoginStack() {
    return (
        <Stack.Navigator
            initialRouteName={Views.LOGIN}
            screenListeners={(navigation) => AsyncStorage.setItem('currentScreen', JSON.stringify(navigation.route))}
            screenOptions={{
                mode: 'modal',
                headerMode: 'none',
                headerShown: false,
                presentation: 'transparentModal',
                transitionConfig: ({ scene }) => ({
                    screenInterpolator: screenProps => {
                        return {}
                    }
                })
            }}>
            <Stack.Screen
                name={Views.LOGIN}
                component={Login}
            />
            <Stack.Screen
                name={Views.REGISTER}
                component={Register}
            />
        </Stack.Navigator>
    );
}
export default LoginStack;