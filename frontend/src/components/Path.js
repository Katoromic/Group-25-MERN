const app_name = "syntax-sensei";
exports.buildPath = function buildPath(route) {
  if (process.env.NODE_ENV === "production") {
    return "https://" + app_name + ".herokuapp.com/" + route;
  } else {
    return "http://localhost:5500/" + route;
  }
}
