import React, {useState} from 'react';

import {StyleSheet, View, Text} from "react-native";
import Footer from "./component/Footer";
import MainScreen from "./screens/main/MainScreen";
import BusReservationListScreen from "./screens/history/BusReservationListScreen";
import BusLineInfoScreen from "./screens/reservation/BusLineInfoScreen";

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('main');
    const [reservationBusLine, setReservationBusLine] = useState('');
    return (
        <View style={styles.container}>
            {currentScreen === 'main' &&
                <MainScreen setCurrentScreen={setCurrentScreen} setReservationBusLine={setReservationBusLine}/>}
            {currentScreen === 'busReservation' && <BusReservationListScreen/>}
            {(currentScreen === 'main' || currentScreen === 'busReservation') &&
                <Footer setCurrentScreen={setCurrentScreen}/>}
            {currentScreen === 'busLineInfo' &&
                <BusLineInfoScreen setCurrentScreen={setCurrentScreen} reservationBusLine={reservationBusLine}/>}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
