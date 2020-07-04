const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields:{
              FNAME: firstName,
              LNAME: lastName

          }
        }
      ]
    };

    var jsonData = JSON.stringify(data);
     
    var options = {
      url: "https://us10.api.mailchimp.com/3.0/lists/d4ea2a18da",
      method: "POST",
      headers: {
        "Authorization": "sandeep9 7612b39c67708ec0cb2f5c67a8671f5e-us10"
      },
      body: jsonData
    };



    request(options, function (error, response, body) {
        if(error){
            res.send.sendFile(__dirname + "/failure.html");
        } else{
            if(response.statusCode === 200){
              res.sendFile(__dirname + "/success.html");
            } else{
              res.sendFile(__dirname + "/failure.html");
            }
        }
    });

})

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT ||3000, function(){
    console.log("Server is started at port 3000");
   
})

// API key
// 7612b39c67708ec0cb2f5c67a8671f5e-us10

// List key
// d4ea2a18da;