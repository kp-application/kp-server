import { Request, Response } from "express";
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception?.message || "",
            response: exception?.getResponse() || {},
        });
    }
}
