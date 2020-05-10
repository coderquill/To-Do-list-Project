const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var items=["Leetcode", "GFG"];
var workItems = [];

app.get("/", function(req, res){

  var today  = new Date();

  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render('list', {listTitle: day, newListItems:items});

});

app.post("/", function(req, res){
  var item = req.body.newItem;
  if(req.body.list ==="work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }

});


app.get("/work", function(req, res){
  res.render("list", {listTitle:"work List", newListItems:workItems});
});



app.listen(3000, function(req, res){
    console.log("Server is up & running at port 3000");
});
