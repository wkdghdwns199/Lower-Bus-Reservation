import React, {useState} from "react";
import {InputContainer} from "../style/InputContainer";
import {supabase} from "../supabase/SupabaseClient";

function DriverRegisterModal({
                                 setDriverRegisterModalStatus,
                                 updateDriverList,
                                 driverId,
                                 driverName,
                                 driverCompany,
                                 driverLicenseCode,
                                 driverBirthDate,
                             }) {

    const [rejectReason, setRejectReason] = useState('');

    const registerDriver = async () => {
        try {
            const {error} = await supabase
                .from('bus_driver_info')
                .update({bus_driver_auth_status: 'true'})
                .eq('bus_driver_id', driverId)

            if (error) {
                throw error;
            }
        } catch (error) {
            alert('승인에 실패했습니다!');
            console.error('데이터 입력오류:', error.message);
        }
        alert('기사님이 승인되었습니다!');
        setDriverRegisterModalStatus(false);
        updateDriverList();
    }

    const rejectDriver = async () => {
        try {
            const {error} = await supabase
                .from('bus_driver_info')
                .update({bus_driver_auth_status: 'reject'})
                .eq('bus_driver_id', driverId)

            if (error) {
                throw error;
            }
        } catch (error) {
            alert('승인에 실패했습니다!');
            console.error('데이터 입력오류:', error.message);
        }
        alert('기사님 인증이 거절되었습니다!');
        setDriverRegisterModalStatus(false);
        updateDriverList();
    }


    return (
        <div style={busRegisterModal}>
            <h2>버스 등록</h2>
            <div style={driverInfoArea}>
                <div>이름 (성함) : <b>{driverName}</b></div>
                <div>생년월일 : <b>{driverBirthDate}</b></div>
                <div>등록 아이디 : <b>{driverId}</b></div>
                <div>소속 회사 : <b>{driverCompany}</b></div>
                <div>면허 번호 : <b>{driverLicenseCode}</b></div>
            </div>

            <div style={buttonContainer}>
                <button style={cancelButton} onClick={() => setDriverRegisterModalStatus(false)}>취소</button>
                <button style={registerButton} onClick={registerDriver}>등록</button>
                <button style={rejectButton} onClick={rejectDriver}>거절</button>
            </div>
        </div>
    )
}

const busRegisterModal = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    border: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    width: 500,
    height: 500,
    position: 'absolute',
}

const inputBoxStyle = {
    border: 0,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    height: 30,
};

const driverInfoArea = {
    border: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
};

const buttonContainer = {
    marginTop: 10,
    display: 'flex',
}

const cancelButton = {
    marginRight: 10,
    borderRadius: 10,
    border: 0,
    height: 30,
    backgroundColor: '#FE8F8F'
}

const registerButton = {
    marginRight: 10,
    borderRadius: 10,
    border: 0,
    height: 30,
    backgroundColor: '#C9EEBC'
}

const rejectButton = {
    borderRadius: 10,
    border: 0,
    height: 30,
    backgroundColor: '#E6E6E6'
}
export default DriverRegisterModal;
