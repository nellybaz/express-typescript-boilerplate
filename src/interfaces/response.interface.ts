export interface IResponse {
    status: boolean,
    message: string,
    statusCode: number,
    data?: any,
    error?: any
}