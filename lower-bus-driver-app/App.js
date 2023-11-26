import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import LoggedScreen from './screens/LoggedScreen';
import JoinProcessNavigation from "./screens/join/JoinProcessNavigation";
import SplashScreen from "./screens/SplashScreen";

const Stack = createStackNavigator();

export default function App() {


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName= "SplashScreen" screenOptions={{headerShown: false}}>
                <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="LoggedScreen" component={LoggedScreen}/>
                <Stack.Screen name="JoinProcessNavigation" component={JoinProcessNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
