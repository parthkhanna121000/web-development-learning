let numbers = [1,2,3];
let mulno = numbers.map(function(no){
    return no * 10;
})
console.log(mulno)


let user = {
    name: "parth",
    city: "Delhi",
    role: "Backend Developer",
}


// Destructuring
let {name, city, role} = user;
console.log(name)
console.log(city)
console.log(role)

// If you have an object let product = { title: "Laptop", price: 999 };, what single line of code would you write to destructure title and price into separate variables?

// Why is destructuring considered cleaner than repeatedly typing product.title and product.price?

let product = { title: "Laptop", price: 999 };
let {title, price} = product;
console.log(title);
console.log(price)

// If you have an object let user = { name: "Parth", role: "Developer" };, how would you use the spread operator to create a new object named updatedUser that copies everything from user and adds a new property: city: "Greater Noida"?

// Why do you think React and Next.js developers prefer using the spread operator instead of directly modifying an existing array or object?
// ^ Why we need it: In React and Next.js, you will constantly update user states, shopping carts, or lists. React relies heavily on immutability (never mutating or modifying original data directly). The spread operator lets you safely copy data and add/update properties in a clean, elegant way.
// ~ Real-world analogy: Making a photocopy of an existing document before writing your signature on it, rather than scribbling on the original master copy.

let users = {
    name: "parth", role: "Developer"
};
let updatedUser = {
    ...users, city:"Greater Noida"
}
console.log(updatedUser)




