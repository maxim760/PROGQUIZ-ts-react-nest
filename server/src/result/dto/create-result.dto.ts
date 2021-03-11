import { Schema } from "mongoose";

export class CreateResutDto {
  quiz: Schema.Types.ObjectId
  stat: { time: number, rate: number }
}