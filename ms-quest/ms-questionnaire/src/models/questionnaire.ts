import mongoose, { Document, Schema } from 'mongoose';

interface IQuestionnaire extends Document {
  title: string;
  description: string;
}

const QuestionnaireSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IQuestionnaire>('Questionnaire', QuestionnaireSchema);
