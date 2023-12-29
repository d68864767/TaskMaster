const fs = require('fs');
const path = require('path');

class Logging {
  constructor() {
    this.logFile = path.join(__dirname, 'taskmaster.log');
  }

  initialize() {
    if (!fs.existsSync(this.logFile)) {
      fs.writeFileSync(this.logFile, '');
    }
    console.log('Logging Initialized');
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFileSync(this.logFile, logMessage);
    console.log(logMessage);
  }

  error(message) {
    const timestamp = new Date().toISOString();
    const errorMessage = `${timestamp} - ERROR: ${message}\n`;
    fs.appendFileSync(this.logFile, errorMessage);
    console.error(errorMessage);
  }
}

module.exports = Logging;
