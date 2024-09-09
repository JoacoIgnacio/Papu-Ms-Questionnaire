import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireController } from './questionnaire.controller';
import { AnswerController } from 'src/answer/answer.controller';
import { QuestionnaireService } from './questionnaire.service';
import { AnswerService } from 'src/answer/answer.service';
import { Questionnaire, QuestionnaireSchema } from 'src/questionnaire/questionnaire.schema';
import { Answer, AnswerSchema } from 'src/answer/answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Questionnaire.name, schema: QuestionnaireSchema }]),
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }])
  ],
  controllers: [QuestionnaireController, AnswerController],
  providers: [QuestionnaireService, AnswerService],
})
export class QuestionnaireModule {}
