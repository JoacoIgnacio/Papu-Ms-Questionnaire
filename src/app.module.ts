import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ms-questionnaire-mongodb'),  // URL de conexión a MongoDB
    QuestionnaireModule,  // Importa el módulo de cuestionarios
  ],
})
export class AppModule {}
