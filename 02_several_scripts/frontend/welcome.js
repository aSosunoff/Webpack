'use strict';

export function SayHello(message){
    return message;
}

export function Test(message){
    if(process.env.NODE_ENV == 'development'){
        console.log(message);
    }

    let s = `${1} + ${2}`;

    console.log(1);
}