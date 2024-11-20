import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post() 
  async create(@Body() createAnswerDto: any) {
    return this.answerService.create(createAnswerDto);
  }


  // Obtener historial de cuestionarios completados por el usuario
  @Get(':userId/history')
  async getQuestionnaireHistory(@Param('userId') userId: string) {
    return this.answerService.getQuestionnaireHistory(userId);
  }
}
