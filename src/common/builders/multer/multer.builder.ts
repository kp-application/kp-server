import { Request } from "express";
import MulterGoogleCloudStorage from "multer-cloud-storage";

import {
    TMyMulterOptions,
    TAcl,
    fileFilter,
} from "src/common/builders/multer/multer.option";

export class MulterBuilder {
    #path: string;

    constructor() {}

    build(): TMyMulterOptions {
        return {
            storage: new MulterGoogleCloudStorage({
                acl: process.env.CLOUD_STORAGE_ACL as TAcl,
                bucket: process.env.CLOUD_STORAGE_BUCKET,
                projectId: process.env.CLOUD_STORAGE_PROJECTID,
                keyFilename: process.env.CLOUD_STORAGE_KEYFILENAME,
                filename: (
                    req: Request,
                    file: Express.Multer.File,
                    done: Function,
                ) => {
                    done(null, "test/admidfdfn.png");
                },
            }),
            fileFilter: fileFilter("image"),
        };
    }
}
