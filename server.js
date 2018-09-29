'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), (req,res)=>{
      if(req.file != undefined){
        var name = req.file.originalname, type = req.file.mimetype, size = req.file.size;
        res.json({name: name, type: type, size: size})
      }
      else{
        res.json({error: "file hasn't found found"})
      }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
