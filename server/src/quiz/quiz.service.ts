import { Model, ObjectId } from 'mongoose';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument } from './schemas/quiz.schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async getAll(): Promise<Quiz[] | HttpException> {
    try {
      const quizes = await this.quizModel.find({})
      return quizes;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getOne(id: ObjectId): Promise<Quiz | HttpException> {
    try {
      console.log(id)
      if (!id) {
        return new HttpException("Не указан id", HttpStatus.BAD_REQUEST);
      }
      const quiz = await this.quizModel.findById(id)
      console.log(quiz)
      if (!quiz) {
        return new HttpException("Теста по такому адресу не существует", HttpStatus.NOT_FOUND);
        
      }
      return quiz
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async create() {
    try {
      const quiz = await this.quizModel.create({
        category: 'JS',
        title: 'Тест',
        description:
          'jsjsjsjsjsjВ тесте представлены различные вопросы о JavaScript',
        id: 6,
        questions: [
          {
            text: 'Что такое JavaScript',
            variants: [
              {
                text: 'Язык программирования',
                id: 1,
              },
              {
                text: 'Змея',
                id: 2,
              },
              {
                text: 'Компюьтерная игра',
                id: 3,
              },
              {
                text: 'Имя создателя майнкрафта',
                id: 4,
              },
            ],
            rightAnswer: 1,
          },
          {
            text: 'Что такое React',
            variants: [
              {
                text: 'Реакция',
                id: 1,
              },
              {
                text: 'Язык прог',
                id: 2,
              },
              {
                text: 'Фрэймворк',
                id: 3,
              },
              {
                text: 'Библиотека',
                id: 4,
              },
            ],
            rightAnswer: 4,
          },
          {
            text: 'Что такое питон',
            variants: [
              {
                text: 'Язык программирования',
                id: 1,
              },
              {
                text: 'неверно',
                id: 2,
              },
              {
                text: 'пам пам',
                id: 3,
              },
              {
                text: '322',
                id: 4,
              },
            ],
            rightAnswer: 1,
          },
          {
            text: 'Что такое вью',
            variants: [
              {
                text: 'Язык программирования',
                id: 1,
              },
              {
                text: 'Фрэймворк',
                id: 2,
              },
              {
                text: 'Реакт',
                id: 3,
              },
              {
                text: 'Ангуляр',
                id: 4,
              },
            ],
            rightAnswer: 2,
          },
          {
            text: 'в каком году вышел ес6',
            variants: [
              {
                text: '2001',
                id: 1,
              },
              {
                text: '2011',
                id: 2,
              },
              {
                text: '2015',
                id: 3,
              },
              {
                text: '2020',
                id: 4,
              },
            ],
            rightAnswer: 3,
          },
          {
            text: 'какого типа кнопки нет',
            variants: [
              {
                text: 'reset',
                id: 1,
              },
              {
                text: 'submit',
                id: 2,
              },
              {
                text: 'button',
                id: 3,
              },
              {
                text: 'change',
                id: 4,
              },
            ],
            rightAnswer: 4,
          },
          {
            text: 'что такое редакс',
            variants: [
              {
                text: 'Что-то из пхп',
                id: 1,
              },
              {
                text: 'СТэйт мэнеджер реакт',
                id: 2,
              },
              {
                text: 'Компюьтерная игра',
                id: 3,
              },
              {
                text: 'Имя создателя майнкрафта',
                id: 4,
              },
            ],
            rightAnswer: 2,
          },
          {
            text: 'Что такое JavaScript 2',
            variants: [
              {
                text: 'Язык программирования',
                id: 1,
              },
              {
                text: 'Змея',
                id: 2,
              },
              {
                text: 'Компюьтерная игра',
                id: 3,
              },
              {
                text: 'Имя создателя майнкрафта',
                id: 4,
              },
            ],
            rightAnswer: 1,
          },
          {
            text: 'Что такое JavaScript3',
            variants: [
              {
                text: 'Язык программирования',
                id: 1,
              },
              {
                text: 'Змея',
                id: 2,
              },
              {
                text: 'Компюьтерная игра',
                id: 3,
              },
              {
                text: 'Имя создателя майнкрафта',
                id: 4,
              },
            ],
            rightAnswer: 1,
          },
          {
            text: 'Что такое JavaScript3',
            variants: [
              {
                text: 'Язык программирования',
                id: 1,
              },
              {
                text: 'Змея',
                id: 2,
              },
              {
                text: 'Компюьтерная игра',
                id: 3,
              },
              {
                text: 'Имя создателя майнкрафта',
                id: 4,
              },
            ],
            rightAnswer: 1,
          },
        ],
      });
      return quiz;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
