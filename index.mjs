import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
// const dataObj = JSON.parse(data)

// Create Server
const server = http.createServer((req, res)=>{
    // res.end('Hello From Server')
    const pathName = req.url;
    if(pathName=== '/' || pathName === '/overview'){
        res.end('This is OVERVIEW')
    }
    else if(pathName === '/product'){
        res.end('This is PRODUCT')
    }
    // Create Route for API
    else if(pathName === '/api'){
        res.writeHead(200, {
            'Content-type' : 'application/json'
        })
        res.end(data)
    }
    // Create Route for 404 Error
    else{
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header' : 'hello-world'
        })
        res.end('<h1>Page Not Found!</h1>')
    }
})

// Listen To Server
server.listen(8000, '127.0.0.1', ()=>{
    console.log('Listening to request on port 8000');
})



