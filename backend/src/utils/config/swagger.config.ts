import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = getSwaggerConfig();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
  });
};

export const getSwaggerConfig = () =>
  new DocumentBuilder()
    .setTitle('Awesome API')
    .setDescription('A simple REST API built with NestJS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
