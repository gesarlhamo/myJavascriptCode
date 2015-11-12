
var Inventory = {
	cocoa: 10,
	coffee: 10,
	cream: 10,
	decaf: 10,
	espresso: 10,
	foamedMilk: 10,
	sugar: 10,
	steamedMilk:10,
	whippedCream:10
};

var drinkIngradientsMap = {
	
	1 : {
		name : "Coffee Americano",
		price : "$3.30",
		ingradients : {
			espresso: 3
		}
	},

	2 : {
		name : "Coffee Latte",
		price : "$2.25",
		ingradients : {
			espresso: 2,
			steamedMilk: 1

		}
	},

	3 : {
		name : "Coffee Mocha",
		price : "$3.35",
		ingradients : {
			espresso: 1,
			cocoa   : 1,
			steamedMilk: 1,
			whippedCream: 1
		}
	},

	 4 : {
		name : "Cappuccino",
		price : "$2.90",
		ingradients : {
			espresso: 2,
			steamedMilk: 1,
			foamedMilk: 1
		}
	},

	5 : {
		name : "Coffee",
		price : "$3.30",
		ingradients : {
			coffee: 3,
			cream: 1,
			sugar: 1
		}
	},


	6 : {
		name : "Decaf Coffee",
		price : "$3.30",
		ingradients : {
			decaf: 3,
			cream: 1,
			sugar: 1
		}
	}
}




function dispenseDrink(namePriceIngradients){
	

	if(isDrinkStillAvailable(namePriceIngradients) === 'false'){
		debug("Out of stock : " + namePriceIngradients.name);
		return;
	}

	// reduce from inventopy
	var drinkIngradients = namePriceIngradients.ingradients;
	for (var ingradientsName in drinkIngradients) {
	   if (drinkIngradients.hasOwnProperty(ingradientsName)) {
	       var numOfIngredients = drinkIngradients[ingradientsName];
	       Inventory[ingradientsName] = Inventory[ingradientsName] - numOfIngredients
	    }
	}
	debug('Dispesing : ' + namePriceIngradients.name);
	displayExistingInventory();
	displayMenu();
}



function displayMenu(){
	debug("Menu");
	for (var key in drinkIngradientsMap) {
	   if (drinkIngradientsMap.hasOwnProperty(key)) {
	       var namePriceIngradients = drinkIngradientsMap[key];
	       var isDrinkAvailable = isDrinkStillAvailable(namePriceIngradients);
	       debug(key + ' , ' + namePriceIngradients.name + ' , ' + namePriceIngradients.price + ' , ' + isDrinkAvailable );
	    }
	}

};

function isDrinkStillAvailable(namePriceIngradients){
	var drinkIngradients = namePriceIngradients.ingradients;
	for (var ingradientsName in drinkIngradients) {
	   if (drinkIngradients.hasOwnProperty(ingradientsName)) {
	       var numOfIngredients = drinkIngradients[ingradientsName];
	       if( (Inventory[ingradientsName] - numOfIngredients) < 0 ){
	       		return 'false'
	       }
	    }
	}
	return 'true'
}

var displayExistingInventory = function displayExistingInventory() {
	debug("Inventory");
	for (var key in Inventory) {
	   if (Inventory.hasOwnProperty(key)) {
	       var value = Inventory[key];
	       debug(key + ' , ' + value);
	    }
	}
}

var debug = function debug (message) {
	console.log(message);
}

displayExistingInventory();
displayMenu();

var readlineSync = require('readline-sync');

while(true){
	var number = readlineSync.question('');
	if(!isInputValid(number)){
		debug('Invalid Selection: ' + number);
		continue;
	}
	if(number === 'Q' || number === 'q'){
  		return;
  	}		
  	if(number === 'R' || number === 'r'){
  		reStock();
  		displayExistingInventory();
  		displayMenu();
  		continue;

  	}
  	// debug('user select ' + number)
  	var drinkIngradients = drinkIngradientsMap[number];
  	dispenseDrink(drinkIngradients);
}	

function reStock(){
	Inventory = {
		cocoa: 10,
		coffee: 10,
		cream: 10,
		decaf: 10,
		espresso: 10,
		foamedMilk: 10,
		sugar: 10,
		steamedMilk:10,
		whippedCream:10,
	};
}

function isInputValid(input){
	if(input == 'Q' || input == 'r' || input == 'q' || input == 'R'  || (input < 7 && input > 0)  ){
		return true;
	}else{
		return false;
	}

}









