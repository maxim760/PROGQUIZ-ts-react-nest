import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateResutDto } from './dto/create-result.dto';
import { ResultService } from './result.service';

@Controller('/result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.resultService.getOne(id);
  }
  @Post()
  create(@Body() result: CreateResutDto) {
    return this.resultService.create(result);
  }
}
