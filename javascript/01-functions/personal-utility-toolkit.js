// Greeting
function greet(name) {
  console.log("hi, my name is " + name);
}
greet("Parth");

// Add number
const addno = (a, b) => {
  return a + b;
};
console.log(addno(5, 2));

// Check even / oddno
function EvenOdd(nums) {
  if (nums % 2 == 0) console.log("Even no");
  else console.log("odd no");
  //   return nums;
}
function EvenOdd(nums) {
  if (nums % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

console.log(EvenOdd(5));
console.log(EvenOdd(10)); // Even
console.log(EvenOdd(7)); // Odd
// Calculate square
const SquareNo = (nums) => {
  return nums * nums;
};
console.log(SquareNo(25));

// Calculate Area of rectangle
const AreaOfRectangle = (l, b) => {
  return l * b;
};
console.log(AreaOfRectangle(80, 21));

// Calculate total

// Product cost ₹1000 and the customer buys 2 it will be product cost * quantity

function TotalPrice(ProductPrice, Qty) {
  return ProductPrice * Qty;
}
console.log(TotalPrice(1000, 2));
