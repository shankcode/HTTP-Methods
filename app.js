var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var friends_list = require("./public/data");

var PORT = process.env.PORT || 4001;

//-------------------MIDDLEWARES----------------------
app.use(express.static("public"));
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.param("id", (req, res, next, id) => {
  var id = id;
  if (Object.keys(friends_list.boys).includes(id)) {
    for (var key in friends_list.boys) {
      if (key === id) {
        req.show = friends_list.boys[key];
        next();
      }
    }
  } else if (Object.keys(friends_list.girls).includes(id)) {
    for (var key in friends_list.girls) {
      if (key === id) {
        req.show = friends_list.girls[key];
        next();
      }
    }
  } else {
    return res.status(404).send();
  }
});

//---------------------ROUTES---------------------------
app.get("/friends/", (req, res, next) => {
  res.send(friends_list);
});

app.get("/friends/:id", (req, res) => {
      res.send(req.show);
});

app.post('/friends/:id', (req, res, next) => {
  var newId = req.query;
  console.log(newId);
});

app.put('/friends/:id', (req, res, next) => {

});

app.delete('friends/:id', (req, res, next) => {
  req.show = null;
  res.send(req.show);
})

//-----------------SERVER PORT INIT---------------------
app.listen(PORT, () => {
  console.log("Server is listening...")
})
