require("express");
require("mongodb");
require("bcrypt");

exports.setApp = function (app, client, bcrypt) {
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

    let token = null;
    let error = "";


    // Connect to database
    let users = null;
    try
    {
      users = client.db("MainDatabase").collection("Users");
    }
    catch (e)
    {
      error = e.message;
    }

    if (users != null)
    {
      const result = await users.findOne({ Username: login });
      
      if (result != null)
      {
        const auth = await bcrypt.compare(password, result.Password);

        if (auth)
        {
          let id = result._id;
          let fn = result.FirstName;
          let ln = result.LastName;
          let verified = result.Verified;
          
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
      }
      else
      {
        error = "Login/Password incorrect";
      }
    }

    let ret = { token: token, error: error };
    
    res.status(200).json(ret);
  });

  // Signup
  //
  // Incoming: FirstName, LastName, Email, Username, Password
  // Outgoing: token, error
  //
  app.post("/api/signup", async (req, res, next) => {
    
    const { FirstName, LastName, Email, Username, Password } = req.body;

    let token = null;
    let error = "";

    // Connect to database
    let users = null;
    try
    {
      users = client.db("MainDatabase").collection("Users");
    }
    catch (e)
    {
      error = e.message;
    }

    if (users != null)
    {
      // Check if Username is available

      const existingUser = await users.findOne({ Username: Username });
      
      if (existingUser == null)
      {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(Password, salt);

        // Add user to database

        const newUser = await users.insertOne({ FirstName: FirstName, LastName: LastName, Email: Email, Username: Username, Password: hashedPassword, Verified: false });

        // Create the token
        try
        {
          const JWT = require("./createJWT.js");
          token = JWT.createToken(FirstName, LastName, false, newUser.insertedId).accessToken;
        } 
        catch (e)
        {
          error = e.message;
        }
      }
      else
      {
        error = "Username already exists";
      }
    }

    // Return results

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

  // Process email verification link
  //
  app.get('/verify/:token', (req, res) => {

    const { token } = req.params;

    try
    {
      const JWT = require("./createJWT.js");

      if (JWT.isExpired(token))
      {
        res.status(200).send('The verification link has expired :(');
      }
      else if (JWT.isVerified(token))
      {
        res.status(200).send('This account is already verified :(');
      }
      else
      {
        // Actually change the verification status in the database
        res.status(200).send('Yay! Your account is now verified :)');
      }
    }
    catch (e)
    {
      res.status(500).send(e.message);
    }
  });
};
