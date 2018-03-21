const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+ '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+ '/Soham'));

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);

  fs.appendFile('server.log', log+ '\n');
  next();
})

app.use((request,response, next) => {
  response.render('errorPage.hbs');
})

hbs.registerHelper('currentYear', ()=>{
  return new Date().getFullYear()
})

app.get('/', (request, response) => {
  response.render('Index.hbs',{
    titleName: 'Index',
  });
});

app.get('/contact', (request, response) => {
  response.render('contact.hbs',{
    contactNumber : '1234567890'
  });
});

app.get('/about', (request, response) => {
  response.send({
    name : 'Soham',
    age : '22',
    hobby : [
      'cricket',
      'drama'
    ]
  });
});

app.get('/bad', (request, response) =>{
  response.send({
    errorMessage : 'Bad request'
  });
});

app.listen(3000, ()=>{
  console.log('Server started');
});
