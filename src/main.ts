import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger('Bootstrap');

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: false,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    app.enableShutdownHooks();

    const config = new DocumentBuilder()
        .setTitle('Universe Group Events API')
        .setDescription(
            'External API for event ingestion and analytics. Note: Internal NATS consumers and async processing are not documented here.',
        )
        .setVersion('1.0')
        .addTag('webhook', 'Event ingestion endpoint')
        .addTag('analytics', 'Analytics and reporting endpoints')
        .addTag('health', 'Health check endpoints')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3000);

    await app.listen(port);

    logger.log(`http://localhost:${port}`);
    logger.log(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();
