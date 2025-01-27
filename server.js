const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.static('public'));


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


app.post('/send-sms', (req, res) => {
    const { toNumber, message } = req.body;

    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_FROM_NUMBER, // Replace with your Twilio number
            to: toNumber
        })
        .then((message) => {
            res.json({ success: true, messageSid: message.sid });
        })
        .catch((error) => {
            console.error(error);
            res.json({ success: false });
        });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
