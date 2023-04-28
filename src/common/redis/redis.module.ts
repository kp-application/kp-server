import { Module, CacheModule } from "@nestjs/common";
import redisStore from "cache-manager-redis-store";

import { EnvModule } from "src/common/config/env/env.module";
import { EnvService } from "src/common/config/env/env.service";
import { RedisCacheService } from "src/common/redis/redis.service";

// const cacheModule = CacheModule.register({
//     useFactory: async () => ({
//         store: redisStore,
//         host: "10.169.229.107",
//         port: 6379,
//         ttl: 0,
//     }),
// });

@Module({
    imports: [
        CacheModule.register({
            imports: [EnvModule],
            inject: [EnvService],
            useFactory: (envService: EnvService) => {
                return "here";
            },
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisModule {}
