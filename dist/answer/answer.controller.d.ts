import { AnswerService } from './answer.service';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(createAnswerDto: any): Promise<import("./answer.schema").Answer>;
    findAll(): Promise<import("./answer.schema").Answer[]>;
    findOne(id: string): Promise<import("./answer.schema").Answer | null>;
    delete(id: string): Promise<any>;
}
