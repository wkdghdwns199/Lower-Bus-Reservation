import {View, Text, Pressable, BackHandler, Alert, StyleSheet} from "react-native";
import {supabase} from "../../component/Supabase";
import {useEffect} from "react";
import {storeData, getData} from "../../component/AsyncStorage";

const BusDepartureScreen = ({
                                setCurrentScreen,
                                reservationBusLine,
                                reservationBusCode,
                                setReservationUUID,
                                reservationUUID
                            }) => {
    const deleteReservation = async () => {
        console.log(reservationUUID)
        await supabase
            .from('bus_reservation')
            .delete()
            .eq('bus_reservation_uuid', reservationUUID)
    }

    const endReservation = async () => {
        await supabase
            .from('bus_reservation')
            .update({ended_reservation_status: true})
            .eq('bus_reservation_uuid', reservationUUID)
    }

    const storeUUIDToList = () => {
        console.log(reservationUUID)
        getData('reservationList')
            .then(res => {
                console.log(res.toString())
                var tempList = v
                storeData('reservationList', tempList.reverse().toString())
            })
    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert('알림', '하차를 하시거나 예약 취소를 해주세요!')
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
            backHandler.remove();
        };
    }, []);
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                height: 200,
                position: 'absolute',
                bottom: 0,
                width: '100%',
            }}>
                <Pressable style={{
                    justifyContent:'center',
                    alignItems:'center',
                    width:'50%',
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    backgroundColor:'#FFBBB2'
                }}>
                    <Text style={{
                        fontSize: 30,
                        textAlign:'center',
                    }} onPress={() => deleteReservation().then(() => {
                        setReservationUUID('')
                        setCurrentScreen('main')
                    })}>예약 취소</Text></Pressable>
                <Pressable style={{
                    justifyContent:'center',
                    width:'50%',
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    backgroundColor:'#FF0000'
                }} onPress={() => endReservation().then(() => {
                    setReservationUUID('')
                    // storeUUIDToList()
                    setCurrentScreen('main')
                })}><Text style={{
                    fontSize: 30,
                    textAlign:'center',
                }}>하차</Text></Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
})

export default BusDepartureScreen;
