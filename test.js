const express = require("express")
const app = express()
const fs = require("fs");
const Moralis = require("moralis").default;
var formidable = require('formidable');
var multer  =   require('multer');
const { EvmChain } = require('@moralisweb3/common-evm-utils');
var fileTOIPFS = null;
let alert = require('alert'); 
var bodyParser = require('body-parser');
var startedMoralis = false;
var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './uploads');  
  },  
  filename: function (req, file, callback) {  
    fileTOIPFS = file.originalname
    console.log(fileTOIPFS)
    callback(null, file.originalname);  
  }  
});  
var upload = multer({ storage : storage}).single('myfile'); 

async function startMoralis()
{
  await Moralis.start({
    apiKey: "8eORD5qJgGXoxwFGWjHVI7SualZIcBu174kozRijTRU8PvszGdN3txAKHMes4kGW",
});
}
async function getWalletBalance()
{
  const address = '0x5591DbD938DC9e81cDA5a92807D2d268743dC16b';
  const chain = EvmChain.SEPOLIA;
  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  });
  
  console.log(response.toJSON());
}

async function uploadToIpfs(filename) {

  

  const uploadArray = [
      {
          path: filename,
          content: fs.readFileSync('./uploads/'+filename, {encoding: 'base64'})
      },
      
  ];

  const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
  });

  console.log(response.result)
  console.log(typeof response.result)
  var s = JSON.stringify(response.result).trim()
  s= s.substring(1,s.length-1)
  console.log(s)
  fs.appendFile('message.txt',','+ s, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
  



app.use(express.static(__dirname, { // host the whole directory
    extensions: ["html", "htm", "gif", "png"],
}))

app.get("/", (req, res) => {
  if(!startedMoralis) 
  {startMoralis();
    startedMoralis = true;
    getWalletBalance();
  }
res.sendFile(__dirname + "/upload.html")

})

app.post('/uploadjavatpoint',function(req,res){  
  upload(req,res,function(err) {  
      if(err) {  
          return res.end("Error uploading file.");  
      }  
      //res.end("File is uploaded successfully!"); 
      console.log(req.body);
      uploadToIpfs(fileTOIPFS);
      res.sendFile(__dirname + "/upload_success.html")
  });  
  
});  

app.get("*", (req, res) => {
return res.sendStatus(404)
})


const server = app.listen(3000, () => { // create a HTTP server on port 3000
  console.log(`Express running → PORT ${server.address().port}`)
  });