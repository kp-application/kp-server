import MulterGoogleCloudStorage from "multer-cloud-storage";
import { Injectable } from "@nestjs/common";

import { EnvService } from "src/common/modules/env/env.service";

@Injectable()
export class MulterService {
    constructor(private readonly envService: EnvService) {}

    build() {
        return new MulterGoogleCloudStorage({});
    }
}
