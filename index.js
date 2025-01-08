console.log('hello world');

//globals:   global, process, 
global.luckyNum = '23';
console.log(global.luckyNum);

console.log(process.platform);
console.log(process.env.USER); //to get environment variable from server

//events (listen): exit,  when events occurr, callsback a function
//callbacks (function): funciont(), 

process.on(
    'exit',
    function() {'exit via a callback function'}
);

const {EventEmitter} = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on(
    'lunch',
    () => {
        console.log('eat food');
        }
);
eventEmitter.emit('lunch');
eventEmitter.emit('lunch');

// //FileSystem:  to read files, asign content to a var and display content. this code is blocking
// const {readFile, readFileSync} = require('fs');
// const txt = readFileSync('./hello.txt', 'utf8');
// console.log(txt);
// console.log('text read from file blocking');

// //same concept but non blocking.
// readFile('./hello.txt', 'utf8', () => {console.log(txt)});
// console.log('text read from file nonblocking');
// console.log('-----------------');
//promises, asinchronous and non blocking
const {readFile} = require('fs').promises;
async function hello() {
    const file = await readFile('./hello.txt', 'utf8');
    console.log('text read from file promise asynchronous non blocking');
}
console.log(hello());