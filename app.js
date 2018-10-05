var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var friends_list = require("./public/data");

var PORT = process.env.PORT || 4001;
let nextId = 13;

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
  } else if (Object.keys(friends_list.newFriends).includes(id)) {
    for (var key in friends_list.newFriends) {
      if (key === id) {
        req.show = friends_list.newFriends[key];
        next();
      }
    }
  } else {
      return res.status(404).send();
  }
});

//---------------------ROUTES---------------------------
app.get('/', (req, res) => {
  res.send('For Responses type "friends" in PATH field')
})

app.get("/friends/", (req, res) => {
  res.send(friends_list);
});

app.get("/friends/:id", (req, res) => {
      res.send(req.show);
});

app.post('/friends/', (req, res) => {
  var newdata = req.body.friend;
  console.log(newdata);
  if (newdata.name && newdata.lastname && newdata.occupation && newdata.place && newdata.contact) {
    friends_list.newFriends[nextId] = newdata;
    nextId++;
    res.send(newdata);
  } else {
    res.status(404).send();
  }
});

app.put('/friends/:id', (req, res) => {
  var update = req.body.friend;
  req.show.name = update.name;
  req.show.lastname = update.lastname;
  req.show.occupation = update.occupation;
  req.show.place = update.place;
  req.show.contact = update.contact;
  res.status(200).send(req.show);
});

app.delete('/friends/:id', (req, res) => {
  for (var key in req.show) {
    delete req.show[key];
  }
  --nextId;
  res.status(204).send("No Content");
})

//-----------------SERVER PORT INIT---------------------
app.listen(PORT, () => {
  console.log("Server is listening...")
})
