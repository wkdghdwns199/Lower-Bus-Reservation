import {BackHandler, Text, View, StyleSheet, Pressable, TouchableOpacity, Linking} from "react-native";
import 'react-native-get-random-values';
import {supabase} from "./Supabase";
import {getData, storeData} from "./asyncStorage";

const ConfirmDepartureModal = ({setToggleConfirmDeparture, reservationUUID, setReservationUUID, setCurrentScreen}) => {
    const endReservation = async () => {
        await supabase
            .from('bus_reservation')
            .update({ended_reservation_status: true})
            .eq('bus_reservation_uuid', reservationUUID)

        storeUUIDToList()
    }

    const storeUUIDToList = () => {
        getData('reservationListString')
            .then(res => {
                var temp = ""
                res === null ? storeData('reservationListString', reservationUUID.toString()) : (
                    temp = res,
                        storeData('reservationListString', JSON.parse(temp) + ',' + reservationUUID.toString())
                )


            })
        setToggleConfirmDeparture('false')
        setReservationUUID('')
        setCurrentScreen('main')
    }

    return (
        <View style={styles.container}>

            <View style={{
                position: 'absolute',
                top: 20,
            }}>
                <Text style={{fontSize: 20,}}>하차 확인</Text>
            </View>

            <View style={{marginBottom:50,}}>
                <Text style={{color: '#EC5353', fontSize: 30,}}>하차하시겠습니까?</Text>
            </View>


            <View style={{position: 'absolute', bottom: 0, height:70, width: '100%', flexDirection: 'row'}}>
                <Pressable style={{
                    alignItems: 'center',
                    justifyContent:'center',
                    height: '100%',
                    backgroundColor: 'gray',
                    width: '50%',
                    borderWidth:1,
                }} onPress={() => setToggleConfirmDeparture(false)}><Text style={{fontSize:20,}}>아니요</Text></Pressable>
                <Pressable style={{
                    alignItems: 'center',
                    justifyContent:'center',
                    height: '100%',
                    backgroundColor: '#EC5353',
                    width: '50%',
                    borderWidth:1,
                }} onPress={() => endReservation()}><Text style={{fontSize:20,}}>네</Text></Pressable>
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

export default ConfirmDepartureModal
