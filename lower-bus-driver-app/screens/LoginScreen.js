// HomeScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput, Pressable, Alert, BackHandler} from 'react-native';
import CheckBox from 'expo-checkbox'
import {supabase} from "../lib/supabase";
import * as Crypto from "expo-crypto";
import {getData, storeData, removeData } from "../lib/asyncStorage";
import {useIsFocused} from "@react-navigation/native";


function LoginScreen({ navigation }) {

    const isFocused = useIsFocused()
    const [id,setId] = useState('');
    const [pw, setPw] = useState('');

    const [idRemember, setIdRemember] = useState(true);
    const [autoLogin, setAutoLogin] = useState(true);
    const loginHandle = async () => {

        if (idRemember) {
            //console.log('remembered')
            storeData('initialId' , id)
        }
        else {
            removeData('initialId');
        }
        if (autoLogin) {
            //console.log('auto')
            storeData('autoId', id)
            storeData('autoLogin', 'true')
        }
        else {
            removeData('autoId')
            removeData('autoLogin')
        }

        const {data, error} = await supabase
            .from('bus_driver_info')
            .select('*')
            .eq('bus_driver_id', id)
            .eq('bus_driver_pw', await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, pw))


        if (data.length !== 0 ){
            if (data[0].bus_driver_auth_status === 'false'){
                Alert.alert('계정 검증', '계정이 검증 중이오니 기다려주시기 바랍니다!')
                return ;
            }
            else if (data[0].bus_driver_auth_status === 'reject'){
                Alert.alert('계정 인증 거절', '계정 인증이 거절되었습니다. 관리자에게 문의 바랍니다!')
                return ;
            }

            navigation.navigate('LoggedScreen', {id:id})
        }
        else {
            Alert.alert('로그인', '아이디 또는 비밀번호가 틀렸습니다!')
            return ;
        }

    }

    useEffect(() => {
        getData('initialId')
            .then(res => {
                setId(JSON.parse(res))})

        setPw('')
    }, [isFocused]);

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

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.inputContainer}>
                    <Text style={{position:'absolute', left:0, fontSize:20,}}>아이디</Text>
                    <TextInput style={styles.inputStyle} placeholder={'전화번호'} value={id}
                            onChangeText={text => setId(text)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{position:'absolute', left:0, fontSize:20,}}>비밀번호</Text>
                    <TextInput style={styles.inputStyle} secureTextEntry={true} value={pw}
                            onChangeText={text => setPw(text)}/>
                </View>

                <View style={styles.checkboxGroupContainer}>
                    <View style={[styles.checkboxContainer, {marginRight:30,}]}>
                        <CheckBox style={styles.checkbox} disabled={false} value={idRemember}
                                onValueChange={newValue => setIdRemember(newValue)}/>
                        <Text>아이디 기억</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox style={styles.checkbox} disabled={false} value={autoLogin}
                                onValueChange={newValue => setAutoLogin(newValue)}/>
                        <Text>로그인 유지</Text>
                    </View>
                </View>

                <Pressable onPress = {() => loginHandle() }style={styles.buttonStyle}>
                    <Text style={{fontSize:20,}}>로그인</Text>
                </Pressable>

                <Pressable onPress = {() => navigation.navigate('JoinProcessNavigation', {backToLoginScreen : navigation})} style={styles.buttonStyle}>
                    <Text style={{fontSize:20,}}>회원가입</Text>
                </Pressable>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#F8F7F2',
    },
    loginContainer: {
        height:'80%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    inputContainer: {
        width:'70%',
        height:60,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#C9C9C9',
        marginBottom:30,
    },
    inputStyle: {
        width:'80%',
        height:40,
        position:'absolute',
        right:0,
    },
    checkboxGroupContainer: {
        alignItems:'center',
        justifyContent:'center',
        width: '90%',
        height:50,
        flexDirection:'row',
    },
    checkboxContainer: {
        height:40,
        flexDirection:'row',
        marginBottom:10,
    },
    buttonStyle: {
        width:'60%',
        height:50,
        backgroundColor:'#C9EEBC',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginBottom:20,
    },
    checkbox: {
        marginRight:10,
    }


})

export default LoginScreen;
