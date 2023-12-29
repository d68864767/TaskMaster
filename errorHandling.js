const TaskManagement = require('./taskManagement');
const Logging = require('./logging');

class ErrorHandling {
  constructor() {
    this.taskManagement = new TaskManagement();
    this.logging = new Logging();
  }

  initialize() {
    console.log('Error Handling Initialized');
  }

  handleTaskError(taskId, error) {
    const task = this.taskManagement.getTask(taskId);
    if (!task) {
      this.logging.error(`Task with id ${taskId} does not exist`);
      return;
    }

    this.logging.error(`Error occurred in task ${taskId}: ${error.message}`);

    // Retry logic
    if (task.retryCount < task.maxRetries) {
      task.retryCount++;
      this.logging.log(`Retrying task ${taskId} (${task.retryCount}/${task.maxRetries})`);
      task.execute();
    } else {
      this.logging.error(`Task ${taskId} failed after ${task.maxRetries} retries`);
    }
  }

  handleSystemError(error) {
    this.logging.error(`System error: ${error.message}`);
    // System recovery logic can be implemented here
  }
}

module.exports = ErrorHandling;
    });

    this.app.put('/modifyTask/:taskId', (req, res) => {
      try {
        const { taskId } = req.params;
        const { taskFunction, schedule, priority