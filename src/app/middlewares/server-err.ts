import { Request, Response, NextFunction } from "express";

import ApiServiceError from "../errors/api-service-error";

function serverError(error: any, request: Request, response: Response, next: NextFunction) {

   if( error instanceof ApiServiceError ){

        const { errors } = error

        return response.status(error.statusCode).json({
            errors
        });

   }

   if( error ){

        return response.status(500).json({
            serverError:'Um erro interno ocorreu. Por favor, tente novamente mais tarde.'
        })

   }

   next();

}

export default serverError;
