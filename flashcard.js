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

     var front;
     var back;

     count = 0;


     if (count === 0) {
          limitPrompt();
     }
     // sets limit on how many flashcards user will create in this session

     function limitPrompt() {

          inquirer.prompt([{
               type: "input",
               name: "limit",
               message: "How many flashcards will we be maikng today?"

          }])

          .then(function(answers) {
               limit = parseInt(answers.limit);
               cardData();
          });
     }
}
// collects data from user 
function cardData() {
     inquirer.prompt([{

               type: "input",
               name: "front",
               message: "Please enter the front of the flashcard, the question?"
          }, {
               type: "input",
               name: "back",
               message: "Now enter the back of the flashcard, the answer?"

          }])
          .then(function(answers2) {
               let front = answers2.front;
               let back = answers2.back;

               // creates flashcard wirh user inputs, then pushes new card to array
               // increments count by one every time card is created
               let newCard = new BasicCard(answers2.front, answers2.back);
               simpleLibrary.push(newCard);
               count++;

               // if count is less than limit, keep creating cards
               if (count < limit) {
                    cardData();

               }
               // if limit has been reached, log array of flashcards to external file for later use
               else if (count == limit) {
                    writeCards();


               }

          });

}

function writeCards() {

     simpleLibrary = JSON.stringify(simpleLibrary);
     fs.appendFile("./log.txt", simpleLibrary, function(err) {
          // If the code experiences any errors it will log the error to the console.
          if (err) {
               return console.log(err);
          } else {
               console.log("success");
          }

     });
}

function readCard() {
     let basicCardArr = [];

     // Otherwise, it will print: "log.txt was updated!"
     fs.readFile("./log.txt", "utf8", function(error, data) {

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
     if ((wrongAnswers || correctAnswers >= j) || (wrongAnswers + correctAnswers >= j)) {

          console.log('Here\'s your results: ');
          console.log('correct: ' + correct);
          console.log('wrong: ' + wrong);
          correctAnswers = 0;
          wrongAnswers = 0;
          flashcards();
     }

};


function basicQuiz(n) {
     var gameAnswer;
     var gameQuestion;
     var gameCard;

     fs.readFile("./log.txt", "utf8", function(error, data) {

          let jsonData = JSON.parse(data);
          j = jsonData.length;

          if (n < jsonData.length) {

               if (jsonData[n].hasOwnProperty("front" || "back")) {

                    gameCard = new BasicCard(jsonData[n].front, jsonData[n].back);
                    gameQuestion = gameCard.front;
                    gameAnswer = gameCard.back.toLowerCase();

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
                         lastCard();
                         basicQuiz(n);

                    } else {
                         gameCard.showCorrectAnswer();
                         wrongAnswers++;
                         n++;
                         lastCard();
                         basicQuiz(n);
                    }

               });

          };
     });
};
cards();