const nodemailer = require("nodemailer");
const kaholoPluginLibrary = require("@kaholo/plugin-library");
const { sendWithTransport } = require("./mail-service");

function send({
  hostname,
  port,
  username,
  password,
  ...mailDetails
}) {
  const transport = nodemailer.createTransport({
    host: hostname,
    port,
    secure: port === 465,
    auth: {
      user: username,
      pass: password,
    },
  });

  return sendWithTransport(transport, mailDetails);
}

module.exports = kaholoPluginLibrary.bootstrap({
  send,
});
