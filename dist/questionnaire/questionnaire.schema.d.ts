import { Document } from 'mongoose';
export declare class Questionnaire extends Document {
    title: string;
    description: string;
    questions: string[];
}
export declare const QuestionnaireSchema: any;
