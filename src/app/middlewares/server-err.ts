import { Request, ErrorRequestHandler , Response, NextFunction } from "express";

function serverError(error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) {

    response.status(500).json({ error: 'Um erro interno ocorreu. Tente novamente mais tarde'});

}

export default serverError;
