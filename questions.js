/*
Open Trivia, Trivia Questions from https://opentdb.com/api_config.php
*/

var https = require("https");
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

var url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=boolean&encode=url3986";

https.get(url, function(response) {
	
	var reply = "";
	
	response.on("data", function(chunk){
		reply += chunk;
	});

	response.on("end", function(chunk){
		if(response.statusCode === 200){
			try{
				var question = JSON.parse(reply);
				//var questions = JSON.stringify(question);
				var numb = Math.floor(Math.random()*10);
				answer = decodeURIComponent(question.results[numb].correct_answer);
				console.log("===Trivia Questions===");
				console.log("Answer with either True of False");
				console.log(decodeURIComponent(question.results[numb].question));
				console.log("Your Answer (then press the Enter key):");
			}catch(error){
				console.log("Something went wrong, pls try again.");
			}
		} else {
			console.log("Something went wrong, pls try again.");
		}
	});	
});

function done(value) {
  if (value === 1) {
    console.log("You are correct!!");
  } else {
    console.log("You gave an incorrect answer!!");
  }
  process.exit();
}

process.stdin.on('data', function (text) {
  if (text == answer+ "\r\n" || text == answer.toLowerCase()+ "\r\n") {
    done(1);
  }else {
    done();
  }
});
