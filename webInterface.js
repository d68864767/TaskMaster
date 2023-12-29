const express = require('express');
const path = require('path');
const taskManagement = require('./taskManagement');

class WebInterface {
  constructor() {
    this.app = express();
    this.taskManagement = new taskManagement();
  }

  initialize() {
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.get('/tasks', (req, res) => {
      res.json(this.taskManagement.tasks);
    });

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
     