import { check } from 'express-validator';
import expressValidatorResult from '../middlewares/express-validations';

import hasUpper from '../utils/has-upper';
import hasNumber from '../utils/has-number';

export default {

    post:[

        check('username').not().isEmpty().withMessage('Username é obrigatório').trim()
        .isLength({ min: 3}).withMessage('Seu nome deve possuir ao menos 3 (três) caracteres !').trim(),

        check('password').not().isEmpty().withMessage('Password é obrigatório').
        isLength({ min: 8}).withMessage('Sua senha deve possuir, no mínimo, 8 (oito) caracteres')
        .custom( password => {

            const verifyIfHasUpper = hasUpper(password);
            if(!verifyIfHasUpper){
                throw new Error('Sua senha deve possuir uma letra maiúscula');
            }

            return true;

        }).
        custom( password => {

            const verifyIfHasNumber = hasNumber(password);
            if(!verifyIfHasNumber) {
               throw new Error('Sua senha deve possuir um número');
            }

            return true;

        }).trim(),
        expressValidatorResult,
    ]
}


