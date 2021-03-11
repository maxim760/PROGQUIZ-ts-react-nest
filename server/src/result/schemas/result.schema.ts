import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Quiz } from 'src/quiz/schemas/quiz.schema';

export type ResultDocument = Result & Document;
export type IVariant = {
  text: string;
  id: number;
};
export type IQuestion = {
  id: number;
  text: string;
  variants: IVariant[];
  rightAnswer: number;
};

@Schema()
export class Result {
  
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Quiz', required: true })
  quiz: Quiz;

  @Prop({default: 0, type: Number})
  count: number;

  @Prop({type: [{time: Number, rate: Number, date: Number}]})
  stat: {time: number, rate: number, date: number}[];

  @Prop({type: {isSuccess: Boolean, numberTry: Number}})
  successTry: {isSuccess: boolean, numberTry: number};
}

export const ResultSchema = SchemaFactory.createForClass(Result);
