import fs from 'fs';

// Text file Read
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn);


// Text File Write
const textOut = `This is new text line and this is previous text from file: ${textIn}.\n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut)
console.log("File written");

