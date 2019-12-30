//get all the libraries needed
const express = require('express');
const fs = require('fs');


try {
	const employeesRawData = fs.readFileSync('employees.json', 'utf8');
	var employeesData = JSON.parse(employeesRawData);
	//console.log(employeesData);
} catch (err) {
	console.error(err);
}

const rnd = (maxNum) => {
	
	maxNum = Math.floor(maxNum);
	return Math.floor(Math.random() * maxNum);
}

const getRandomEmployee = () => {
	
	let rndEmployeeRecord = employeesData[rnd(2000)];
	return rndEmployeeRecord;
}

const getRandomEmployeeTrip = () => {
	
	let rndEmployeeRecord = getRandomEmployee();
	do {
		rndEmployeeRecord = getRandomEmployee();
	} while (rndEmployeeRecord.willingToTrip === 0);	
	
	let obj = [rndEmployeeRecord];
	return obj;
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
	let obj = [firstRndEmployeeRecord, secondRndEmployeeRecord];
	return obj;
}

// Setting up the express server app
var app = express();

// CORS(Cross-Origin-Resource-Sharing) disable
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
	const rndEmployee = getRandomEmployeeTrip();
	console.log("Server response:", rndEmployee);
	res.statusCode = 200;
	res.json(rndEmployee);
});

app.get("/get-pair-employees", (req, res, next) => {
	const pairEmployees = getPerfectPairOfEmployees();
	console.log("Server response:", pairEmployees);
	res.statusCode = 200;
	res.json(pairEmployees);
});


