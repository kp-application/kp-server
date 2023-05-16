import { registerAs } from "@nestjs/config";

export default registerAs("env", () => ({
    jwt: {
        issuer: process.env.JWT_ISSUER,
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
        passphrase: process.env.PASSPHRASE,
    },
    cloudStorage: {
        acl: process.env.CLOUD_STORAGE_ACL,
        bucket: process.env.CLOUD_STORAGE_BUCKET,
        projectId: process.env.CLOUD_STORAGE_PROJECTID,
        keyFilename: process.env.CLOUD_STORAGE_KEYFILENAME,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
    },
}));
