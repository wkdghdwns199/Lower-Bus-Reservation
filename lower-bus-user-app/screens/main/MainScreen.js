import {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, Pressable, Keyboard, Platform} from 'react-native';
import jsonData from '../../assets/busLineCode.json';
import Header from "../../component/Header";
import {storeData, getData} from "../../component/asyncStorage";

const MainScreen = ({setCurrentScreen, setReservationBusLine, intoScreen, setIntoScreen, busStationList}) => {
    const [busLineData, setBusLineData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchBusLine, setSearchBusLine] = useState([]);
    const [searchLocation, setSearchLocation] = useState(220);
    const handleSearch = (text) => {


        setSearchText(text)
        var tempList = [];
        busLineData.map(busLine => {
            if (busLine.route.includes(text)) {
                tempList.push(busLine)
            }
        })
        setSearchBusLine(tempList)
    }

    useEffect(() => {

        setBusLineData(jsonData)
        setSearchBusLine(jsonData)

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (event) => {
                Platform.OS === 'ios' ? setSearchLocation(300) : setSearchLocation(220);
            },
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setSearchLocation(220);
            },
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };

    }, []);
    return (
        <View style={styles.container}>
            {/*<Text>{JSON.stringify(busStationList)}</Text>*/}
            <View style={styles.busLineList}>
                <Header title={"버스 노선 "}/>
                <FlatList
                    data={searchBusLine}
                    keyExtractor={(item) => item.route_id.toString()}
                    renderItem={({item}) => (
                        <Pressable style={styles.itemContainer} onPress={async () => {
                            await setReservationBusLine(item)
                            intoScreen ? setIntoScreen(false) : setIntoScreen(true)
                        }}>
                            <Text style={styles.item}>{item.route}</Text>
                        </Pressable>
                    )}
                />

            </View>

            <View style={[styles.searchTextContainer, {bottom: searchLocation}]}>
                <TextInput
                    style={styles.searchText}
                    placeholder="버스 노선을 검색해보세요!"
                    onChangeText={text => handleSearch(text)}
                    value={searchText}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        padding: 16,
    },
    itemContainer: {
        marginBottom: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 60,
    },
    item: {
        marginLeft: 10,
        fontSize: 25,
    },
    busLineList: {
        height: '80%',
        width: '100%',
    },
    searchTextContainer: {
        justifyContent: 'center',
        height: 50,
        width: '90%',
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: 'white',
        position: 'absolute',
    },
    searchText: {
        marginLeft: 20,
        width: '100%',

    }

});

export default MainScreen
