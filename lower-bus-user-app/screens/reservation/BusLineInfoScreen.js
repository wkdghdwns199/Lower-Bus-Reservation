import React, {useEffect, useState} from "react";
import {View, Text, BackHandler, Pressable, FlatList, StyleSheet, Image, Alert, ScrollView} from "react-native";
import axios from "axios";
import Header from "../../component/Header";
import Config from "react-native-config";

const BusLineInfoScreen = ({
                               setCurrentScreen,
                               reservationBusLine,
                               setReservationBusCode,
                               setStartStation,
                               setShowReservationModal,
                               busStationList,
                               busStopStatusList,
                               busLocationList,
                               busArrivalTimeList,
                               busCodeList,
                           }) => {


    useEffect(() => {

        const backAction = () => {
            setCurrentScreen('main');
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);


        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
            backHandler.remove();
        };

    }, []);

    const findRunningBus = (reserveLoc, stationNm) => {
        // console.log(busCodeList[busLocationList.indexOf(reserveLoc.toString())]);

        while (--reserveLoc) {
            if (busLocationList.includes(reserveLoc.toString())) {
                // console.log(busCodeList[busLocationList.indexOf(reserveLoc.toString())]);
                setStartStation(stationNm)
                setReservationBusCode(busCodeList[busLocationList.indexOf(reserveLoc.toString())]);
                setShowReservationModal(true);
                return;
            }
        }

        Alert.alert('예약 불가', '정류장에 도착 예정인 버스가 없습니다.');
    }
    // if (!shouldRender) {
    //     return (
    //         <View style={{
    //             flex: 1,
    //             alignItems: 'center',
    //             justifyContent:'center',
    //             width: '100%',
    //             padding: 16,
    //             zIndex:0,}}>
    //             <Text>잠시만 기다려주세요!</Text>
    //         </View>
    //     )
    // }

    return (
        <View style={styles.container}>

            <Pressable style={styles.backButton} onPress={() => {
                setCurrentScreen('main')
            }}>
                <Image source={require('../../images/backButtonIcon.png')}
                       style={{height: '90%', width: '90%'}}/>
            </Pressable>
            <Header title={reservationBusLine.route}/>

            <ScrollView style={styles.busLineList}>
                {/*<Text>{JSON.stringify(busStationList)}</Text>*/}
                {/*<Text>{busLocationAPIKey}</Text>*/}
                {/*<Text>{busRouteAPIKey}</Text>*/}
                {
                    busStationList.map(item => (
                        <Pressable style={styles.itemContainer} onPress={() => {
                            findRunningBus(item.seq, item.stationNm)
                            // setStartStation(item.stationNm)
                            // setReservationBusCode('서울42사2034')
                            // setShowReservationModal(true)
                        }} key={item.seq}>

                            {busLocationList.includes(item.seq) ? (
                                <Image source={require('../../images/busIcon.png')}
                                       style={{
                                           backgroundColor: 'white',
                                           position: 'absolute',
                                           top: (busStopStatusList[busLocationList.indexOf(item.seq)] == 1 ? 15 : 50),
                                           zIndex: 3,
                                           height: 30,
                                           width: 30
                                       }}/>) : null}

                            <Image source={require('../../images/busStationIcon.png')}
                                   style={{height: 15, width: 15}}/>
                            {busStationList.length != item.seq ? (
                                <Image source={require('../../images/busLine.png')}
                                       style={{
                                           position: 'absolute',
                                           top: 25,
                                           left: 12.5,
                                           zIndex: -1,
                                           height: 95,
                                           width: 6
                                       }}/>) : null}

                            <Text style={styles.item}>
                                {item.stationNm.length >= 16 ? item.stationNm.substring(0, 15) + '...' : item.stationNm}
                            </Text>
                            {busLocationList.includes((item.seq - 1).toString()) &&
                                busStopStatusList[busLocationList.indexOf((item.seq - 1).toString())] !== 1 ? (
                                <Text style={{
                                    fontSize: 12,
                                    color: 'red',
                                    position: 'absolute',
                                    right: 30,
                                    top: 50,
                                }}>{busArrivalTimeList[busLocationList.indexOf((item.seq - 1).toString())]}</Text>) : null}

                        </Pressable>
                    ))
                }
            </ScrollView>

        </View>
    )

}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        padding: 16,
    },
    busLineList: {
        height: '80%',
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        height: 50,
        width: 50,
        backgroundColor: 'white',
        bottom: 30,
        right: 70,
        zIndex: 3,
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        padding: 8,
        borderColor: '#ddd',
        height: 60,
        width: '100%',
    },
    item: {
        marginLeft: 10,
        fontSize: 25,
    },
})
export default BusLineInfoScreen;
