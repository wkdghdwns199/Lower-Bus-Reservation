import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import LoggedScreen from './LoggedScreen';
import JoinProcessNavigation from "./join/JoinProcessNavigation";
import {getData} from "../lib/asyncStorage";


const Stack = createStackNavigator();

function NavigationScreen() {
    const navigationRef = React.useRef(null);
    useEffect(() => {
        try{
            getData('autoLogin').then(res => {JSON.parse(res) == 'true' && navigationRef.current
                ? getData('autoId').then(res2 => navigationRef.current.navigate('LoggedScreen', {id:JSON.parse(res2)}))
                : navigationRef.current.navigate('LoginScreen')})
        }
        catch{
        }

    }, [])

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName= "LoginScreen" screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="LoggedScreen" component={LoggedScreen}/>
                <Stack.Screen name="JoinProcessNavigation" component={JoinProcessNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavigationScreen;
