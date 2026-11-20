async function greet(){
    // return "PARTH";
    return new Promise ((resolve, reject)=>{
        resolve("Rohit")
    })
}
let result = greet();
// console.log(result)