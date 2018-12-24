'use strict';

const ngrok = require('./get_public_url');
const ViberBot = require('viber-bot').Bot;
const winston = require('winston');
const toYAML = require('winston-console-formatter');
const BotEvents = require('viber-bot').Events;
const PictureMessage = require('viber-bot').Message.Picture;
const TextMessage = require('viber-bot').Message.Text;

const bot = new ViberBot( {
//    authToken: "48cea3353aa7d4d0-3dcf0c72ef38a324-92e2662305cbb93f",
    name: "Football",
    avatar: "https://vi.ill.in.ua/m/625x469/1371357.jpg"
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  console.log(response);
  console.log(message.trackingData);
  var DanieUser = response.userProfile;

  console.log(`id ->  ${DanieUser.id}`);
  console.log('\n');
  console.log(`name ->  ${DanieUser.name}`);
  console.log();
  console.log(`avatar ->  ${DanieUser.avatar}`);
  console.log();

	response.send(message);

//  bot.sendMessage(response.userProfile, new TextMessage("https://mobimg.b-cdn.net/pic/v2/gallery/111x185/avto-transport-48300.jpg"));

  bot.sendMessage(response.userProfile, new PictureMessage('https://images.unsplash.com/photo-1532348374062-fee19177e98f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4086d5d36662ba037e49111340611aa&auto=format&fit=crop&w=1650&q=80', 'Picture', 'http://boombob.ru/img/picture/Jul/04/76b0604043ef853145661526a3a8d366/mini_3.jpg'));
//  console.log(response.userProfile);
  console.log(new PictureMessage('https://cdn.pixabay.com/photo/2018/12/16/16/48/railing-3878850__340.jpg', 'Picture', 'http://boombob.ru/img/picture/Jul/04/76b0604043ef853145661526a3a8d366/mini_3.jpg'));

  bot.getUserDetails(DanieUser)
      .then(userDetails => console.log(userDetails))

});



const http = require('http');
const port = process.env.PORT || 8080;
return ngrok.getPublicUrl().then(publicUrl => {
    console.log('Set the new webhook to"', publicUrl);
    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));
}).catch(error => {
    console.log('Can not connect to ngrok server. Is it running?');
    console.error(error);
});
