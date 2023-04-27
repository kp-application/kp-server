import { registerAs } from "@nestjs/config";

export default registerAs("env", () => ({
    jwt: {
        issuer: process.env.JWT_ISSUER,
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    },
}));
