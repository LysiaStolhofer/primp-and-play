var db = require("../models");

module.exports = function(app) {
  // Get all data
  app.get("/api/AllData", async (req, res) => {
    try {
      const data = await db.Client.findAll({});
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Get all client profiles
  app.get("/api/profile", async (req, res) => {
    try {
      const data = await db.Client.findAll({});
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Get Pet Profile
  app.get("/api/profile/:id", async (req, res) => {
    try {
      const data = await db.Client.findAll({
        where: {
          id: req.param.id
        }
      });
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Create a new profile
  app.post("/api/profile", async (req, res) => {
    try {
      const result = await db.Client.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Create post route for authorization
  app.post("/api/auth", async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await db.Client.findAll({
        where: {
          email
        }
      });
      if (password === result.password) {
        res.send("ok");
      } else {
        res.send("no");
      }
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Delete an Profile by id
  app.delete("/api/profile/:id", async (req, res) => {
    try {
      const result = await db.Client.destroy({ where: { id: req.params.id } });
      const deletedRowCount = result;
      const status = deletedRowCount > 0 ? 200 : 404;
      res.status(status).json({ deletedRowCount });
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });
};
