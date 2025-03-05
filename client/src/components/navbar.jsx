import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

export default function Nav(props) {
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/profile/user/${props.id}`)
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
                <li><NavLink to={`/home/user/${props.id}`}>Home</NavLink></li>
                <li><NavLink to={`/historic_matches/user/${props.id}`}>Historic Matches</NavLink></li>
                <li><NavLink to={`/puzzles/user/${props.id}`}>Puzzles</NavLink></li>
                <li><NavLink to={`/profile/user/${props.id}/friends`}>Friends</NavLink></li>
                <li><NavLink to={`/profile/user/${props.id}/history`}>Match History</NavLink></li>
                <li><NavLink to={`/profile/user/${props.id}/`}>Profile</NavLink></li>
                {isAdmin ? <li><NavLink to={`/admin/user/${props.id}/`}>Admin</NavLink></li> : ''}
            </ul>
        </nav>
    )
}