import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
        const jsonData = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonData);
        //console.log(value)
    } catch (error) {
        // console.log(error);
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        //console.log(value);

        return value;

    } catch (error) {
        //console.log('error')
        return null
    }
};

export const removeData = async(key) => {
    try{
        await AsyncStorage.removeItem(key);
    }
    catch{
        return null
    }
}
