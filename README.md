
git clone https://github.com/mrkm86/apex-to-google-home-notifier.git
npm install
mv config.json.sample config.json
change the parameter at config.json

//launch at boot
sudo /etc/rc.local

add below script
ex) cd /home/{username}/app/apex-to-google-home-notifier
node app.js
