// test-dns.js
const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.kby7yzr.mongodb.net",
  (err, records) => {
    console.log(err);
    console.log(records);
  }
);