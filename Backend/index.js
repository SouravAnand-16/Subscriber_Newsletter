const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express() ;

app.use(express.json(),cors());

const LOG_FILE = './newsletter_logs.json';
if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([]), 'utf8');
}

app.get("/" , (req,res) =>{
    res.status(200).send({"msg":"This is a home route"});
});

//app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sauravanand324@gmail.com', 
        pass: process.env.Email_Pass 
    }
});

app.post('/send-newsletter', (req, res) => {
    const { email } = req.body;
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).send('Invalid email format.');
    }

    const mailOptions = {
        from: 'sauravanand324@gmail.com',
        to: email,
        subject: 'Your Newsletter',
        text: 'This is a dummy newsletter content...'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send('Error sending newsletter');
        } else {
            console.log('Email sent: ' + info.response);
            logEmailDetails(email);
            res.send('Newsletter sent successfully to ' + email);
        }
    });
});

app.listen(process.env.PORT , () => {
    console.log(`Server is running ...`);
});


function logEmailDetails(email) {
    const now = new Date();
    const logEntry = {
        email: email,
        timestamp: now.toISOString()
    };

    fs.readFile(LOG_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the log file:', err);
            return;
        }

        const logs = JSON.parse(data);
        logs.push(logEntry);

        fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the log file:', err);
            }
        });
    });
}
