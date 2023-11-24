import {View, Text, Pressable, BackHandler, Alert, StyleSheet, Image} from "react-native";
import {supabase} from "../../component/Supabase";
import {useEffect, useState} from "react";
import {storeData, getData} from "../../component/asyncStorage";
import ConfirmDepartureModal from "../../component/ConfirmDepartureModal";
import ConfirmCancelModal from "../../component/ConfirmCancelModal";

const BusDepartureScreen = ({
                                setCurrentScreen,
                                reservationBusLine,
                                reservationBusCode,
                                setReservationUUID,
                                reservationUUID
                            }) => {

    const [toggleConfirmDeparture, setToggleConfirmDeparture] = useState(false)
    const [toggleConfirmCancel, setToggleConfirmCancel] = useState(false)


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
                alignItems: 'center',
                justifyContent: 'center',
                top: 90,
                height: 300,
                width: 300,
            }}>
                <Image source={require('../../images/travelingIcon.png')}
                       style={{height: 150, width: 150}}/>
                <Text style={{fontSize: 20, marginBottom: 10,}}>잘 가고 계신가요?</Text>
                <Text style={{fontSize: 15,}}>편안하게 이동하실 수 있도록 도와드릴게요!</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                height: 200,
                position: 'absolute',
                bottom: 0,
                width: '100%',
            }}>
                <Pressable style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#FFBBB2'
                }}>
                    <Text style={{
                        fontSize: 30,
                        textAlign: 'center',
                    }} onPress={() =>  {setToggleConfirmCancel(true)}}>예약 취소</Text></Pressable>
                <Pressable style={{
                    justifyContent: 'center',
                    width: '50%',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#EC5353',
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    borderColor: 'black',

                }} onPress={() => setToggleConfirmDeparture(true)}><Text style={{
                    fontSize: 30,
                    textAlign: 'center',
                }}>하차</Text></Pressable>

                {toggleConfirmDeparture && <ConfirmDepartureModal setToggleConfirmDeparture={setToggleConfirmDeparture}
                                                                  reservationUUID={reservationUUID}
                                                                    setReservationUUID={setReservationUUID}
                                                                    setCurrentScreen={setCurrentScreen}/>}

                {toggleConfirmCancel && <ConfirmCancelModal setToggleConfirmCancel = {setToggleConfirmCancel}
                                                            reservationUUID={reservationUUID}
                                                            setReservationUUID={setReservationUUID}
                                                            setCurrentScreen={setCurrentScreen}/>}
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
