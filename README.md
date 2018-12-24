
sudo mkdir ~/.nvm
sudo chmod 777 ~/.nvm

git clone https://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh

nvm ls-remote
nvm install latest

git clone https://github.com/mrkm86/apex-to-google-home-notifier.git
sudo apt-get install libavahi-compat-libdnssd-dev
npm install
mv config.json.sample config.json
change the parameter at config.json

sudo nano /etc/profile.d/nvm.sh


//launch at boot
sudo nano /etc/rc.local

add below script
ex) cd /home/{username}/app/apex-to-google-home-notifier
node index.js --cron
