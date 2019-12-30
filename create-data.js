const fs = require('fs');
const https = require('https');

const emplTotal = 2000; // Number of employee records to create

global.numOfWillingToTakeTrip = 753;


const getPeople = (numberOfEmployees) => new Promise((resolve, reject) => {
	let url = "https://randomuser.me/api/?results=" + numberOfEmployees;

	https.get(url,(res) => {
		let body = "";
		res.setEncoding('utf8');
		res.on("data", (chunk) => {
			body += chunk;
		});

		res.on("end", () => {
			try {
				resolve(body);
			} catch (error) {
				console.error(error.message);
			};

		});

	}).on("error", (error) => {
		console.error(error.message);
	});
	
});

const rnd = (maxNum) => {
	
	maxNum = Math.floor(maxNum);
	return Math.floor(Math.random() * maxNum);
}

const generateWillingToTripStatus = () => {

	let rndVal = rnd(2);
	 
	if(numOfWillingToTakeTrip === 0){
		rndVal = 0; // Enough emplyee records genereted who want to take the trip
	} 
	if(rndVal === 1) {
		numOfWillingToTakeTrip--; 
	}
		
	return rndVal;
}	

const generateVisionDefect = () => {

	return rnd(2);
}

const generateTeams = () => {

	const teams = ["Alfa", "Beta", "Gamma", "Delta"];
	const rndTeam = teams[rnd(4)];	
	return rndTeam;
}	

const generateDistricts = () => {

	const districts = ["East", "West", "North", "South"];
	const rndDistrict = districts[rnd(4)];	
	return rndDistrict;
}

getPeople(emplTotal)
	.then( result => {
	
	const jsonPeople = JSON.parse(result);
	let ppl = jsonPeople.results;

	var idx = 1;
	
	const employees = ppl.map(({ name, dob, picture, }) => ({ 

        id: idx++,
        firstName: name.first,
        lastName: name.last,
        dateOfBirth: dob.date,
		age: dob.age,
		photo: picture.large,
		willingToTrip: generateWillingToTripStatus(),
		team: generateTeams(),
		district : generateDistricts(),
		visionDefect: generateVisionDefect()	
			
	}));
	
	//console.info(employees);

	if(numOfWillingToTakeTrip > 0) {
		console.log("Not enough number of employees in the database who may want to take the trip");
		console.log("We need ", numOfWillingToTakeTrip, " more.");
		console.log("Run this tool again, please.");
	} else {
		let data = JSON.stringify(employees, null, 2);
		try {
			fs.writeFileSync('employees.json', data);
			console.log("Employees data has been written to JSON file.");
		} catch (err) {
			console.error(err);
		}			
	}	
});
