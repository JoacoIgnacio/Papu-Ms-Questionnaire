import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';  // Importa el HttpModule
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { ConfigModule } from '@nestjs/config';
import { CheckTokenGuard } from 'src/guards/check-token.guard';  // Asegúrate de importar tu guard

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true,envFilePath:'.env'}),  // Importa el módulo de configur
    MongooseModule.forRoot('mongodb+srv://admin:admin@web-movil-questionnarie.3nuzv.mongodb.net/?retryWrites=true&w=majority&appName=Web-Movil-Questionnarie'),  // URL de conexión a MongoDB
    QuestionnaireModule, // Importa el módulo de cuestionarios
    HttpModule, // Importa HttpModule para hacer solicitudes HTTP
  ],
  providers: [CheckTokenGuard],  // Añade el guard a la lista de providers
})
export class AppModule {}

