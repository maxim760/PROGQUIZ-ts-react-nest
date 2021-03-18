import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizService } from './quiz.service';

@Controller('/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  getAll() {
    return this.quizService.getAll();
  }
  @Get("/category")
  getCategories() {
    return this.quizService.getCategories();
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.quizService.getOne(id);
  }
  @Post()
  create(@Body() quiz: CreateQuizDto) {
    
    return this.quizService.create(quiz);
  }
}
