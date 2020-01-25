'use strict';

import {SayHello, Test} from './welcome';
import {Other} from './other';

function SayHelloHome(){
    return SayHello('Home');
}

export {SayHelloHome, Test, Other};