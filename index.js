var HTMLBuilder = require("./generateHTML");
var inquirer = require("inquirer");
var fs = require('fs');
var axios = require('axios');
var htmlToPdf = require('html-pdf');
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

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

const htmlData = {
  color: "",
  profile: {}
};

function writeToFile(data) {
  const html = new HTMLBuilder().generateHTML(data);
  htmlToPdf.create(html).toFile('./profile.pdf', function(err, res) {
    if (err) return console.log(err);
    
    console.log(res); 
  });
}

function inquiryUser() {
  inquirer.prompt(questions).then(function(answers) {    
   
    htmlData.color = answers.colors;   
    callGithubUserAPI(answers.username);
    
  }).catch(function (err) {
    console.log(err);
  });
}

function callGithubUserAPI(username) {
  if (username === "") throw new Error("The 'username' cannot be empty");

  const queryUrl = `https://api.github.com/users/${username}`;

  axios.get(queryUrl).then(function (res) {     
    htmlData.profile = res.data;
    writeToFile(htmlData);
  
  });
}

function init() {
  inquiryUser();
}

init();