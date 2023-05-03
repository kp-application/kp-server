import { Request } from "express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export type TAllowType = "image" | "video";
export type TMyMulterOptions = Pick<
    MulterOptions,
    "storage" | "fileFilter" | "limits"
>;
export type TFileSize = number;
export type TLimitFileSizes = "5MB" | "10MB";
export type TAcl = "publicRead" | "private";

export const imageMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
];
export const videoMimeTypes = [
    "video/quicktime",
    "video/mp4",
    "video/x-ms-wmv",
    "video/webm",
];
export const audioMimeTypes = [
    "audio/mpeg",
    "audio/ogg",
    "audio/wave",
    "audio/mp3",
];
export const TLimitFileSize: Record<TLimitFileSizes, TFileSize> = {
    "5MB": 5 * 1_024 * 1_024,
    "10MB": 10 * 1_024 * 1_024,
};

export const fileFilter =
    (type: TAllowType) =>
    (req: Request, file: Express.Multer.File, done: Function) => {
        const allowType = type === "image" ? imageMimeTypes : videoMimeTypes;
        const prepareMimeType = allowType.find(
            (mimeType) => mimeType === file.mimetype,
        );

        // 타입 매개변수 수정

        if (!prepareMimeType) done(null, false);

        done(null, true);
    };