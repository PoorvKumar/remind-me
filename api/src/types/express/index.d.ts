import * as express from "express"
import { User } from "../../entity/User";

declare global {
    namespace Express {
        interface Request {
            user? : User
        }
    }
}
