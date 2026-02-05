module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

///////////////////////////
// FILES
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

// const textOut = `this is what we know about the Avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/Output.txt', textOut);
// console.log('File Written');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     console.log(data1);

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//      console.log(data2);

//      fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//          console.log(data3);

//          fs.writeFile('./txt/final.txt', `${data2}\n ${data3}`, 'utf-8', err => {
//              console.log("Your file is written Successfully");
//     })
// });

//     });
// });
// console.log('Will read file');

/////////////////////////
// SERVER