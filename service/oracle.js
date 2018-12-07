"use strict";

var config = require('../config.json');
let request = require("request");
Promise = require("bluebird");

var APEX_URL = config["APEX_URL"];
var ORACLE_WORKSPACE = config["ORACLE_WORKSPACE"];
var URL_BASE = APEX_URL + ORACLE_WORKSPACE + "/";
console.log("----------------------------------------------------------------------");
console.log("Connection is ..." + URL_BASE);
console.log("----------------------------------------------------------------------");

Promise.promisifyAll(request);

module.exports = class ServiceOracle {

    ///Notification取得
    static get_notification() {
        let url = URL_BASE + "/google-home-notifier/api/GetGuestName";
        //let url = URL_BASE + "/receiption/api/GetGuestName";
        let headers = {
            "Content-Type": "application/json"
        }
        return request.getAsync({
            url: url,
            headers: headers,
            json: true
        }).then(
            (response) => {
                if (response.statusCode != 200) {
                    return Promise.reject(new Error("ServiceOracle.get_notification() failed."));
                }
                //console.log(response.body.items);
                return response.body.items;
            }
        );
    }

    ///Notification除去
    static put_remove_notification() {
        let url = URL_BASE + "/google-home-notifier/api/RemoveGuestName";
        return request.putAsync({
            url: url,
            json: true
        }).then(
            (response) => {
                if (response.statusCode != 200) {
                    return Promise.reject(new Error("ServiceOracle.put_remove_notification() failed."));
                }
                return response;
            }
        );
    }
}