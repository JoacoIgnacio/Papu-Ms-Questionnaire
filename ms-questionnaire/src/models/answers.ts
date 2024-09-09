import mongoose, { Document, Schema } from 'mongoose';

interface IAnswer extends Document {
  questionnaireId: mongoose.Types.ObjectId;
  answerText: string;
}

const AnswerSchema: Schema = new Schema({
  questionnaireId: { type: Schema.Types.ObjectId, ref: 'Questionnaire', required: true },
  answerText: { type: String, required: true },
});

export default mongoose.model<IAnswer>('Answer', AnswerSchema);
