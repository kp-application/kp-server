export function successResponseForm<T>(result: boolean, statusCode: number, data: T) {
    return {
        result,
        statusCode,
        data,
    }
}