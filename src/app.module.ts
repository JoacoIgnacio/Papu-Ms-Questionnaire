import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true,envFilePath:'.env'}),  // Importa el módulo de configur
    MongooseModule.forRoot('mongodb+srv://admin:admin@web-movil-questionnarie.3nuzv.mongodb.net/?retryWrites=true&w=majority&appName=Web-Movil-Questionnarie'),  // URL de conexión a MongoDB
    QuestionnaireModule,  // Importa el módulo de cuestionarios
  ],
})
export class AppModule {}

