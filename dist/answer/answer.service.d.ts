import { Model, Types } from 'mongoose';
import { Answer } from './answer.schema';
export declare class AnswerService {
    private answerModel;
    constructor(answerModel: Model<Answer>);
    createResponses(userId: string, questionnaireId: string, answers: {
        questionId: string;
        response: string;
        observations?: string;
    }[]): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, Answer> & Answer & {
        _id: Types.ObjectId;
    }, Omit<{
        userId: Types.ObjectId;
        questionnaireId: Types.ObjectId;
        questionId: Types.ObjectId;
        response: string;
        observations: string;
    }, "_id">>[]>;
    getQuestionnaireHistory(userId: string): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, Answer> & Answer & {
        _id: Types.ObjectId;
    }, never>, never>[]>;
}
