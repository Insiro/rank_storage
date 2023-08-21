import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from './app/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);
  console.log(`storage server is listening on ${config.port}`)
}
bootstrap();
