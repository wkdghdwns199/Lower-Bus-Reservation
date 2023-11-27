
import {View, StyleSheet, Image} from "react-native";


const SplashScreen = () => {


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
