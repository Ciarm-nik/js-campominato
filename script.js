
(function () {
    /*
    Il computer deve generare 16 numeri casuali tra 1 e 100.
    I numeri non possono essere duplicati.
    
    In seguito deve chiedere all’utente (100 - 16) volte di inserire
    un numero alla volta, sempre compreso tra 1 e 100.    
    L’utente non può inserire più volte lo stesso numero.
    
    Se il numero è presente nella lista dei numeri generati, la partita termina, 
    altrimenti si continua chiedendo all’utente un altro numero.
    
    La partita termina quando il giocatore inserisce un numero “vietato” 
    o raggiunge il numero massimo possibile di numeri consentiti.
    
    Al termine della partita il software deve comunicare il punteggio, 
    cioè il numero di volte che l’utente ha inserito un numero consentito.
    */

    var minNumber = 95;
    var maxNumber = 100;
    var aiNumbersLength = 0;

    var aiNumbers = [];
    var userNumbers = [];

    /*
    Chiede all'utente di inserire un numero, tramite promt, x volte, dove x è la differenza tra 
    il valore "maxNumber" e "aiNumbersLength".
    Controllare che il numero inserito sia un numero valido e che non sia ancora stato usato e che non sia minore
    di "minNumber" o maggiore di "maxNumber".
    Deve anche controllare che il numero non esista all'interno dell'array "aiNumbers"
    */
    function askUserNumbers() {
        var userLengthMax = maxNumber - minNumber - aiNumbersLength;

        var gameOver = false

        // Finche la length dei numeri inseriti è minore della length massima di numeri che l'utente può inserire,
        // continuo a chiedere all'utente di inserire un numero tramite prompt
        while (userNumbers.length <= userLengthMax && gameOver === false) {
            var userInput = prompt("Inserisci un numero tra " + minNumber + " e " + maxNumber + ". (" + userNumbers.length + ")");

            if (userInput == null) {
                gameOver = true;
            }

            if (userNumbers.length === userLengthMax) {
                gameOver = true;

                alert("HAI VINTO!!!");
            }

            /*
            - Se il valore inserito E' valido, ritorna TRUE
            - Se il valore NON è valido e l'utente deve reinserirlo, ritorna FALSE
            - Se il valore NON è valido perchè è una mina, ritorna "game over"
            */
            var inputIsValid = checkUserInput(userInput)

            if (!inputIsValid && inputIsValid !== "game over") {
                alert("Numero inserito non valido");

            } else if (inputIsValid === "game over") {
                gameOver = true;

                alert("Hai perso dopo aver inserito " + userNumbers.length + " numeri.");
            } else {
                userNumbers.push(parseInt(userInput));

                console.log(userNumbers);
            }

            /*
                min = 90
                max = 100

                numeriAI = 5
                numeriUtente = 6
             
             */
        }
    }

    /*
    Deve controllare se:
    - Il valore è un numero reale
    - Il numero NON è minore di minNumber
    - Il numero NON è maggiore di maxNumber
    - Il numero NON sia già stato usato dall'utente
    */
    function checkUserInput(inputValue) {
        var result = true
        var numberToCheck = parseInt(inputValue)

        if (isNaN(numberToCheck)) {
            return false;
        }

        if (numberToCheck < minNumber || numberToCheck > maxNumber) {
            return false;
        }

        if (userNumbers.indexOf(numberToCheck) > -1) {
            return false;
        }

        if (aiNumbers.indexOf(numberToCheck) > -1) {
            return "game over";
        }


        return result
    }

    /*
    Crea i numeri iniziali del computer
    Si assicura anche che i numeri non siano doppi
    */
    function createAiNumbers() {
        while (aiNumbers.length < aiNumbersLength) {
            var numeroRandom = genarateRandomNumbers(minNumber, maxNumber);

            if (aiNumbers.indexOf(numeroRandom) === -1) {
                aiNumbers.push(numeroRandom)
            }
        }

        console.log(aiNumbers);
    }

    /*
    Funzione che genera numeri random tra il min e il max passati come argomento
    */
    function genarateRandomNumbers(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }

    createAiNumbers();
    askUserNumbers();
})()


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------





// Seconda soluzione

//Il computer deve generare 16 numeri casuali tra 1 e 100.
//I numeri non possono essere duplicati


/*
function randomNumberBetween(min, max) {
	var newMax = max - min;
	var number = Math.floor(Math.random() * (newMax + 1)) + min;
	return number;
}

// for (var i = 0; i < 10; i++) {
// 	console.log(randomNumberBetween(10, 15));
// }



function mioIndexOf(array, element) {
//	var j = 0;
//	while (j < array.length) {
//		if (element == array[j]) {
//			return j;
//		}
//
//		j++;
//
//	}

	for (var i = 0; i < array.length; i++) {
		if (element == array[i]) {
			return i;
		}
	}

	return -1;
}



var bombe = [];
var numeriInseriti = [];

var numeroMassimo = 100;
var NUMERO_BOMBE = 16;

var difficoltaValida = false;

while (!difficoltaValida) {
	var difficolta = parseInt(prompt("Scegli la difficoltà"));

	switch (difficolta) {
		case 0:
			difficoltaValida = true;
			break;
		case 1:
			difficoltaValida = true;
			numeroMassimo = 80;
			break;
		case 2:
			difficoltaValida = true;
			numeroMassimo = 50;
			break;
		default:
			alert('Inserisci un valore valido');
			break;
	}
}

while (bombe.length < NUMERO_BOMBE) {
	var numeroGenerato = Math.floor(Math.random() * numeroMassimo) + 1;

	//if (bombe.indexOf(numeroGenerato) === -1) {
	if (mioIndexOf(bombe, numeroGenerato) === -1) {
		bombe.push(numeroGenerato);
	}
}

console.log("Bombe generate", bombe);

var bombaTrovata = false;
while (numeriInseriti.length < (numeroMassimo - NUMERO_BOMBE) && !bombaTrovata) {
	var numeroUtente = parseInt(prompt("Inserisci un numero"));

	if (mioIndexOf(numeriInseriti, numeroUtente) === -1) {
		if (mioIndexOf(bombe, numeroUtente) !== -1) {
			bombaTrovata = true;
		} else {
			numeriInseriti.push(numeroUtente);
		}
	} else {
		alert('Inserisci un numero differente');
	}
}

if (bombaTrovata) {
	alert('Hai perso, il tuo punteggio è: ' + numeriInseriti.length + '!');
} else {
	alert('Hai vinto, il tuo punteggio è: ' + numeriInseriti.length + '!');
}

*/