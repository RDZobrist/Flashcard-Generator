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

     var front;
     var back;

     count = 0;


     if (count === 0) {
          limitPrompt(log);
     }
     // sets limit on how many flashcards user will create in this session



     function limitPrompt(log) {
          inquirer.prompt([{
               type: "input",
               name: "limit",
               message: "How many flashcards will we be maikng today?"

          }])

          .then(function(answers) {
               limit = parseInt(answers.limit);
               cardData(log, limit);

          });
     }
}
// collects data from user 


function cardData(log, limit) {
     if (log === 'basiclog.txt') {

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
                         cardData(log, limit);

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
                    cardData(log, limit);


               }
               // if limit has been reached, log array of flashcards to external file for later use
               else if (count == limit) {
                    writeCards(log);


               }

          });


     }

}

function writeCards(log) {

     simpleLibrary = JSON.stringify(simpleLibrary);
     fs.writeFile(log, simpleLibrary, function(err) {



          // If the code experiences any errors it will log the error to the console.
          if (err) {
               return console.log(err);
          } else {
               console.log("success");
          }

     });
}




function lastCard(wrongAnswers, correctAnswers, j) {


     if (wrongAnswers + correctAnswers >= j) {

          console.log('\n\n\n\nHere\'s your results: ');
          console.log('correct: ' + correctAnswers);
          console.log('wrong: ' + wrongAnswers + "\n\n\n\n");
          correctAnswers = 0;
          wrongAnswers = 0;
          cards();


     }
};




function basicQuiz(n, log) {

     var gameAnswer;
     var gameQuestion;
     var gameCard;


     fs.readFile(log, "utf8", function(error, data) {


          let jsonData = JSON.parse(data);
          j = jsonData.length;

          if (n < jsonData.length) {

               if (jsonData[n].hasOwnProperty("front" || "back")) {

                    gameCard = new BasicCard(jsonData[n].front, jsonData[n].back);
                    gameQuestion = gameCard.front;
                    gameAnswer = gameCard.back.toLowerCase();

               } else {
                    gameCard = new ClozeCard(jsonData[n].partial, jsonData[n].cloze);
                    gameQuestion = gameCard.partial;
                    gameAnswer = gameCard.cloze.toLowerCase();

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
                         lastCard(wrongAnswers, correctAnswers, j);
                         basicQuiz(n, log);



                    } else {
                         gameCard.showCorrectAnswer();
                         wrongAnswers++;
                         n++;

                         lastCard(wrongAnswers, correctAnswers, j);
                         basicQuiz(n, log);
                    };
               });
          };
     });
};


cards();
