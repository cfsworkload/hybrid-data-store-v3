var request = require('request');
var async = require('async');
var url = require('url');

var defaults = {
  openstackIdentityTokensKeystone: "/v2.0/tokens",
  openstackIdentityTokensNative: "/auth/v1.0"
};


var getTokensKeystone = exports.getTokens = exports.getTokensKeystone = function (options, callback) {
  var uri = url.parse(options.host);
  uri.pathname = defaults.openstackIdentityTokensKeystone;
  var targetURL = url.format(uri);
  request(
    {
      method: 'POST',
      uri: targetURL, 
      json: {"auth": options.auth},
      headers: {"Accept": "application/json"}
    },
    function (err, res, body) {
      var tokens = {};
      if (!err && res && res.statusCode && res.statusCode === 200) {
        var respBody = body;
        tokens.id = respBody.access.token.id;
        tokens.expires = respBody.access.token.expires;
        
        async.detect(
          respBody.access.serviceCatalog,
          function (item, cb) {
            var doesMatch = (item.type === 'object-store') && (item.name === options.storageName);
            return cb(doesMatch);
          },
          function (matchingItem) {
              var region = null;
              var i = 0;
        	  while(region != 'dallas'){
           		      region = respBody.access.serviceCatalog[i].endpoints[0].region;
        		      i = i+1
        	  }
              tokens.storageUrl = respBody.access.serviceCatalog[i-1].endpoints[0].publicURL;
              return callback(err, res, tokens);
          }
        );
      } else {
        if(!err) {
          err = new Error("request unsuccessful, statusCode: " + res.statusCode);
        }
        return callback(err, res, tokens);
      }
    }
  );
};
