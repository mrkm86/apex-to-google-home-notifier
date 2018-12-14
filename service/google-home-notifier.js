"use strict";

var config = require('../config.json');
var googlehome = require('../../google-home-notifier');

var GOOGLE_HOME_NOTIFIER_LANGUAGE = config["GOOGLE_HOME_NOTIFIER_LANGUAGE"];
var GOOGLE_HOME_NOTIFIER_DEVICE_NAME = config["GOOGLE_HOME_NOTIFIER_DEVICE_NAME"];
var GOOGLE_HOME_NOTIFIER_IPADDRESS = config["GOOGLE_HOME_NOTIFIER_IPADDRESS"];

console.log("----------------------------------------------------------------------");
console.log("GOOGLE_HOME_NOTIFIER_LANGUAGE is ..." + GOOGLE_HOME_NOTIFIER_LANGUAGE);
console.log("GOOGLE_HOME_NOTIFIER_DEVICE_NAME is ..." + GOOGLE_HOME_NOTIFIER_DEVICE_NAME);
console.log("GOOGLE_HOME_NOTIFIER_IPADDRESS is ..." + GOOGLE_HOME_NOTIFIER_IPADDRESS);
console.log("----------------------------------------------------------------------");

//値を格納
googlehome.device(GOOGLE_HOME_NOTIFIER_DEVICE_NAME, GOOGLE_HOME_NOTIFIER_LANGUAGE);
googlehome.ip(GOOGLE_HOME_NOTIFIER_IPADDRESS, GOOGLE_HOME_NOTIFIER_LANGUAGE);

module.exports = class ServiceGoogleHomeNotification {

    //通知をする
    static async NotifyGoogleHome2(strMessage, strIPAddress) {

        //IPアドレスを格納
        googlehome.ip(strIPAddress, GOOGLE_HOME_NOTIFIER_LANGUAGE);

        return new Promise(resolve => {

            googlehome.notify(strMessage, function(notifyRes) {
                console.log(notifyRes　);
                return resolve(notifyRes);
            });

        });
    }

    //通知をする
    static NotifyGoogleHome(strMessage, strIPAddress) {

        //IPアドレスを格納
        googlehome.ip(strIPAddress, GOOGLE_HOME_NOTIFIER_LANGUAGE);

        try {
            googlehome.notify(strMessage, function(notifyRes) {
                console.log(notifyRes);
            });
        } catch(err) {
            console.log(err);
        }
    }
}
