import { Controller, Post, Body, Param, Delete, Get, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CheckTokenGuard } from '../guards/check-token.guard'; //
@Controller('answers')
@UseGuards(CheckTokenGuard) // Aplica el Guard a todo el controlador
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: any) {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.answerService.delete(id);
  }
}
