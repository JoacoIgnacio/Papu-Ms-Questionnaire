import { Model, Types } from 'mongoose';
import { Answer } from './answer.schema';
import { QuestionnaireAnswer } from 'src/questionnaireAnswer/questionnaireAnswer.schema';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';
import { Question } from 'src/question/question.schema';
export declare class AnswerService {
    private answerModel;
    private questionnaireModel;
    private questionModel;
    private questionnaireAnswerModel;
    constructor(answerModel: Model<Answer>, questionnaireModel: Model<Questionnaire>, questionModel: Model<Question>, questionnaireAnswerModel: Model<QuestionnaireAnswer>);
    create(createAnswerDto: any): Promise<Answer>;
    getQuestionnaireHistory(userId: string): Promise<{
        questionnaire: Types.ObjectId;
        answers: Omit<import("mongoose").Document<unknown, {}, Answer> & Answer & {
            _id: Types.ObjectId;
        }, never>[];
    }[]>;
    getQuestionnairesCompletedByUser(userId: string): Promise<any[]>;
    getUserAnswersForQuestionnaire(userId: string, questionnaireId: string, _date: string): Promise<Omit<import("mongoose").Document<unknown, {}, Answer> & Answer & {
        _id: Types.ObjectId;
    }, never>[]>;
}
