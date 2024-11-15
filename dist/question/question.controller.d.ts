import { QuestionService } from './question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: any): Promise<import("./question.schema").Question>;
    findAll(): Promise<import("./question.schema").Question[]>;
    findOne(id: string): Promise<import("./question.schema").Question | null>;
    update(id: string, updateQuestionDto: any): Promise<import("./question.schema").Question | null>;
    delete(id: string): Promise<import("./question.schema").Question | null>;
}
