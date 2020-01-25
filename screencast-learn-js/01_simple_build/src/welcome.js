'use strict';

export default function(message){
    if(process.env.NODE_ENV == 'development'){
        console.log(message);
    }

    let s = `${1} + ${2}`;

    console.log(1);

    alert(`Welcome ${message}`);
}

/* without babel
module.exports = function(message){
    if(process.env.NODE_ENV == 'development'){
        console.log(message);
    }

    let s = `${1} + ${2}`;

    alert(`Welcome ${message}`);
}*/