import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type UsersDocument = Users & Document;
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
export class Users {
  @Prop({ unique: true })
  username: string;
  @Prop()
  vk_id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({default: false})
  confirmed: boolean;
  @Prop({default: false})
  confirmedHash: string;
}

const UsersSchema = SchemaFactory.createForClass(Users);
UsersSchema.methods.toJSON = function () {
  var obj = this.toObject();
  //@ts-ignored
  delete obj.password;
  return obj;
};

export {UsersSchema}
