//require the just installed express app
var express = require('express');
//then we call express
var app = express();
var axios = require('axios');
var bodyParser = require("body-parser");

var bestSellers=[]
var task=[]
var project = [1,2,3]
var news=[]
var final=[]
var finalfinance=[]
var id;
var newid;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');


var port = process.env.PORT || 8080;

axios.get('https://newsapi.org/v2/top-headlines?q=property&apiKey=5fceaf94ac074d09a5e22cafcbd49b34')
.then(response => {
  news = response.data
  final = news.articles



})
.catch(error => {
  console.log(error);
});

axios.get('https://newsapi.org/v2/top-headlines?country=au&category=business&apiKey=5fceaf94ac074d09a5e22cafcbd49b34')
.then(response => {
  financenews = response.data
  finalfinance = financenews.articles
  console.log(finalfinance)


})
.catch(error => {
  console.log(error);
});

//takes us to the root(/) URL
app.get('/', function(req, res){
   res.render('index',{task:task,bestSellers:bestSellers});
});

app.get('/aboutus',function(req,res){

  res.render('aboutus')
});

app.get('/investmentoption',function(req,res){

  res.render('investmentoption')
});

app.get('/investmentrelation',function(req,res){

  res.render('investmentrelation')
});

app.get('/missionandvalue',function(req,res){

  res.render('missionandvalue')
});

app.get('/newsandmedia',function(req,res){

console.log(final)
  res.render('newsandmedia',{final:final,finalfinance:finalfinance})
});

app.get('/partners',function(req,res){

  res.render('partners')
});

app.get('/projects',function(req,res){
  res.render('projects',project)
});

app.get('/projects/:id',function(req,res){
  id= req.params.id
  newid = parseInt(id)
  console.log(typeof newid)
  res.render('project', {newid})
});

app.get('/contact-us',function(req,res){
  res.render('contact-us')
});

/*
app.post('/addtask', function (req, res) {
    console.log("called")
    var newTask = req.body.newtask;

//test
//add the new task from the post route into the array
    task.push(newTask);
    console.log(task)
//after adding to the array go back to the root route
    res.redirect("/");
});

app.post('/removetask',function(req,res){

  var taskChecked = req.body.check
  for(i=0;i<taskChecked.length;i++){
    var index =  task.indexOf(taskChecked[i])
    console.log(index)
      task.splice(index,1)
  }
console.log("task finished:" + taskChecked)
console.log(task)
  taskCompleted.push(taskChecked)
  res.redirect("/")
});

*/
//the server is listening on port 3000 for connections
app.listen(port, function () {
  console.log('Example app listening on port ' + port)
});
