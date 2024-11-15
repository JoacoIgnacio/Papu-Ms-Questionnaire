import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  type: string; // Tipo de pregunta, como "checkbox" o "text"

  @Prop({ type: [String] })
  options: string[]; // Opciones de respuesta, si es una pregunta de opción múltiple
}

export const QuestionSchema = SchemaFactory.createForClass(Question);