'use strict';

import {SayHello, Test} from './welcome';

function SayHelloAbout(){
    return SayHello('About');
}

export {SayHelloAbout, Test};