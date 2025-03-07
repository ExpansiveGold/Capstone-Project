import Nav from "../../components/navbar/navbar.jsx"
import { useParams } from "react-router-dom";
import './building.css'

export default function Building(){
    const { id } = useParams()
    
    return(
        <div className="building">
            <Nav id={id} />
            <div className="center">
                <div className="form-building">
                    <h1>Under construction</h1>
                    <p>Keep an eye for new updates</p>
                </div>
            </div>
        </div>
    )
}