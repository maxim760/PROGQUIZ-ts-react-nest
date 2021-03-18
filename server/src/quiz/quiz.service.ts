import { Model, ObjectId } from 'mongoose';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async getAll(): Promise<Quiz[]> {
    try {
      const quizes = await this.quizModel.find({})
      return quizes;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getCategories(): Promise<Quiz[]> {
    try {
      const categories = await this.quizModel.distinct("category")
      return categories;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getOne(id: ObjectId): Promise<Quiz> {
    try {
      if (!id) {
        throw new HttpException("Не указан id", HttpStatus.BAD_REQUEST);
      }
      const quiz = await this.quizModel.findById(id).exec()
      if (!quiz) {
        throw new HttpException("Теста по такому адресу не существует", HttpStatus.NOT_FOUND);
        
      }
      return quiz
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async create(quiz: CreateQuizDto) {
    console.log(quiz.questions[0].variants)
    try {
      const newQuiz = await this.quizModel.create({...quiz, successResult: Math.min(quiz.successResult, 1)});
      return newQuiz._id;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
