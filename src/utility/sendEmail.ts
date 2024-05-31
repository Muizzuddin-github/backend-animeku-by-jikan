import nodemailer from "nodemailer";

export interface EmailConfig {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export class Email {
  private from: string = "";
  private to: string = "";
  private subject: string = "";
  private html: string = "";

  constructor(config: EmailConfig) {
    this.from = config.from;
    this.to = config.to;
    this.subject = config.subject;
    this.html = config.html;
  }

  async send() {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: process.env.SECRET_EMAIL_SENDER,
        pass: process.env.SECRET_EMAIL_AUTH,
      },
    });

    const info = await transporter.sendMail({
      from: this.from, // sender address
      to: this.to, // list of receivers
      subject: this.subject, // Subject line
      html: this.html, // html body
    });

    return info;
  }
}
