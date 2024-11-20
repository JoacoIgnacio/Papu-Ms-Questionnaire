import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class QuestionnaireAnswer {
    @Prop({ type: Types.ObjectId, ref: 'Questionnaire', required: true })
    questionnaireId: Types.ObjectId;
  
    @Prop({ type: Types.ObjectId, ref: 'Answer', required: true })
    answerId: Types.ObjectId;
}

export const QuestionnaireAnswerSchema = SchemaFactory.createForClass(QuestionnaireAnswer);

