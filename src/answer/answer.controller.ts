import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post() 
  async create(@Body() createAnswerDto: any) {
    return this.answerService.create(createAnswerDto);
  }

  // Crear respuestas para un cuestionario específico
  @Post(':userId/:questionnaireId')
  async createResponses(
    @Param('userId') userId: string,
    @Param('questionnaireId') questionnaireId: string,
    @Body() answers: { questionId: string, response: string, observations?: string }[],
  ) {
    return this.answerService.createResponses(userId, questionnaireId, answers);
  }

  // Obtener historial de cuestionarios completados por el usuario
  @Get(':userId/history')
  async getQuestionnaireHistory(@Param('userId') userId: string) {
    return this.answerService.getQuestionnaireHistory(userId);
  }
}
