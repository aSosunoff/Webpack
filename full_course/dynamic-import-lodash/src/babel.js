async function start(){
    return await Promise.resolve('async is working');
}

start().then(console.log);

let testEsLint = 1;

class Util{
    static id = Date.now()
}

console.log("Util.id", Util.id);

import('lodash').then(_ => {
    console.log(_.random(0, 42, true));
});