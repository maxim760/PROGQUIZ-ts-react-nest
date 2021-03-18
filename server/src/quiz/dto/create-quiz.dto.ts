import { IsEmail, IsNotEmpty, Matches, Min, MinLength } from 'class-validator';
import { IQuestion } from '../schemas/quiz.schema';


export class CreateQuizDto {

  @IsNotEmpty()
  category: string
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
  
  
  @IsNotEmpty()
  questions: Omit<IQuestion, "id">[]

  successResult: number
}