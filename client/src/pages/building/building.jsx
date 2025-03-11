import { useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../components/AuthContext.js"
import Nav from "../../components/navbar/navbar.jsx"
import './building.css'

export default function Building(){
    const { token, loading } = useContext(AuthContext)

    useEffect(() => {
        if (loading === true) {
            // return null;
            return;
        } else if (token === null) {
            return <Navigate to="/login" replace />;
            // navigate('/login')
        }
    }, [])
    
    return(
        <div className="building">
            <Nav />
            <div className="center">
                <div className="form-building">
                    <h1>Under construction</h1>
                    <p>Keep an eye for new updates</p>
                </div>
            </div>
        </div>
    )
}