const express = require('express');
const mysql = require('mysql');
const connection = require('./connection');
const app = express();
const fs = require('fs');
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var data = JSON.parse(fs.readFileSync('nav1.json'));

// end point for dealing huge data

app.post('/insertData',(req,res)=>{

	data["data"].forEach(function(item){
		var id = item["id"];
		var SD = JSON.stringify(item);

		connection.query('insert into studentData(id,SD) values(?,?)',[id,SD],(err,rows)=>{
			if (err) throw err
			console.log("done")
		})

	})

	res.send("done")
})

// for getting all the data 

app.get('/student',(req,res)=>{
	connection.query('select * from studentData',(err,rows)=>{
		if(err) throw err
		res.send(rows);
	})
})


// for getting specific student details 

app.get('/student/:id',(req,res)=>{
	var id = req.params.id;

	connection.query('select SD from studentData where id = ? ',[id],(err,rows)=>{
		if(err)throw err
		res.send(JSON.parse(rows[0]["SD"]));
	})

})


app.listen(2000,(err)=>{
	if(err)throw err
	console.log("your port is working!");
})




































