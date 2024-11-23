import { Controller, Post, Body, Param, Get,Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/imageStorage';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post() 
  async create(@Body() createAnswerDto: any) {
    return this.answerService.create(createAnswerDto);
  }

  @Post('upload')
  async createImage(@Body() createAnswerDto: any) {
    return this.answerService.createImage(createAnswerDto);
  }

  // Obtener historial de cuestionarios completados por el usuario
  @Get(':userId/history')
  async getQuestionnaireHistory(@Param('userId') userId: string) {
    return this.answerService.getQuestionnaireHistory(userId);
  }

  @Get(':userId/questionnaires')
  async getQuestionnairesCompletedByUser(@Param('userId') userId: string) {
    return this.answerService.getQuestionnairesCompletedByUser(userId);
  }

  @Get(':userId/:questionnaireId')
  async getUserAnswersForQuestionnaire(
    @Param('userId') userId: string,
    @Param('questionnaireId') questionnaireId: string,
    @Query('date') date: string
  ) {
    return this.answerService.getUserAnswersForQuestionnaire(userId, questionnaireId, date);
  }
}
