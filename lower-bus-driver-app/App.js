import React from "react";
import SplashScreen from "./screens/SplashScreen";
import NavigationScreen from "./screens/NavigationScreen"
import 'react-native-url-polyfill/auto';
import {View, StyleSheet} from "react-native";

const App = () => {
    return (
        <View style={styles.container}>
            <NavigationScreen/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default App
