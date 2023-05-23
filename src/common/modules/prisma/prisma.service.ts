import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient, Prisma, User } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: [
                { emit: "stdout", level: "query" },
                { emit: "stdout", level: "error" },
            ],
        });

        this.$on<"beforeExit">("beforeExit", async () => {
            console.log("Shutting down server");
        });

        // this.$on<any>("query", (event) => console.log("Event", event));
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

    async rawQuery() {
        // return await this.$queryRaw`SELECT * FROM "user"`;
        // return await this.$queryRaw(Prisma.sql`SELECT * FROM "user"`);
        return await this.$executeRaw`SELECT * FROM "user"`;
    }

    async findUserByEmail(email: string) {
        const transactionResults = await this.$transaction(async () => {
            const user = await this.user.findUnique({
                where: {
                    email,
                },
                select: {
                    userId: true,
                    name: true,
                    email: true,
                },
            });

            return user;
        });

        return transactionResults;
    }
}
