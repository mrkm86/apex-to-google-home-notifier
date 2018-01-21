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
            console.log(response[0].t_guest_name);
            console.log("----------------------------------------------------------------------");

            //GOOGLE-HOMEに通知を送る
            var strmessage = "ハーティスにお客様です。" + response[0].t_guest_name + "様がいらっしゃいました";
		    console.log(strmessage);
            googlehomenotifier.NotifyGoogleHome(strmessage);

            //通知を送ったので、API経由で通知を削除する
            return oracle.put_remove_notification().then(
                (response) => {

                    //成功
                    console.log("Notification is removed.");
                    console.log("Application is exit.");
                }
            );

        }
    }
);
