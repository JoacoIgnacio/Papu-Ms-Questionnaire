import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire, QuestionnaireSchema } from 'src/questionnaire/questionnaire.schema';
import { CheckTokenGuard } from '../guards/check-token.guard';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: Questionnaire.name, schema: QuestionnaireSchema }]),
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService, CheckTokenGuard],
})
export class QuestionnaireModule {}
