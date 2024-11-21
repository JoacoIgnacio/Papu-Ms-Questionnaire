import { Document, Types } from 'mongoose';
export declare class QuestionnaireAnswer {
    questionnaireId: Types.ObjectId;
    answerId: Types.ObjectId;
    date: string;
}
export declare const QuestionnaireAnswerSchema: import("mongoose").Schema<QuestionnaireAnswer, import("mongoose").Model<QuestionnaireAnswer, any, any, any, Document<unknown, any, QuestionnaireAnswer> & QuestionnaireAnswer & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QuestionnaireAnswer, Document<unknown, {}, import("mongoose").FlatRecord<QuestionnaireAnswer>> & import("mongoose").FlatRecord<QuestionnaireAnswer> & {
    _id: Types.ObjectId;
}>;
