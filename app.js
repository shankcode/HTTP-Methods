var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var friends_list = require("./public/data");

var PORT = process.env.PORT || 4001;


app.use(express.static("public"));
app.use(morgan('tiny'));

app.get("/friends", (req, res, next) => {
  res.send(friends_list);
})

app.get("/friends/:name", (req, res, next) => {
  var name = req.params.name;
  if(!friends_list[name]) {
    return res.status(404).send();
  }
  res.send(friends_list[name]);
})


app.listen(PORT, () => {
  console.log("Server is listening...")
})
