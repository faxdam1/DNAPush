
var http = require("https");

const endpoint = process.env.ENDPOINTELASTIC;
const user = process.env.USERELASTIC;
const password = process.env.PASSWORDELASTIC;

exports.handler = async function (event, context) {

    if (event.Records.length == 0) {
        return {};
    }

    let bulk = '';
    const index = { "index": { "_index": "dna", "_type": "doc" } };
    for (let record of event.Records) {
        const body = record.body;
        const message = JSON.parse(JSON.parse(body).Message);
        bulk = bulk + JSON.stringify(index) + '\n';
        bulk = bulk + JSON.stringify(message) + '\n';
    }
    bulk = bulk + '\n';

    var options = {
        "method": "POST",
        "hostname": endpoint,
        "port": null,
        "path": "/dna/_bulk",
        "headers": {
            "content-type": "application/json",
            "authorization": "Basic " + Buffer.from(user + ':' + password).toString("base64"),
            "cache-control": "no-cache",
            "postman-token": "5224e6ec-2ec5-32e3-1983-944d10a58f12"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            var body = Buffer.concat(chunks);
        });
    });

    req.write(bulk);
    req.end();
    return {};

}

