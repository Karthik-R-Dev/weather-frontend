const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()
app.use(express.static("public"))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})




app.post("/",function(req,res){

   const query = req.body.cityName;
   const apiKey = "a94b04ddce127b76fdbf54ef74d81e4a";
   const unit = "metric"
   const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
   https.get(url,function(response){
       console.log(response.statusCode);

       response.on("data",function(data){
           const weatherData = JSON.parse(data);
           const temperature = weatherData.main.temp;
           const description = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
           res.write("<p>The weather is currently " + description+"</p>");
           res.write("<h1>The weather in " + query + " is " + temperature + " degrees Celcius.</h1>");
           res.write("<img src = "+ imageurl +">");
           res.send();
       })
   });
})


                /*if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }*/



app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(4000, function(){
    console.log("server is running on port 4000")
})