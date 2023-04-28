import { Module } from "@nestjs/common";

import { MulterService } from "src/common/modules/multer/multer.service";
import { EnvService } from "src/common/modules/env/env.service";

@Module({
    providers: [MulterService, EnvService],
    exports: [MulterService],
})
export class MulterModule {}
