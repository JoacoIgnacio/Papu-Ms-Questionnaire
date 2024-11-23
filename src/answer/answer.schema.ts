import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Answer extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Questionnaire'})
  questionnaireAnswerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  response: string;

  @Prop()
  observations: string;

  @Prop({ type: [String] })
  images: string[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
