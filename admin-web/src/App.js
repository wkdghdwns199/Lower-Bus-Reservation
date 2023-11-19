import './App.css';
import { useState } from "react";
import LoginPage from "./component/LoginPage";
import LoggedPage from "./component/LoggedPage";
import {supabase} from "./component/supabase/SupabaseClient";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const handleLogin = () => {
        loggedIn ? handleLogout() : handleStoreSession();
    }

    const handleLogout = async () => {
        try{
            const {error} = await supabase
                .from('admin_user')
                .update({login_status : false})
                .eq('admin_id', sessionStorage.getItem('adminId'))
            console.log(sessionStorage.getItem('adminId'))
        }
        catch (error){
            alert('로그아웃 기록이 갱신되지 않았습니다!');
            console.error('로그인 오류:', error.message);
        }


        setLoggedIn(false);
        sessionStorage.clear();
    }

    const handleStoreSession = async () => {
        setLoggedIn(true);
        sessionStorage.setItem('loginStatus', 'true');
        sessionStorage.setItem('currentPage', 'main')
    }

    return (
        <div>
            {(loggedIn || sessionStorage.getItem('loginStatus') === 'true') ? (
                <LoggedPage onLogin={handleLogin}/>
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
