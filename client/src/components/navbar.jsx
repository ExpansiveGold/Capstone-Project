import { useNavigate } from "react-router-dom";

export default function Nav(props) {
    const navigate = useNavigate()

    const Home = () => {
        navigate(`/home/user/${props.id}`)
    }

    const HistoricMatches = () => {
        navigate(`/historic_matches/user/${props.id}`)
    }

    const Puzzles = () => {
        navigate(`/puzzles/user/${props.id}`)
    }

    const Friends = () => {
        navigate(`/profile/user/${props.id}/friends`)
    }

    const MatchHistory = () => {
        navigate(`/profile/user/${props.id}/history`)
    }

    const Profile = () => {
        navigate(`/profile/user/${props.id}/`)
    }

    return(
        <>
            <input type="button" value="Home" onClick={Home} />
            <input type="button" value="Historic Matches" onClick={HistoricMatches} />
            <input type="button" value="Puzzles" onClick={Puzzles} />
            <input type="button" value="Friends" onClick={Friends} />
            <input type="button" value="Match History" onClick={MatchHistory} />
            <input type="button" value="Profile" onClick={Profile} />
        </>
    )
}