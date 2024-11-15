import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './answer.schema';
import { Questionnaire, QuestionnaireSchema } from 'src/questionnaire/questionnaire.schema';
import { Question, QuestionSchema } from 'src/question/question.schema';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: Questionnaire.name, schema: QuestionnaireSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  exports: [MongooseModule],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
