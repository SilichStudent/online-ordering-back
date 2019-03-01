import { CustomError } from "./CustomError";

export class NotFound extends CustomError{

    constructor(){
        super(404, "Not found");
    }
}