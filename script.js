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

////////////////////////////////////////////////////////////////////
/////////////////////PROJECT:"BANKIST" APP//////////////////////////
////////////////////////////////////////////////////////////////////

const displayMovements = function (movements, sort = false) {
  // fill empty entire html container
  containerMovements.innerHTML = ''; // .innerHTML return everything, including the HTML (all HTML tags will be included)

  // slice - for copy an array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Create a string

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}???</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} ???`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}???`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc - mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}???`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
      // Only interest above 1
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}`;
};

// Initials
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI  message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; // flipp from true and false
});

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
console.log(currenciesUnique); // Set(3)??{'USD', 'GBP', 'EUR'}
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
/*
// Reduce boil down all the elements in an array to one single value

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// acc(accumulator  -> SNOWBALL)
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
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

// Get maximum value of the array
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max); // 3000
*/

////////////////////////////////////////////////////////////////////
/////////////////////CODING CHALLENGE #2////////////////////////////
////////////////////////////////////////////////////////////////////
/*
const dogs = [16, 6, 10, 5, 6, 1, 4];
// Function expression
// const calcAverageHumanAge = dogs.map(function (age, i) {
//   console.log(`Dog age number ${i + 1}: ${age <= 2 ? 2 * age : 16 + age * 4}`);
// });

// console.log(calcAverageHumanAge());

//Arrow function
// const calcAverageHumanAge = dogs.map((age, i) =>
//   console.log(`Dog age number ${i + 1}: ${age <= 2 ? 2 * age : 16 + age * 4}`)
// );

// console.log(calcAverageHumanAge());

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals); // [-400, -650, -130]

const calcAverageHumanAge = function (ages) {
  const humanAges = dogs
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(adultAge => adultAge > 18);
  // console.log(humanAges);
  const average = humanAges.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  // console.log(average);
  return average;
};
const avgDogs = calcAverageHumanAge(dogs);
console.log(avgDogs);
*/

////////////////////////////////////////////////////////////////////
////////////////////////CHAINING METHODS////////////////////////////
////////////////////////////////////////////////////////////////////
/*
// How much into the account in US dollars? Let's do it all in one goal
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;
console.log(movements);

//LIKE A PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * euroToUsd)
  .map((mov, i, arr) => {
    // arr - it's a new array from filter method
    // console.log(arr);
    return mov * euroToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD); // 5522.000000000001
*/

////////////////////////////////////////////////////////////////////
/////////////////////CODING CHALLENGE #3////////////////////////////
////////////////////////////////////////////////////////////////////
/*
const dogs = [16, 6, 10, 5, 6, 1, 4];

const average = dogs
  .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter(age => age > 18)
  .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
console.log(average);

*/

////////////////////////////////////////////////////////////////////
/////////////////////////THE FIND METHOD////////////////////////////
////////////////////////////////////////////////////////////////////

/*
// We can retrieve one element of an array based on a condition

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Find that loops over the array and return element itself
// movements.find(mov => mov < 0); // return only the first element that satisfies this condition

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); // owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222} - Extract only 1 object from array of objects
*/

////////////////////////////////////////////////////////////////////
/////////////////////////THE FINDINDEX METHOD///////////////////////
////////////////////////////////////////////////////////////////////
/*
// Return index in general same as find

////////////////////////////////////////////////////////////////////
////////////////////////////SOME AND EVERY//////////////////////////
////////////////////////////////////////////////////////////////////

// SOME
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// For checking EQUALITY
console.log(movements.includes(-130)); // true - if any value of an array is exactly equal (-130)

console.log(movements);

// For checking CONDITION
console.log(movements.some(mov => mov === -130)); // true
// If we want to know if there is any positive movement in this array (any number above 0)
const anyDeposites = movements.some(mov => mov > 0);
console.log(anyDeposites); // true
const anyDeposites2 = movements.some(mov => mov > 5000);
console.log(anyDeposites2); // false

// EVERY
// Returns true if all of the elements in the array satisfy the condition
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0)); // true

// Separate callback (reusable)
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // [200, 450, 3000, 70, 1300]
*/

////////////////////////////////////////////////////////////////////
//////////////////////////FLAT AND FLATMAP//////////////////////////
////////////////////////////////////////////////////////////////////
/*
// Flat - remove the nested arrays and flattend into one array
const arr = [[1, 2, 3], [4, 5, 6], 7, 8]; // nested arrays
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // [[1, 2], 3, 4, [5, 6], 7, 8]; destroyed only one-level nest
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8] ".flat(2) - 2 level depth!"

// Example
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance); // 17840 using .map first, and .flat for the result

// FlatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2); // 17840 ONLY for 1 level DEEP
*/

////////////////////////////////////////////////////////////////////
//////////////////////////SORTING ARRAYS////////////////////////////
////////////////////////////////////////////////////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // ['Adam', 'Jonas', 'Martha', 'Zach']
console.log(owners); // ['Adam', 'Jonas', 'Martha', 'Zach'] MUTATED ARRAY

