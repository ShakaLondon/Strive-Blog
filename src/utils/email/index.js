import sgMail from "@sendgrid/mail"

export const sendEmail = async (recipientAddress) => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  console.log("you made it here 1")

  const msg = {
    to: recipientAddress,
    from: "sm880@kent.ac.uk",
    subject: "Hello from Strive",
    text: "bla bla bla bla bla bla bla bla bla bla bla bla",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  }

  sgMail
  .send(msg)
  .then(() => {
    // Celebrate
  })
  .catch(error => {
    // Log friendly error
    console.error(error);

    if (error.response) {
      // Extract error msg
      const {message, code, response} = error;

      // Extract response msg
      const {headers, body} = response;

      console.error(body);
    }
  });
  
}