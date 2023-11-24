import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Text, Alert, BackHandler} from "react-native";
import Footer from "./component/Footer";
import MainScreen from "./screens/main/MainScreen";
import BusReservationListScreen from "./screens/history/BusReservationListScreen";
import BusLineInfoScreen from "./screens/reservation/BusLineInfoScreen";
import BusReservationScreen from "./screens/reservation/BusReservationScreen";
import BusDepartureScreen from "./screens/departure/BusDepartureScreen";

import {getData, storeData} from "./component/asyncStorage";
import axios from "axios";

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('main');
    const [reservationBusLine, setReservationBusLine] = useState('');
    const [reservationBusCode, setReservationBusCode] = useState('');
    const [startStation, setStartStation] = useState('');
    const [showReservationModal, setShowReservationModal] = useState(false);
    const [reservationUUID, setReservationUUID] = useState('');
    const [busLineCompany , setBusLineCompany] = useState('')


    const [busStationList, setBusStationList] = useState([])
    const [busLocationList, setBusLocationList] = useState([])
    const [busStopStatusList, setBusStopStatusList] = useState([])
    const [busArrivalTimeList, setBusArrivalTimeList] = useState([]);
    const [busCodeList, setBusCodeList] = useState([]);


    const busRouteAPIKey = process.env.EXPO_PUBLIC_BUS_ROUTE_API_KEY;
    const busLocationAPIKey = process.env.EXPO_PUBLIC_BUS_LOCATION_API_KEY;

    const getBusLineStopList = async () => {
        try {
            const response = await axios.get(
                'http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?ServiceKey='
                + busRouteAPIKey + '&busRouteId='
                + reservationBusLine.route_id
                + '&resultType=json');

            // console.log(response.data.msgBody.itemList)
            if (response.data.msgBody.itemList === null){
                return [];
            }

            // setBusStationList(response.data.msgBody.itemList)
            return response.data.msgBody.itemList
        } catch (error) {
            console.log('!' + error)
            return [];
        }
    }

    const getBusLocationList = async () => {
        try {
            const response = await axios.get(
                'http://ws.bus.go.kr/api/rest/buspos/getLowBusPosByRtid?ServiceKey='
                + busLocationAPIKey + '&busRouteId='
                + reservationBusLine.route_id
                + '&resultType=json');

            if (response.data.msgBody.itemList === null) {
                Alert.alert('운행 종료', '금일 저상 버스 운행이 종료된 노선입니다.')
                setBusLocationList([])
                return []
            }

            setBusLocationList(response.data.msgBody.itemList)
            return response.data.msgBody.itemList;
        } catch (error) {
            console.log('!!' + error)
            return [];
        }
    }
    const getBusLocation = async () => {
        getBusLocationList()
            .then(res => {
                var tempLocationList = []
                var tempStopStatusList = []
                var tempBusArrivalTimeList = []
                var tempBusCodeList = []
                var minString = ""
                var secString = "";
                res.map(busLocationInfo => {
                    var calculateArrivalTime =
                        busLocationInfo.nextStTm - (busLocationInfo.nextStTm * (busLocationInfo.sectDist / busLocationInfo.fullSectDist))
                    tempLocationList.push(busLocationInfo.sectOrd)
                    tempStopStatusList.push(busLocationInfo.stopFlag)
                    tempBusCodeList.push(busLocationInfo.plainNo)
                    Math.round(calculateArrivalTime / 60) !== 0 ? minString = Math.round(calculateArrivalTime / 60) + '분' : minString = '0분'
                    Math.round(calculateArrivalTime % 60) !== 0 ? secString = Math.round(calculateArrivalTime % 60) + '초' : secString = '0초'

                    minString === '0분' && secString === '0초' ? tempBusArrivalTimeList.push('곧 도착') : tempBusArrivalTimeList.push(minString + ' ' + secString + ' 후 도착')
                })

                setBusLocationList(tempLocationList);
                setBusStopStatusList(tempStopStatusList);
                setBusArrivalTimeList(tempBusArrivalTimeList);
                setBusCodeList(tempBusCodeList);
            })
    }

    const getBusLineCompany = async () => {
        try {
            const response = await axios.get(
                'http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?ServiceKey='
                + busLocationAPIKey + '&strSrch='
                + reservationBusLine.route
                + '&resultType=json');

            if (response.data.msgBody.itemList === null) {
                console.log("운수회사 가져오기 실패")
                setBusLocationList('')
            }
            console.log(response.data.msgBody.itemList[0].corpNm)
            return response.data.msgBody.itemList[0].corpNm
        } catch (error) {
            console.log('!!!' + error)
            return ''
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            // 현재 count 값에 1을 더한 값을 새로운 상태로 설정
            var tempList = []
            busArrivalTimeList.map(time => {
                var minute;
                var second;
                if (time !== '곧 도착') {
                    minute = time.split('분')[0]
                    second = time.split('분')[1].split('초')[0]
                } else {
                    minute = 0
                    second = 0
                }
                if (second == 0 && minute == 0) {
                    getBusLocation()
                }
                if (second == 0) {
                    tempList.push((minute - 1) + '분 ' + (parseInt(second) + 59) + '초 후 도착');
                } else {
                    tempList.push(minute + '분 ' + (second - 1) + '초 후 도착');
                }

            })
            setBusArrivalTimeList(tempList);
        }, 1000);

        // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 메모리 누수를 방지
        return () => clearInterval(intervalId);
    }, [busArrivalTimeList])

    useEffect(() => {

        const fetchData = async () => {
            try{
                await getBusLineStopList()
                    .then(res => {
                        // console.log(res)
                        setBusStationList(res)

                    });
                await getBusLocation();

                getBusLineCompany()
                    .then(res => setBusLineCompany(res))

                console.log('DATA SET COMPLETE')
                return true;
            }
            catch(error){
                return false;
            }
        }

        fetchData()

    }, [reservationBusLine]);


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
                                   setShowReservationModal={setShowReservationModal} busLineCompany={busLineCompany}
                                   busStationList = {busStationList} busStopStatusList = {busStopStatusList} busLocationList = {busLocationList}
                                   busArrivalTimeList={busArrivalTimeList} busCodeList = {busCodeList} setBusCodeList = {setBusCodeList} />}
            {showReservationModal &&
                <BusReservationScreen setCurrentScreen={setCurrentScreen} reservationBusLine={reservationBusLine}
                                      reservationBusCode={reservationBusCode} startStation={startStation}
                                      setShowReservationModal={setShowReservationModal}
                                      setReservationUUID={setReservationUUID} busLineCompany={busLineCompany} />}

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
