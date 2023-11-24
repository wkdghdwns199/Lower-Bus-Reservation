import {View, Text, StyleSheet, FlatList, Pressable} from "react-native";
import {getData} from "../../component/asyncStorage"
import {useEffect, useState} from "react";
import {supabase} from "../../component/Supabase";
import Header from "../../component/Header";

const BusReservationListScreen = () => {

    const [reservationList, setReservationList] = useState([])

    const getReservations = async (res) => {
        const uuidList = res.substring(1, res.length - 1).split(',');
        var tempList = []
        for (const uuid of uuidList){

            try {
                const {data, error} = await supabase
                    .from('bus_reservation')
                    .select('*')
                    .eq('bus_reservation_uuid', uuid)

                tempList.push(data[0])
            } catch (error) {
                tempList.push([])
                console.log(error)
            }
            // console.log(tempList)
        }
        setReservationList(tempList.reverse())

    }
    useEffect(() => {
        getData('reservationListString')
            .then(res => getReservations(res))
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.busLineList}>
                <Header title={"예약 내역 "}/>
                {reservationList.length === 0 ? <Text>예약 내역이 없습니다!</Text> :
                    (
                        <FlatList
                            data={reservationList}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <View style={styles.itemContainer}>
                                    <View style={{flexDirection:'row', alignItems:'center',}}>
                                        <Text style={[styles.item, {marginRight:5}]}>{item.reservation_bus_line} 번</Text>
                                        <Text style={{fontSize:15}}>({item.reservation_bus_code})</Text>
                                    </View>

                                    <Text style={styles.item}>{item.reservation_starting_point} 출발</Text>
                                    <Text
                                        style={{marginLeft:10, fontSize:15, position:'absolute',bottom:10,right:10}}>{item.reservation_date_time.toString().split('.')[0].replace('T', ' ')}
                                    </Text>
                                    <Text style={[styles.item, {fontSize: 13,marginTop:10,}]}>리프트 {item.lift_using_status ? 'O' : 'X'}</Text>
                                </View>
                            )}
                        />
                    )}

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
        height: 160,
    },
    item: {
        marginLeft: 10,
        fontSize: 20,
    },
    busLineList: {
        height: '80%',
        width: '100%',
    },
})
export default BusReservationListScreen

