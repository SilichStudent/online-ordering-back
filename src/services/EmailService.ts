import * as nodemailer from 'nodemailer'
import { emit } from 'cluster';

export class EmailService {

    public async sendEmailToUser(to, password) {
        const account = await nodemailer.createTestAccount();
        const transport = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        const mailOptions = {
            from: `"Account created" <manager@softarex.com>`,
            to: to,
            subject: "Account created ✔",
            text: `email: ${to}\npassword: ${password}`,
            html: `<b>email: ${to}\npassword: ${password}</b>`
          };

          const info = await transport.sendMail(mailOptions);
    }
}