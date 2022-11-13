import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Views } from '../utils/Views';
import Home from '../views/Home';
import Settings from '../views/Settings';

const Tab = createBottomTabNavigator();

function MainStack() {
    return (
        <Tab.Navigator initialRouteName={Views.LOGIN}
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
            <Tab.Screen name={Views.HOME} component={Home} />
            <Tab.Screen name={Views.SETTINGS} component={Settings} />
        </Tab.Navigator>
    );
}
export default MainStack;