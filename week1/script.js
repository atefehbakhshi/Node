const fs = require("fs");
const http = require("http");
const url = require("url");

// /////////////////////////////
//File
/*===================================
//Blocking, synchronous way
// Read
const textIn = fs.readFileSync('./txt/input.txt','utf-8')
console.log(textIn)

// Write
const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`
fs.writeFileSync('./txt/output.txt',textOut)
===================================*/

/*===================================
//Non-blocking, asynchronous way
// Read and Write
fs.readFile("./txt/input5.txt", "utf-8", (err, data) => {
  if (err) return console.log(err);
  fs.writeFile("./txt/output.txt", data, "utf-8", (err) => {
    console.log("Your file has been written");
  });
});
===================================*/

// /////////////////////////////
//Server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj=JSON.parse(data)

const server = http.createServer((req,res)=>{
  const pathName = req.url;

  if(pathName==='/' || pathName==='/overview'){
    res.end('This is the OVERVIEW')
  }else if (pathName==='/product'){
    res.end('This is the PRODUCT')
  }else if(pathName==='/api'){
res.writeHead(200,{'Contente-type':'application/json'})
res.end(data)
  } else{
    res.writeHead(404,{
      'Content-type':'text/html',
      'my-own-header':'hello-world'
    })
    res.end('<h1>Page not found!</h1>')
  }
})
server.listen(8000,'127.0.0.1',()=>{
  console.log('Listen to request on port 8000')
})