import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { QuizModule } from 'src/quiz/quiz.module';
import { Quiz, QuizSchema } from 'src/quiz/schemas/quiz.schema';
import { ResultModule } from 'src/result/result.module';
import { ResultService } from 'src/result/result.service';
import { Result, ResultSchema } from 'src/result/schemas/result.schema';
import { Users, UsersSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    MailModule,
    // QuizModule,
    // ResultModule,
    // ResultService
  ],
  controllers: [UsersController],
  providers: [UsersService, MailService, ResultService],
})
export class UsersModule {}
