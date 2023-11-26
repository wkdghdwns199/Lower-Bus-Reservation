import {View, StyleSheet, ScrollView, Text, BackHandler, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import {supabase} from "../../lib/supabase";
import * as Speech from 'expo-speech';
import {useFocusEffect} from "@react-navigation/native";

const BusReservationListScreen = ({route, navigation}) => {

    const {busLine, busCode} = route.params;

    const [busReservationList, setBusReservationList] = useState([]);
    const [currentCountList, setCurrentCountList] = useState(0)
    // const [busStopList, setBusStopList] = useState(['수유동삼양탕앞', '하늘숲역','수유동삼양탕앞', '하늘숲역','수유동삼양탕앞', '하늘숲역','수유동삼양탕앞', '하늘숲역','수유동삼양탕앞', '하늘숲역']);
    // const [busLiftUseList, setBusLiftUseList] = useState([true, false,true, false,true, false,true, false,true, false]);

    const [busStopList, setBusStopList] = useState([]);
    const [busLiftUseList, setBusLiftUseList] = useState([]);

    const speak = async (string) => {
        await Speech.speak(string,{
            language: 'ko',
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('BusReservationListScreen',{busLine:busLine, busCode:busCode})
                Alert.alert(
                    '운행 종료',
                    '운행을 종료하시겠습니까?',
                    [{text:'확인', onPress:async () => {
                            const { error} = await supabase
                                .from('bus_information')
                                .update({'bus_allocated_driver' : ''})
                                .eq('bus_code', busCode)

                            navigation.goBack()

                        }}, {text:'취소', style:'cancel'}]
                )
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        },[])
    )

    useEffect( () => {
        console.log('버스 예약 리스트 ' + busReservationList.length)
        console.log('현재 카운트 ' + currentCountList)
        if (currentCountList !== busReservationList.length){
            if (currentCountList < busReservationList.length){
                const station = busReservationList[0].reservation_starting_point
                speak(`${station}역에 승차 도움이 필요합니다!`)
                // setBusReservationList(busReservationList.reverse())
                // setCurrentCountList(busReservationList.length)
            }
            else if (currentCountList > busReservationList.length){
                 speak('다음 역에 하차가 있습니다!')
                // setBusReservationList(busReservationList.reverse())
                // setCurrentCountList(busReservationList.length)
            }
            setCurrentCountList(busReservationList.length)
        }

    },[busReservationList])


    useEffect(() => {
        const intervalId = setInterval(async () => {
            const {data, error} = await supabase
                .from('bus_reservation')
                .select('*')
                .eq('reservation_bus_code', busCode)
                .eq('ended_reservation_status', false)

            setBusReservationList(data.reverse())

        }, 1000)



        return () => {
            clearInterval(intervalId)
        }
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize:20,}}>{busLine} ({busCode}) 버스 운행 중</Text>
            </View>
            <ScrollView style={styles.busReservationListView}>
                {busReservationList.map((item, index) => (
                    (
                        <View key={index} style={styles.busReservationItemContainer}>
                            <View style={[styles.busReservationItem, {borderColor : item.lift_using_status ? '#03CF5D' : '#4743F3'}]}>
                                <Text style={{fontSize:25, color:'white', fontWeight:'bold', marginBottom:13}}>{item.reservation_starting_point}</Text>
                                <Text style={{fontSize:15, color:'#FAFF00', fontWeight:'bold', marginBottom:13}}>
                                    {item.lift_using_status ? '리프트 작동 O' : '리트프 작동 X'}
                                </Text>
                            </View>
                        </View>
                    )
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#F8F7F2',
    },
    header:{
        width:'100%',
        height:80,
        backgroundColor:'#C9EEBC',
        alignItems:'center',
        justifyContent:'center',
    },
    busReservationListView: {
        flex:1,
        height:'10%',
        width: '100%',
    },
    busReservationItemContainer: {
        width:'100%',
        height:200,
        alignItems:'center',
        justifyContent:'center',
    },
    busReservationItem:{
        backgroundColor:'rgba(0,0,0,0.6)',
        borderRadius:10,
        borderWidth:10,
        width:270,
        height:'80%',
        alignItems:'center',
        justifyContent:'center',
    }
})

export default BusReservationListScreen
