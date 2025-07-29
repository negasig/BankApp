import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';

async function bootstrap() {
const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
