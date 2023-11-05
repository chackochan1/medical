const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://admin:XcEoIMMZZ0hQB1CT@cluster0.0exknwe.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});



// Define a schema for your data
const dataSchema = new mongoose.Schema({
  value1: Number,
  value2: Number,
  value3: Number,
  value4: Number,
  value5: Number,
  value6: Number,
});

// Create a Mongoose model based on the schema
const DataModel = mongoose.model("Data", dataSchema);



app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  ///////fetching location,pH,moisture from input//////
  const value1=req.body.Value1;
  const value2=req.body.Value2;
  const value3=req.body.Value3;
  const value4=req.body.Value4;
  const value5=req.body.Value5;
  const value6=req.body.Value6;
console.log(value1);
// Create a new instance of the DataModel with the values
const newData = new DataModel({
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
});

try {
  // Save the data to MongoDB
   newData.save();
  console.log("Data saved to MongoDB:", newData);

  // Sending a response
  res.sendFile(__dirname + "/index.html");
 
} catch (error) {
  console.error("Error saving data to MongoDB:", error);
  res.status(500).send("Error saving data to MongoDB");
}
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
