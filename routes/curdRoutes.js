const router = require("express").Router();
let friends_list = require("../public/data.json");
let fs = require("fs");

//---------------------- Middleware ------------------------//

// Generate NextId for adding new entry, nextId = 1 (i.e total id exist + 1)
function IdGenerator(req, res, next) {
  let nextId = 1;
  Object.keys(friends_list).forEach(section => {
    let a = Object.keys(friends_list[section]).length;
    nextId += a;
  });
  req.nextId = nextId;
  next();
}

//Find friend and his/her section (boys, girls, newFriends)
router.param("id", (req, res, next, id) => {
  let friendSection = Object.keys(friends_list).find(section => {
    if (Object.keys(friends_list[section]).includes(id)) {
      return section;
    }
  });
  if (friendSection) {
    req.show = friends_list[friendSection][id];
    req.section = friendSection;
    next();
  } else {
    return res.status(404).send();
  }
});

// @type          ::    GET
// @route         ::    /friends/
// @desc          ::    route to get All FRIEND LIST
// @access        ::    PUBLIC
router.get("/", (req, res) => {
  res.send(friends_list);
});

// @type          ::    GET
// @route         ::    /friends/:id
// @desc          ::    route to get FRIEND with ID
// @access        ::    PUBLIC
router.get("/:id", (req, res) => {
  res.send(req.show);
});

// @type          ::    POST
// @route         ::    /friends/
// @desc          ::    route to ADD FRIEND to list
// @access        ::    PUBLIC
router.post("/", IdGenerator, (req, res) => {
  let newdata = req.body;
  console.log(newdata);
  if (
    newdata.name &&
    newdata.lastname &&
    newdata.occupation &&
    newdata.place &&
    newdata.contact
  ) {
    //write(append) data to the JSON file
    friends_list.newFriends[req.nextId] = newdata;
    fs.writeFile(
      "./public/data.json",
      JSON.stringify(friends_list),
      "utf8",
      err => {
        if (err) throw err;
        else {
          console.log(req.nextId);
        }
      }
    );
    res.status(201).send(friends_list.newFriends[req.nextId]);
  } else {
    res.status(404);
  }
});

// @type          ::    PUT
// @route         ::    /friends/:id
// @desc          ::    route to MODIFY FRIEND detail using ID
// @access        ::    PUBLIC
router.put("/:id", (req, res) => {
  let update = req.body;
  friends_list[req.section][req.params.id] = update;
  //write/update modified data to the JSON file
  fs.writeFile(
    "./public/data.json",
    JSON.stringify(friends_list),
    "utf8",
    err => {
      if (err) throw err;
    }
  );
  res.status(200).send(friends_list[req.section][req.params.id]);
});

// @type          ::    DELETE
// @route         ::    /friends/:id
// @desc          ::    route to DELETE FRIEND details using ID
// @access        ::    PUBLIC
router.delete("/:id", (req, res) => {
  friends_list[req.section][req.params.id] = {};
  //update JSON file with deleted content removed
  fs.writeFile(
    "./public/data.json",
    JSON.stringify(friends_list),
    "utf8",
    err => {
      if (err) throw err;
    }
  );
  res.status(204).send({ successDelete: true, content: {} });
});

module.exports = router;
