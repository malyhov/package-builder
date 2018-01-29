const spawn = require('child_process').spawn; 
const env = require('node-env-file');
env(__dirname + '/../.env');
const logDir = process.env.LOG || '/var/log/';
const log4js = require('log4js'); 
const logger = log4js.getLogger();
logger.level = 'debug';
log4js.configure({
  appenders: { 
    build: { 
      type: 'file', 
      filename: logDir + 'pkgbuilder.log', 
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss}   %m'
      } 
    }
  },
  categories: { 
    default: { 
      appenders: ['build'], level: 'debug' 
    } 
  }
});
const scriptDir = process.env.SCRIPT;

let child;
let script;
let command;
let args;


const scriptHelper = function(command, buildId) {
  switch(command) {
    case 'build':
      logger.info('Script: Start build', buildId);
      command = scriptDir + 'build_php.sh';
      args = [buildId, 'master'];
      script = spawn(command, args);
      
      script.stdout.on('data', function(data) {
        logger.info(data.toString());
      });
      
      script.stderr.on('data', function (data) {
        logger.info(data.toString());
      });
      
      script.on('exit', function (code) {
        logger.info('child process exited with code ' + code.toString());
      });
      
      break;
    
    case 'deploy':
      logger.info('Script: Deploy build', buildId);
      command = scriptDir + 'deploy_php.sh';
      args = [buildId, 'master'];
      script = spawn(command, args);
      
      script.stdout.on('data', function (data) {
        logger.info(data.toString());
      });
      
      script.stderr.on('data', function (data) {
        logger.info(data.toString());
      });
      
      script.on('exit', function (code) {
        logger.info('child process exited with code ' + code.toString());
      });
      
      break;
    
      default:
        logger.info('Script: Echo default');
  }
  
};

module.exports = scriptHelper;

