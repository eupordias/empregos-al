/**
 * ==============================================================================
 * EMPREGOS AL – SETEQ (Governo de Alagoas)
 * Back-end API RESTful em NestJS + TypeScript + PostgreSQL
 * Conformidade LGPD (Lei 13.709/18), Criptografia AES-256 e Swagger OpenAPI 3.0
 * ==============================================================================
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';

// Módulo principal conceitual
class AppModule {}

async function bootstrap() {
  const logger = new Logger('SeteqBootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Segurança de Cabeçalhos HTTP com Helmet
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.tailwindcss.com', 'https://unpkg.com', 'https://cdn.jsdelivr.net'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://unpkg.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://images.unsplash.com', 'https://*.tile.openstreetmap.org'],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  // 2. Compressão Gzip/Brotli para alta performance em redes móveis (3G/4G/5G)
  app.use(compression());

  // 3. CORS restrito a domínios governamentais e apps móveis autenticados
  app.enableCors({
    origin: [
      'https://seteq.al.gov.br',
      'https://empregos.al.gov.br',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 4. Validação estrita de DTOs e Sanitização de Entradas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // 5. Documentação OpenAPI 3.0 (Swagger)
  const config = new DocumentBuilder()
    .setTitle('SETEQ Digital - Empregos & Qualificação AL')
    .setDescription(
      'API Governamental para intermediação de empregos, qualificação profissional e conformidade LGPD da Secretaria do Trabalho de Alagoas.',
    )
    .setVersion('3.0.0')
    .addTag('Vagas (SINE / IMO)', 'Endpoints para consulta e gestão de vagas')
    .addTag('Qualifica AL', 'Matrículas e certificados de capacitação profissional')
    .addTag('Notícias & Push', 'Serviço de mensageria e notificações aos cidadãos')
    .addTag('Auditoria LGPD', 'Trilhas de auditoria e consentimento do titular')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Documentação da API SETEQ Alagoas',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 Servidor SETEQ Digital rodando na porta ${port} [Ambiente: ${process.env.NODE_ENV || 'production'}]`);
  logger.log(`📄 Swagger disponível em: http://localhost:${port}/api/docs`);
}

bootstrap();
