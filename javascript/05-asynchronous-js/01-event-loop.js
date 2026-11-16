let arr = [10,20,30,40]
arr.push(10);
arr.map(x=> x*10)

function hello(){
    console.log("Hello i am good")
}
hello()

// function greet(name, callback) {
//   console.log("Hello, " + name);
//   callback();
// }

// greet("Parth", function () {
//   console.log("Welcome!");
// });


function getOrder(callback) {
  setTimeout(() => {
    console.log("1. Order fetched");

    const order = {
      id: 101,
      product: "Laptop",
      userId: 7
    };

    callback(order);
  }, 1000);
}

function getPayment(order, callback) {
  setTimeout(() => {
    console.log("2. Payment verified for order:", order.id);

    const payment = {
      orderId: order.id,
      status: "paid"
    };

    callback(order, payment);
  }, 1000);
}

function updateInventory(order, payment, callback) {
  setTimeout(() => {
    console.log("3. Inventory updated for:", order.product);

    callback(order, payment);
  }, 1000);
}

function sendConfirmation(order, payment) {
  console.log("4. Confirmation sent to user:", order.userId);
  console.log("Order complete!");
}

getOrder(function (order) {
  getPayment(order, function (order, payment) {
    updateInventory(order, payment, function (order, payment) {
      sendConfirmation(order, payment);
    });
  });
});

