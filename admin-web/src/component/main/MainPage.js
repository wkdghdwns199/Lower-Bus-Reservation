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
            const {data, error} = await supabase
                .from('bus_information')
                .select('*')

            if (error) {
                throw error;
            }
            var tempList = []
            data.map(busInfo => tempList.push(busInfo))
            return tempList;
        } catch (error) {
            console.error('데이터 오류:', error.message);
            return [];
        }
    }

    useEffect(() => {
        getSupabaseBusList()
            .then(res => setBusList(res));
        console.log(busList);
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
                                <td>아직 구현 안 함</td>
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
