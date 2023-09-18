import { TokenPayload } from "./interfaces/token-payload"

declare global {

    namespace Express {

        interface Request {

            authUser: TokenPayload
            
        }

    }
}
