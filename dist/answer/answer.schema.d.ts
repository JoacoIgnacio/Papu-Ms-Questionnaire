import { Document, Types } from 'mongoose';
export declare class Answer extends Document {
    questionnaireAnswerId: Types.ObjectId;
    questionId: Types.ObjectId;
    userId: Types.ObjectId;
    response: string;
    observations: string;
    images: string[];
}
export declare const AnswerSchema: import("mongoose").Schema<Answer, import("mongoose").Model<Answer, any, any, any, Document<unknown, any, Answer> & Answer & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Answer, Document<unknown, {}, import("mongoose").FlatRecord<Answer>> & import("mongoose").FlatRecord<Answer> & {
    _id: Types.ObjectId;
}>;
