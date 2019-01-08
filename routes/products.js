var express = require('express');
var router = express.Router();

var rp = require('request-promise-native');

var options = {
    uri: 'https://amplifi-dev.myshopify.com/products.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (jsonData) {
        router.get('/', function(req, res, next) {
        console.log('fetching json from shopify');
            res.render('products', {title: "Products List", products: jsonData.products});
        });
    })
    .catch(function (err) {
        // API call failed...
        router.get('/', function(req, res, next) {
            console.log(err);

            res.render('error', err);
        });
    });

module.exports = router;