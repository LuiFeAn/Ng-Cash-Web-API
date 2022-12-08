import IAppError from "../interfaces/app-error";

class AppErr extends Error {

    public error: string;
    public statusCode: number

    constructor({statusCode,error}: IAppError){
        super()
        this.statusCode = statusCode
        this.message = error
    }

}

export default AppErr
