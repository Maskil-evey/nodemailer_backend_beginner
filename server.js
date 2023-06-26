// const express = require('express');
// const appRoute = require('./routes/route')

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

/** routes */
// app.use('/api', appRoute);


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`)
// })
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/data', (req, res) => {
 const {number} = req.body
  let config = {
    service : 'gmail',
    auth : {
        user: 'freshgroceries.com.ng@gmail.com',
        pass: 'hnyffiadauwqlbdo'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
}

let transporter = nodemailer.createTransport(config);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Fresh Groceries",
        link : 'http:localhost:4200/admin'
    }
})

let response = {
    body: {
        name : "Hamidah (Admin)",
        intro: `You have ${number} products expiring soon!!`,
        outro: "Check your products!!"
    }
}

let mail = MailGenerator.generate(response)

let message = {
    from : 'freshgroceries.com.ng@gmail.com',
    to : 'hamidahotori2018@gmail.com',
    subject: "Products Expiring Soon",
    html: mail
}

transporter.sendMail(message).then(() => {
    return res.status(201).json({
        msg: "you should receive an email"
    })
}).catch(error => {
    return res.status(500).json({ error })
})
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
  