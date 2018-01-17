const express = require('express');
const router = express.Router();
const client = require('mariasql');

var c = new client({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  db:'srcAddress'
});

router.get('/', (req, res) => {
  res.send('api works');
});


router.get('/address', (req,res) => {
  c.query('SELECT * FROM addressBook', function(err, rows) {
    if (err)
      throw err;

    res.status(200).json(rows);
  });
});

router.post('/newaddress', (req,res) => {
  //console.dir(req.body);
  c.query("INSERT INTO srcAddress.addressBook (entryname, companyname, recipientname, street1, street2, city, state, zip) VALUES ('"+req.body.entryname+"', '"+req.body.companyname+"', '"+req.body.recipientname+"', '"+req.body.street1+"', '"+req.body.street2+"', '"+req.body.city+"', '"+req.body.state+"', '"+req.body.zip+"')", function(err,rows) {
    if (err)
      throw err;
  });
});


module.exports = router;
