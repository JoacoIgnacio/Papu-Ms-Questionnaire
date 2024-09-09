import { Model } from 'mongoose';
import { Answer } from 'src/answer/answer.schema';
export declare class AnswerService {
    private answerModel;
    constructor(answerModel: Model<Answer>);
    create(createAnswerDto: any): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: string): Promise<Answer | null>;
    delete(id: string): Promise<any>;
}
