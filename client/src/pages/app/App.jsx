import Login from '../login/login.jsx';
import Home from '../home/home.jsx';
import CreateAccount from '../create_account/create_account.jsx'
import Chess from '../game/chess.jsx';
import Watch from '../rewatch/Watch.jsx'
import Friends from '../friends/friends.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index path='login' element={<Login />} />
                    <Route path='create_account' element={<CreateAccount />} />
                    <Route path='match/play' element={<Chess />} />
                    <Route path='match/watch/:id' element={<Watch />} />
                    <Route path='home/user/:id' element={<Home />} />
                    <Route path='profile/user/:id/friends' element={<Friends />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}