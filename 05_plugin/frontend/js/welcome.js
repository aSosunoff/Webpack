'use strict';

import moment from 'moment';

export function SayHello(message){
    return `${message} ${moment().format('MMMM Do YYYY, h:mm:ss a')}`;
}

export function Test(message){
    if(process.env.NODE_ENV == 'development'){
        console.log(message);
    }

    let s = `${1} + ${2}`;

    console.log(1);
}