// Numbers
console.log(movements);
console.log(movements.sort()); // [-130, -400, -650, 1300, 200, 3000, 450, 70] based on strings by default!!!

// With callback (consecuntive - ????????????????????????????????)
// (a, b) - a (current value), b (next value) two consecuntive numbers of the array.
// If we sorted < 0, then A before B (keep order)
// If > 0 B before A (switch order)

// Ascending (???? ??????????????????????)
movements.sort((a, b) => {
  if (a > b) return 1; // if a greater than be would, then a-b always be positive (return 1)
  if (a < b) return -1; // if a less then b than, then a-b always be negative (return -1)
});
// Rewrite
movements.sort((a, b) => a - b);

console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]
// Descending (???? ????????????????)
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
// Rewrite
movements.sort((a, b) => b - a);
console.log(movements); // [3000, 1300, 450, 200, 70, -130, -400, -650]
*/

////////////////////////////////////////////////////////////////////
///////////////MORE WAYS OF CREATING AND FILLING ARRAYS/////////////
////////////////////////////////////////////////////////////////////
/*
// Ways of create an array
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//--------------Fill method plus empty arrays-----------------------
// Create array programmatically
const x = new Array(7); // this weird behavior of this Array() function which does if so that whenever we only pass in one argument, then it creates a new empty argument with that length
console.log(x); // [empty ?? 7]

console.log(x.map(() => 5)); // [empty ?? 7] We can use only one method in this arrqay - fill() method

// Fill
// x.fill(1);
// console.log(x); // [1, 1, 1, 1, 1, 1, 1]

// x.fill(1, 3);
// console.log(x); // [empty ?? 3, 1, 1, 1, 1]

// x.fill(1, 3, 5);
// console.log(x); // [empty ?? 3, 1, 1, empty ?? 2]

arr.fill(23, 4, 6);
console.log(arr); // [1, 2, 3, 4, 23, 23, 7]

// Array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7] (_, i) - underscore parameter - its mean we dont use this parameter

// Usefull for iteration of NodeList

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementsUI); // [div.movements__value, div.movements__value]

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('???', ''))
  );
  console.log(movementsUI);
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
}); // [1300, 70, -130, -650, 3000, -400, 450, 200] Nodelist is not array, but array like structure
*/

////////////////////////////////////////////////////////////////////
////////////////////ARRAY METHODS PRACTICE//////////////////////////
////////////////////////////////////////////////////////////////////
/*
//1. - 4. Removening from nested arrays into one, find all positive values and adding together
// const bankDepositSum = accounts.map(acc => acc.movements);
// console.log(bankDepositSum);

//2.
// All arrays value out of arrays into one array. Remove all values into a parent array! (flat())
// const bankDepositSum = accounts.map(acc => acc.movements).flat();
// console.log(bankDepositSum);

//3. Now filter for the deposites for the positive values
// const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0);
// console.log(bankDepositSum);

//4. Adding them all together
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);
//----------------------------------------------------------

//5. How many deposits there have been in the bank with at lest 1000$
// const numDeposites1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposites1000); // 6

//6. Another solution
const numDeposites1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  // .reduce((count, cur) => (cur >= 1000 ? count++ : count), 0); // doesn't work
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); // doesn't work
console.log(numDeposites1000); // 6

// Prefixed ++ operator
let a = 10;
// console.log(a++); // 10 "++" operator still returns the previous value
// console.log(a); // 11
console.log(++a); // 11
console.log(a); //11

//7. Create a new object instead of just a number or just a string
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals); // 25180 -7340

//8. Creat function to convert any string to a title case
// this is nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exeptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exeptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

////////////////////////////////////////////////////////////////////
/////////////////////CODING CHALLENGE #4////////////////////////////
////////////////////////////////////////////////////////////////////
/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Create new property iterating over an array
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);
// 2. Find property in arrays of object
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dogs eat too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);
// 3. Extract an array from an object according to a condition
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);
// 4. Log to console string based on array
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little!`);
// 5. Compare property of array of object with condition
console.log(dogs.some(dog => dog.curFood === dogs.recFood));
// 6. Log to the console compare with condition
const checking = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checking));
// 7. create an array contains on condition in previous task
console.log(dogs.filter(checking));
// 8. Create a shallow copy of original array
const sortedDogs = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(sortedDogs);
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
const dogSarah = dog => dog.owners.includes('Sarah');
console.log(
  `Sarah's dogs eats too ${
    dogSarah.curFood > dogSarah.recFood ? 'little' : 'much'
  }`
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat to much`);
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat to little`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
const checkingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkingOkay));

// 7.
console.log(dogs.filter(checkingOkay));

// 8.
const sortedDog = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(sortedDog);
