const nodemailer = require('nodemailer');
const TaskManagement = require('./taskManagement');
const Logging = require('./logging');

class NotificationSystem {
  constructor() {
    this.taskManagement = new TaskManagement();
    this.logging = new Logging();
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
      }
    });
  }

  initialize() {
    console.log('Notification System Initialized');
  }

  sendNotification(taskId, status) {
    const task = this.taskManagement.getTask(taskId);
    if (!task) {
      this.logging.error(`Task with id ${taskId} does not exist`);
      return;
    }

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: task.notificationEmail,
      subject: `Task ${taskId} ${status}`,
      text: `Task ${taskId} has ${status} at ${new Date().toISOString()}`
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        this.logging.error(`Error occurred while sending notification for task ${taskId}: ${error.message}`);
      } else {
        this.logging.log(`Notification sent for task ${taskId}: ${info.response}`);
      }
    });
  }

  notifyTaskCompletion(taskId) {
    this.sendNotification(taskId, 'completed');
  }

  notifyTaskFailure(taskId) {
    this.sendNotification(taskId, 'failed');
  }
}

module.exports = NotificationSystem;
