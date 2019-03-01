import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError{
    constructor(){
        super(403, "Not enough permissions");
    }
}