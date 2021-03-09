require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { QuizModule } from './quiz/quiz.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qlowj.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
    ),
    QuizModule,
    UsersModule,
    AuthModule,
    MailModule
  ],
})
export class AppModule {}
