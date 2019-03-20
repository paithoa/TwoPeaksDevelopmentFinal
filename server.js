//require the just installed express app
var express = require('express');
//then we call express
var app = express();
var axios = require('axios');
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
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
app.use(express.urlencoded())
app.set('view engine', 'ejs');

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

var port = process.env.PORT || 8080;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

axios.get('https://newsapi.org/v2/everything?q=realestate&language=en&apiKey=5fceaf94ac074d09a5e22cafcbd49b34')
.then(response => {
  news = response.data
  final= news.articles

 console.log(shuffle(final))


})
.catch(error => {
  console.log(error);
});

axios.get('https://newsapi.org/v2/top-headlines?country=au&category=business&apiKey=5fceaf94ac074d09a5e22cafcbd49b34')
.then(response => {
  financenews = response.data
  finalfinance = financenews.articles
 



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


app.post('/submit-form', (req, res) => {
  const username = req.body.user.name
  const email = req.body.user.email
  const subject = req.body.subject
  const message = req.body.message
  //...
  res.end()
  console.log(username)


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'handyhasan301197@gmail.com',
    pass: 'Paithoa301197'
  }
});

var mailOptions = {
  from: 'handyhasan301197@gmail.com',
  to: 'derrick.t@twopeaksdevelopment.com',
  subject: subject,
  text: "name: " + username + "/n"+ "message: " + message +"/n "+ "email: " + email
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})

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
