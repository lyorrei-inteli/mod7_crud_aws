import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Swagger options
  const config = new DocumentBuilder().setTitle('Nest API').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Set up a global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to be instances of DTO classes
      whitelist: true, // Remove extra data in the request payload that's not in the DTO
      forbidNonWhitelisted: true, // Return an error when the client sends a field that's not in the DTO
      validateCustomDecorators: true,
    }),
  );

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
