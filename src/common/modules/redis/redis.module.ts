import { Module, CacheModule } from "@nestjs/common";
import redisStore from "cache-manager-redis-store";

import { EnvModule } from "src/common/modules/env/env.module";
import { EnvService } from "src/common/modules/env/env.service";
import { RedisCacheService } from "src/common/modules/redis/redis.service";

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
