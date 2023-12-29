const express = require('express');
const TaskManagement = require('./taskManagement');

class API {
  constructor() {
    this.taskManagement = new TaskManagement();
    this.app = express();
    this.port = process.env.PORT || 3000;
  }

  initialize() {
    this.app.use(express.json());

    this.app.post('/addTask', (req, res) => {
      try {
        const { taskId, taskFunction, schedule, priority, dependencies } = req.body;
        this.taskManagement.addTask(taskId, taskFunction, schedule, priority, dependencies);
        res.status(200).send(`Task with id ${taskId} has been added`);
      } catch (error) {
        res.status(400).send(error.message);
      }
    });

    this.app.delete('/removeTask/:taskId', (req, res) => {
      try {
        const { taskId } = req.params;
        this.taskManagement.removeTask(taskId);
        res.status(200).send(`Task with id ${taskId} has been removed`);
      } catch (error) {
        res.status(400).send(error.message);
      }
    });

    this.app.put('/modifyTask/:taskId', (req, res) => {
      try {
        const { taskId } = req.params;
        const { taskFunction, schedule, priority, dependencies } = req.body;
        this.taskManagement.modifyTask(taskId, taskFunction, schedule, priority, dependencies);
        res.status(200).send(`Task with id ${taskId} has been modified`);
      } catch (error) {
        res.status(400).send(error.message);
      }
    });

    this.app.get('/getTask/:taskId', (req, res) => {
      try {
        const { taskId } = req.params;
        const task = this.taskManagement.getTask(taskId);
        res.status(200).json(task);
      } catch (error) {
        res.status(400).send(error.message);
      }
    });

    this.app.listen(this.port, () => {
      console.log(`API server started on port ${this.port}`);
    });
  }
}

module.exports = API;
.modifyTask(taskId, taskFunction, schedule, priority, dependencies);
        res.status(200).send(`Task with id ${taskId} has been modified`);
      } catch (error) {
        res.status(400).send(error.message);
      }
    });

    this.app.listen(3001, () => {
      console.log('Web Interface Initialized at http://localhost:3001');
    });
  }
}

module.exports = WebInterface;
