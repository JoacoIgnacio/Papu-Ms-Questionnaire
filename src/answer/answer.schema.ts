import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';

@Schema()
export class Answer extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Questionnaire', required: true })
  questionnaireId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: Types.ObjectId;

  @Prop({ required: true })
  response: string;

  @Prop()
  observations: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
