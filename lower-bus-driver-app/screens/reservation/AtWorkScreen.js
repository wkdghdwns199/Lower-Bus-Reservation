import {View, Text, StyleSheet, Pressable} from "react-native";

const AtWorkScreen = ({route, navigation}) => {
    const {id} = route.params;
    return (
        <View style={styles.container}>
            <Text>{id}</Text>
            <Pressable onPress={() => navigation.navigate('BusRegisterScreen', {id:id})} style={styles.buttonStyle}>
                <Text style={{fontSize:30}}>출근하기</Text>
            </Pressable>

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
    buttonStyle:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:50,
        borderRadius:20,
        borderWidth:2,
        backgroundColor:'#D9D9D9',
        width:'70%',
        height:200,
    }
})
export default AtWorkScreen;
