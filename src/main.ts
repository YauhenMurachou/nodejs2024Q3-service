import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(PORT), () => {
    console.log(
      `App Start in port - ${PORT} - link - http://localhost:${PORT}`,
    );
  });
}
bootstrap();
