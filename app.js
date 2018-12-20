const cron = require('cron');
const shell = require('shelljs');

var job = new cron.CronJob({
  cronTime: '*/5 * * * * *', // 'second (optional) | minute | hour | day of month | month | day of week'
  onTick: function() {
    shell.exec("node index.js");
  }
});

job.start();