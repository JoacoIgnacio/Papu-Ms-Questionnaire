import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongo:27018/nest' || 'mongodb://mongo:27018'),  // URL de conexión a MongoDB
    QuestionnaireModule,  // Importa el módulo de cuestionarios
  ],
})
export class AppModule {}
