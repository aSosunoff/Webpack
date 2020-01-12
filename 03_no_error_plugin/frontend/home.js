'use strict';

import {SayHello, Test} from './welcome';

function SayHelloHome(){
    return SayHello('Home');
}

export {SayHelloHome, Test};