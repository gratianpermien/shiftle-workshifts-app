const requireSendMail = (req, res) => {
  let mailOptions = {
    from: "test@gmail.com",
    to: process.env.EMAIL,
    subject: "Nodemailer API",
    text: "Hi from your nodemailer API",
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
      res.json({ status: "Email sent" });
    }
  });
};

export { requireSendMail };
