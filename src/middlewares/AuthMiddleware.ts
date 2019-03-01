import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken'

import { Constants } from '../common/Constants';
import { NotAuthorizedError } from '../errors/NotAuthorizedError';
import { Role } from '../enums/Role';
import { ForbiddenError } from '../errors/ForbiddenError';

export class AuthMiddleware {

    private jwtSalt: string = process.env.JWT_SALT;

    private roles: Array<Role> = [];

    public isHavePermissions(roles: Array<Role>): RequestHandler{
        this.roles = roles;
        return this.handleRequest.bind(this);
    }

    private handleRequest(req: Request, res: Response, next: NextFunction) {
        const token = req.headers[Constants.AUTH_TOKEN];

        if (!token) {
            throw new NotAuthorizedError();
        }

        let decoded;
        try {
            decoded = jwt.decode(token);
        } catch (err) {
            throw new NotAuthorizedError();
        }

        if (!this.roles.some(role => role === decoded.role)) {
            throw new ForbiddenError();
        }

        req.body.currentUser = decoded;
        return next();
    }
}