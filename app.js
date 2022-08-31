const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var path = require('path');
var mysql = require('mysql');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var JDOM = jsdom.JSDOM;

const app = express();
app.use(cookieParser());

var quit=0;
var login=0;

/* creazione variabile connection */
var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'mydb'
});

con.connect(function(err){
    if (err) throw err;  
    console.log("Connected!");  
    /* creazione database */
    con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result){  
      if (err) throw err;  
      console.log("Database connected");  
    });  
    var sql = "CREATE TABLE IF NOT EXISTS users (id INT, name VARCHAR(255),email VARCHAR(255), password VARCHAR(255), Provincia VARCHAR(255))";  
    con.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log("Table exist or created");  
    });  
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname+'/'));

app.post('/login', function(request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query('SELECT * FROM users WHERE name = ? AND password = ?', [username, password], function(error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.username = username;
        // Redirect to home page
        response.redirect('/home');
      } else {
        response.send('Incorrect Username and/or Password!');
      }     
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

app.get('/home', function(req, res) {
    //render index
    res.sendFile(path.join(__dirname + '/index.html'));
});

/*app.post('/login', function(req,response){
  console.log("Ricevuto una richiesta POST");
  // contenuto della richiesta
  // username
  var a=req.body.username;
  var b=req.body.password;
  var c=req.body.email;
  var uname="";
  var id="";
  // Select database
  con.query("SELECT * FROM users", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err){
      throw err;
      //response.send('Incorrect Username and/or Password!');
    }
    // if there is no error, you have the result
    for(i=0;i<result.length;i++)
    {
      var c_name = result[i].name;
      var pass=result[i].password;
      if(a==c_name&&quit==0)
      {
        if(b==pass)
        {
         quit=1;
         console.log("Login effettuato");
         uname=c_name;
         console.log(uname);
         id=result[i].id;
         login=1;
         res.sendFile(path.join(__dirname + '/index.html'));
         //response.redirect('/index.html');
        }
      }
    }
    console.log(login);
    if(login==1)
    {
     console.log("ciao");
    // response.writeHead(200,{"Set-Cookie":'data='+uname +','+id,"Location":"http://localhost:5000/index.html"}).send();

     response.cookie("username",uname);
     response.redirect('http://localhost:5000/');
    }
  });
});
*/

//registrazione
app.post('/registrati', function(req,res){
    console.log("Ricevuto una richiesta POST");
    // contenuto della richiesta
    console.log(req.body);
    // username
    var a=req.body.username;
    var b=req.body.password;
    var c=req.body.email;
    var d=req.body.provincia;
    var i=0;
    // select id
    var sql="SELECT id FROM users";
  
    //var sql = "INSERT INTO users (id,name,email, password,provincia) VALUES ?";
    var values = [  
          [i,a ,c ,b,d ]];
          var max;

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      //console.log("err");
      if(result==""){
          max=1;
          console.log("funz");
      }
      else
      {
        console.log(result.length);
        max=result[0].id;
        for(i=0;i<result.length;i++)
        {
          if(result[i].id>=max)
          {
            max=result[i];
          }
        }
        max=max+1;
      }
      var sql = "INSERT INTO users (id,name,email, password,provincia) VALUES ?";
      var values = [[max,a ,c ,b,d ]];

      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("ok");   
      });
  });

  res.cookie("username",a);
  res.redirect('http://localhost:5000/index.html');
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});