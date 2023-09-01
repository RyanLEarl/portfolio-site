const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-west-2" });
const response = {
  isBase64Encoded: false,
  headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Credentials": true}
};
exports.handler = async function (event) {
  try {
    console.log('EVENT: ', event)
    console.log(`Body: ${event.body}`)
    const { senderEmail, senderName, message } = JSON.parse(event.body)
    console.log(`Email: ${senderEmail} \n Name: ${senderName} \n Message: ${message}`)
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
    const sesReponse = await ses.sendEmail(params).promise();
    console.log(sesReponse);
    response.statusCode = 200;
    response.body = JSON.stringify({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.body = JSON.stringify({message: 'An error occurred while attempting to send the email'});
  }
  return response;
};