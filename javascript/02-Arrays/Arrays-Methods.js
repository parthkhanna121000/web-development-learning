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
