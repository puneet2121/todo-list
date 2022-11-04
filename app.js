const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs')
let items = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let today = new Date();

let options = {
  day:'numeric',
  month:'long',
  year: 'numeric'
}
let date = today.toLocaleDateString('en-us',options);
app.get('/',(req,res) => {
   
  res.render('lists',{theDay: date, tango:items })
  
});

app.post('/',(req,res) => {
  let item = req.body.t
  items.push(item)
  res.redirect('/')
})
app.listen(3000,() => {
  console.log('server listening on 3000')
})
