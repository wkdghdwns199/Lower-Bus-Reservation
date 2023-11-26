import {Alert, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {supabase} from "../../lib/supabase";
import * as Crypto from 'expo-crypto'

const PasswordScreen = ({route, navigation}) => {

    const {registerInfo, backToLoginScreen} = route.params;

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [notSame, setNotSame] = useState(false)
    const registerBusDriver = async() => {
        if (password !== passwordConfirm){
            setNotSame(true)
            return ;
        }
        else {
            if (password === ""){
                Alert.alert('비밀번호 오류', '비밀번호를 입력하셔야 합니다!')
                return ;
            }
            else {
                await supabase
                    .from('bus_driver_info')
                    .insert([
                        {
                            bus_driver_id : registerInfo.phone,
                            bus_driver_pw : await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password),
                            bus_driver_name : registerInfo.name,
                            bus_driver_company : registerInfo.company,
                            bus_driver_license_code : registerInfo.license,
                            bus_driver_birth_date : registerInfo.birth,
                        }
                    ])
                backToLoginScreen.navigate('LoginScreen')
            }

        }


    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputStyle} placeholder={'비밀번호'}
                           secureTextEntry={true}
                           onChangeText={text => {
                               setNotSame(false)
                               setPassword(text)
                           }}
                           value={password}/>
                {notSame && <Text style={{fontSize: 10, color: 'red'}}>비밀번호 불일치</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputStyle} placeholder={'비밀번호 확인'}
                           secureTextEntry={true}
                            onChangeText={text => {
                                setNotSame(false)
                                setPasswordConfirm(text)
                            }}
                            value={passwordConfirm}/>
                {notSame && <Text style={{fontSize: 10, color: 'red'}}>비밀번호 불일치</Text>}
            </View>

            <Pressable onPress={() => registerBusDriver()} style={styles.buttonStyle}>
                <Text style={{fontSize: 20,}}>완료</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F7F2',
    },

    inputContainer: {
        width: '70%',
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#C9C9C9',
        marginBottom: 30,
    },
    inputStyle: {
        width: 200,
        height: 40,
        fontSize: 20,
    },
    buttonStyle: {
        width: '60%',
        height: 50,
        backgroundColor: '#C9EEBC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        bottom: 20,
        marginBottom: 20,
        position: 'absolute',
    },

})

export default PasswordScreen;
