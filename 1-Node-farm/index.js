const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataobj = JSON.parse(data);

const slugs = dataobj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataobj.map((el) => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // PRODUCT
  } else if (pathname === "/product") {
    const product = dataobj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-header": "Hello Node",
    });
    res.end("<h1>Page Not Found</h1>");
  }
  
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
