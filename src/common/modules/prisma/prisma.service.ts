import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: [
                { emit: "stdout", level: "query" },
                { emit: "stdout", level: "error" },
            ],
        });
    }

    async onModuleInit() {
        await this.$connect();

        this.$use(async (params, next) => {
            return await next(params);
        });
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on("beforeExit", async () => {
            console.log("Database exit");
            await app.close();
        });
    }

    async findUserByEmail(email: string) {
        return this.user.findUnique({
            where: {
                email,
            },
        });
    }

    async rawQuery() {
        return await this.$queryRaw`SELECT * FROM "user"`;
    }
}
