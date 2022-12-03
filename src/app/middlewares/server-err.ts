import { Request, Response, NextFunction } from "express";

function serverError(error: any, request: Request, response: Response, next: NextFunction) {

   if(error){
        return response.status(500).json({
            error: 'Um erro interno ocorreu. Tente novamente mais tarde'
        });
   }

   next();

}

export default serverError;
