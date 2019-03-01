import { CustomError } from "./CustomError";

export class DefaultManagerDelete extends CustomError{

    constructor(){
        super(400, "No one can't delete default manager");
    }
}