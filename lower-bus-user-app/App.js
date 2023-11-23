import React, {useState} from 'react';

import {StyleSheet, View, Text} from "react-native";
import Footer from "./component/Footer";
import MainScreen from "./screens/main/MainScreen";
import BusReservationListScreen from "./screens/history/BusReservationListScreen";
import BusLineInfoScreen from "./screens/reservation/BusLineInfoScreen";
import BusReservationScreen from "./screens/reservation/BusReservationScreen";
import BusDepartureScreen from "./screens/departure/BusDepartureScreen";

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('main');
    const [reservationBusLine, setReservationBusLine] = useState('');
    const [reservationBusCode, setReservationBusCode] = useState('');
    const [startStation, setStartStation] = useState('');
    const [showReservationModal, setShowReservationModal] = useState(false);
    const [reservationUUID, setReservationUUID] = useState('');
    return (
        <View style={styles.container}>
            {currentScreen === 'main' &&
                <MainScreen setCurrentScreen={setCurrentScreen} setReservationBusLine={setReservationBusLine}/>}
            {currentScreen === 'busReservationList' && <BusReservationListScreen/>}
            {(currentScreen === 'main' || currentScreen === 'busReservationList') &&
                <Footer setCurrentScreen={setCurrentScreen}/>}
            {currentScreen === 'busLineInfo' &&
                <BusLineInfoScreen setCurrentScreen={setCurrentScreen} reservationBusLine={reservationBusLine}
                                   setReservationBusCode={setReservationBusCode} setStartStation={setStartStation}
                                   setShowReservationModal={setShowReservationModal}/>}
            {currentScreen === 'busLineInfo' && showReservationModal &&
                <BusReservationScreen setCurrentScreen={setCurrentScreen} reservationBusLine={reservationBusLine}
                                      reservationBusCode={reservationBusCode} startStation={startStation}
                                      setShowReservationModal={setShowReservationModal}
                                      setReservationUUID={setReservationUUID}/>}

            {currentScreen === 'busLDeparture' &&
                <BusDepartureScreen setCurrentScreen={setCurrentScreen} reservationBusLine={reservationBusLine}
                                    reservationBusCode={reservationBusCode}
                                    setReservationUUID={setReservationUUID} reservationUUID={reservationUUID}/>}
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
