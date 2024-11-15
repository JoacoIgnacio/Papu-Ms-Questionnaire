import { Document, Types } from 'mongoose';
export declare class Questionnaire extends Document {
    title: string;
    description: string;
    questions: Types.ObjectId[];
}
export declare const QuestionnaireSchema: import("mongoose").Schema<Questionnaire, import("mongoose").Model<Questionnaire, any, any, any, Document<unknown, any, Questionnaire> & Questionnaire & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Questionnaire, Document<unknown, {}, import("mongoose").FlatRecord<Questionnaire>> & import("mongoose").FlatRecord<Questionnaire> & {
    _id: Types.ObjectId;
}>;
