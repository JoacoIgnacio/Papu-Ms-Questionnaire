import { AnswerService } from './answer.service';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(createAnswerDto: any): Promise<import("./answer.schema").Answer>;
    createImage(createAnswerDto: any): Promise<import("./answer.schema").Answer>;
    getQuestionnaireHistory(userId: string): Promise<{
        questionnaire: import("mongoose").Types.ObjectId;
        answers: Omit<import("mongoose").Document<unknown, {}, import("./answer.schema").Answer> & import("./answer.schema").Answer & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
    }[]>;
    getQuestionnairesCompletedByUser(userId: string): Promise<any[]>;
    getUserAnswersForQuestionnaire(userId: string, questionnaireId: string, date: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("./answer.schema").Answer> & import("./answer.schema").Answer & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
}
