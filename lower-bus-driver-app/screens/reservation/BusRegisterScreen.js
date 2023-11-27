import {Alert, BackHandler, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {supabase} from "../../lib/supabase";
import {removeData} from "../../lib/asyncStorage";

const BusRegisterScreen = ({route, navigation}) => {
    const {logoutRoute, id} = route.params
    const [busCode, setBusCode] = useState('');

    const allocateBusDriver = async () => {


        const {data, error} = await supabase
            .from('bus_information')
            .select('*')
            .eq('bus_code',busCode)

        if (data.length===0){
            Alert.alert('오류', '차량 번호가 올바르지 않습니다!')
        }
        else if (data[0].bus_allocated_driver !==''){
            Alert.alert('오류', '차량이 운행 중에 있습니다!')
        }
        else {
            const {error} = await supabase
                .from('bus_information')
                .update({bus_allocated_driver: id})
                .eq('bus_code', busCode)

            navigation.navigate('BusReservationListScreen', {busLine : data[0].bus_line, busCode : busCode})
        }

    }

    const resetStorage = () => {
        removeData('autoId')
        removeData('autoLogin')
        logoutRoute.navigate('LoginScreen')
    }


    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                '종료',
                '앱을 종료하시겠습니까?',
                [{text:'확인', onPress:() => {
                        BackHandler.exitApp()
                    }}, {text:'취소', style:'cancel'}]
            )
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
            backHandler.remove();
        };

    },[])

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={{fontSize:18, color:'#2F7815'}}>운행</Text>
                <Text style={{fontSize:18}}>하실 </Text>
                <Text style={{fontSize:18 ,color:'#2F7815'}}>버스번호</Text>
                <Text style={{fontSize:18}}>를 입력해주세요</Text>
            </View>
            <TextInput style={styles.checkboxGroupArea} onChangeText={text => setBusCode(text)} value ={busCode} />

            <Pressable onPress = {() =>  allocateBusDriver()} style={styles.busRegisterButtonStyle}>
                <Text style={{fontSize:20,}}>버스 운행</Text>
            </Pressable>

            <Pressable onPress = {() =>  resetStorage()} style={styles.logoutButtonStyle}>
                <Text style={{fontSize:15,}}>로그아웃</Text>
            </Pressable>
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
    buttonStyle:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:50,
        borderRadius:20,
        borderWidth:2,
        backgroundColor:'#D9D9D9',
        width:'70%',
        height:200,
    },
    checkboxGroupArea:{
        borderRadius:10,
        borderWidth:1,
        borderColor:'#C9EEBC',
        width:'80%',
        height:70,
        fontSize:30,
        textAlign:'center',
        marginBottom:20,
    },
    textContainer:{
        flexDirection:'row',
        marginBottom:20,
    },
    busRegisterButtonStyle: {
        width:'60%',
        height:50,
        backgroundColor:'#C9EEBC',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginBottom:20,
    },
    logoutButtonStyle: {
        width:'20%',
        height:30,
        backgroundColor:'#FFBBB2',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginBottom:20,
    },

})
export default BusRegisterScreen
