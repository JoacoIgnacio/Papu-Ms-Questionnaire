import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "src/answer/answer.schema";


@Module({
    imports: [MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }])],
    controllers: [],
    providers: [],
    exports: []
})
export class QuestionnaireAnswerModule {}