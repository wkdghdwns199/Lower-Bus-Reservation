// HomeScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import CheckBox from 'expo-checkbox'
import {supabase} from "../lib/supabase";
import * as Crypto from "expo-crypto";
import {getData, storeData } from "../lib/asyncStorage";
import {useIsFocused} from "@react-navigation/native";

function LoginScreen({ navigation }) {

    const [id,setId] = useState('');
    const [pw, setPw] = useState('');

    const [idRemember, setIdRemember] = useState(true);
    const [autoLogin, setAutoLogin] = useState(true);
    const loginHandle = async () => {

        if (idRemember) {
            console.log('remembered')
            storeData('initialId' , id)
        }
        if (autoLogin) {
            console.log('auto')
            storeData('autoId', id)
            storeData('autoLogin', 'true')
        }

        const {data, error} = await supabase
            .from('bus_driver_info')
            .select('*')
            .eq('bus_driver_id', id)
            .eq('bus_driver_pw', await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, pw))

        if (data.length !== 0 ){
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
    }, [useIsFocused()]);

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
        width:200,
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
