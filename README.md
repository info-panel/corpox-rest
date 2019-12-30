# CORPOX-REST is an example project using NodeJS and ExpressJS

The CORPOX-REST code is part of a CORPOX project. It consists of two web applications:

1. CORPOX-REST - this part - the REST (Representational State Transfer) server using JSON format for data interchange.
2. CORPOX-UI - second part - uses QUASAR VueJS fully responsive solution to present selected data in a convenient way on all possible devices.

#Discription

The main aim is to generate JSON data of one or two employees from larger collection under certain conditions:

1. we have at least 753 employees willing to take part in a trip.

2. apart from name and photo, we need to store information about:

- age
- district where she or he lives
- team at work where she or he belongs to
- if she or he is vision impaired

A **'employees.json'** file stores 2000 random employees records to choose from.

You can generate a new file using a tool **'create-data.js'**.
Random data with user names, ages and profile photos from RANDOMUSER.ME are mapped adding random and required fields. 
The hardcoded number of employees to be created can be changed to higher value.

The main REST server file 'app.js' uses Express JS library that makes GET requests quite easy to implement.

Two public RESTful API endpoints are available for requests:

- **Pick a random employee** (/get-random-employee)

Corpox company has to send one of its employees for 2-weeks delegation. 753 employees are willing to take that trip. Corpox needs you to write a tool, that will help to randomly choose one of the employees.

- **Pair up** - an integration party will be organized for its employees. (/get-pair-employees)

In one of the games, manager plans to pair up employees together. For purpose of the integration, employees should not know each other very well, so manager put few reasonable constraints:

- Employees in pair should not regularly work in the same team
- Employees in pair should not be in the same age
- Employees that live in the same city district should not be in pair
- Both of employees in pair should not have defect of vision


# Pre-requisites

Install NodeJS from [https://nodejs.org](https://nodejs.org)

# Cloning the Code

Clone the code using the following command

```bash
git clone https://github.com/info-panel/corpox-rest.git
```
# Running the Application

Install the npm packages using the following command 

```bash
npm install
```

Start the application using the following command 

```bash
node app.js
```

The application runs on **localhost:5000/**

# Testing the Application

Open: 

http://localhost:5000/get-random-employee

or 

http://localhost:5000/get-pair-employees

to see JSON data.

# Live example

A live runnning application can be tested on [corpox.infopanel.eu](http://corpox.infopanel.eu)
