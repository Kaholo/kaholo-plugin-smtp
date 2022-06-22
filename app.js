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
    hostname,
    port,
    secure: port === 465,
    auth: { username, password },
  });

  return sendWithTransport(transport, mailDetails);
}

module.exports = kaholoPluginLibrary.bootstrap({
  send,
});
