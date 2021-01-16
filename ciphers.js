// Global variables --> alphabet,length of alphabet
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var length = alphabet.length;

// Cipher 1 function 

function rowTrans(keyword, plaintext) {
    // Amount of columns is keyLength
    // Amount of symbols in column and amount of rows is Math.floor(charArray.length / keyLength)
    // fKey is the filtered keyword --> letters as numbers in the alphabet (ex: a is 0, b is 1, c is 2 ....)
    var keyLength = keyword.length;
    var fKey = aOrder(keyword); // Stores values in an array 
   // console.log(fKey);
    var charArray = plaintext.toLowerCase().split("").filter(chars => chars !== " ");
    if (charArray.length % keyLength !== 0) {
        var symbolsAndRows = Math.floor((charArray.length / keyLength) + 1);
    } else {
        var symbolsAndRows = Math.floor(charArray.length / keyLength);
    }
    // Creating the matrix for our cipher
    // We create the rows first (symbolsAndRows)
    // The plus one is for the row that will hold the key
    var myMatrix = new Array(symbolsAndRows + 1);

    for (var i = 0; i < myMatrix.length; i++) {
        myMatrix[i] = new Array(keyLength);
    }

    // Add the key to the beginning of the matrix array 
    for (var keyPos = 0; keyPos < keyLength; keyPos++) {
        myMatrix[0][keyPos] = fKey[keyPos];
    }

  
    // Introduce a variable with values from 0 to the matrix length - 1
    var trans = 0;
    // Create a variable for the maximum row in our matrix
    var maxRow = myMatrix.length - 1;
    var codedString = "";

    // Insert the letters into the matrix
    for (var j = 1; j < myMatrix.length; j++) {

        if (j > 1) {
            trans++;
        }

        for (var k = 0; k < keyLength; k++) {

            // Depending on row, apply letters in different order
            if (j == 1) {
            	myMatrix[j][k] = charArray[k];
            } else {
                myMatrix[j][k] = charArray[k + (keyLength * trans)];
            }
            

            // Check last row for empty spaces and insert random letters as filler

            if (typeof myMatrix[maxRow][k] === "undefined") {
                myMatrix[maxRow][k] = alphabet[Math.floor(Math.random() * length)];
            }


        }
    }

    // Create iterations counter 
    var counter = 0;
    // Print out the columns -> from lowest column number in myMatrix[0] to highest number in myMatrix[0]
    for (var iter = keyLength; iter >= 1; iter--) {
        counter++;
        // Look for smallest value on the 0-th row, print the values below it and remove the smallest value from the 0-th row
        // Also, filter out the "checked + currCol" strings ---> they equal NaN(Not Any Number) so they must be removed
        var minArray = Math.min.apply(Math,myMatrix[0].filter(function(n) { return !isNaN(n); }));
        var currCol = myMatrix[0].indexOf(minArray);
        // Replace the current lowest column number with the string "c" + currCol (current column number index)
        // "c" stands for "column is checked,its members have been added to the output string"
        myMatrix[0].splice(currCol,1, "c" + "-" + minArray);
        for (var m = myMatrix.length - 1; m >= 1; m--) {
            for (var b = keyLength - counter; b >= 0; b--) {
                codedString += "" + myMatrix[m][currCol];
                break;
            }
        }
    }


    // Print matrix to console
    console.log(myMatrix);
    // Return encoded string
    return codedString;

}

// Cipher 2 functions 

function viginereAuto(origKey) {
    // origKey is the string form of the key --> example : fruit, furry, gibberish
    // Get result of first cipher in a variable
    var cipherOne = document.getElementById('firstCipher').innerHTML;
    // The result is stored here 
    var output = "";
    // Save the difference between the key length and plaintext length here
    var diff = cipherOne.length - origKey.length;
    // Create a substring from the Cipher 1 text, starting at char 0 and ending at the value 
    // of the diff variable
    var appDiff = cipherOne.substring(0, diff);
    // Save the result of the new key (with appended chars from plaintext)
    // in a new variable
    var autoKey = origKey + "" + appDiff;
    // Create a new converted key from our autokey
    var nConvKey = filterKey(autoKey);
    for (var i = 0, j = 0; i < cipherOne.length; i++) {
        var c = cipherOne.charCodeAt(i);
        output += String.fromCharCode((c - 97 + nConvKey[j % nConvKey.length]) % 26 + 97);
        j++;
    }
    console.log(output);
    return output;

}

// Helper functions ---> get user input 

function getInput() {
	// Get the DOM element for the button that will activate the encoding process
    var button = document.getElementById('getString');
    var input = document.getElementById('encodeStr');
    var firCipher = document.getElementById('encodeKeyOne')
    var secCipher = document.getElementById('secondCipher');
    var userData, firKey = "";
    button.addEventListener("click", function(e) {
        e.preventDefault();
        userData = input.value;
        firKey = firCipher.value;
        var fCipher = rowTrans(firKey, userData);
        firstCipherOut(fCipher);
        var key = document.getElementById('encodeKeyTwo').value;
        var vigResult = viginereAuto(key);
        secCipher.innerHTML = vigResult;
    });
}

function firstCipherOut(enString) {
    var elem = document.querySelector("#firstCipher");
    elem.innerHTML = enString;
}

function filterKey(key) {
    var result = [];
    for (var i = 0; i < key.length; i++) {
        var c = key.charCodeAt(i);
        result.push((c - 65) % 32);
    }
    return result;
}

function aOrder(key) {
    var result = key.split("").map(function(x) { return (x.charCodeAt(0) - 65) % 32 }); // one liner for filterKey(key) function
    var sorted = result.slice(0).sort(function(a, b) { return a - b });
    var columnNumbers = result.map(function(x) {
        var index = sorted.indexOf(x);
        sorted[index] = 0; // reset value in case of duplicate chars
        return index + 1;
    });
    return columnNumbers;
}



// Function calls,etc.
getInput();