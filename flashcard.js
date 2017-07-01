// global variables
const inquirer = require('inquirer');
const clozeCard = require('./clozeCard.js');
const BasicCard = require('./BasicCard.js');
const fs = require('fs');
var simpleLibrary = [];
const clozeLibrary = [];
var correctAnswers = 0;
var wrongAnswers = 0;
var j;
var count;
var limit;
var n;
// initial game setup
<<<<<<< HEAD
function cards() {
     inquirer.prompt([{
               name: "command",
               type: "list",
               message: "What would you like to do today?",
               choices: ["Create Basic Flashcards", "Create ClozeCards", "Study my basic flashcards", "Study my ClozeCards", "Quit"]
          }

     ]).then(function(userResponse) {

          if (userResponse.command === "Quit") {
               console.log("user Quit");
          } else {
               switch (userResponse.command) {
                    case "Create Basic Flashcards":
                         getInfo('basiclog.txt');
                         break;

                    case "Study my basic flashcards":
                         basicQuiz(0, 'basiclog.txt');
                         break;

                    case "Create ClozeCards":
                         getInfo('clozeLog.txt');
                         break;

                    case "Study my ClozeCards":
                         basicQuiz(0, 'clozeLog.txt');
                         break;


               }
          }


     });
}
// get info function that collects data
function getInfo(log) {
=======
function cards(){
inquirer.prompt([{
          name: "name",
          message: "Hello, what is your name?"
     }, {
          type: "password",
          message: "Please set your password",
          name: "password"
     }, {
          type: "confirm",
          message: "Are you sure:",
          name: "confirm",
          default: true
     }, {
          name: "commad",
          type: "list",
          message: "What would you like to do today?",
          choices: ["Create Basic Flashcards", "Create ClozeCards", "Study my basic flashcards", "Study my ClozeCards", "Quit"]
     }

]).then(function(userResponse) {

     if (userResponse.commad === "Quit") {
          console.log("user Quit");
     } else {
          switch (userResponse.commad) {
               case "Create Basic Flashcards":
                    getInfo();
                    break;

               case "Study my basic flashcards":
                    basicQuiz(0);
                    break;

          }
     }


});
}
// get info function that collects data
function getInfo(basicCard) {
>>>>>>> master

     var front;
     var back;

     count = 0;


     if (count === 0) {
<<<<<<< HEAD
          limitPrompt(log);
     }
     // sets limit on how many flashcards user will create in this session

     function limitPrompt(log) {
=======
          limitPrompt();
     }
     // sets limit on how many flashcards user will create in this session

     function limitPrompt() {
>>>>>>> master

          inquirer.prompt([{
               type: "input",
               name: "limit",
               message: "How many flashcards will we be maikng today?"

          }])

          .then(function(answers) {
               limit = parseInt(answers.limit);
<<<<<<< HEAD
               cardData(log);
=======
               cardData();
>>>>>>> master
          });
     }
}
// collects data from user 
<<<<<<< HEAD
function cardData(log) {
     if (log === 'basiclog.txt') {
          inquirer.prompt([{
=======
function cardData() {
     inquirer.prompt([{
>>>>>>> master

               type: "input",
               name: "front",
               message: "Please enter the front of the flashcard, the question?"
          }, {
               type: "input",
               name: "back",
               message: "Now enter the back of the flashcard, the answer?"

<<<<<<< HEAD
          }]).then(function(answers2) {
=======
          }])
          .then(function(answers2) {
>>>>>>> master
               let front = answers2.front;
               let back = answers2.back;

               // creates flashcard wirh user inputs, then pushes new card to array
               // increments count by one every time card is created
               let newCard = new BasicCard(answers2.front, answers2.back);
               simpleLibrary.push(newCard);
               count++;

               // if count is less than limit, keep creating cards
               if (count < limit) {
<<<<<<< HEAD
                    cardData(log);

               }
               // if limit has been reached, log array of flashcards to external file for later use
               else if (count == limit) {
                    writeCards(log);


               }

          });

     } else {
          inquirer.prompt([{

               type: "input",
               name: "partial",
               message: "Please enter a statement with the most important part omitted, like so: is the chemical composition of water."
          }, {
               type: "input",
               name: "cloze",
               message: "Now enter the omitted part, like so: Water"

          }]).then(function(answers2) {
               let partial = answers2.partial;
               let cloze = answers2.cloze;

               // creates flashcard wirh user inputs, then pushes new card to array
               // increments count by one every time card is created
               let newCard = new BasicCard(answers2.partial, answers2.cloze);
               simpleLibrary.push(newCard);
               count++;

               // if count is less than limit, keep creating cards
               if (count < limit) {
                    cardData(log);
=======
                    cardData();
>>>>>>> master

               }
               // if limit has been reached, log array of flashcards to external file for later use
               else if (count == limit) {
<<<<<<< HEAD
                    writeCards(log);
=======
                    writeCards();
>>>>>>> master


               }

          });

<<<<<<< HEAD

     }

}

function writeCards(log) {

     simpleLibrary = JSON.stringify(simpleLibrary);
     fs.writeFile(log, simpleLibrary, function(err) {
=======
}

function writeCards() {

     simpleLibrary = JSON.stringify(simpleLibrary);
     fs.appendFile("./log.txt", simpleLibrary, function(err) {
>>>>>>> master
          // If the code experiences any errors it will log the error to the console.
          if (err) {
               return console.log(err);
          } else {
               console.log("success");
          }

     });
}

<<<<<<< HEAD
function readCard(log) {
     let basicCardArr = [];

     // Otherwise, it will print: "log.txt was updated!"
     fs.readFile(log, "utf8", function(error, data) {
=======
function readCard() {
     let basicCardArr = [];

     // Otherwise, it will print: "log.txt was updated!"
     fs.readFile("./log.txt", "utf8", function(error, data) {
>>>>>>> master

          // If the code experiences any errors it will log the error to the console.
          if (error) {
               return console.log(error);
          }
          // Then split it by commas (to make it more readable

          var jsonData = JSON.parse(data);

          for (let i = 0; i < jsonData.length; i++) {
               basicCardArr.push(jsonData[i]);

          }

     });
}

function lastCard(wrongAnswers, correctAnswers, j) {
<<<<<<< HEAD
     
     if (wrongAnswers + correctAnswers >= j) {

          console.log('\n\n\n\nHere\'s your results: ');
          console.log('correct: ' + correctAnswers);
          console.log('wrong: ' + wrongAnswers +"\n\n\n\n");
          correctAnswers = 0;
          wrongAnswers = 0;
          cards();
=======
     if ((wrongAnswers || correctAnswers >= j) || (wrongAnswers + correctAnswers >= j)) {

          console.log('Here\'s your results: ');
          console.log('correct: ' + correct);
          console.log('wrong: ' + wrong);
          correctAnswers = 0;
          wrongAnswers = 0;
          flashcards();
>>>>>>> master
     }

};


<<<<<<< HEAD
function basicQuiz(n, log) {
=======
function basicQuiz(n) {
>>>>>>> master
     var gameAnswer;
     var gameQuestion;
     var gameCard;

<<<<<<< HEAD
     fs.readFile(log, "utf8", function(error, data) {
=======
     fs.readFile("./log.txt", "utf8", function(error, data) {
>>>>>>> master

          let jsonData = JSON.parse(data);
          j = jsonData.length;

          if (n < jsonData.length) {

               if (jsonData[n].hasOwnProperty("front" || "back")) {

                    gameCard = new BasicCard(jsonData[n].front, jsonData[n].back);
                    gameQuestion = gameCard.front;
                    gameAnswer = gameCard.back.toLowerCase();

<<<<<<< HEAD
               } else {
                    gameCard = new ClozeCard(jsonData[n].partial, jsonData[n].cloze);
                    gameQuestion = gameCard.partial;
                    gameAnswer = gameCard.cloze.toLowerCase();
=======
>>>>>>> master
               }
               inquirer.prompt([{
                    name: "question",
                    message: gameQuestion,
                    validate: function(value) {

                         if (value.length > 0) {
                              return true;
                         }
                         return 'Come on, at least take a guess!';
                    }

               }]).then(function(answers3) {

                    if (answers3.question === gameAnswer) {
                         console.log("correct");
                         correctAnswers++;
                         n++;
<<<<<<< HEAD
                         lastCard(wrongAnswers, correctAnswers, j);
                         basicQuiz(n, log);
=======
                         lastCard();
                         basicQuiz(n);
>>>>>>> master

                    } else {
                         gameCard.showCorrectAnswer();
                         wrongAnswers++;
                         n++;
<<<<<<< HEAD
                         lastCard(wrongAnswers, correctAnswers, j);
                         basicQuiz(n, log);
                    }

               });
          }
     });


};


cards();
=======
                         lastCard();
                         basicQuiz(n);
                    }

               });

          };
     });
};
cards();
>>>>>>> master
