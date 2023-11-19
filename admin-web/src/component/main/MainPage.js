import React, {useEffect, useState} from "react";
import {supabase} from "../supabase/SupabaseClient";
import {CenteredContainer} from "../style/CenteredContainer";
import {TableHead} from "../style/TableHead";
import BusDriverPage from "../busDriver/BusDriverPage";
import BusRegisterModal from "./BusRegisterModal";

function MainPage({onLogin, setCurrentPage}) {
    const [busList, setBusList] = useState([]);
    const [busRegisterModalStatus, setBusRegisterModalStatus] = useState(false);

    const getSupabaseBusList = async () => {
        try {
            const { data, error } = await supabase
                .from('bus_information')
                .select('*');

            if (error) {
                alert('버스 리스트를 가져올 수 없습니다!');
                throw error;
            }

            // 비동기 함수를 순차적으로 실행하기 위해 for...of 루프 사용
            const tempList = [];
            for (const busInfo of data) {
                try {
                    const { data: reservationData, error: reservationError } = await supabase
                        .from('bus_reservation')
                        .select('*')
                        .eq('reservation_bus_code', busInfo.bus_code);

                    if (reservationError) {
                        return;
                    }

                    console.log(reservationData.length);
                    const tempJson = { ...busInfo, count: reservationData.length };
                    tempList.push(tempJson);
                } catch (error) {
                    console.error('데이터 오류:', error.message);
                    return;
                }
            }

            return tempList;
        } catch (error) {
            alert('버스 리스트를 가져올 수 없습니다!');
            console.error('데이터 오류:', error.message);
            return [];
        }
    }

    useEffect(() => {
        getSupabaseBusList()
            .then(res => {
                setBusList(res)
                console.log(res)
            })
    }, []);


    const updateBusList = () => {
        getSupabaseBusList()
            .then(res => setBusList(res));
    }

    return (
        <div>
            <div style={headerTitleStyle}>
                <h2>저상 버스 등록 현황</h2>
                <button style={busDriverPageButton} onClick={() => {
                    setCurrentPage('busDriver')
                    sessionStorage.setItem('currentPage', 'busDriver')
                    console.log(sessionStorage.getItem('currentPage'))
                }}>버스 기사님 관리
                </button>
                <button style={logoutButton} onClick={() => onLogin()}>로그아웃</button>
            </div>
            <CenteredContainer>
                {busRegisterModalStatus === true &&
                    <BusRegisterModal setBusRegisterModalStatus={setBusRegisterModalStatus}
                                      updateBusList={updateBusList}/>}
                <div style={busListContainer}>
                    <table style={busListTable}>
                        <thead>
                        <tr>
                            <TableHead>순번</TableHead>
                            <TableHead>차량 코드</TableHead>
                            <TableHead>차량 노선 번호</TableHead>
                            <TableHead>예약 횟수</TableHead>
                        </tr>
                        </thead>
                        <tbody>
                        {busList.map((busInfo) => (
                            <tr key={busInfo.id} style={busListTableTuple}>
                                <td>{busInfo.id}</td>
                                <td>{busInfo.bus_code}</td>
                                <td>{busInfo.bus_line}</td>
                                <td>{busInfo.count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={buttonContainer}>
                    <button style={busDeleteButton}>삭제</button>
                    <button style={busRegisterButton} onClick={() => setBusRegisterModalStatus(true)}>등록</button>
                </div>
            </CenteredContainer>
        </div>
    )
}

const headerTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#C9EEBC',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,

}

const logoutButton = {
    position: 'absolute',
    right: 40,
    border: 0,
    backgroundColor: '#C9EEBC',
}

const busDriverPageButton = {
    position: 'absolute',
    right: 130,
    border: 0,
    backgroundColor: '#C9EEBC',
}

const busListContainer = {
    display: 'flex',
    justifyContent: 'center',
    height: '90%',
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    overflow: 'scroll'
}

const busListTable = {
    width: '90%',
    textAlign: 'center',
}

const busListTableTuple = {
    backgroundColor: '#EFEFEF',
    fontSize: 20,
    height: 10,
}
const buttonContainer = {
    display: 'flex',
    position: 'relative',
    top: 20,
    left: '43%',
}
const busRegisterButton = {
    borderRadius: 10,
    border: 0,
    height: 30,
    backgroundColor: '#C9EEBC'
}
const busDeleteButton = {
    borderRadius: 10,
    border: 0,
    height: 30,
    backgroundColor: '#FE8F8F',
    marginRight: 10,
}
export default MainPage;
