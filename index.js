const storeName = 'Tech Haven';
const storeLocation = 'Metro Manila';
let storeCapacity = 1000;

let name = ["Laptop", "Smartphone", "Tablet"];
let price = [18999, 9999, 12999];
let quantity = [50, 100, 80];

let products = [name, price, quantity];

var quantitiesSum = 0;
var availableSpace;
var quantityLength = quantity.length;

function checkInventoryCapacity() {

    quantityLength = quantity.length;
    quantitiesSum = 0;

    for (let i = 0; i < quantityLength; i++) { //Add all quantities
        quantitiesSum += quantity[i];
    }

    if (quantitiesSum > storeCapacity) { //If sum of quantities are greater than capacity, print message and set availableSpace to false
        console.log('The store is over capacity.');
        availableSpace = false;
    } else { //If not greater than, set availableSpace to true
        availableSpace = true;
    }

    console.log(`Total Number of Products: ${quantitiesSum}`);
}

function addProduct() {

    checkInventoryCapacity();
    let newQuantity = parseInt(prompt('Enter quantity of product to add to inventory: '));
    if ((availableSpace == true) && (quantitiesSum + newQuantity <= storeCapacity)) { //If there is space and adding the new quantity to the existing overall quantity does not exceed capacity, ask name
        let newName = prompt('Enter name of product to add to inventory: ');
        let index = name.findIndex(value => value === newName);  // Find name in storage and its index
        if (index === -1) { //If product is not found, add name, price, and quantity to storage
			let newPrice = parseInt(prompt('Enter price of product to add to inventory: '));
			name.push(newName);
        	price.push(newPrice);
        	quantity.push(newQuantity);
    	} else { //If product is found, add quantity
            quantity[index] += newQuantity;
    	}
    } else { //If no space and adding the quantity will exceed storage capacity, print message
        console.log('Adding the product exceeds store capacity. Action cancelled.');
    }

    console.log(`Total number of products: ${quantity.length}`);

    for (let i = 0; i < quantity.length; i++) { //Print all products with respective name, price, and quantity
        console.log(`Product: ${name[i]}\t\tPrice: ${price[i]}\t\tQuantity: ${quantity[i]}`);
    }

    restockProduct();

    let choice = prompt('Would you like to remove a product (y/n)? ');
    if (choice == "y" || choice == "Y") { //If user inputs Y or y, call removeProduct()
        removeProduct();
    }
}

function removeProduct() {

    let newName = prompt('Enter name of product whose quantity is to be removed: ');
    let newQuantity = parseInt(prompt('Enter quantity to be removed: '));
    checkInventoryCapacity();

    let index = name.findIndex(value => value === newName);  // Find index of product name

    if (index === -1) { //If product is not found, print message and call removeProduct() again
        console.log('Product not found. Try again.');
        removeProduct();
    } else { //If product is found,...

        if (quantity[index] - newQuantity < 0) { //...check if quantity drops below 0. If it does, print message and call removeProduct() again
            console.log('Quantity drops below 0, try again.');
            removeProduct();
        } else { //...and quantity will not be below 0, deduct the quantity 
            quantity[index] -= newQuantity;
            console.log('Action completed.');

            for (let i = 0; i < name.length; i++) { //Print all products with respective name, price, and quantity
                console.log(`Product: ${name[i]}\t\tPrice: ${price[i]}\t\tQuantity: ${quantity[i]}`);
            }

            restockProduct();
        }
    }
}

function getMostExpensiveProduct() {

    let mostExpensivePrice = Math.max(...price); //Get the max price
    let searchedPrice = price.findIndex(value => value === mostExpensivePrice); //Find index of max price
    let mostExpensiveName = name[searchedPrice]; //Get the product name with max price
    console.log(`Most Expensive Product: ${mostExpensiveName}`);
}

function calculateTotalInventoryValue() {

    let totalInventoryValue = 0;

    for (let i = 0; i < name.length; i++) {
        totalInventoryValue += price[i] * quantity[i];  // Calculate total inventory value
    }

    console.log(`Total Inventory Value: ${totalInventoryValue}`);
}

function restockProduct(){
	for (let i = 0; i < quantity.length; i++) { //Check all quantity
        if (quantity[i] < 10) { //If quantity falls below 10, add 20 units
        	quantity[i] += 20;
        }
    }

    for (let i = 0; i < quantity.length; i++) { //Print all products with respective name, price, and quantity
        console.log(`Product: ${name[i]}\t\tPrice: ${price[i]}\t\tQuantity: ${quantity[i]}`);
    }

    calculateTotalInventoryValue();
}

console.log(`Store Name: ${storeName}`);
console.log(`Store Location: ${storeLocation}`);
checkInventoryCapacity();
calculateTotalInventoryValue();
addProduct();