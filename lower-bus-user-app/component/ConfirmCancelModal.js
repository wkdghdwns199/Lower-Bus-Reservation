import {BackHandler, Text, View, StyleSheet, Pressable, TouchableOpacity, Linking} from "react-native";
import 'react-native-get-random-values';
import {supabase} from "./Supabase";
import {getData, storeData} from "./asyncStorage";

const ComfirmCancelModal = ({setToggleConfirmCancel, reservationUUID, setReservationUUID, setCurrentScreen}) => {
    const deleteReservation = async () => {
        //console.log(reservationUUID)
        await supabase
            .from('bus_reservation')
            .delete()
            .eq('bus_reservation_uuid', reservationUUID)
    }


    return (
        <View style={styles.container}>

            <View style={{
                position: 'absolute',
                top: 20,
            }}>
                <Text style={{fontSize: 20,}}>취소 확인</Text>
            </View>

            <View style={{marginBottom:50,}}>
                <Text style={{color: '#EC5353', fontSize: 30,}}>예약을 취소하시겠습니까?</Text>
            </View>


            <View style={{position: 'absolute', bottom: 0, height:70, width: '100%', flexDirection: 'row'}}>
                <Pressable style={{
                    alignItems: 'center',
                    justifyContent:'center',
                    height: '100%',
                    backgroundColor: 'gray',
                    width: '50%',
                    borderWidth:1,
                }} onPress={() => {
                    setToggleConfirmCancel(false)
                }}><Text style={{fontSize:20,}}>아니요</Text></Pressable>
                <Pressable style={{
                    alignItems: 'center',
                    justifyContent:'center',
                    height: '100%',
                    backgroundColor: '#EC5353',
                    width: '50%',
                    borderWidth:1,
                }} onPress={() => {
                    deleteReservation()
                    setToggleConfirmCancel(false)
                    setReservationUUID('')
                    setCurrentScreen('busLineInfo')
                }}><Text style={{fontSize:20,}}>네</Text></Pressable>
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
        zIndex: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderColor: 'black',
    }
})

export default ComfirmCancelModal
