import {BackHandler, Text, View, StyleSheet, Pressable} from "react-native";
import {useEffect, useState} from "react";
import CheckBox from 'expo-checkbox'
import {supabase} from "../../component/Supabase";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const BusReservationScreen = ({
                                  setCurrentScreen,
                                  reservationBusCode,
                                  reservationBusLine,
                                  startStation,
                                  setShowReservationModal,
                                  setReservationUUID
                              }) => {

    const [toggleCheckBox, setToggleCheckBox] = useState(true)

    useEffect(() => {
        const backAction = () => {
            setShowReservationModal(false)
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
            backHandler.remove();
        };


    }, []);

    const reservationDataInsert = async (uuid) => {
        await supabase
            .from('bus_reservation')
            .insert([
                {
                    reservation_bus_code : reservationBusCode,
                    reservation_bus_line : reservationBusLine.route,
                    reservation_starting_point : startStation,
                    lift_using_status : true,
                    bus_reservation_uuid : uuid,
                }
            ])
        return uuid
    }


    return (
        <View style={styles.container}>
            <View style={{
                position: 'absolute',
                top: 20,
            }}>
                <Text style={{fontSize: 20,}}>탑승 알림</Text>
            </View>

            <View style={{marginBottom:50,}}>
                <Text style={{color: '#3D9B35', fontSize: 15,}}>{startStation}</Text>
                <Text style={{fontSize: 15}}>정류장에서</Text>
                <Text style={{color: '#3D9B35', fontSize: 15}}>{reservationBusLine.route}번</Text>
                <Text style={{fontSize: 15, marginBottom: 5}}>버스를 탑승하시겠습니까?</Text>
                <Text style={{fontSize: 15, marginBottom: 20}}>(차량 번호 : {reservationBusCode})</Text>

                <View style={{flexDirection : 'row', justifyContent:'center'}}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => {
                        setToggleCheckBox(newValue)
                        console.log(toggleCheckBox)
                    }}
                />
                    <Text style={{marginLeft : 10,}}>리프트 작동 여부</Text>
                </View>

            </View>

            <View style={{position: 'absolute', bottom: 0, height:70, width: '100%', flexDirection: 'row'}}>
                <Pressable style={{
                    alignItems: 'center',
                    justifyContent:'center',
                    height: '100%',
                    backgroundColor: 'gray',
                    width: '50%',
                    borderWidth:1,
                }} onPress={() => setShowReservationModal(false) }><Text style={{fontSize:20,}}>아니요</Text></Pressable>
                <Pressable style={{
                    alignItems: 'center',
                    justifyContent:'center',
                    height: '100%',
                    backgroundColor: '#C9EEBC',
                    width: '50%',
                    borderWidth:1,
                }} onPress={() => {
                    reservationDataInsert(uuidv4())
                        .then(res => {
                            setReservationUUID(res)
                        })
                    setShowReservationModal(false)
                    setCurrentScreen('busLDeparture')} }><Text style={{fontSize:20,}}>네</Text></Pressable>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 350,
        width: '100%',
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 4,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderColor: 'black',
    }
})

export default BusReservationScreen
