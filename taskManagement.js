const TaskMaster = require('taskmaster');

class TaskManagement {
  constructor() {
    this.taskMaster = new TaskMaster();
    this.tasks = {};
  }

  initialize() {
    console.log('Task Management Initialized');
  }

  addTask(taskId, taskFunction, schedule, priority, dependencies) {
    if (this.tasks[taskId]) {
      throw new Error(`Task with id ${taskId} already exists`);
    }

    this.tasks[taskId] = this.taskMaster.schedule(taskFunction, schedule, {
      priority,
      dependencies,
    });

    console.log(`Task with id ${taskId} has been added`);
  }

  removeTask(taskId) {
    if (!this.tasks[taskId]) {
      throw new Error(`Task with id ${taskId} does not exist`);
    }

    this.taskMaster.cancel(this.tasks[taskId]);
    delete this.tasks[taskId];

    console.log(`Task with id ${taskId} has been removed`);
  }

  modifyTask(taskId, taskFunction, schedule, priority, dependencies) {
    if (!this.tasks[taskId]) {
      throw new Error(`Task with id ${taskId} does not exist`);
    }

    this.taskMaster.cancel(this.tasks[taskId]);
    this.tasks[taskId] = this.taskMaster.schedule(taskFunction, schedule, {
      priority,
      dependencies,
    });

    console.log(`Task with id ${taskId} has been modified`);
  }

  getTask(taskId) {
    if (!this.tasks[taskId]) {
      throw new Error(`Task with id ${taskId} does not exist`);
    }

    return this.tasks[taskId];
  }
}

module.exports = TaskManagement;
