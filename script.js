'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////////////////////////////////////////////////////
///////////////////////SIMPLE ARRAY METHODS/////////////////////////
////////////////////////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE (create new array)
console.log(arr.slice(2)); // ['c', 'd', 'e'] New array
console.log(arr.slice(2, 4)); // ['c', 'd'] ( end par - start par)
console.log(arr.slice(-2)); // ['d', 'e'] Last 2 parametrs
console.log(arr.slice(1, -2)); // ['b', 'c'] Last 2 parametrs
console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e'] NEW ARRAY

// SPLICE (mutate original array)
// console.log(arr.splice(2)); // ['c', 'd', 'e'] splice deleted this 3 elemets from parents array
// console.log(arr); // ['a', 'b']
arr.splice(-1);
console.log(arr); // ['a', 'b', 'c', 'd']
arr.splice(1, 2); // From pos1 delete two elemets, include pos1 element
console.log(arr); // ['a', 'd']

// REVERSE (mutate original array)
arr = ['a', 'b', 'c', 'd', 'e'];

const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

// CONCAT (Doesn't mutate original arrays)
const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'] Doesn't mutate original arrays
console.log([...arr, ...arr2]); // Doesn't mutate original arrays

// JOIN
console.log(letters.join('-')); // create srting "a-b-c-d-e-f-g-h-i-j"
*/

////////////////////////////////////////////////////////////////////
///////////////////////THE NEW "AT" METHOD//////////////////////////
////////////////////////////////////////////////////////////////////
/*
const arr = [23, 11, 64];
console.log(arr[0]); // 23
// Same thing
console.log(arr.at(0)); // 23

// How we get last element of the array if don't know array length
console.log(arr[arr.length - 1]); // 64
console.log(arr.slice(-1)); // [64]
console.log(arr.slice(-1)[0]); // 64
console.log(arr.at(-1)); // 64
console.log(arr.at(-2)); // 11

// At methods works also with strings
console.log('jonas'.at(-1)); // s
*/
////////////////////////////////////////////////////////////////////
/////////////////////LOOPING ARRAYS: FOREACH////////////////////////
////////////////////////////////////////////////////////////////////

/*
// Example. This is bank account. Positive values - deposits, negative values - withdraws
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// #1 WAY for of
console.log('-----------FOROF------------');
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: ${Math.abs(movement)}`);
  }
}

// #2 WAY forEach
console.log('-----------FOREACH------------');
// .forEach() - its high-order function which requires a callback function!
// callback function will receive the current element of the array (movement)
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
//0: function(200)
//1: function(450)
//2: function(400)
// movements.forEach(function (mov, i, arr): first argument - current paramater; second - currentIndex; third - entire array
*/

////////////////////////////////////////////////////////////////////
/////////////////////FOREACH WITH MAPS AND SETS/////////////////////
////////////////////////////////////////////////////////////////////

/*
// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]); // 'USD' - KEY; 'United States dollar' - VALUE

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); // Set(3) {'USD', 'GBP', 'EUR'}
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`); // USD: USD... - because argument "key" makes no sense (second argument ommited)
});
// "_" - argument completely unnecessary

*/
////////////////////////////////////////////////////////////////////
/////////////////////CODING CHALLENGE #1////////////////////////////
////////////////////////////////////////////////////////////////////

/*
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const allDogs = dogsJulia.slice(1, -2).concat(dogsKate);
  console.log(allDogs);
  allDogs.forEach(function (x, y) {
    if (x >= 3) {
      console.log(`Dog number ${y + 1} is an adult, and is ${x} years old`);
    } else {
      console.log(`Dog number ${y + 1} still a puppy`);
    }
  });
};
checkDogs(dogsJulia, dogsKate);
*/

////////////////////////////////////////////////////////////////////
////////////////DATA TRANSFORMATIONS: MAP, FILTER, REDUCE///////////
////////////////////////////////////////////////////////////////////

//----------------------------MAP----------------------------------

// Map method give as a brand new array and this new array will contain in each position the result of applying a callback function to the original array elements
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

// With function expression
const movementUSD2 = movements.map(function (mov) {
  return mov * euroToUsd;
  // return 23; // [23, 23, 23, 23, 23, 23, 23, 23] 8 elements like a movement array. Put 23 at the same position.It's useless
});
console.log(movements);
console.log(movementUSD2);

// With for-of wihout "map"
const movementUSDfor = [];
for (const mov of movements) movementUSDfor.push(mov * euroToUsd);
console.log(movementUSDfor);

// With arrow function
const movementUSD = movements.map(mov => mov * euroToUsd);

console.log(movementUSD);

const movementDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )} `
);
console.log(movementDescriptions); //['Movement 1: You deposited 200 ', 'Movement 2: You deposited 450 ', 'Movement 3: You withdrew 400 ', 'Movement 4: You deposited 3000 ', 'Movement 5: You withdrew 650 ', 'Movement 6: You withdrew 130 ', 'Movement 7: You deposited 70 ', 'Movement 8: You deposited 1300 ']
*/

////////////////////////////////////////////////////////////////////
/////////////////////////THE FILTER METHOD//////////////////////////
////////////////////////////////////////////////////////////////////

/*
// Filter
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposites = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(deposites); // [200, 450, 3000, 70, 1300]

// For-of disadvatage of "for-of" it's completely impossible to use method chaining
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor); // [200, 450, 3000, 70, 1300]

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); // [-400, -650, -130]

*/

////////////////////////////////////////////////////////////////////
/////////////////////////THE REDUCE METHOD//////////////////////////
////////////////////////////////////////////////////////////////////

// Reduce boil down all the elements in an array to one single value

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// acc(accumulator  -> SNOWBALL)
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`uteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0); // 0 - starter (initial value)
// console.log(balance); // 3840

// Arrow function
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance); // 3840

// With For-of
let balance2 = 0; // initial value
for (const mov of movements) balance2 += mov;
console.log(balance2); // 3840
