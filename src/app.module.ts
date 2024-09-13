import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true,envFilePath:'.env'}),  // Importa el módulo de configur
    MongooseModule.forRoot(process?.env?.MONGO_URI || ''),  // URL de conexión a MongoDB
    QuestionnaireModule,  // Importa el módulo de cuestionarios
  ],
})
export class AppModule {}

