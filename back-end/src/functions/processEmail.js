const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-west-2" });
exports.handler = async function (event) {
  console.log('EVENT: ', event)
  const { senderEmail, senderName, message } = JSON.parse(event.body)
  const params = {
    Destination: {
      ToAddresses: ["ryanleoearl@gmail.com"],
    },
    Message: {
      Body: {
        Text: { 
            Data: `You just got a message from ${senderName} - ${senderEmail}:
            ${message}` 
        },
      },
      Subject: { Data: `Message from ${senderName}` },
    },
    Source: "ryanearlsoftwareengineer@gmail.com",
  };

  return ses.sendEmail(params).promise();
};