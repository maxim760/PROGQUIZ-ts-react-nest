require('dotenv').config()
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://maxim:password12QQ@cluster0.qlowj.mongodb.net/react-quiz?retryWrites=true&w=majority`), QuizModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
