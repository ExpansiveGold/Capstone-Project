import Nav from "../../components/navbar"
import { useParams } from "react-router-dom";

export default function Building(){
    const { id } = useParams()
    
    return(
        <>
            <h1>Under construction</h1>
            <Nav id={id} />
        </>
    )
}