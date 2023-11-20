import {useEffect, useState} from "react";
import {View, Text, BackHandler, Pressable, FlatList, StyleSheet, Image} from "react-native";
import axios from "axios";
import Header from "../../component/Header";

const BusLineInfoScreen = ({setCurrentScreen, reservationBusLine}) => {
    const [busStationList, setBusStationList] = useState([])
    const getBusLineStopList = async () => {
        try {
            const response = await axios.get('http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?ServiceKey=1SFO0X6QswV8GtusD6ByZlTaiYocBE0nVmhbmoNTb3mUPc%2FUEDJtNbgO6pexMnb8Y%2BuGwXcfUjw9ZJYMPUl2RQ%3D%3D&busRouteId=' + reservationBusLine.route_id + '&resultType=json');
            setBusStationList(response.data.msgBody.itemList)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBusLineStopList()
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

                    }}>
                        <Image source={require('../../assets/images/busStationIcon.png')}
                               style={{height: 15, width: 15}}/>
                        { busStationList.length != item.seq ? (
                            <Image source={require('../../assets/images/busLine.png')}
                                   style={{
                                       position: 'absolute',
                                       top: 25,
                                       left: 12.5,
                                       zIndex: -1,
                                       height: 95,
                                       width: 6
                                   }}/>) : null}

                        <Text style={styles.item}>{item.stationNm}</Text>
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
