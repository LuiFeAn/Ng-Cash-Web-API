export type ApiErrorType = {

    errorMessage:string,
    errorStatus:number,

}

class ApiError extends Error {

    public status

    constructor( { errorMessage, errorStatus }: ApiErrorType ){
        super();
        this.message = errorMessage;
        this.status = errorStatus;
    }


}

export default ApiError;
