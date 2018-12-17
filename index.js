"use strict";

let oracle = require("./service/oracle");
let googlehomenotifier = require("./service/google-home-notifier");

console.log("Application is running...");

//get notification(s)
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
            console.log(`${response.length} Notification(s) Got.`);
            console.log("----------------------------------------------------------------------");

            response.forEach( function( value ) {

                //notify GoogleHome
                var strMessage = value.t_message;
                var strIPAddress = value.t_google_home_ip_address;
                var strRowId = value.t_row_id;

                console.log(`Notification(${strRowId}) is started.`);

                return googlehomenotifier.NotifyGoogleHome(strMessage, strIPAddress)
                    .then((response) => {
                        console.log(`Notification(${strRowId}) is notified.`);
                    }).then(() => {
                        oracle.delete_notification(strRowId).then(
                            (response) => {
                                console.log(`Notification(${strRowId}) is removed.`);
                            }
                        ).then((response) => {
                            console.log(`Notification(${strRowId}) is completed.`);
                        });
                    });
            })
        }
    }
);
