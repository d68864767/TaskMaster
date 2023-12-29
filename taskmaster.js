const taskManagement = require('./taskManagement');
const cli = require('./cli');
const api = require('./api');
const logging = require('./logging');
const dashboard = require('./dashboard');
const errorHandling = require('./errorHandling');
const webInterface = require('./webInterface');
const notificationSystem = require('./notificationSystem');
const resourceOptimization = require('./resourceOptimization');
const distributedExecution = require('./distributedExecution');

class TaskMaster {
  constructor() {
    this.taskManagement = new taskManagement();
    this.cli = new cli();
    this.api = new api();
    this.logging = new logging();
    this.dashboard = new dashboard();
    this.errorHandling = new errorHandling();
    this.webInterface = new webInterface();
    this.notificationSystem = new notificationSystem();
    this.resourceOptimization = new resourceOptimization();
    this.distributedExecution = new distributedExecution();
  }

  start() {
    this.taskManagement.initialize();
    this.cli.initialize();
    this.api.initialize();
    this.logging.initialize();
    this.dashboard.initialize();
    this.errorHandling.initialize();
    this.webInterface.initialize();
    this.notificationSystem.initialize();
    this.resourceOptimization.initialize();
    this.distributedExecution.initialize();
  }
}

const taskMaster = new TaskMaster();
taskMaster.start();
