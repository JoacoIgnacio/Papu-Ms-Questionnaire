import { Document } from 'mongoose';
export declare class Questionnaire extends Document {
    title: string;
    description: string;
    questions: string[];
}
export declare const QuestionnaireSchema: import("mongoose").Schema<Questionnaire, import("mongoose").Model<Questionnaire, any, any, any, Document<unknown, any, Questionnaire> & Questionnaire & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Questionnaire, Document<unknown, {}, import("mongoose").FlatRecord<Questionnaire>> & import("mongoose").FlatRecord<Questionnaire> & {
    _id: import("mongoose").Types.ObjectId;
}>;
