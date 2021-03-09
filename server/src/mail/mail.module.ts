require('dotenv').config();
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_NAME,
        pass: process.env.MAIL_PASSWORD,
      },
    },
    defaults: {
      from: `Prog-Quiz <${process.env.MAIL_NAME}>`,
    },
    template: {
      dir: process.cwd() + '/templates/',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),],
  providers: [MailService],
})
export class MailModule {}