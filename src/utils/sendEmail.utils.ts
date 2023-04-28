import Mailgen from "mailgen";
import { createTransport } from "nodemailer";
import "dotenv/config";
import { iSendEmailRequest } from "../interfaces/user.interfaces";
import { AppError } from "../errors";

export const sendEmail = async ({ to, subject, text }: iSendEmailRequest) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter
    .sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html: text,
    })
    .then((res) => {
      console.log(res, "Email success");
    })
    .catch((err) => {
      console.log(err);
      throw new AppError("Error sending email, try again later", 500);
    });
};

export const resetPasswordTemplate = (
  userEmail: string,
  userName: string,
  protocol: string,
  host: string,
  resetToken: string
) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Motors Shop",
      link: `${protocol}://localhost:${3000}`,
    },
  });

  const email = {
    body: {
      name: userName,
      intro:
        "Você recebeu este email, devido a uma requisição para alteração de senha de sua conta",
      action: {
        instructions: "Clique no botão para resetar a sua senha:",
        button: {
          color: "#DC4D2F",
          text: "Recuperar senha",
          link: `${protocol}://localhost:${3000}/recoverPassword/${resetToken}`,
        },
      },
      outro:
        "Se você não solicitou uma redefinição de senha, nenhuma outra ação será necessária de sua parte.",
    },
  };

  const emailBody = mailGenerator.generate(email);

  const emailTemplate = {
    to: userEmail,
    subject: "Reset password",
    text: emailBody,
  };

  return emailTemplate;
};
