var fs = require('fs');
var express = require("express");
var app = express();
var fetch = require('node-fetch');

app.get("/", function(request, response) {

    fs.readFile("./employeeDetails.json", function(err, data) {
        var employeeList = JSON.parse(data);
        response.send(employeeList);
    })
});


app.get("/user/:username", function(request, response) {
    fetch("http://localhost:3000/").then(response => response.json()).then(data => {
        var filteredUsers = data.employeeDetails.filter((data) => {
            return data.name.toLowerCase() == request.params.username.toLowerCase() ? true: false;
        })

        response.send(filteredUsers);
    })
})

app.listen(3000);