const express =require ('express');
const bodyParser = require('body-parser');
const request = require ('request');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//for css file and images
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', function(req, res){
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.email;

  const data = {
      members:[
        {
        email_address: email,
        status: 'subscribed',
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

const jsonData = JSON.stringify(data);

const url = 'https://us7.api.mailchimp.com/3.0/lists/8acdeecef3';

const options = {
  method: 'POST',
  auth: 'eman:2986123d700ebaf9f798915873aa8308-us7'
}

const request = https.request(url, options, function(response){

if(response.statusCode === 200){
  res.sendFile(__dirname + '/success.html')
}else{
  res.sendFile(__dirname + '/failure.html')
}

  response.on('data',function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});

app.post('/failure', function(req, res){
  res.redirect('/');
})



app.listen(process.env.PORT || 3000, function(){
  console.log('server on port 3000');
})
//api key
//2986123d700ebaf9f798915873aa8308-us7

//list id
//8acdeecef3
