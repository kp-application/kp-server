import joi from "joi";

export const validationSchema = joi.object({
    DATABASE_URL: joi.string().required(),
    JWT_ISSUER: joi.string().required(),
    JWT_ALGORITHM: joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION: joi.string().required(),
    PASSPHRASE: joi.string().required(),
    CLOUD_STORAGE_ACL: joi.string().required(),
    CLOUD_STORAGE_BUCKET: joi.string().required(),
    CLOUD_STORAGE_PROJECTID: joi.string().required(),
    CLOUD_STORAGE_KEYFILENAME: joi.string().required(),
});
