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

function getData() {
  inquirer.prompt(questions).then(function(answers) {
    
    if (answers.username === "") {
      throw new Error("Invalid 'username'!");
    }

    const queryUrl = `https://api.github.com/users/${answers.username}`;

    axios.get(queryUrl).then(function (res) {     
      const repos = res.data;
      console.log(repos);
    });
  
  }).catch(function (err) {
    console.log(err);
  });
}

function init() {
 getData();

}

init();
