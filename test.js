const express = require("express")
const app = express()
const fs = require("fs");
const Moralis = require("moralis").default;
var formidable = require('formidable');
var multer  =   require('multer');
var fileTOIPFS = null;
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

async function uploadToIpfs(filename) {

  await Moralis.start({
      apiKey: "8eORD5qJgGXoxwFGWjHVI7SualZIcBu174kozRijTRU8PvszGdN3txAKHMes4kGW",
  });

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
}
  



app.use(express.static(__dirname, { // host the whole directory
    extensions: ["html", "htm", "gif", "png"],
}))

app.get("/", (req, res) => {
res.sendFile(__dirname + "/upload.html")

})

app.post('/uploadjavatpoint',function(req,res){  
  upload(req,res,function(err) {  
      if(err) {  
          return res.end("Error uploading file.");  
      }  
      res.end("File is uploaded successfully!"); 
      uploadToIpfs(fileTOIPFS);
  });  
  
});  

app.get("*", (req, res) => {
return res.sendStatus(404)
})


const server = app.listen(3000, () => { // create a HTTP server on port 3000
  console.log(`Express running → PORT ${server.address().port}`)
  });