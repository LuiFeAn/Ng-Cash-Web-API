import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export default function expressValidatorResult(req: Request, resp: Response, next: NextFunction){
    const validationErrors = validationResult(req).array();
    if(validationErrors.length > 0){
        return resp.status(400).json(validationErrors);
    }
    next();
}
