var fs = require('fs');
var express = require("express");
var app = express();
var fetch = require('node-fetch');

var employeeList = [];
var projectList = [];

var baseUrl = "http://localhost:4000/";

app.get("/getemployeelist", function(request, response) {

    fs.readFile("./employeeDetails.json", function(err, data) {
        data = JSON.parse(data)
        employeeList = data.employeeListDetails;
        response.send(employeeList);
    })
});

app.get("/getprojectlist", function(request, response) {

    fs.readFile("./projectDetails.json", function(err, data) {
        data = JSON.parse(data)
        projectList = data.projectListDetails;
        response.send(projectList);
    })
});


app.get("/getuserdetails/:userid", function(request, response) {
    var filteredUsers = null;
    var filteredProject = null;
    new Promise((resolve) => {
        fetch(baseUrl + "getemployeelist").then(response => response.json()).then(data => {

            filteredUsers = data.filter((data) => {
                return data.employeeId == request.params.userid ? true: false;
            });


            fetch(baseUrl + "getprojectlist").then(response => response.json()).then(projectData => {

                filteredProject = projectData.filter((data) => {
                    return data.id == filteredUsers[0].projectId ? true: false;
                });

                var selectedUser = filteredUsers[0];

                selectedUser["projectName"] = filteredProject[0].projectName;
                selectedUser["projectLocation"] = filteredProject[0].projectLocation;
                selectedUser["projectDuration"] = filteredProject[0].projectDuration;

                resolve(selectedUser);
    
            })

        })
    }).then((data) => {
        response.send(data);
    })
})

app.listen(4000);