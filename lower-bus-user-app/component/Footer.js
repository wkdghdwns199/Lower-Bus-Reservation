import {useState} from "react";
import {StyleSheet, View, Text, Image, Pressable} from "react-native";

const Footer = ({setCurrentScreen}) => {
    const [busReservationButtonColor, setBusReservationButtonColor] = useState('gray')
    const [mainButtonColor, setMainButtonColor] = useState('white')
    return (
        <View style={styles.footer}>
            <Pressable style={[styles.footerButton, {backgroundColor: busReservationButtonColor}]}
                       onPress={() => {
                           setCurrentScreen('busReservation')
                           setBusReservationButtonColor('white')
                           setMainButtonColor('gray')
                       }}>
                <Image source={require('../assets/images/historyIcon.png')}
                       style={{height: 110, width: 110}}/>
                <Text>예약 내역</Text>
            </Pressable>
            <Pressable style={[styles.footerButton, {backgroundColor: mainButtonColor}]}
                       onPress={() => {
                           setCurrentScreen('main')
                           setBusReservationButtonColor('gray')
                           setMainButtonColor('white')
                       }}>
                <Image source={require('../assets/images/homeIcon.png')}
                       style={{height: 100, width: 100}}/>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        height: 150,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '50%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderColor: 'black',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    imageIcon: {
        height: 80,
        width: 80,
    }
})

export default Footer;
