import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class QuestionnaireAnswer {
    @Prop({ type: Types.ObjectId, ref: 'Questionnaire', required: true })
    questionnaireId: Types.ObjectId;
  
    @Prop({ type: Types.ObjectId, ref: 'Answer', required: false })
    answerId: Types.ObjectId;

    @Prop({ required: true })
    date: string;
    
    @Prop({ type: Object })
    location?: { latitude: number; longitude: number }; // Campo para almacenar la ubicación
}

export const QuestionnaireAnswerSchema = SchemaFactory.createForClass(QuestionnaireAnswer);

