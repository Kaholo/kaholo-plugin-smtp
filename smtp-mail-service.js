const path = require("path");
const nodemailer = require("nodemailer");

const NEW_LINE_WITH_OPTIONAL_COMMA_REGEX = /(?:,\s*)?\n/g;
const COMMA_WITH_WHITESPACE_REGEX = /\s*,\s*/g;

class SmtpMailService {
  static FIELDS_WITH_MULTILINE_SUPPORT = ["bcc", "to", "cc"];

  constructor(hostname, port, username, password) {
    this.transport = nodemailer.createTransport({
      port,
      host: hostname,
      secure: port === 465,
      auth: {
        user: username,
        pass: password,
      },
    });
  }

  send({
    to,
    from,
    subject,
    cc,
    bcc,
    text,
    html,
    attachmentPaths,
  }) {
    const correctedMailOptions = {
      to,
      from,
      subject,
      cc,
      bcc,
      text,
      html,
    };

    SmtpMailService.FIELDS_WITH_MULTILINE_SUPPORT.forEach((field) => {
      if (correctedMailOptions[field]) {
        correctedMailOptions[field] = correctedMailOptions[field]
          .trim()
          .replace(NEW_LINE_WITH_OPTIONAL_COMMA_REGEX, ", ")
          .replace(COMMA_WITH_WHITESPACE_REGEX, ", ");
      }
    });

    if (attachmentPaths.length) {
      correctedMailOptions.attachments = attachmentPaths.map((attachmentPath) => ({
        filename: path.basename(attachmentPath),
        path: attachmentPath,
      }));
    }

    return this.transport.sendMail(correctedMailOptions);
  }
}

module.exports = SmtpMailService;
