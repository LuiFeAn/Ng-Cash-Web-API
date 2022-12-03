type AppErrorType = {

    statusCode: number,
    error: string;

}

class AppErr extends Error {

    public error: string;
    public statusCode: number

    constructor({statusCode,error}: AppErrorType){
        super()
        this.statusCode = statusCode
        this.message = error
    }

}

export default AppErr
