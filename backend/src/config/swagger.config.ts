import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('Awesome API')
    .setDescription('A simple REST API built with NestJS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
};
