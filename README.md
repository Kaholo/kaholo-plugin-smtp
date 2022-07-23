# Kaholo SMTP Plugin
This plugin enables Kaholo to send email messages to an email server using the de facto standard Simple Mail Transport Protocol (SMTP). Many modern email servers and services use proprietary email exchange protocols, but most can be configured to also receive SMTP.

There is another plugin, the Kaholo Email Services plugin. It also uses SMTP but comes pre-configured with appropriate parameters for various well-known email services such as Gmail, SendGrid, and SendInBlue, as a convenience. In contrast the SMTP plugin is generic and configurable to work with any SMTP email server.

## Prerequisites
To use this plugin, there must have network access to an SMTP server, and credentials with sufficient privileges to send mail via that SMTP server. Email sending privileges are often restricted in terms of allowed `To:` and `From:` addresses, as well as the number and size of emails that may be sent. Please refer to the SMTP server or service documentation or administrator to understand what restrictions may apply to your SMTP server or service.

## Access and Authentication
This plugin uses a Kaholo Account to manage four parameters related to access and authentication.
* Host - the DNS name or IP address of the SMTP server, e.g. `mailserver2.kaholo.io`
* Port - the TCP/IP port address of the SMTP server, usually `25`
* Username - a username, often in the form of an email address, of the user or service account that is authorized to send mail via this server
* Password - the password that goes with Username, stored in the Kaholo vault so it does not appear in user interfaces, activity log, or error message

## Plugin Installation
For download, installation, upgrade, downgrade and troubleshooting of plugins in general, see [INSTALL.md](./INSTALL.md).

## Plugin Settings
Plugin settings act as default parameter values. If configured in plugin settings, the action parameters may be left unconfigured. Action parameters configured anyway over-ride the plugin-level settings for that Action. The SMTP plugin has only one setting.
* Default From Address - the email address that will appear in the `From:` portion of the email message, e.g. `pipeline-notifications@kaholo.io`

## Method: Send Mail
This is the only method of this plugin, and unsurprisingly it sends an email message by SMTP.

### Parameter From
This is the `From:` address of the email message. Only one address may be given. An SMTP server may restrict allowed values. If in doubt, try using the same email address as Username in the Kaholo Account.

### Parameter To
This is the `To:` address(es) of the email message. Any number of addresses may be given, either comma separated or one per line. An SMTP server may restrict allowed values. If in doubt try using the same email address as Username in the Kaholo Account.

### Parameter Message Subject
This is the plain text `Subject:` line of the message.

### Parameter CC
This is the optional `CC:` address(es) of the email message. CC is for parties who may be interested in the message but are not the intended direct recipients. Any number of addresses may be given, either comma separated or one per line.

### Parameter BCC
This is the optional `BCC:` address(es) of the email message. BCC is for parties who may be interested in the message but are not the intended direct recipients. BCC is also hidden from other recipients of the message. This is useful for test purposes - you might BCC yourself messages to confirm that the pipeline is working properly. Any number of addresses may be given, either comma separated or one per line.

### Parameter Plain Text Message
An email message my have Plain Text or HTML content or both. Most modern email clients will display only the HTML portion if it exists, otherwise the plain text. This parameter is for the plain text portion of the message, if any.

### Parameter HTML Message
An email message my have Plain Text or HTML content or both. Most modern email clients will display only the HTML portion if it exists, otherwise the plain text. This parameter is for the HTML portion of the message, if any.

### Parameter Attachment Paths
To attach files to the email, provide path(s) to the file here. These will be either absolute or relative paths on the Kaholo agent. The working directory on a Kaholo agent is `/usr/src/app/workspace` so relative paths are relative to this location.

For example, if you have built a jar file that is located at `/usr/src/app/workspace/myproj/target/artifact-1.0.25115.jar`, you could put either that full path in this parameter, or the relative path `myproj/target/artifact-1.0.25115.jar`, and either way the file would be attached to the email.

Whether or not attachments are allowed and the size/type of those attachments are commonly restricted by the SMTP server. For example executable files (even within a zip file) or attachments larger than 100MB are commonly forbidden. If you experience trouble with this please consult the SMTP server/service documentation and/or administrator.