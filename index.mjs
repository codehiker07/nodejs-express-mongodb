import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import url from "url";
import replaceTemplate from './modules/replaceTemplate.mjs';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Template Filling
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`./dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Create Server
const server = http.createServer((req, res) => {
  // res.end('Hello From Server')
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathName === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  // Create Route for API
  else if (pathName === "/api") {
    res.writeHead(200, {
        'Content-type' : 'application/json'
    })
    res.end(data);
  }
  // Create Route for 404 Error
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page Not Found!</h1>");
  }
});

// Listen To Server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});



