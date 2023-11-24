import {View, Text, StyleSheet} from "react-native";

const LoadingModal = () => {
    return (
        <View style={styles.loading}>
            <Text style={{fontSize:40, fontWeight:'bold',color:'white'}}>잠시만 기다려주세요..!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loading : {
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(0,0,0,0.5)',
        zIndex:10,
        position:'absolute',
    }
})
export default LoadingModal;
