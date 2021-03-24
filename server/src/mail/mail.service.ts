require('dotenv').config();
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { NotifyUserDto, VerifyUserDto } from './dto/verify-user.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  public sendInfoEmail({ emailTo, hash }: VerifyUserDto): void {
    this
      .mailerService
      .sendMail({
        to: emailTo, // List of receivers email address
        subject: 'Подтверждение почты ✔',
        template: "index", // The `.pug` or `.hbs` extension is appended automatically.
        context: {  // Data to be sent to template engine.
          hash: hash
        },
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
  }
  public sendSuccessEmail({emailTo} : NotifyUserDto): void {
    this
      .mailerService
      .sendMail({
        to: emailTo, // List of receivers email address
        subject: 'Почта подтвердена ✔',
        template: "success", // The `.pug` or `.hbs` extension is appended automatically.
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
  }
  
}
