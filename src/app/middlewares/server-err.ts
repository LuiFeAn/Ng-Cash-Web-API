import { Request, Response, NextFunction } from "express";

import IAppError from "../interfaces/app-error";

function serverError(error: IAppError, request: Request, response: Response, next: NextFunction) {
   if(error){
        return response.status( error.statusCode || 500) .json({
            error: error.error || 'Um erro interno ocorreu. Tente novamente mais tarde'
        });
   }

   next();

}

export default serverError;
