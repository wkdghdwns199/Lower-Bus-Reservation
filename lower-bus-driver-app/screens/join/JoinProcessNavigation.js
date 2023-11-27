import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserInfoScreen from "./UserInfoScreen";
import AgreementScreen from "./AgreementScreen";
import PasswordScreen from "./PasswordScreen";

const Stack = createStackNavigator();

export default function JoinProcessNavigation({navigation}) {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="AgreementScreen" screenOptions={{headerShown:false}}>
                <Stack.Screen name="AgreementScreen" component={AgreementScreen}  />
                <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
                <Stack.Screen name="PasswordScreen" component={PasswordScreen} initialParams={{backToLoginScreen: navigation}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

