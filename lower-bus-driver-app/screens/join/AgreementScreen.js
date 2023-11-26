import {View, Text, StyleSheet, Pressable} from "react-native";
import {useState} from "react";
import CheckBox from "expo-checkbox";
import React from "react";

const AgreementScreen = ({navigation}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.checkboxGroupArea}>
                <View style={{width:'80%'}}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox disabled={false} value={toggleCheckBox}
                                  onValueChange={(newValue) => {
                                      setToggleCheckBox(newValue)
                                  }}
                                  style={{marginRight: 10,}}/>
                        <Text>개인정보활용 동의</Text>
                    </View>
                    <Pressable style={styles.seeMoreButton}>
                        <Text style={{fontSize:10,}}>+ 더보기</Text>
                    </Pressable>
                </View>
            </View>

            <Pressable onPress = {() => {toggleCheckBox ? navigation.navigate('UserInfoScreen') : null}}
                       style={[styles.buttonStyle, {backgroundColor: toggleCheckBox ? '#C9EEBC' : '#D9D9D9'}]}>
                <Text style={{fontSize:20,}}>다음</Text>
            </Pressable>
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
    checkboxGroupArea:{
        borderRadius:10,
        borderWidth:1,
        borderColor:'#C9EEBC',
        width:'80%',
        height:300,
        alignItems:'center',
        justifyContent:'center',
    },
    checkboxContainer:{
        flexDirection:'row',
        height:50,
    },
    seeMoreButton: {
        position:'absolute',
        bottom:0,
        right:0,
    },
    buttonStyle: {
        width:'60%',
        height:50,
        backgroundColor:'#C9EEBC',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginBottom:20,
        position:'absolute',
        bottom:20,
    },

})

export default AgreementScreen
