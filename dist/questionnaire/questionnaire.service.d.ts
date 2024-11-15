import { Model } from 'mongoose';
import { Answer } from 'src/answer/answer.schema';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';
export declare class QuestionnaireService {
    private questionnaireModel;
    private answerModel;
    constructor(questionnaireModel: Model<Questionnaire>, answerModel: Model<Answer>);
    create(createQuestionnaireDto: any): Promise<Questionnaire>;
    getQuestionnaireWithUserAnswers(questionnaireId: string, userId: string): Promise<{
        questionnaireId: any;
        title: string;
        description: string;
        questions: {
            questionId: any;
            text: any;
            type: any;
            options: any;
            userAnswer: string | null;
        }[];
    }>;
    getAllQuestionnaires(): Promise<any[]>;
    findOne(id: string): Promise<Questionnaire | null>;
    update(id: string, updateQuestionnaireDto: any): Promise<Questionnaire | null>;
    delete(id: string): Promise<any>;
}
