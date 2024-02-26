import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('HMS')
    .setDescription('A state-of-the-art Hospital Management System designed to streamline healthcare operations, enhance patient care, and optimize administrative processes.')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  try {
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        baseUrl: '/v1',
      },
    });
  } catch (error) {
    this.logger.error(error);
  }

  await app.listen(3002);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
