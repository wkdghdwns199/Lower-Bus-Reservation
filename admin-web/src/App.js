import './App.css';
import { useState } from "react";
import LoginPage from "./component/LoginPage";
import LoggedPage from "./component/LoggedPage";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const handleLogin = () => {
        loggedIn ? handleLogout() : handleStoreSession();
    }

    const handleLogout = () => {
        setLoggedIn(false);
        sessionStorage.clear();
    }

    const handleStoreSession = () => {
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
