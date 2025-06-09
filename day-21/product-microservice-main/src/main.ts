import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { TcpLoggerInterceptor } from './tcp-logger.interceptor';

const logger = new Logger('Microservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 8877 }
  });
  //app.useGlobalInterceptors(new TcpLoggerInterceptor());
  logger.log(`Microservice is listening`);
  await app.listen();
}
bootstrap();
