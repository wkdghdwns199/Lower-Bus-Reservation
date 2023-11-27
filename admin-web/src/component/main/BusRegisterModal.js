import React, {useState} from "react";
import {InputContainer} from "../style/InputContainer";
import {supabase} from "../supabase/SupabaseClient";

function BusRegisterModal({setBusRegisterModalStatus, updateBusList}) {
    const [busCode, setBusCode] = useState('');
    const [busLineNumber, setBusLineNumber] = useState('')

    const registerBus = async () => {
        if (busCode === '' || busLineNumber === '') {
            alert('차량 코드나 노선 번호를 입력하셔야 합니다!');
            return ;
        }
        try {
            const {error} = await supabase
                .from('bus_information')
                .insert({bus_code: busCode, bus_line: busLineNumber})

            if (error) {
                throw error;
            }
        } catch (error) {
            alert('이미 등록된 차량 코드입니다!');
            console.error('데이터 입력오류:', error.message);
        }
        alert('버스가 등록되었습니다!');
        setBusRegisterModalStatus(false);
        updateBusList();
    }

    return (
        <div style={busRegisterModal}>
            <h2>버스 등록</h2>
            <InputContainer>
                <input style={inputBoxStyle} type="text" placeholder="차량코드" value={busCode}
                       onChange={(e) => setBusCode(e.target.value)}/>
            </InputContainer>
            <InputContainer>
                <input style={inputBoxStyle} type="text" placeholder="노선번호" value={busLineNumber}
                       onChange={(e) => setBusLineNumber(e.target.value)}/>
            </InputContainer>
            <div style={buttonContainer}>
                <button style={cancelButton} onClick={() => setBusRegisterModalStatus(false)}>취소</button>
                <button style={registerButton} onClick={registerBus}>등록</button>
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
    borderRadius: 10,
    border: 0,
    height: 30,
    backgroundColor: '#C9EEBC'
}
export default BusRegisterModal;
