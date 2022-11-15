import { Request, ErrorRequestHandler , Response, NextFunction } from "express";

function serverError(error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) {

    response.status(500).json({ error: 'Um erro ocorreu no servidor. Tente novamente mais tarde'});

}

export default serverError;
