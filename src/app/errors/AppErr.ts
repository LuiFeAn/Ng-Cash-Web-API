import IAppError from "../interfaces/app-error";

class AppErr extends Error {

    statusCode
    errors

    constructor({statusCode,errors}: IAppError){
        super()
        this.statusCode = statusCode
        this.errors = errors;
    }

}

export default AppErr
