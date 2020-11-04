import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    baseUrl: { type: String },
    cookies: { type: String },
    hostname: { type: String },
    ips: { type: Array },
    protocol: { type: String },
    signedCookies: { type: String },
    ip: { type: String },
    method: { type: String },
    originalUrl: { type: String },
    params: { type: Array },
    path: { type: String },
    query: { type: Array },
    stale: { type: String },
    subdomains: { type: Array },
    xhr: { type: String },
    hostHeader: { type: String },
    reqBytesRead: { type: String },
    reqBytesWritten: { type: String },
    statusCode: { type: String },
    statusMessage: { type: String },
    resBytesRead: { type: String },
    resBytesWritten: { type: String },
    duration: { type: String },
    userEmail: { type: String }
  },
  { timestamps: true }
);

const Data = mongoose.model("Data", userSchema);

export default Data;
