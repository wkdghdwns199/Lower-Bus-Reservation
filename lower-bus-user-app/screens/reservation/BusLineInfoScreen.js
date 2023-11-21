import {useEffect, useState} from "react";
import {View, Text, BackHandler, Pressable, FlatList, StyleSheet, Image} from "react-native";
import axios from "axios";
import Header from "../../component/Header";

const BusLineInfoScreen = ({setCurrentScreen, reservationBusLine}) => {
    const [busStationList, setBusStationList] = useState([])
    const [busLocationList, setBusLocationList] = useState([])
    const [busStopStatusList, setBusStopStatusList] = useState([])
    const [busArrivalTimeList, setBusArriavalTimeList] = useState([]);
    const busRouteAPIKey = process.env.BUS_ROUTE_API_KEY;
    const busLocationAPIKey = process.env.BUS_LOCATION_API_KEY;
    const getBusLineStopList = async () => {
        try {
            const response = await axios.get(
                'http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?ServiceKey='
                + busRouteAPIKey + '&busRouteId='
                + reservationBusLine.route_id
                + '&resultType=json');
            setBusStationList(response.data.msgBody.itemList)
        } catch (error) {
            console.log(error)
        }
    }

    const getBusLocationList = async () => {
        try {
            const response = await axios.get(
                'http://ws.bus.go.kr/api/rest/buspos/getLowBusPosByRtid?ServiceKey='
                + busLocationAPIKey
                + '&busRouteId='
                + reservationBusLine.route_id
                + '&resultType=json'
            )
            if (response.data.msgBody.itemList === null) {
                alert('금일 저상 버스 운행이 종료된 노선입니다.')
                setBusLocationList([])
                return []
            }
            setBusLocationList(response.data.msgBody.itemList)
            return response.data.msgBody.itemList;
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBusLineStopList()
        getBusLocationList()
            .then(res => {
                var tempLocationList = []
                var tempStopStatusList = []
                var tempBusArrivalTimeList = []
                var minString = ""
                var secString = "";
                res.map(busLocationInfo => {
                    tempLocationList.push(busLocationInfo.sectOrd)
                    tempStopStatusList.push(busLocationInfo.stopFlag)
                    Math.round(busLocationInfo.nextStTm / 60) != 0 ? minString = Math.round(busLocationInfo.nextStTm / 60) + '분' : minString = ''
                    busLocationInfo.nextStTm % 60 != 0 ? secString = busLocationInfo.nextStTm % 60 + '초' : secString = ''
                    tempBusArrivalTimeList.push(minString + ' ' + secString + ' 후 도착')
                })
                setBusLocationList(tempLocationList);
                setBusStopStatusList(tempStopStatusList);
                setBusArriavalTimeList(tempBusArrivalTimeList);
            })
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

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => {
                setCurrentScreen('main')
            }}>
                <Image source={require('../../assets/images/backButtonIcon.png')}
                       style={{height: '90%', width: '90%'}}/>
            </Pressable>
            <Header title={reservationBusLine.route}/>

            <FlatList
                data={busStationList}
                keyExtractor={(item) => item.seq.toString()}
                renderItem={({item}) => (
                    <Pressable style={styles.itemContainer} onPress={() => {
                        console.log(item.seq);
                        console.log(reservationBusLine.route_id)
                    }}>
                        {busLocationList.includes(item.seq) ? (
                            <Image source={require('../../assets/images/busIcon.png')}
                                   style={{
                                       backgroundColor: 'white',
                                       position: 'absolute',
                                       top: (busStopStatusList[busLocationList.indexOf(item.seq)] == 1 ? 15 : 50),
                                       zIndex: 4,
                                       height: 30,
                                       width: 30
                                   }}/>) : null}

                        <Image source={require('../../assets/images/busStationIcon.png')}
                               style={{height: 15, width: 15}}/>
                        {busStationList.length != item.seq ? (
                            <Image source={require('../../assets/images/busLine.png')}
                                   style={{
                                       position: 'absolute',
                                       top: 25,
                                       left: 12.5,
                                       zIndex: -1,
                                       height: 95,
                                       width: 6
                                   }}/>) : null}

                        <Text
                            style={styles.item}>{item.stationNm.length >= 16 ? item.stationNm.substring(0, 12) + '...' : item.stationNm}</Text>
                        {busLocationList.includes((item.seq)) && busStopStatusList[busLocationList.indexOf(item.seq) + 1] != 1 ? (
                            <Text style={{
                                fontSize: 12,
                                color: 'red',
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                            }}>{busArrivalTimeList[busLocationList.indexOf(item.seq)]}</Text>) : null}

                    </Pressable>
                )}
            />
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
    backButton: {
        position: 'absolute',
        height: 50,
        width: 50,
        backgroundColor: 'white',
        bottom: 30,
        right: 70,
        zIndex: 1,
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
