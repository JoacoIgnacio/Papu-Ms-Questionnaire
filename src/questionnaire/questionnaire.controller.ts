import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CheckTokenGuard } from '../guards/check-token.guard'; 

@Controller('questionnaire')
@UseGuards(CheckTokenGuard) // Aplica el Guard a todo el controlador
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  create(@Body() createQuestionnaireDto: any) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  // Obtener la lista de cuestionarios (solo ID y nombre)
  @Get()
  async getAllQuestionnaires() {
    return this.questionnaireService.getAllQuestionnaires();
  }

  // Obtener un cuestionario completo por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnaireService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateQuestionnaireDto: any) {
    return this.questionnaireService.update(id, updateQuestionnaireDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.questionnaireService.delete(id);
  }
}
