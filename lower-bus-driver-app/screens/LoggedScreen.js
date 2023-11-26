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

    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                '종료',
                '앱을 종료하시겠습니까?',
                [{text:'확인', onPress:() => {
                        BackHandler.exitApp()
                    }}, {text:'취소', style:'cancel'}]
            )
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
            backHandler.remove();
        };

    },[])

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
