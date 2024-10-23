import { QuestionnaireService } from './questionnaire.service';
export declare class QuestionnaireController {
    private readonly questionnaireService;
    constructor(questionnaireService: QuestionnaireService);
    create(createQuestionnaireDto: any): Promise<import("./questionnaire.schema").Questionnaire>;
    getAllQuestionnaires(): Promise<any[]>;
    findOne(id: string): Promise<import("./questionnaire.schema").Questionnaire | null>;
    update(id: string, updateQuestionnaireDto: any): Promise<import("./questionnaire.schema").Questionnaire | null>;
    delete(id: string): Promise<any>;
}
