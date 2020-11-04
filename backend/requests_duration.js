export function request_duration(start, req, res) {
  console.log("INSIDE REQUEST DURATION FUNCTION");
  let duration = 0;
  const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  };

  res.on("finish", () => {
    duration = getDurationInMilliseconds(start);
  });
  return duration;
}

// const getDurationInMilliseconds = (start) => {
//   const NS_PER_SEC = 1e9;
//   const NS_TO_MS = 1e6;
//   const diff = process.hrtime(start);

//   return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
// };

// // res.on("finish", () => {
// //   const durationInMilliseconds = getDurationInMilliseconds(start);
// //   console.log(
// //     `${req.method} ${
// //       req.originalUrl
// //     } [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`
// //   );
// // });

// const duration = res.on("close", () => {
//   const durationInMilliseconds = getDurationInMilliseconds(start);
//   console.log(
//     `${req.method} ${
//       req.originalUrl
//     } [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`
//   );
//   return durationInMilliseconds.toLocaleString();
// });
// console.log(duration);
// return duration;
