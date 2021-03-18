import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    baseUrl: { type: String },
    cookies: { type: String },
    hostname: { type: String },
    ip6: { type: String },
    protocol: { type: String },
    signedCookies: { type: String },
    ip4: { type: String },
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
    // userEmail: { type: String },
    sessionID_alekos: { type: String },
    sessionID: { type: String },
    session: { type: String },
    paid: { type: String },
    reqBody: { type: Object },
    reqHeaders: { type: Object },
    timestamp: { type: Number }
    },
  { timestamps: true }
);

const Data = mongoose.model("Data", userSchema);

export default Data;
