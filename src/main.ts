import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import fs from "fs";
import path from "path";

export const privateKey = {
    key: fs
        .readFileSync(path.resolve(__dirname, "../openssl/private.pem"))
        .toString(),
    passphrase: "kpserver",
};

export const publicKey = fs
    .readFileSync(path.resolve(__dirname, "../openssl/public.pem"))
    .toString();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
