import { useEffect } from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import { getData } from "../lib/asyncStorage";

const SplashScreen = ({ navigation }) => {

    const selectNavigate = async () => {
        const autoLogin = await getData('autoLogin');
        if (JSON.parse(autoLogin) !== 'true') {
            navigation.navigate('LoginScreen');
        } else {
            const autoId = await getData('autoId');
            navigation.navigate('LoggedScreen', { id: JSON.parse(autoId) });
        }
    }
    useEffect(() => {
        const timeoutId = setTimeout( () => {
            selectNavigate()
        }, 3000);
        return () => {
            clearTimeout(timeoutId)
        }
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../images/smallTitleBackground.png')}
             style={{height:45 , width:250, marginBottom:30, borderRadius:10,}}/>
            <Image source={require('../images/bigTitleBackground.png')}
                   style={{height:95, width:200, marginBottom:30, borderRadius:10,}}/>
            <Image source={require('../images/icon.png')}
                    style={{height:270, width:270}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C9EEBC',
    },
});

export default SplashScreen;
