require('dotenv').config(); 

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const messagingServiceSid = 'MG648519a9175da2a1uhhhfdc06070d01a';

client.messages
  .create({
    body: 'You have an appointment with Owl, Inc. on Friday, November 3 at 4:00 PM. Reply C to confirm.',
    messagingServiceSid: messagingServiceSid,  
    to: '4558556542',  
  })
  .then((message) => console.log(`Message sent with SID: ${message.sid}`))
  .catch((error) => {
    console.error('Error sending message:', error);
    console.log('Error Code:', error.code);
    console.log('Error Message:', error.message);
  });
