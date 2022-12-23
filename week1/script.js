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

const replaceTemplate=(temp,product)=>{
  let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
  output = output.replace(/{%IMAGE%}/g,product.image);
  output = output.replace(/{%PRICE%}/g,product.price);
  output = output.replace(/{%FROM%}/g,product.from);
  output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
  output = output.replace(/{%QUANTITY%}/g,product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g,product.description);
  output = output.replace(/{%ID%}/g,product.id);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
  return output
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Contente-type": "text/html" });

const cardsHtml= dataObj.map(el=>replaceTemplate(tempCard,el)).join('');
const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
console.log(cardsHtml)

    res.end(output);

    // Product page
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");

    // API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Contente-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listen to request on port 8000");
});
