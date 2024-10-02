import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CheckTokenGuard } from './guards/check-token.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);  // Elige el puerto que prefieras
}
bootstrap();
