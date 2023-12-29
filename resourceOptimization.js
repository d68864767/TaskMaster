const os = require('os');
const TaskManagement = require('./taskManagement');

class ResourceOptimization {
  constructor() {
    this.taskManagement = new TaskManagement();
    this.cpuCount = os.cpus().length;
    this.memoryLimit = os.totalmem();
  }

  initialize() {
    console.log('Resource Optimization Initialized');
  }

  optimizeResources() {
    const tasks = this.taskManagement.tasks;
    const taskIds = Object.keys(tasks);

    taskIds.sort((a, b) => tasks[a].priority - tasks[b].priority);

    let cpuUsage = 0;
    let memoryUsage = 0;

    for (let i = 0; i < taskIds.length; i++) {
      const taskId = taskIds[i];
      const task = tasks[taskId];

      if (cpuUsage + task.cpuUsage > this.cpuCount || memoryUsage + task.memoryUsage > this.memoryLimit) {
        console.log(`Task with id ${taskId} cannot be scheduled due to resource constraints`);
        continue;
      }

      cpuUsage += task.cpuUsage;
      memoryUsage += task.memoryUsage;

      this.taskManagement.addTask(taskId, task.taskFunction, task.schedule, task.priority, task.dependencies);
      console.log(`Task with id ${taskId} has been scheduled`);
    }
  }
}

module.exports = ResourceOptimization;
