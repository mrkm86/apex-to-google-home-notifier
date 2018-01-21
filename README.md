//CRON式の設定の仕方
sudo crontab -e

//下記１行を追記する
* * * * * for i in `seq 0 5 59`;do (sleep ${i}; node /home/murakami/apex-to-google-home-notifier/index.js) & done;
