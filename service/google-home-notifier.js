"use strict";

var config = require('../config.json');
var googlehome = require('../node_modules/google-home-notifier');

var GOOGLE_HOME_NOTIFIER_LANGUAGE = config["GOOGLE_HOME_NOTIFIER_LANGUAGE"];
var GOOGLE_HOME_NOTIFIER_DEVICE_NAME = config["GOOGLE_HOME_NOTIFIER_DEVICE_NAME"];

console.log("----------------------------------------------------------------------");
console.log("GOOGLE_HOME_NOTIFIER_LANGUAGE is ..." + GOOGLE_HOME_NOTIFIER_LANGUAGE);
console.log("GOOGLE_HOME_NOTIFIER_DEVICE_NAME is ..." + GOOGLE_HOME_NOTIFIER_DEVICE_NAME);
console.log("----------------------------------------------------------------------");

module.exports = class ServiceGoogleHomeNotification {

    //通知をする
    static async NotifyGoogleHome(strMessage, strIPAddress) {

        console.log(`set googlehome.device(${GOOGLE_HOME_NOTIFIER_DEVICE_NAME},${GOOGLE_HOME_NOTIFIER_LANGUAGE})`);
        console.log(`set googlehome.ip(${strIPAddress},${GOOGLE_HOME_NOTIFIER_LANGUAGE})`);

        //set value
        googlehome.device(GOOGLE_HOME_NOTIFIER_DEVICE_NAME, GOOGLE_HOME_NOTIFIER_LANGUAGE);
        googlehome.ip(strIPAddress, GOOGLE_HOME_NOTIFIER_LANGUAGE);

        return new Promise((resolve, reject) => {
            try {
                console.log(`googlehome.notify(${strMessage})`);
                googlehome.notify(strMessage, function (notifyRes) {

                    try {
                        return resolve(notifyRes);
                        
                    } catch (error) {
                        return reject(error);
                    }

                });

            } catch (error) {
                return reject(error);
            }

        });
    }
}
