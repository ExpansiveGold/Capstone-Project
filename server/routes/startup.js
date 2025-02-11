import express from 'express';
import create_account from './create_account.js'
import match from './match.js'
import friends from './friend_list.js'
import users from './user_list.js'

function startup(app){
    app.use(express.json());

    app.use('/create_account', create_account);
    
    app.use('/match', match)

    app.use('/user', friends) // /user/:id/friends

    app.use('/admin/users', users);

};

export default startup