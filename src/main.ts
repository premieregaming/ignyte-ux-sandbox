import { NestFactory } from '@nestjs/core';
import { AllExceptionFilter } from './all-exception.filter';
import { AppModule } from './app.module';

process.on('uncaughtException', (e) => { console.error(e) })

async function bootstrap() {

    const app = await NestFactory.create(AppModule)
    app.useGlobalFilters(new AllExceptionFilter())
    app.setGlobalPrefix('api')
    app.enableCors()

    await app.listen(process.env.PORT)
    console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap();
