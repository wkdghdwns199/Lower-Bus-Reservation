import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserInfoScreen from "./UserInfoScreen";
import AgreementScreen from "./AgreementScreen";
import PasswordScreen from "./PasswordScreen";
import {Alert, BackHandler} from "react-native";

const Stack = createStackNavigator();

export default function JoinProcessNavigation({route}) {

    const {backToLoginScreen} = route.params

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="AgreementScreen" screenOptions={{headerShown:false}}>
                <Stack.Screen name="AgreementScreen" component={AgreementScreen} initialParams={{backToLoginScreen: backToLoginScreen}} />
                <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
                <Stack.Screen name="PasswordScreen" component={PasswordScreen} initialParams={{backToLoginScreen: backToLoginScreen}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

