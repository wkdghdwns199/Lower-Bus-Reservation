import {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {getData} from "../lib/asyncStorage";

const SplashScreen = ({ navigation }) => {

    useEffect(() => {

        setTimeout(
            () => {getData('autoLogin')
                .then(res => JSON.parse(res) !== 'true' ? navigation.navigate('LoginScreen') : (
                    getData('autoId')
                        .then(res2 => navigation.navigate('LoggedScreen', {id:JSON.parse(res2)}))
                ))}
        ,3000)

    }, []);
    return (
        <View style={styles.container}>
            <Text>HI</Text>
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
})

export default SplashScreen
