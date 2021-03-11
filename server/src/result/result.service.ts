import { Model, ObjectId } from 'mongoose';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result, ResultDocument } from './schemas/result.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateResutDto } from './dto/create-result.dto';
import { Quiz, QuizDocument } from 'src/quiz/schemas/quiz.schema';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name) private resultModel: Model<ResultDocument>,
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
  ) {}

  async getOne(id: ObjectId): Promise<Result | HttpException> {
    try {
      if (!id) {
        return new HttpException('Не указан id', HttpStatus.BAD_REQUEST);
      }
      const result = await this.resultModel.findById(id).exec();
      if (!result) {
        return new HttpException(
          'Результата по такому адресу не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      return result;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async create(result: CreateResutDto): Promise<{ isNew: boolean; id: any }> {
    try {
      const candidate = await this.resultModel
        //@ts-ignore
        .findOne({quiz: result.quiz})
        .populate('quiz');
      if (candidate) {
        candidate.count++;
        if (
          result.stat.rate >= candidate.quiz.successResult &&
          !candidate.successTry.isSuccess
        ) {
          candidate.successTry = {
            numberTry: candidate.count,
            isSuccess: true,
          };
        }
        candidate.stat.push({...result.stat, date: Date.now()});
        await candidate.save();
        return { isNew: false, id: candidate._id };
      }

      const quiz = await this.quizModel.findById(result.quiz);
      const newResult = await this.resultModel.create({
        quiz: quiz._id,
        count: 1,
        stat: [{...result.stat, date: Date.now()}],
        successTry:
          result.stat.rate >= quiz.successResult
            ? {
                isSuccess: true,
                numberTry: 1,
              }
            : {
                isSuccess: false,
                number: 0,
              },
      });
      await newResult.save();
      return { isNew: true, id: newResult._id };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
