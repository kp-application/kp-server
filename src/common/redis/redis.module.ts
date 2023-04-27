import { Module, CacheModule } from "@nestjs/common";
import redisStore from "cache-manager-redis-store";

import { RedisCacheService } from "src/common/redis/redis.service";

const cacheModule = CacheModule.register({
    useFactory: async () => ({
        store: redisStore,
        host: "127.0.0.1",
        port: 6379,
        ttl: 0,
    }),
});

@Module({
    imports: [cacheModule],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisModule {}
