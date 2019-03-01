import { CustomError } from "./CustomError";

export class NotAuthorizedError extends CustomError{

    constructor(){
        super(401, "User not authorized");
    }
}