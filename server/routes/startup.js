import express from 'express';
import create_account from './create_account.js'
import match from './match.js'
import HistoricMatches from './historic_matches.js'
import Puzzles from './puzzles.js'
import profile from './profile.js'
import friends from './friend_list.js'
import history from './history.js'
import users from './user_list.js'
import adminHistoricMatches from './admin_historic_matches.js'
import adminPuzzles from './admin_puzzles.js'

function startup(app){
    app.use(express.json());

    app.use('/create_account', create_account);
    
    app.use('/match', match)
    app.use('/historic_matches', HistoricMatches)
    app.use('/puzzles', Puzzles)

    app.use('/user', profile) // /user/:id
    app.use('/user', friends) // /user/:id/friends
    app.use('/user/history', history)

    app.use('/admin/users', users);
    app.use('/admin/historic_matches', adminHistoricMatches)
    app.use('/admin/puzzles', adminPuzzles)

};

export default startup