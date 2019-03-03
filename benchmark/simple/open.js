'use strict';

module.exports.info  = 'opening accounts';

let account_array = [];
let txnPerBatch;
let initMoney;
let bc, contx;
module.exports.init = function(blockchain, context, args) {
    if(!args.hasOwnProperty('function')) {
        return Promise.reject(new Error('simple.open - \'function\' is missed in the arguments'));
    }

    if(!args.hasOwnProperty('txnPerBatch')) {
        args.txnPerBatch = 1;
    }
    //initMoney = args.money;
    txnPerBatch = args.txnPerBatch;
    bc = blockchain;
    contx = context;
    return Promise.resolve();
};

const dic = 'abcdefghijklmnopqrstuvwxyz';
/**
 * Generate string by picking characters from dic variable
 * @param {*} number character to select
 * @returns {String} string generated based on @param number
 */
function get26Num(number){
    let result = '';
    while(number > 0) {
        result += dic.charAt(number % 26);
        number = parseInt(number/26);
    }
    return result;
}

let prefix;
/**
 * Generate unique account key for the transaction
 * @returns {String} account key
 */
function generateAccount() {
    // should be [a-z]{1,9}
    if(typeof prefix === 'undefined') {
        prefix = get26Num(process.pid);
    }
    return prefix + get26Num(account_array.length+1);
}

/**
 * Generates simple workload
 * @returns {Object} array of json objects
 */
function generateWorkload() {
    let workload = [];
    for(let i= 0; i < txnPerBatch; i++) {
        let acc_id = generateAccount();
        account_array.push(acc_id);
        let fcc = [
          {
            fcn: 'createCar',
            arg1: acc_id,
            arg2: 'Toyota',
            arg3: 'Land Cruizer',
            arg4: 'White',
            arg5: 'Shakib'
          },
          {
            fcn: 'createCar',
            arg1: acc_id,
            arg2: 'Nissan',
            arg3: 'Patrol',
            arg4: 'Black',
            arg5: 'Shatil'
          }
        ];
        const acc  = fcc[Math.floor(Math.random()*(fcc.length))];
        workload.push(acc);
    }
    return workload;
}

module.exports.run = function() {
    let args = generateWorkload();
    console.log(args)
    return bc.invokeSmartContract(contx, 'fabcar', 'v1', args, 100);
};

module.exports.end = function() {
    return Promise.resolve();
};

module.exports.account_array = account_array;
