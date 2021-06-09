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
    // errorResponse(error: Error) {
    //     return {
    //         status: false,
    //         message: error.message,
    //         data: null,
    //         error
    //     };
    // }
}

module.exports = new Responses();