import {useState, useEffect} from "react";
import MainPage from "./main/MainPage";
import BusDriverPage from "./busDriver/BusDriverPage";


function LoggedPage({onLogin}) {
    const [currentPage, setCurrentPage] = useState('main')
    useEffect( () => {
        setCurrentPage(sessionStorage.getItem('currentPage'));
    },[])
    return (
        <div>
            {currentPage === 'main' && <MainPage onLogin={onLogin} setCurrentPage = {setCurrentPage}/>}
            {currentPage === 'busDriver' && <BusDriverPage onLogin={onLogin} setCurrentPage = {setCurrentPage}/>}
        </div>
    )
}


export default LoggedPage
