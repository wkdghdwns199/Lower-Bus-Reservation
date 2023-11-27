import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getData } from "../lib/asyncStorage";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(async () => {
            const autoLogin = await getData('autoLogin');
            if (JSON.parse(autoLogin) !== true) {
                navigation.navigate('LoginScreen');
            } else {
                const autoId = await getData('autoId');
                navigation.navigate('LoggedScreen', { id: JSON.parse(autoId) });
            }
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Text>HI</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F7F2',
    },
});

export default SplashScreen;
