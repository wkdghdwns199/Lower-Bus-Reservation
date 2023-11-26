import {View, Text, StyleSheet, TextInput, ScrollView, Pressable, KeyboardAvoidingView, Platform} from "react-native";
import React, {useState, useRef} from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import {supabase} from "../../lib/supabase";

const UserInfoScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [company, setCompany] = useState('')
    const [license, setLicense] = useState('')
    const [phone, setPhone] = useState('')
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false)
    const [isAlreadyRegisteredCode, setIsAlreadyRegisteredCode] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



    const inputRef2 = useRef(null);

    const moveFocus = () => {
        if (inputRef2.current){
            inputRef2.current.focus()
        }
    }

    const registerInfo = {
        'name' : name,
        'birth' : birth,
        'company' : company,
        'license' : license,
        'phone' : phone
    }

    const checkLicense = async () => {
        const {data, error} = await supabase
            .from('bus_driver_info')
            .select('*')
            .eq('bus_driver_license_code', license)

        if (error) {
            return false
        }

        if (data.length !== 0) {
            setIsAlreadyRegisteredCode(true)
            return false;
        }

        return true
    }

    const checkPhone = async () => {
        const {data, error} = await supabase
            .from('bus_driver_info')
            .select('*')
            .eq('bus_driver_id', phone)

        if (error) {

            return false
        }

        if (data.length !== 0) {
            setIsAlreadyRegistered(true)
            return false;
        }

        return true
    }

    const checkIfAllSet = () => {
        if (name !== '' && birth !== '' && company !== '' && phone !== '') {
            return true
        }
        return false;
    }


    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputStyle} placeholder={'이름'}
                           onChangeText={text => setName(text)}
                           value={name}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput onFocus={() => {
                    setDatePickerVisibility(true)
                }} style={styles.inputStyle} placeholder={'생년월일'}
                           onChangeText={text => {
                               setBirth(text)
                           }} value={birth}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput ref = {inputRef2} style={styles.inputStyle} placeholder={'운수회사'}
                           onChangeText={text => setCompany(text)}
                           value={company}/>
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputStyle} placeholder={'면허 일련 번호'}
                           onChangeText={text => {
                               setIsAlreadyRegisteredCode(false)
                               setLicense(text)
                           }}
                           value={license}/>
                {isAlreadyRegisteredCode && <Text style={{fontSize: 10, color: 'red'}}>등록된 면허입니다</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputStyle} placeholder={'전화번호 ( -없이 )'}
                           onChangeText={text => {
                               setIsAlreadyRegistered(false)
                               setPhone(text)
                           }}
                           value={phone}/>
                {isAlreadyRegistered && <Text style={{fontSize: 10, color: 'red'}}>등록된 전화번호입니다</Text>}
            </View>


            <Pressable onPress={() => { checkLicense().then(res => {
                res ? checkPhone().then(
                    res2 => res2 ? navigation.navigate('PasswordScreen', {registerInfo}) : null) : null
                })
            }}
                       style={[styles.buttonStyle, {backgroundColor: checkIfAllSet() ? '#C9EEBC' : '#C9C9C9'}]}>
                <Text style={{fontSize: 20,}}>다음</Text>
            </Pressable>

            <DateTimePicker isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={date => {
                                setBirth(date.getFullYear() + '.' + date.getMonth() + '.' + date.getDay())
                                setDatePickerVisibility(false)
                                moveFocus()
                            }}
                            onCancel={() => {
                                moveFocus()
                                setDatePickerVisibility(false)}}/>
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

export default UserInfoScreen
