import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import './navbar.css'

export default function Nav() {
    const [isAdmin, setIsAdmin] = useState(false)
    const { token } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        axios.post(`/auth/user`, {
            token: token
        })
        .then((res) => {
            setIsAdmin(res.data.isAdmin)
            console.log(res)
        })
        .catch(() => {
            navigate('/login')
        })
    }, []) 

    return(
        <nav>
            <ul>
                <li><NavLink to={`/home`}>Home</NavLink></li>
                <li><NavLink to={`/historic_matches`}>Historic Matches</NavLink></li>
                <li><NavLink to={`/puzzles`}>Puzzles</NavLink></li>
                <li><NavLink to={`/auth/user/friends`}>Friends</NavLink></li>
                <li><NavLink to={`/auth/user/history`}>Match History</NavLink></li>
                <li><NavLink to={`/auth/user/`}>Profile</NavLink></li>
                {isAdmin ? <li><NavLink to={`/admin`}>Admin</NavLink></li> : ''}
            </ul>
        </nav>
    )
}