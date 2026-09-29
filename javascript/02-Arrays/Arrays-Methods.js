// * Length property
let a = [1, 2, 4, 5, 5, 6, 8, 9];
console.log(a.length);

// *  Array to string method
let b = ["HTML", "CSS", "JS", "React js"];
let s = b.toString();
console.log(s);

// * join() method
let c = ["HTML", "CSS", "JS", "React js"];
let s1 = c.join("-");
console.log(s1);

// * Delete Operator
let student = {
  name: "Parth",
  age: 23,
  location: "Delhi",
};

console.log(delete student.location);
console.log(student);

//  * Array push method
let a1 = [1, 3, 4, 5, 6];
a1.push(14);
a1.push(11);
a1.push(10);
console.log(a1);

// * Array unshift method
let a2 = [21, 5, 6, 25, 21];
a2.unshift(14);
a2.unshift(4);
a2.unshift(10);
a2.unshift(11);
a2.pop();
a2.pop();
a2.pop();
console.log(a2);

// &
const prices = [100, 200, 300];
const doubleprices = prices.map((price) => price * 2);
console.log(doubleprices);

const numbers = [1, 2, 3, 4];

const squares = numbers.map((nums) => {
  return nums * nums;
});
console.log(squares);

// for each
const arr = [10, 20, 30, 40, 50];
let sum = 0;

arr.forEach((number) => {
  sum += number;
});
console.log(sum);

// filter

const arr1 = [10, 20, 30, 40, 90];
const newarr1 = arr1.filter((nums) => nums > 30);
console.log(newarr1);

// const add = (a, b) => {
//   return a + b;
// };
// console.log(add(22.12, 312));
