import { Document } from 'mongoose';
export declare class Answer extends Document {
    questionnaireId: string;
    answers: string[];
}
export declare const AnswerSchema: any;
