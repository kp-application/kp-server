import { Request } from "express";
import MulterGoogleCloudStorage from "multer-cloud-storage";

import {
    TMyMulterOptions,
    TAcl,
    TAllowType,
    fileFilter,
} from "src/common/builders/multer/multer.option";

export class MulterBuilder {
    #type: TAllowType;
    #path: string;

    constructor() {}

    setAllowImageProfile() {
        this.#type = "image";
        this.#path = "profile";
        return this;
    }

    setAllowImageAlbum() {
        this.#type = "image";
        this.#path = "album";
        return this;
    }

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
                    const name = Buffer.from(
                        file.originalname,
                        "latin1",
                    ).toString("utf8");
                    done(null, `/${this.#path}/${name}${new Date()}`);
                },
            }),
            fileFilter: fileFilter(this.#type),
        };
    }
}
