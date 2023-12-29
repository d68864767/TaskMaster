const os = require('os');
const cluster = require('cluster');
const TaskManagement = require('./taskManagement');

class DistributedExecution {
  constructor() {
    this.taskManagement = new TaskManagement();
    this.cpuCount = os.cpus().length;
  }

  initialize() {
    console.log('Distributed Execution Initialized');
    this.setupCluster();
  }

  setupCluster() {
    if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running`);

      // Fork workers.
      for (let i = 0; i < this.cpuCount; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log('Starting a new worker');
        cluster.fork();
      });
    } else {
      console.log(`Worker ${process.pid} started`);
      this.taskManagement.initialize();
    }
  }

  distributeTasks() {
    const tasks = this.taskManagement.tasks;
    const taskIds = Object.keys(tasks);

    taskIds.forEach((taskId, index) => {
      const workerId = index % this.cpuCount;
      const worker = cluster.workers[workerId];

      if (worker) {
        worker.send({ taskId, task: tasks[taskId] });
      }
    });
  }
}

module.exports = DistributedExecution;
