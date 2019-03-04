let express = require("express");
let app = express();
let morgan = require("morgan");
let bodyParser = require("body-parser");

//----------- HTTP to HTTPS Redirects ------------//
app.use((req, res, next) => {
  if (
    req.headers["x-forwarded-proto"] !== "https" &&
    process.env.NODE_ENV === "production"
  ) {
    var secureUrl = "https://" + req.headers["host"] + req.url;
    res.writeHead(301, { Location: secureUrl });
    res.end();
  }
  next();
});

// ------------------- MIDDLEWARES ---------------------- //
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(bodyParser.json());

// --------------- Basic Route ---------------- //
app.get("/", (req, res) => {
  res.send('For Responses type "friends" in PATH field');
});

// --------------- Requiring and Mounting Routes ------------------ //
const curdRoutes = require("./routes/curdRoutes");
app.use("/friends", curdRoutes);

// ------------------- SERVER PORT INIT --------------------- //
let PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}...`);
});
