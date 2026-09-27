// Add no
const addNumbers = (a, b) => a + b;

const multiplyNumbers = (a, b) => a * b;

const isEven = (n1) => {
  if (n1 % 2 === 0) {
    return "even";
  } else return "odd";
};

const SquareNo = (n2) => {
  return n2 * n2;
};
const rectangleArea = (length, breadth) => length * breadth;

const totalPrice = (Price, Qty) => Price * Qty;

const calculatePercentage = (val, percentage) => {
  return val * (percentage / 100);
};
console.log(addNumbers(3, 5));
console.log(multiplyNumbers(3, 5));
console.log(isEven(10));
console.log(isEven(19));
console.log(SquareNo(34));
console.log(rectangleArea(42, 52));
console.log(totalPrice(4239, 4));
console.log(calculatePercentage(100, 20));
