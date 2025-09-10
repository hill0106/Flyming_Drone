const axios = require('axios');

async function sendEmail(name, email, subject, content) {
    try {
          const options = {
            method: 'POST',
            url: 'https://rapidmail.p.rapidapi.com/',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
              'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            },
            data: {
              ishtml: 'false',
              sendto: process.env.CONTACT_EMAIL,
              name: process.env.EMAIL_SENDER_NAME,
              replyTo: email,
              title: process.env.EMAIL_TITLE || 'Flyming Drone Contact 來信',
              body: ` 使用者來信內容：

              Name: ${name}
              Email: ${email}
              Subject: ${subject}
              Content: ${content}`
            }
          };
          const response = await axios.request(options);
          console.log(response.data.message);
    }
    catch(err) {
        console.log("Send Email Error: ", err);
    }
}


exports.sendEmail = sendEmail;