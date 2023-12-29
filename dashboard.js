const express = require('express');
const path = require('path');
const taskManagement = require('./taskManagement');
const logging = require('./logging');

class Dashboard {
  constructor() {
    this.app = express();
    this.taskManagement = new taskManagement();
    this.logging = new logging();
  }

  initialize() {
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.get('/tasks', (req, res) => {
      res.json(this.taskManagement.tasks);
    });

    this.app.get('/logs', (req, res) => {
      res.sendFile(this.logging.logFile);
    });

    this.app.listen(3000, () => {
      console.log('Dashboard Initialized at http://localhost:3000');
    });
  }
}

module.exports = Dashboard;
, dependencies } = req.body;
        this