import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type QuizDocument = Quiz & Document;
export type IVariant = {
  text: string;
  _id: string;
};
export type IQuestion = {
  id: number;
  text: string;
  variants: IVariant[];
  rightAnswer: number;
};

@Schema()
export class Quiz {
  @Prop()
  category: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop([{ id: String, text:String, rightAnswer: Number, variants: [{text: String, _id: String }] }])
  questions: IQuestion[];

  @Prop({default: 0.8})
  successResult: number;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
