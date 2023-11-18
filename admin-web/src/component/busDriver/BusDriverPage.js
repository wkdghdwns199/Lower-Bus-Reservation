import React, {useEffect, useState} from 'react';
import {CenteredContainer} from "../style/CenteredContainer";
import {TableHead} from "../style/TableHead";
import {supabase} from "../supabase/SupabaseClient";
import DriverRegisterModal from "./DriverRegisterModal";

function BusDriverPage({onLogin, setCurrentPage}) {
    const [driverList, setDriverList] = useState([]);
    const [driverRegisterList, setDriverRegisterList] = useState([]);
    const [driverRejectList, setDriverRejectList] = useState([]);
    const [driverRegisterModalStatus, setDriverRegisterModalStatus] = useState(false);

    const [driverName, setDriverName] = useState('');
    const [driverBirthDate, setDriverBirthDate] = useState('');
    const [driverId, setDriverId] = useState('');
    const [driverCompany, setDriverCompany] = useState('');
    const [driverLicenseCode, setDriverLicenseCode] = useState('');

    const getSupabaseDriverList = async () => {
        try {
            const {data, error} = await supabase
                .from('bus_driver_info')
                .select('*')
                .eq('bus_driver_auth_status', 'false')

            if (error) {
                throw error;
            }
            var tempList = []
            data.map(driverInfo => tempList.push(driverInfo))
            return tempList;
        } catch (error) {
            console.error('데이터 오류:', error.message);
            return [];
        }
    }

    const getSupabaseDriverRegisterList = async () => {
        try {
            const {data, error} = await supabase
                .from('bus_driver_info')
                .select('*')
                .eq('bus_driver_auth_status', 'true')

            if (error) {
                throw error;
            }
            var tempList = []
            data.map(driverInfo => tempList.push(driverInfo))
            return tempList;
        } catch (error) {
            console.error('데이터 오류:', error.message);
            return [];
        }
    }

    const getSupabaseDriverRejectList = async () => {
        try {
            const {data, error} = await supabase
                .from('bus_driver_info')
                .select('*')
                .eq('bus_driver_auth_status', 'reject')

            if (error) {
                throw error;
            }
            var tempList = []
            data.map(driverInfo => tempList.push(driverInfo))
            return tempList;
        } catch (error) {
            console.error('데이터 오류:', error.message);
            return [];
        }
    }

    useEffect(() => {
        getSupabaseDriverList()
            .then(res => setDriverList(res));
        getSupabaseDriverRegisterList()
            .then(res => setDriverRegisterList(res));
        getSupabaseDriverRejectList()
            .then(res => setDriverRejectList(res));
        console.log(driverList);
    }, []);

    const updateDriverList = () => {
        getSupabaseDriverList()
            .then(res => setDriverList(res));
        getSupabaseDriverRegisterList()
            .then(res => setDriverRegisterList(res));
        getSupabaseDriverRejectList()
            .then(res => setDriverRejectList(res));
    }
    return (
        <div>
            <div style={headerTitleStyle}>
                <h2>버스 기사님 관리</h2>
                <button style={busDriverPageButton} onClick={() => {
                    setCurrentPage('main')
                    sessionStorage.setItem('currentPage', 'main')
                }}>저상 버스 등록 현황
                </button>
                <button style={logoutButton} onClick={() => onLogin()}>로그아웃</button>
            </div>

            <CenteredContainer>
                <h2>승인 대기 버스 기사님</h2>
                {driverRegisterModalStatus === true &&
                    <DriverRegisterModal setDriverRegisterModalStatus={setDriverRegisterModalStatus}
                                         updateDriverList={updateDriverList}
                                         driverId={driverId}
                                         driverName={driverName}
                                         driverCompany={driverCompany}
                                         driverLicenseCode={driverLicenseCode}
                                         driverBirthDate={driverBirthDate}/>}
                <div style={driverListContainer}>
                    <table style={driverListTable}>
                        <thead>
                        <tr>
                            <TableHead>이름</TableHead>
                            <TableHead>아이디</TableHead>
                            <TableHead>운수 회사</TableHead>
                            <TableHead>등록 일자</TableHead>
                            <TableHead>승인</TableHead>
                        </tr>
                        </thead>
                        <tbody>
                        {driverList.map((driverInfo) => (
                            <tr key={driverInfo.id} style={driverListTableTuple}>
                                <td>{driverInfo.bus_driver_name}</td>
                                <td>{driverInfo.bus_driver_id}</td>
                                <td>{driverInfo.bus_driver_company}</td>
                                <td>{driverInfo.bus_driver_register_date}</td>
                                <td>
                                    <button onClick={() => {
                                        setDriverId(driverInfo.bus_driver_id)
                                        setDriverName(driverInfo.bus_driver_name)
                                        setDriverCompany(driverInfo.bus_driver_company)
                                        setDriverBirthDate(driverInfo.bus_driver_birth_date)
                                        setDriverLicenseCode(driverInfo.bus_driver_license_code)
                                        setDriverRegisterModalStatus(true)
                                    }}>확인
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={buttonContainer}>
                    <button style={driverDeleteButton}>삭제</button>
                </div>
            </CenteredContainer>
            <br/>
            <div style={{border: 1, height: 1, width: '100%', backgroundColor: '#E6E6E6'}}></div>

            <CenteredContainer>
                <h2>승인 버스 기사님</h2>
                {driverRegisterModalStatus === true &&
                    <DriverRegisterModal setDriverRegisterModalStatus={setDriverRegisterModalStatus}
                                         updateDriverList={updateDriverList}/>}
                <div style={driverListContainer}>
                    <table style={driverListTable}>
                        <thead>
                        <tr>
                            <TableHead>이름</TableHead>
                            <TableHead>아이디</TableHead>
                            <TableHead>운수 회사</TableHead>
                            <TableHead>등록 일자</TableHead>
                            <TableHead>승인 현황</TableHead>
                        </tr>
                        </thead>
                        <tbody>
                        {driverRegisterList.map((driverInfo) => (
                            <tr key={driverInfo.id} style={driverListTableTuple}>
                                <td>{driverInfo.bus_driver_name}</td>
                                <td>{driverInfo.bus_driver_id}</td>
                                <td>{driverInfo.bus_driver_company}</td>
                                <td>{driverInfo.bus_driver_register_date}</td>
                                <td>승인</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={buttonContainer}>
                    <button style={driverDeleteButton}>삭제</button>
                </div>
            </CenteredContainer>
            <br/>
            <div style={{border: 1, height: 1, width: '100%', backgroundColor: '#E6E6E6'}}></div>

            <CenteredContainer>
                <h2>거절 버스 기사님</h2>
                {driverRegisterModalStatus === true &&
                    <DriverRegisterModal setDriverRegisterModalStatus={setDriverRegisterModalStatus}
                                         updateDriverList={updateDriverList}/>}
                <div style={driverListContainer}>
                    <table style={driverListTable}>
                        <thead>
                        <tr>
                            <TableHead>이름</TableHead>
                            <TableHead>아이디</TableHead>
                            <TableHead>운수 회사</TableHead>
                            <TableHead>등록 일자</TableHead>
                            <TableHead>승인 현황</TableHead>
                        </tr>
                        </thead>
                        <tbody>
                        {driverRejectList.map((driverInfo) => (
                            <tr key={driverInfo.id} style={driverListTableTuple}>
                                <td>{driverInfo.bus_driver_name}</td>
                                <td>{driverInfo.bus_driver_id}</td>
                                <td>{driverInfo.bus_driver_company}</td>
                                <td>{driverInfo.bus_driver_register_date}</td>
                                <td>거절</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={buttonContainer}>
                    <button style={driverDeleteButton}>삭제</button>
                </div>
            </CenteredContainer>

            <br/>

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
const driverListContainer = {
    display: 'flex',
    justifyContent: 'center',
    height: '80%',
    width: '90%',
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    overflow: 'scroll'
}

const driverListTable = {
    width: '90%',
    textAlign: 'center',
}

const driverListTableTuple = {
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

const driverDeleteButton = {
    borderRadius: 10,
    border: 0,
    height: 30,
    backgroundColor: '#FE8F8F',
    marginRight: 10,
}

export default BusDriverPage;
