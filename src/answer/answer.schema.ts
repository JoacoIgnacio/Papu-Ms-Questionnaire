import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';

@Schema()
export class Answer extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Questionnaire', required: true })
  questionnaireId: string;

  @Prop({ type: [String], required: true })
  answers: string[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
