require("express");
require("mongodb");

exports.setApp = function (app, client) {
  app.post("/api/addcard", async (req, res, next) => {
    // incoming: userId, color
    // outgoing: error
    const { userId, card, jwtToken } = req.body;
    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }
    const newCard = { Card: card, UserId: userId };
    var error = "";
    try {
      const db = client.db();
      const result = db.collection("Cards").insertOne(newCard);
    } catch (e) {
      error = e.toString();
    }
    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }
    var ret = { error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });

  // Login
  //
  // incoming: login, password
  // outgoing: token, error
  //
  app.post("/api/login", async (req, res, next) => {

    const { login, password } = req.body;

    const db = client.db("MainDatabase");
    const results = await db
      .collection("Users")
      .find({ Username: login, Password: password })
      .toArray();
    
    let token = null;
    let error = "";

    if (results.length > 0)
    {
      let id = results[0]._id;
      let fn = results[0].FirstName;
      let ln = results[0].LastName;
      let verified = results[0].Verified;
      
      // Create the token
      try
      {
        const JWT = require("./createJWT.js");
        token = JWT.createToken(fn, ln, verified, id).accessToken;
      }
      catch (e)
      {
        error = e.message;
      }
    }
    else
    {
      error = "Login/Password incorrect";
    }

    let ret = { token: token, error: error };
    
    res.status(200).json(ret);
  });

  app.post("/api/searchcards", async (req, res, next) => {
    // incoming: userId, search
    // outgoing: results[], error
    var error = "";
    const { userId, search, jwtToken } = req.body;
    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: "The JWT is no longer valid", jwtToken: "" };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }
    var _search = search.trim();
    const db = client.db();
    const results = await db
      .collection("Cards")
      .find({ Card: { $regex: _search + ".*", $options: "i" } })
      .toArray();
    var _ret = [];
    for (var i = 0; i < results.length; i++) {
      _ret.push(results[i].Card);
    }
    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }
    var ret = { results: _ret, error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });
};
