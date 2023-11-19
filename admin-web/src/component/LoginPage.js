import React, {useState} from "react";
import {supabase} from "./supabase/SupabaseClient";
import {CenteredContainer} from "./style/CenteredContainer";
import {InputContainer} from "./style/InputContainer";
import {SHA256} from "crypto-js";

function LoginPage({onLogin}) {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const createCurrentDateString = () =>  {
        const date = new Date();
        return  date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
    const handleLogin = async () => {
        try {
            const {data, error} = await supabase
                .from('admin_user')
                .select('*')
                .eq('admin_id', inputId)

            if (error) {
                alert('로그인 정보가 일치하지 않습니다!');
                throw error;
            }

            if (data && data[0].admin_pw === SHA256(inputPw).toString()) {

                try{
                    const {data, error} = await supabase
                        .from('admin_user')
                        .select('login_status')
                        .eq('admin_id', inputId)

                    if (error) {
                        alert('로그인 현황을 가져올 수 없습니다.');
                        sessionStorage.clear();
                        return ;
                    }

                    if (data[0].login_status === true){
                        alert('로그인을 한 디바이스가 있어서 로그인 할 수 없습니다.');
                        sessionStorage.clear();
                        return ;
                    }
                }
                catch (error){
                    alert('로그인 현황을 가져올 수 없습니다.');
                    sessionStorage.clear();
                    return ;

                }

                sessionStorage.setItem('adminId', inputId);
                alert('사용을 다 하시면 반드시 로그아웃을 하셔야 합니다! [보안 사유]');
                alert('로그인 성공! ' + createCurrentDateString());

                try{
                    const {error} = await supabase
                        .from('admin_user')
                        .update({login_date_time : createCurrentDateString(), login_status : true})
                        .eq('admin_id', inputId)
                }
                catch (error){
                    alert('최근 로그인 시간이 기록되지 않았습니다!')
                }
                onLogin();
            } else {
                // 로그인 실패
                alert('로그인 정보가 일치하지 않습니다!');
            }
        } catch (error) {
            alert('로그인 정보가 일치하지 않습니다!');
            console.error('로그인 오류:', error.message);
        }
    };

    return (
        <div>
            <CenteredContainer>
                <div style={backgroundShapeContainer}>
                    <div style={backgroundShape}></div>
                </div>
                <h1>저상 버스 관리자 페이지</h1>
                <div style={inputContainer}>
                    <label>
                        <InputContainer>
                        <input style={inputBoxStyle} type="text" placeholder="아이디" value={inputId}
                               onChange={(e) => setInputId(e.target.value)}/>
                        </InputContainer>
                    </label>
                    <br/>
                    <label>
                        <InputContainer>
                        <input style={inputBoxStyle} type="password" placeholder="비밀번호" value={inputPw}
                               onChange={(e) => setInputPw(e.target.value)}/>
                        </InputContainer>
                    </label>
                </div>
                <button style={loginButtonStyle} onClick={handleLogin}>로그인</button>
            </CenteredContainer>
        </div>
)
}

const backgroundShapeContainer = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height: '300%',
    width:'100%',
    zIndex : -1,
    position:'fixed',
    marginTop:40,
}

const backgroundShape = {
    height: '100%',
    width:50,
    backgroundColor:'#C9EEBC',
    rotate:'-67deg',
}

const inputContainer ={
    display:'flex',
    flexDirection:'column',
    height:200,
    alignItems:'center',
    justifyContent:'center',
}

const inputBoxStyle ={
    border : 0,
    backgroundColor : '#E6E6E6',
    borderRadius: 10,
    height : 30,
};

const loginButtonStyle = {
    height: 40,
    width: 90,
    border:0,
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
}

export default LoginPage;
