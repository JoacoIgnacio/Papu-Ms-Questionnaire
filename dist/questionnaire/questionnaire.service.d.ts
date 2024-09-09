import { Model } from 'mongoose';
import { Questionnaire } from 'src/questionnaire/questionnaire.schema';
export declare class QuestionnaireService {
    private questionnaireModel;
    constructor(questionnaireModel: Model<Questionnaire>);
    create(createQuestionnaireDto: any): Promise<Questionnaire>;
    findAll(): Promise<Questionnaire[]>;
    findOne(id: string): Promise<Questionnaire | null>;
    update(id: string, updateQuestionnaireDto: any): Promise<Questionnaire | null>;
    delete(id: string): Promise<any>;
}
