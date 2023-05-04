import { CacheModule } from "@nestjs/common";
import { redisStore } from "cache-manager-redis-store";

export const redisConfig = {
    isGlobal: true,
    useFactory: async () => {
        const store = await redisStore({
            socket: {
                host: "localhost",
                port: 6379,
            },
        });

        return {
            store: () => store,
        };
    },
};
