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

    setAllowProfileImage() {
        this.#path = "profile";
        this.#type = "image";
        return this;
    }

    setAllowAlbumImage() {
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
                keyFilename: "./cloud.storage.json",
                filename: (
                    req: Request,
                    file: Express.Multer.File,
                    done: Function,
                ) => {
                    const saveName = new Date().getTime() + file.originalname;
                    done(null, `/${this.#path}/${saveName}`);
                },
            }),
            fileFilter: fileFilter(this.#type),
        };
    }
}
