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

const htmlData =  {
  color: "",
  profile :{}
}

function writeToFile(fileName, data) {
     fs.writeFile(fileName, data, function(err) {
       if (err) {
         return console.log(err);
       }
       createPDF();
     });
}

function createHTML(htmlData) {
  const html = new HTMLBuilder().generateHTML(htmlData);
  writeToFile("index.html", html);
}

function createPDF() {
  const options  = {format: 'Letter'};
  readFileAsync("index.html", "utf8").then(function(data) {
    htmlToPdf.create(data, options).toFile('./profile.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); 
    });
  });
}

function getData() {
  inquirer.prompt(questions).then(function(answers) {
    
    if (answers.username === "") {
      throw new Error("Invalid 'username'!");
    }

    htmlData.color = answers.colors;
    const queryUrl = `https://api.github.com/users/${answers.username}`;

    axios.get(queryUrl).then(function (res) {     
      htmlData.profile = res.data;
      createHTML(htmlData);

    });
  
  }).catch(function (err) {
    console.log(err);
  });
}

function init() {
 getData();

}

init();
