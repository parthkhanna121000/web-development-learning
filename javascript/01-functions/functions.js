// function greet() {
//   console.log("hello , I am parth");
//   return 22;
// }
// greet();

// function addNumber(num1, num2, num3, num4) {
//   const sum = num1 + num2 + num3 + num4;
//   console.log(sum);
// }

// function addNumber(...num) {
//   let sum = 0;
//   for (let n of num) {
//     sum = sum + n;
//   }
//   console.log(sum);
// }

// addNumber(1, 3, 4, 4);
// addNumber(1, 31, 48, 4);
// addNumber(1, 30, 41, 45);
// addNumber(1, 30, 41, 45, 2, 3, 5, 10);
// console.log(greet());

// const arr1 = [10, 20, 30, 40, 50];
// const arr2 = [60, 70, 80, 90];

// const ans = [...arr1, ...arr2];
// console.log(ans);

// const skills1 = ["HTML", "CSS", "JavaScript"];
// const skills2 = ["Nodejs", "Express", "MongoDb"];

// const allskills = [...skills1, skills2];
// console.log(allskills);

// const vegetables = ["Potato", "Brinjal", "Onion"];
// const newVeg = [...vegetables, "Cabbage"];
// console.log(newVeg);

// Rest operator
function Addition(nums1, nums2, nums3, nums4) {
  const sum = nums1 + nums2 + nums3 + nums4;
  return sum;
}
console.log(Addition(3, 11, 14, 18));
// *  Using rest operator: "Give me the first thing normally, and I'll collect the rest."

function Intro(name, ...skills) {
  console.log(name);
  console.log(skills);
}
Intro("Parth", "HTML", "CSS", "JavaScript");

// Rest operator example
// function ProductOfNo(...nums) {
//   let product = 1;
//   for (x of nums) {
//     product = product * x;
//   }
//   console.log(product);
// }
// ProductOfNo(3, 2, 4, 1, 5, 9, 10);
// ProductOfNo(4, 1, 5, 9, 10);
// ProductOfNo(3, 5, 9, 10);

// & Arrow function
const arr = [8, 9, 32, 19, 31];
arr.sort((a, b) => a - b);

console.log(arr);

const add = (nums1, nums2) => {
  return nums1 + nums2;
};
console.log(add(2, 5));

const SquareNo = (n) => {
  return n * n;
};
console.log(SquareNo(87));
console.log(SquareNo(76));
console.log(SquareNo(71));
console.log(SquareNo(17));

const greeting = () => ({
  name: "parth",
  age: "21",
});
console.log(greeting());

const mul = (nums1, nums2) => {
  return nums1 * nums2;
};

console.log(mul(5, 6));
console.log(mul(531, 642));
