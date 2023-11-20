import {StyleSheet, View, Text} from "react-native";

const Header = ({title}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height:50,
        header: 30,
        backgroundColor: 'gray',
        justifyContent:'center',
        marginTop:20,
        marginBottom:20,
    },
    title: {
        marginLeft:20,
        fontSize:25,
    }
})
export default Header
