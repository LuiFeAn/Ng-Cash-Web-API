import { Request, Response, NextFunction } from "express";

import AppErr from "../errors/AppErr";

function serverError(error: AppErr, request: Request, response: Response, next: NextFunction) {

   if(error){
        return response.status( error.statusCode || 500) .json({
            error: error.message || 'Um erro interno ocorreu. Tente novamente mais tarde'
        });
   }

   next();

}

export default serverError;
