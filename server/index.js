const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "45c47a7be63f444ea34933a626cbe14b",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
  rollbar.info("file served");
});

app.get("/style", (req, res) => {
  res.sendFile(path.join(__dirname, "../style.css"));
  rollbar.info("css served");
});


//post name
app.post("/api/name", (req, res) => {
  rollbar.log("User added name");
  const { name } = req.body;
  let returnName = {
    name,
  };
  res.status(200).send(returnName);
  rollbar.log('name added successfully');
  rollbar.error('This name has already entered Oz');
  rollbar.warning('This person is with me');
  rollbar.critical('Stop pissing me off, that is not your name!');
  res.status(400).send('Stop pissing me off, that is not your name!')
});



const port = process.env.PORT || 4004;
app.use(rollbar.errorHandler());

app.use("/styles", express.static(path.join(__dirname, "../style.css")));

app.listen(port, () => {
  console.log(`listening on warp ${port}`);
});
