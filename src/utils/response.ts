/* eslint-disable class-methods-use-this */
class Responses {
    successResponse(status: boolean, message: string, data?: any, error?: any) {
        return {
            status,
            message,
            data,
            error
        };
    }
}

module.exports = new Responses();