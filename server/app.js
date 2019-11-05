/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format
    
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    if(req.url.match(/^\/api\//)){
        const urlData = req.url.split('?'); // 0: url, 1: querystring
        const url = urlData[0];
        var querystring = {}
        if(urlData[1]){
            const paramvalues = urlData[1].split('&');
            for(var k in paramvalues){
                var paramvalue = paramvalues[k].split('=');
                querystring[paramvalue[0]] = paramvalue[1];
            }
        }
        switch(url.substring(5)){
            case 'products/all':
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(data));
            break;
            case 'products':
                res.writeHead(200, {"Content-Type": "application/json"});
                var rd = data;
                if(querystring.query){
                    rd = data.filter(o => o.isActive && ~o.name.toLowerCase().indexOf(querystring.query.toLowerCase()));
                }
                var fullinfo = {
                    length: rd.length,
                    data: rd
                }
                res.end(JSON.stringify(fullinfo));
            break;
            case 'products/preview':
                res.writeHead(200, {"Content-Type": "application/json"});
                if(querystring.query){
                    var rd = data;
                    rd = data.filter(o => o.isActive && ~o.name.toLowerCase().indexOf(querystring.query.toLowerCase()));
                    var fullinfo = {
                        length: rd.length,
                        data: rd.length > 4 ? rd.slice(1,5) : rd
                    }
                    res.end(JSON.stringify(fullinfo));
                } else {
                    res.end(JSON.stringify({length: 0, data: []}));
                }
                
            break;
            default:
                res.write("Nothing matches at " + url); // Write out the default response
                res.end(); //end the response
        }
    } else {
        res.write("Response goes in here..."); // Write out the default response
        res.end(); //end the response
    }
}).listen( port );


console.log(`[Server running on ${hostname}:${port}]`);
