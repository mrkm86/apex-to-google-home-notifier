//おまじない
"use strict";

//module.exports->ほかのモジュールから読み込み可能

let oracle = require("./service/oracle");
let googlehomenotifier = require("./service/google-home-notifier");

console.log("Application is running...");

///Notification取得
return oracle.get_notification().then(
    (response) => {

        //該当なし
        if (response.length == 0) {

            console.log("There is no notifications.");
            console.log("Application is exit.");
            return;

        }
        //該当あり
        else {

            console.log("----------------------------------------------------------------------");
            console.log("Notification Got.");
            console.log(response[0].t_message);
            console.log(response[0].t_google_home_ip_address);
            console.log(response[0].t_row_id);
            console.log("----------------------------------------------------------------------");

            //GOOGLE-HOMEに通知を送る
            var strMessage = response[0].t_message;
            var strIPAddress = response[0].t_google_home_ip_address;
            var strRowId = response[0].t_row_id;

            //for debug
            strRowId = "AAAWixAAAAACALjAAA";

            return googlehomenotifier.NotifyGoogleHome(strMessage, strIPAddress)
                .then((response) => {
                    console.log(response);
                }).then(() => {
                    oracle.delete_notification(strRowId).then(
                        (response) => {
                            //成功
                            console.log("Notification is removed.");
                            console.log("Application is exit.");
                        }
                    );
                });
        }
    }
);
