import { AnswerService } from './answer.service';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    createResponses(userId: string, questionnaireId: string, answers: {
        questionId: string;
        response: string;
        observations?: string;
    }[]): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./answer.schema").Answer> & import("./answer.schema").Answer & {
        _id: import("mongoose").Types.ObjectId;
    }, Omit<{
        userId: import("mongoose").Types.ObjectId;
        questionnaireId: import("mongoose").Types.ObjectId;
        questionId: import("mongoose").Types.ObjectId;
        response: string;
        observations: string;
    }, "_id">>[]>;
    getQuestionnaireHistory(userId: string): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, import("./answer.schema").Answer> & import("./answer.schema").Answer & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
}
