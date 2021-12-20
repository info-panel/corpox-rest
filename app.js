const express = require('express');
const fs = require('fs');
import employeesData from 'employees.json';

const rnd = (maxNum) => {
	return Math.floor(Math.random() * Math.floor(maxNum));
}

const listEmployeesWillingToTrip = () => {
	let listWilling = [];
	for(let i=0; i<employeesData.length(); i++) {
		if(employeesData.willingToTrip = 1) {
			listWilling.push(employeesData[i]);
		}	
	}
	return listWilling;
}

const getRandomEmployee = (selectedEmployees) => {
	return selectedEmployees[rnd(selectedEmployees.length())];
}

const getPerfectPairOfEmployees = () => {
	const firstRndEmployeeRecord = getRandomEmployee();
	let secondRndEmployeeRecord = getRandomEmployee();
	
	while (
		(firstRndEmployeeRecord.team === secondRndEmployeeRecord.team)	||
		(firstRndEmployeeRecord.age === secondRndEmployeeRecord.age)	||
		(firstRndEmployeeRecord.district === secondRndEmployeeRecord.district)	||
		((firstRndEmployeeRecord.visionDefect + secondRndEmployeeRecord.visionDefect) > 1)
		) {
		secondRndEmployeeRecord = getRandomEmployee();
		//console.log("first:", firstRndEmployeeRecord.team, " age:", firstRndEmployeeRecord.age, "second:", secondRndEmployeeRecord.team, " age:", secondRndEmployeeRecord.age);	
	} 
	console.log("first:", firstRndEmployeeRecord.team, " age:", firstRndEmployeeRecord.age, "second:", secondRndEmployeeRecord.team, " age:", secondRndEmployeeRecord.age); 		
	return [firstRndEmployeeRecord, secondRndEmployeeRecord];
}

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,PATCH");
  res.header("Access-Control-Allow-Credentials: true"); 
  next();
});

app.listen(5000, () => {
 console.log("CORPOX Server running. For testing open: http://localhost:5000/get-random-employee");
});


app.get("/", (req, res, next) => {
 res.json("CORPOX Server running. Good luck!");
});

app.get("/get-random-employee", (req, res, next) => {
	const rndEmployee = getRandomEmployee();
	console.log("Server response:", rndEmployee);
	res.json(rndEmployee);
});

app.get("/get-pair-employees", (req, res, next) => {
	const pairEmployees = getPerfectPairOfEmployees();
	console.log("Server response:", pairEmployees);
	res.json(pairEmployees);
});


