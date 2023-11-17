
//the available character choices for user's password
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numericList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var upperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var specialChar = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "=", ">", "<", "?", "@", "^", "_", "`", "{", "|", "{", "~"];
var pwGenerated = [];
//create generate password 

function generatePassword() {


  var charAmount = prompt("How many characters would you like your PW to be? Please enter at least 8 and no more than 128.");

  var placeHolder = document.querySelector("#password[placeholder]").textContent;

  // allow user to cancel out of generate password prompt.
  if (charAmount === null) {
    if (pwGenerated) {
      return pwGenerated.join("");
    }
    return placeHolder;
  }
  // THEN I choose a length of at least 8 characters and no more than 128 characters
  if (charAmount < 8 || charAmount > 128 || isNaN(charAmount) === true) {

    alert("Invalid response. Please enter at least 8 but not more than 128.");
    return generatePassword();
  }
  else {
    pwCriteria.charAmount = charAmount;
  }

  //prompt function
  promptUser();

  // confirm whether or not to include lowercase, uppercase, numeric, and/or special characters 
  if (pwGenerated) {
    pwGenerated = [];
    // run the random character function over the value that user entered for charAmount
    for (var i = 0; i < charAmount; i++) {
      randomChar();
    }
  }
  // returns the generated password without the commas included
  return pwGenerated.join("");
};

//function for this so if all equal false we can have the questions be asked again
function promptUser() {

  // ask if they want to include capital letters
  var confirmCapital = confirm("Would you like to include capital letters?");
  pwCriteria.includeUpper = confirmCapital;

  // ask if they want to include lowercase letters
  var confirmLower = confirm("Would you like to include lower case letters?");
  pwCriteria.includeLower = confirmLower;

  // ask if they want to include numbers
  var confirmNum = confirm("Would you like to include numbers?");
  pwCriteria.includeNum = confirmNum;

  // ask if they want to include special characters
  var confirmSpecial = confirm("Would you like to include special characters?");
  pwCriteria.includeSpecial = confirmSpecial;

  //check if the values all equal false - if so will rerun user prompts
  if (pwCriteria.includeUpper === false && pwCriteria.includeLower === false && pwCriteria.includeNum === false && pwCriteria.includeSpecial === false) {
    alert("You selected to not include any characters! Try again! ");
    return promptUser();
  }
}


// create user object to hold answers to prompts to determine how to generate password
var pwCriteria = {
  charAmount: 0,
  includeUpper: null,
  includeLower: null,
  includeNum: null,
  includeSpecial: null
}

// create a function that pulls a random character from newly created array based on user's responses

function randomChar() {
  // create an empty array that adds the specific character arrays from above only if their pwCriteria === true
  var pwCharArray = [];

  if (pwCriteria.includeUpper === true) {
    pwCharArray = pwCharArray.concat(upperCase);
  }

  if (pwCriteria.includeLower === true) {
    pwCharArray = pwCharArray.concat(lowerCase);
  }

  if (pwCriteria.includeNum === true) {
    pwCharArray = pwCharArray.concat(numericList);
  }

  if (pwCriteria.includeSpecial === true) {
    pwCharArray = pwCharArray.concat(specialChar);
  }


//THEN a password is generated that matches the selected criteria
  var randomCharSelected = pwCharArray[Math.floor(Math.random() * pwCharArray.length)];

  return pwGenerated = pwGenerated.concat(randomCharSelected);

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

