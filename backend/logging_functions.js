import Data from "../backend/models/data";

export function logging(req, res, duration, userEmail) {
  // req object
  console.log("REQUEST OBJECT");
  console.log("Process ID: " + process.pid);
  console.log(req.header("User-Agent"));
  console.log(req.headers.host);
  console.log("req.baseUrl: " + req.baseUrl);
  console.dir(req.cookies);
  console.dir(req.fresh);
  console.dir(req.hostname);
  console.dir(req.ip);
  console.dir(req.ips);
  console.dir(req.protocol);
  console.dir(req.signedCookies);
  console.dir(req.method);
  console.dir(req.originalUrl);
  console.dir(req.params);
  console.dir(req.path);
  console.dir(req.query);
  console.dir("req route: " + JSON.stringify(req.route));
  console.dir(req.stale);
  console.dir(req.subdomains);
  console.dir(req.xhr);
  console.dir(req.accepts("json"));
  console.dir("Bytes read: " + req.connection.bytesRead);
  console.dir("Bytes written: " + req.connection.bytesWritten);
  // res object
  console.log("RESPONSE OBJECT");
  console.log("User signed in");
  //   console.log(res.header());
  console.log(res.statusCode);
  console.log(res.statusMessage);
  console.dir("Bytes read: " + res.connection.bytesRead);
  console.dir("Bytes written: " + res.connection.bytesWritten);
  console.dir("Duration: " + JSON.stringify(duration));
  console.dir("User Email: " + userEmail);
  const mongoObject = new Data({
    baseUrl: req.baseUrl,
    ip: req.ip,
    method: req.method,
    cookies: req.cookies,
    hostname: req.hostname,
    ips: req.ips,
    protocol: req.protocol,
    signedCookies: req.signedCookies,
    originalUrl: req.originalUrl,
    params: req.params,
    path: req.path,
    query: req.query,
    stale: req.stale,
    subdomains: req.subdomains,
    xhr: req.xhr,
    hostHeader: req.headers.host,
    reqBytesRead: req.connection.bytesRead,
    reqBytesWritten: req.connection.bytesWritten,
    statusCode: res.statusCode,
    statusMessage: res.statusMessage,
    resByteRead: res.connection.bytesRead,
    resByteWritten: res.connection.bytesWritten,
    duration: duration,
    userEmail: userEmail
  });

  return mongoObject;
}
