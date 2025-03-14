import Index from '../index/index.jsx';
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";
import Login from '../login/login.jsx';
import Home from '../home/home.jsx';
import CreateAccount from '../create_account/create_account.jsx'
import Chess from '../game/chess.jsx';
import Watch from '../rewatch/Watch.jsx'
import Friends from '../friends/friends.jsx'
import History from '../history/history.jsx'
import Profile from '../profile/profile.jsx'
import Building from '../building/building.jsx';
import Admin from '../admin/admin.jsx'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route exact path="/" element={<Index />}> */}
                {/* <Route exact path="/"> */}
                    {/* <redirect to={'/login'} />
                </Route> */}
                    <Route index path='/login' element={<Login />} />
                    <Route path='/create_account' element={<CreateAccount />} />
                    <Route path='/user/play' element={<Chess />} />
                    {/* <Route path='match/play' element={<Chess />} /> */}
                    <Route path='/user/watch/:hash' element={<Watch />} />
                    {/* <Route path='match/watch/:hash' element={<Watch />} /> */}
                    {/* <Route path='home/user/:id' element={<Home />} /> */}
                    <Route path='/home' element={<Home />} />
                    <Route path='/historic_matches' element={<Building />} />
                    <Route path='/puzzles' element={<Building />} />
                    <Route path='/auth/user/friends' element={<Friends />} />
                    <Route path='/auth/user/history' element={<History />} />
                    <Route path='/auth/user/' element={<Profile />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='*' element={<Navigate to='/login' replace/>}/>
                {/* </Route> */}
            </Routes>
        </BrowserRouter>
    )
}