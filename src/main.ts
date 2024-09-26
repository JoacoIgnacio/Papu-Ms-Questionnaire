import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CheckTokenGuard } from './guards/check-token/check-token.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new CheckTokenGuard());
  await app.listen(3001);  // Elige el puerto que prefieras
}
bootstrap();
