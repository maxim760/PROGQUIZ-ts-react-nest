import { Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { QuizService } from './quiz.service';

@Controller('/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  getAll() {
    return this.quizService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.quizService.getOne(id);
  }
  @Post()
  create() {
    return this.quizService.create();
  }
}
