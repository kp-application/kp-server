import compression from "compression";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";

import { AppModule } from "src/app.module";
import { CustomExceptionFilter } from "src/common/filters/htpp-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        snapshot: true,
    });

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalFilters(new CustomExceptionFilter());
    app.use(compression());

    await app.listen(3000);
}

bootstrap();
