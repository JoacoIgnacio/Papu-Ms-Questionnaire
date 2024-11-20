import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "src/answer/answer.schema";
import { QuestionnaireAnswer, QuestionnaireAnswerSchema } from "src/questionnaireAnswer/questionnaireAnswer.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Answer.name, schema: AnswerSchema },
            { name: QuestionnaireAnswer.name, schema: QuestionnaireAnswerSchema }
        ])
    ],
    controllers: [],
    providers: [],
    exports: [MongooseModule]
})
export class QuestionnaireAnswerModule {}