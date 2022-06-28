const kaholoPluginLibrary = require("@kaholo/plugin-library");
const SmtpMailService = require("./smtp-mail-service");

function send({
  hostname,
  port,
  username,
  password,
  from,
  to,
  subject,
  cc,
  bcc,
  text,
  html,
  attachmentPaths,
}) {
  const smtpMailService = new SmtpMailService(hostname, port, username, password);

  return smtpMailService.send({
    from,
    to,
    subject,
    cc,
    bcc,
    text,
    html,
    attachmentPaths,
  });
}

module.exports = kaholoPluginLibrary.bootstrap({
  send,
});
