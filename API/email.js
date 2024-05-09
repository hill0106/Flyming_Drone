const axios = require('axios');

async function sendEmail(name, email, subject, content) {
    try {
          const options = {
            method: 'POST',
            url: 'https://rapidmail.p.rapidapi.com/',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '9a42246cccmsh085fde92be04398p1fa578jsne69bddfc574e',
              'X-RapidAPI-Host': 'rapidmail.p.rapidapi.com'
            },
            data: {
              ishtml: 'false',
              sendto: 'smcming@gmail.com',
              name: 'Flyming Drone',
              replyTo: email,
              title: 'Flyming Drone Contact 來信',
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