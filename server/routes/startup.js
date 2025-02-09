import express from 'express';
import create_account from './create_account.js'

function startup(app){
    app.use(express.json());

    app.use('/create_account', create_account);
};

export default startup