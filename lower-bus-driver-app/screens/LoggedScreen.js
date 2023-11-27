// SecondScreen.js
import React, {useEffect} from 'react';

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import AtWorkScreen from "./reservation/AtWorkScreen";
import BusRegisterScreen from "./reservation/BusRegisterScreen";
import BusReservationListScreen from "./reservation/BusReservationListScreen";

import {Alert, BackHandler} from "react-native";


const Stack = createStackNavigator();
function LoggedScreen({route, navigation}) {
    const {id} = route.params;


    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="BusRegisterScreen" screenOptions={{headerShown: false}}>
                <Stack.Screen name="BusRegisterScreen" component={BusRegisterScreen} initialParams={{logoutRoute : navigation, id : id}}/>
                <Stack.Screen name="BusReservationListScreen" component={BusReservationListScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default LoggedScreen;
