const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
   
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

app.get("/",(req,res)=>{
res,send("Hellow");
})
app.post('/schedule-task', (req, res) => {
  const { email, task, dateTime } = req.body;

  const scheduledDate = new Date(dateTime);
  if (isNaN(scheduledDate.getTime())) {
    return res.status(400).send({ message: 'Invalid dateTime format' });
  }

 
  const cronSchedule = `${scheduledDate.getMinutes()} ${scheduledDate.getHours()} ${scheduledDate.getDate()} ${scheduledDate.getMonth() + 1} *`;

  cron.schedule(cronSchedule, () => {
    const mailOptions = {
      from: {
        name: 'Task Scheduler',
        address: process.env.USER,
      },
      to: email,
      subject: `Task Reminder: ${task}`,
      text: `Reminder for your scheduled task: ${task}.`,
      html: `<p>Reminder for your scheduled task: <strong>${task}</strong>.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed to send email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  });

  res.status(200).send({ message: 'Task scheduled and email will be sent' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
