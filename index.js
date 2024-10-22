var https = require('https')
var aws4 = require('aws4')

// to illustrate usage, we'll create a utility function to request and pipe to stdout
function request(opts) { https.request(opts, function(res) { res.pipe(process.stdout) }).end(opts.body || '') }

// aws4 will sign an options object as you'd pass to http.request, with an AWS service and region
let date = new Date()
var opts = {
  host: 'ds.wellnessliving.com',
  path: '/Wl/Business/AmazonRegion/AmazonRegion.json?a_business%5B0%5D=48137',
  service: 'wl-monolith',
  region: 'us-west-1',
  headers: {
    "X-Signature-Date": date.toISOString()
  }
}

aws4.sign(opts, { accessKeyId: process.env.AUTHORIZE_ID, secretAccessKey: process.env.AUTHORIZE_CODE })

console.log(opts)
console.log('---------------------------')
request(opts)

