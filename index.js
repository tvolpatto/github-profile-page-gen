var inquirer = require("inquirer");
var fs = require('fs');
var axios = require('axios');

const questions = [
    {
      type: "input",
      message: "What´s your Github username?",
      name: "username" 
    },
    {
        type: "list",
        message: "What is your favorite color?",
        name: "colors",
        choices: [
          "blue", 
          "red", 
          "pink", 
          "green"
        ]
      }
];

function writeToFile(fileName, data) {
 
}

function init() {
  inquirer.prompt(questions).then(function(answers) {
      console.log(answers);
  });
}

init();
