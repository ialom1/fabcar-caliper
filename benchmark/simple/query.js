'use strict';

module.exports.info  = 'querying accounts';


let bc, contx;
let account_array;
module.exports.init = function(blockchain, context, args) {
    const open = require('./open.js');
    bc       = blockchain;
    contx    = context;
    account_array = open.account_array;
    return Promise.resolve();
};

module.exports.run = function() {
    const carID  = account_array[Math.floor(Math.random()*(account_array.length))];
    const fcc = [
      {chaincodeId: 'fabcar', fcn: 'queryCar', args: [carID]},
      {chaincodeId: 'fabcar', fcn: 'queryAllCars', args: []}
    ];
    const acc  = fcc[Math.floor(Math.random()*(fcc.length))];
    console.log('*** from query', acc)
    return bc.queryState(contx, 'fabcar', 'v1', acc.args, acc.fcn);
};

module.exports.end = function() {
    // do nothing
    return Promise.resolve();
};
