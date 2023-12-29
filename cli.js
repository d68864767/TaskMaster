const readline = require('readline');
const TaskManagement = require('./taskManagement');

class CLI {
  constructor() {
    this.taskManagement = new TaskManagement();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  initialize() {
    console.log('CLI Initialized');
    this.rl.on('line', (input) => {
      this.processCommand(input);
    });
  }

  processCommand(input) {
    const [command, ...args] = input.split(' ');

    switch (command) {
      case 'add':
        this.addTask(args);
        break;
      case 'remove':
        this.removeTask(args);
        break;
      case 'modify':
        this.modifyTask(args);
        break;
      case 'get':
        this.getTask(args);
        break;
      default:
        console.log(`Unknown command: ${command}`);
    }
  }

  addTask([taskId, taskFunction, schedule, priority, dependencies]) {
    try {
      this.taskManagement.addTask(taskId, taskFunction, schedule, priority, dependencies);
      console.log(`Task ${taskId} added successfully.`);
    } catch (error) {
      console.error(`Error adding task: ${error.message}`);
    }
  }

  removeTask([taskId]) {
    try {
      this.taskManagement.removeTask(taskId);
      console.log(`Task ${taskId} removed successfully.`);
    } catch (error) {
      console.error(`Error removing task: ${error.message}`);
    }
  }

  modifyTask([taskId, taskFunction, schedule, priority, dependencies]) {
    try {
      this.taskManagement.modifyTask(taskId, taskFunction, schedule, priority, dependencies);
      console.log(`Task ${taskId} modified successfully.`);
    } catch (error) {
      console.error(`Error modifying task: ${error.message}`);
    }
  }

  getTask([taskId]) {
    try {
      const task = this.taskManagement.getTask(taskId);
      console.log(`Task ${taskId}: `, task);
    } catch (error) {
      console.error(`Error getting task: ${error.message}`);
    }
  }
}

module.exports = CLI;
.taskManagement