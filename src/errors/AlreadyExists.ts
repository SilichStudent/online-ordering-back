import { CustomError } from "./CustomError";

export class AlreadyExists extends CustomError{
    constructor(){
        super(400, "User already exists");
    }
}