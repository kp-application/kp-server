import chalk from "chalk";
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { EnvService } from "src/common/modules/env/env.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly envService: EnvService) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { path } = request;

        return next.handle().pipe(
            tap((res) => {
                if (this.envService.getNodeEnv() === "development") {
                    console.log(chalk.bold.yellow(`Logging ${request.method} ${path} `));
                }
            }),
        );
    }
}
