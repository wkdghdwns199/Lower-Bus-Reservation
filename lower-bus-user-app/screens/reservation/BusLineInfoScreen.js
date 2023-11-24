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
                               setBusLineCompany
                           }) => {
    const [busStationList, setBusStationList] = useState([])
    const [busLocationList, setBusLocationList] = useState([])
    const [busStopStatusList, setBusStopStatusList] = useState([])
    const [busArrivalTimeList, setBusArrivalTimeList] = useState([]);
    const [busCodeList, setBusCodeList] = useState([]);

    const [shouldRender, setShouldRender] = useState(false)
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
            console.log(error)
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
            console.log(error)
            return [];
        }
    }
    const getBusLocation = () => {
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
            console.log(error)
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

        const fetchData =  () => {
            getBusLineStopList()
                .then(res => setBusStationList(res))
            getBusLocation()
            getBusLineCompany()
                .then(res => setBusLineCompany(res))

            return true;
        }

        setShouldRender(fetchData())


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
    if (!shouldRender) {
        return (
            <View style={styles.container}>
            </View>
        )
    }

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
                {
                    busStationList.map((item) => (
                        <Pressable style={styles.itemContainer} onPress={() => {
                            // findRunningBus(item.seq, item.stationNm)
                            setStartStation(item.stationNm)
                            setReservationBusCode('서울42사2034')
                            setShowReservationModal(true)
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        padding: 16,
    },
    busLineList: {
        height: '80%',
        width: '100%',
        zIndex: 2,
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
