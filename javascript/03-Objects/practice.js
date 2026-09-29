let obj = {
  name: "Sourav",
  age: 23,
  job: "Developer",
};
console.log(obj);

let obj1 = new Object();
((obj.name = "Sourav"), (obj.age = 23), (obj.job = "Developer"));

console.log(obj1);

let obj2 = { name: "Sourav", age: 23 };

// Using Dot Notation
console.log(obj2.name);

// Using Bracket Notation
console.log(obj["age"]);

let obj3 = { name: "Sourav", age: 22 };
console.log(obj);

obj.age = 23;
console.log(obj);
let obj = { model: "Tesla" };
obj.color = "Red";

console.log(obj);
