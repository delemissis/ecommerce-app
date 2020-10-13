var bunyan = require("bunyan");
var log = bunyan.createLogger({
  name: "bunyan-log",
  streams: [
    {
      level: "debug",
      path: __dirname + "/logs/logsFront.log", // log ERROR and above to a file
    },
  ],
});

module.exports = log;

log.debug("YEAH");
