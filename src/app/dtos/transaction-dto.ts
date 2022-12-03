import { check } from 'express-validator';

export default {

    post:[
        check('toUser').not().isEmpty().withMessage('O usuário para o qual receberá a transação não foi específicado').trim(),
        check('value').not().isEmpty().withMessage('O valor da transação não foi específicado').trim(),
    ]

}
