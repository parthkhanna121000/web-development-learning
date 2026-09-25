function greet() {
  console.log("hello , I am parth");
  return 22;
}
greet();

// function addNumber(num1, num2, num3, num4) {
//   const sum = num1 + num2 + num3 + num4;
//   console.log(sum);
// }

function addNumber(...num) {
  let sum = 0;
  for (let n of num) {
    sum = sum + n;
  }
  console.log(sum);
}

addNumber(1, 3, 4, 4);
addNumber(1, 31, 48, 4);
addNumber(1, 30, 41, 45);
addNumber(1, 30, 41, 45, 2, 3, 5, 10);
console.log(greet());
