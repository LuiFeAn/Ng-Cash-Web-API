import IApiServiceErroror from "../interfaces/app-error";

class ApiServiceError extends Error {

    statusCode
    errors

    constructor({statusCode,errors}: IApiServiceErroror){
        super()
        this.statusCode = statusCode
        this.errors = errors;
    }

}

export default ApiServiceError
