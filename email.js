const express = require('express');
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();

app.use(express.static("public"));    //external css
app.use(bodyParser.urlencoded({extened:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
   const fName = req.body.firstname;
   const lName = req.body.lastname;
   const email = req.body.emailid;
   const data ={
    members: [
      {
         email_address:email,
         status : "subscribed",
         merge_fields : {
            FNAME :fName,
            LNAME : lName,
         }
  
      }
    ]
   };

  // /lists/{list_id}/members
   const jsonData = JSON.stringify(data);
   const url = "https://us10.api.mailchimp.com/3.0/lists/96478debdf";
   const options = {
      method:"POST",
      auth :"shaaN:01b30d8282b5afe84bb09fb0c27a6810-us10"
   }

   const request =https.request(url, options,function(response){
      if(response.statusCode===200){
         res.sendFile(__dirname + "/sucuss.html");
      }
      else{
         res.sendFile(__dirname + "/failure.html");
      }
    response.on("data",function(data){

      console.log(JSON.parse(data));
    });
   });
   request.write(jsonData);
   request.end();

});

app.post("/failure",(req,res)=>
   res.redirect("/")
);



app.listen(3000,()=>
console.log("server started at  port 3000")
);


// 01b30d8282b5afe84bb09fb0c27a6810-us10

// 96478debdf 

