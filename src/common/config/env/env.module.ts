import { Module } from "@nestjs/common";

import { EnvService } from "src/common/config/env/env.service";

@Module({
    providers: [EnvService],
    exports: [EnvService],
})
export class EnvModule {}
