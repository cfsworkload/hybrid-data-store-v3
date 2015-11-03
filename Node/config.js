var debug = require('debug')('medicar');
var path = require('path');

// Hard coded name from object store container used in this demonstration. Export it to make it available to other modules. 
module.exports.container = "HDScontainer";

module.exports.containerDestroy = false;//(nconf.get('CAR_OSV2_PUBLIC_CONTAINER_DESTROY').toLowerCase() === 'true');

module.exports.tmp = 'tmp';
module.exports.HOSTNAME = 'HOSTNAME';
module.exports.group_id = 'group_id';

// on premise credentials. export them and make them available to other modules
module.exports.onpremHost = "cap-sg-prd-1.integration.ibmcloud.com"//nconf.get('CAR_SG').onpremHost;
module.exports.onpremPort = "15395"conf.get('CAR_SG').onpremPort;

