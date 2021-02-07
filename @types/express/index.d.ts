import {IsUser} from "../../src/utils/authUser";


declare global{
    namespace Express {
      export  interface Request {
            currentUser: IsUser
        }
    }
}