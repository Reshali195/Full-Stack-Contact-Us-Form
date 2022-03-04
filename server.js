const express = require('express')
const app = express()
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const cors = require("cors");
require("dotenv").config();
app.use(cors());

app.use(express.static("public"));

const htmlfile = __dirname + "/src/pages/index.html";

app.get("/", (req, res) => {
  res.status(200).sendFile(htmlfile);
});

//database connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let contactSchema = new Schema({  //schema creation
  Name: { type: String, required: true },
  Emails: { type: String, required: true },
  Details: { type: String, required: true },
});

let Contact = mongoose.model("Contact", contactSchema);

//Post request
app.post(
  "/api",
  bodyParser.urlencoded({ extended: false }),
  (request, response) => {
    const { name, email, project } = request.body;


    const contact = new Contact({
      Name: name,
      Emails: email,
      Details: project,
    });
    
    //pusing data to dtabase 
    
    contact.save((error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log("succesfull--------------");
        response.status(200).sendFile(htmlfile);
      }
    });
  }
);

app.listen(3000, () => {
  console.log("server is listening at 3000 pprt.......");
});
