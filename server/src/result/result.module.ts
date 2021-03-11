import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from 'src/quiz/quiz.module';
import { QuizService } from 'src/quiz/quiz.service';
import { Quiz, QuizSchema } from 'src/quiz/schemas/quiz.schema';
import { Users, UsersSchema } from 'src/users/schemas/users.schema';
import { UsersModule } from 'src/users/users.module';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { Result, ResultSchema } from './schemas/result.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    // MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    // UsersModule
  ],
  controllers: [ResultController],
  providers: [ResultService, QuizService],
})
export class ResultModule {}
