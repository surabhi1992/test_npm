var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.APP_ENV;

console.log(chalk.bgGreen(`\nCustom Webpack Step`));
console.log(chalk.blue(`IONIC_ENV: ${process.env.IONIC_ENV}`));
console.log(chalk.blue(`APP_ENV: ${process.env.APP_ENV}`));

// Default to dev config
useDefaultConfig[process.env.IONIC_ENV].resolve.alias = {
    "@env": `@goaaa-mwg-tt/ionic-common/dist/environments/env-config.${env.trim()}`
};

module.exports = function () {
    return useDefaultConfig;
};
