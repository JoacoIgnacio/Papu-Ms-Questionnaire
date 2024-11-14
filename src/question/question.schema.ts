import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: [String] })
  options: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);