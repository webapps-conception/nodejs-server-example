/* Exemple de serveur nodejs avec différentes routes
https://www.knowledgehut.com/blog/web-development/node-http-server
*/

const http = require('http');
const fs = require('fs').promises; 

const host = '127.0.0.1';
const port = 3000;

const items = JSON.stringify([
 { itemName: "Measuring Tape", manufacturer: "3M", quantity: 52 },
 { itemName: "DrillBit", manufacturer: "Bosch", quantity: 47 }
]);
const manufacturers = JSON.stringify([
 { name: "3M", countryOfOrigin: "America", partnerSince: 2019 },
 { name: "Bosch", countryOfOrigin: "Germany", partnerSince: 2014 }
]);

/**
 * return contents text
 * @param   {string} req  Requête
 * @param   {string} res  Resultat
 * @return  {string}       Null
 */
function hello(req, res) {
 res.writeHead(200);
 res.end("Hello from Server!");
 return;
}

/**
 * return contents application/json
 * @param   {string} req  Requête
 * @param   {string} res  Resultat
 * @return  {string}       Null
 */
function json_msg(req, res) {
 res.setHeader("Content-Type", "application/json");
 res.writeHead(200);
 res.end(`{"sample message": "This is a sample JSON response"}`);
 return;
}

/**
 * return contents text/html
 * @param   {string} req  Requête
 * @param   {string} res  Resultat
 * @return  {string}       Null
 */
function html_msg(req, res) {
 res.setHeader("Content-Type", "text/html");
 res.writeHead(200);
 res.end(`<html><body><h2><Strong>This is HTML</h2></body></html>`);
 return;
}

/**
 * return contents text/html
 * @param   {string} req  Requête
 * @param   {string} res  Resultat
 * @return  {string}       Null
 */
function html_index(req, res) {
 fs.readFile(__dirname + "/../public/index.html")
 .then(contents => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(contents);
  return;
 })
 .catch(err => { 
  res.writeHead(500);
  res.end(err);
  return;
 });
}

/**
 * return items application/json
 * @param   {string} req  Requête
 * @param   {string} res  Resultat
 * @return  {string}       Null
 */
function json_items(req, res) {
 res.setHeader("Content-Type", "application/json");
 res.writeHead(200);
 res.end(items);
 return;
}

/**
 * return manufacturers application/json
 * @param   {string} req  Requête
 * @param   {string} res  Resultat
 * @return  {string}       Null
 */
function json_manufacturers(req, res) {
 res.setHeader("Content-Type", "application/json");
 res.writeHead(200);
 res.end(manufacturers);
 return;
}

/**
 * return route error
 * @param   {string} req  Requête
 * @param   {string} res  Resultat
 * @return  {string}       Null
 */
function route_error(req, res) {
 res.setHeader("Content-Type", "application/json");
 res.writeHead(404);
 res.end(JSON.stringify({error:"Resource not found"}));
 return;
}

const requestListener = function (req, res) {
 switch (req.url) {
 case "/hello":
   hello(req, res);
   break;
 case "/json":
   json_msg(req, res);
   break;
 case "/msg":
   html_msg(req, res);
   break;
 case "/":
   html_index(req, res);
   break
 case "/index.html":
   html_index(req, res);
   break
 case "/items":
   json_items(req, res);
   break
 case "/manufacturers":
   json_manufacturers(req, res);
   break
 default:
   route_error(req, res)
 }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
 console.log(`Server is running on http://${host}:${port}`);
});
